// World template system integrated

import type { GameState, GMResponse, JudgmentRequest, JudgmentResult, JudgmentParams } from '../types';
import type { GeminiClient } from '../ai-gm/gemini-client';
import type { TrustManager } from '../buddy/trust-manager';
import type { SaveManager } from '../save-system/save-manager';
import { generateWorld } from '../world-templates/generator';
import { SceneManager } from '../scene-management/scene-manager';
import { evaluateClearConditions } from './condition-evaluator';
import { executeJudgment } from '../judgment/judgment-engine';
import { restoreAbilitiesFromGallery } from '../memory-fragments/award-logic';

export class SessionController {
    private sceneManager: SceneManager;

    constructor(
        private geminiClient: GeminiClient,
        private trustManager: TrustManager,
        private saveManager: SaveManager
    ) {
        this.sceneManager = new SceneManager();
    }

    async startNewSession(sessionNumber: number, playerName: string = 'プレイヤー'): Promise<GameState> {
        console.log(`SessionController: Starting session ${sessionNumber} for ${playerName}...`);

        // Generate actual world from templates
        const currentWorld = generateWorld();

        console.log(`SessionController: Generated world "${currentWorld.name}"`);
        console.log(`  Abnormalities: ${currentWorld.abnormalityTags.join(', ')}`);
        console.log(`  Themes: ${currentWorld.themeTags.join(', ')}`);

        // Create initial scene
        const initialScene = this.sceneManager.createInitialScene(currentWorld.name);
        console.log(`SessionController: Starting with scene "${initialScene.name}"`);

        const gameState: GameState = {
            sessionNumber,
            turnNumber: 1,
            cumulativeProgression: 0,
            currentScene: initialScene,
            currentWorld,
            buddy: {
                name: 'アリア',
                trustLevel: 0,
                personalityTrait: 'curious',
                dialogueHistory: [],
                warnings: 0,
                abilities: []
            },
            inventory: [],
            memoryFragments: [],
            truthProgress: {
                collectedFragments: [],
                unlockedRoutes: [],
                reachedEndings: []
            },
            saveSlot: 1
        };

        // Generate opening scene with AI
        const openingResponse = await this.geminiClient.generateOpening(gameState, playerName);

        // Add opening to dialogue history
        if (openingResponse.sceneDescription) {
            gameState.buddy.dialogueHistory.push({
                speaker: 'gm',
                content: openingResponse.sceneDescription,
                turn: 1
            });
        }

        // 🔄 過去のカケラから能力を復元
        restoreAbilitiesFromGallery(gameState.buddy, this.saveManager);

        return gameState;
    }

    async processTurn(state: GameState, playerInput: string): Promise<GMResponse> {
        console.log(`SessionController: Processing turn ${state.turnNumber}...`);

        // 【A】保留中の判定がある場合
        if (state.pendingJudgment) {
            // プレイヤーが判定実行を選択したか確認
            if (this.isJudgmentExecutionCommand(playerInput)) {
                return await this.executeAndNarratePendingJudgment(state);
            } else {
                // 別の行動を選択 → 判定キャンセル
                console.log('SessionController: Judgment cancelled, player chose different action');
                state.pendingJudgment = undefined;
                // 通常のターン処理へ
            }
        }

        // Add player input to history
        state.buddy.dialogueHistory.push({
            speaker: 'player',
            content: playerInput,
            turn: state.turnNumber
        });

        // Get GM response from AI
        const response = await this.geminiClient.generateResponse(state, playerInput);

        // Add GM response to history
        if (response.sceneDescription || response.buddyDialogue) {
            state.buddy.dialogueHistory.push({
                speaker: 'gm',
                content: `${response.sceneDescription || ''}\n${response.buddyDialogue || ''}`,
                turn: state.turnNumber
            });
        }

        const combinedResponse = `${response.sceneDescription || ''} ${response.buddyDialogue || ''}`;

        // Evaluate clear conditions
        evaluateClearConditions(state, playerInput, combinedResponse);

        // Accumulate progression score
        state.cumulativeProgression += response.internalEvaluation.progressionScore;
        console.log(`SessionController: Progression ${response.internalEvaluation.progressionScore} added. Total: ${state.cumulativeProgression}`);

        // Update scene progress
        state.currentScene = this.sceneManager.updateSceneProgress(
            state.currentScene,
            response.internalEvaluation.progressionScore
        );

        // Check if scene should transition
        if (this.sceneManager.shouldTransitionScene(state.currentScene, state)) {
            const nextScene = this.sceneManager.createNextScene(state.currentScene, state);
            console.log(`SessionController: Scene transition ${state.currentScene.id} → ${nextScene.id} (${nextScene.name})`);
            state.currentScene = nextScene;
        }

        // Check clear conditions
        evaluateClearConditions(state, playerInput, combinedResponse);

        // Determine if session should end (no more fail conditions, just ending determination)
        // Breakdown is checked in determineEndingType
        const breakdownRisk = state.buddy.trustLevel <= -70 && state.buddy.warnings >= 3;

        if (breakdownRisk) {
            // Immediate breakdown end
            response.internalEvaluation.endingFlags = {
                shouldEnd: true,
                endingType: 'breakdown'
            };
            console.log('SessionController: Breakdown imminent!');
        }

        // Update trust level
        state.buddy.trustLevel += response.internalEvaluation.trustChange;
        state.buddy.trustLevel = Math.max(-100, Math.min(100, state.buddy.trustLevel));

        // Check for abuse
        const abuseCheck = this.trustManager.checkAbuseWarning(state.buddy);
        if (abuseCheck.isBreakdown) {
            response.internalEvaluation.endingFlags = {
                shouldEnd: true,
                endingType: 'breakdown'
            };
        } else if (abuseCheck.shouldWarn) {
            state.buddy.warnings++;
        }

        // 【C】新しい判定リクエストがあれば保存
        if (response.judgment) {
            state.pendingJudgment = {
                request: response.judgment,
                context: response.sceneDescription || ''
            };
        }

        return response;
    }

    private isJudgmentExecutionCommand(input: string): boolean {
        const commands = ['判定', '判定する', 'ロール', '挑む', 'やる'];
        const normalized = input.toLowerCase();
        return commands.some(cmd => normalized.includes(cmd));
    }

    private async executeAndNarratePendingJudgment(state: GameState): Promise<GMResponse> {
        const pending = state.pendingJudgment!;
        console.log('SessionController: Executing pending judgment');

        // 1. 判定実行
        const judgmentResult = this.executeJudgmentCheck(pending.request, state);

        // 2. AI GMに結果を通知して描写生成
        const narrative = await this.geminiClient.generateJudgmentNarrative(
            pending.request,
            judgmentResult
        );

        // 3. 保留中の判定をクリア
        state.pendingJudgment = undefined;

        // 4. プレイヤーの行動を履歴に追加
        state.buddy.dialogueHistory.push({
            speaker: 'player',
            content: '判定に挑んだ',
            turn: state.turnNumber
        });

        // 5. 応答を構築
        return {
            sceneDescription: narrative,
            judgmentResult: judgmentResult,
            internalEvaluation: {
                trustChange: 0,
                progressionScore: 1,
                stagnationFlag: false,
                endingFlags: { shouldEnd: false }
            }
        };
    }

    private executeJudgmentCheck(
        request: JudgmentRequest,
        state: GameState
    ): JudgmentResult {
        const params: JudgmentParams = {
            requiredAbility: request.requiredAbility,
            difficulty: request.difficulty,
            playerAbilities: [],
            buddyAbilities: state.buddy.abilities,
            context: request.context
        };

        return executeJudgment(params);
    }
}
