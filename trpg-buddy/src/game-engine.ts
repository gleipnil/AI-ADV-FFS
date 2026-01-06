import type { GameState, GMResponse } from './types';
import { EndingType } from './types';
import { GeminiClient } from './ai-gm/gemini-client';
import { TrustManager } from './buddy/trust-manager';
import { SessionController } from './game-flow/session-controller';
import { determineEndingType } from './game-flow/condition-evaluator';
import { SaveManager } from './save-system/save-manager';
import { MainScreen } from './ui/main-screen';

export class GameEngine {
    private geminiClient: GeminiClient;
    private trustManager: TrustManager;
    private sessionController: SessionController;
    private saveManager: SaveManager;
    private mainScreen: MainScreen;
    private gameState: GameState | null = null;

    constructor(apiKey: string) {
        this.geminiClient = new GeminiClient(apiKey);
        this.trustManager = new TrustManager();
        this.sessionController = new SessionController(this.geminiClient, this.trustManager);
        this.saveManager = new SaveManager();
        this.mainScreen = new MainScreen();
    }

    async initialize(): Promise<void> {
        console.log('GameEngine: Initializing...');

        // Setup UI
        this.mainScreen.render();
        this.mainScreen.showTitleScreen((playerName: string) => this.startNewGame(playerName));
    }

    private async startNewGame(playerName: string): Promise<void> {
        console.log(`GameEngine: Starting new game for player: ${playerName}...`);
        this.mainScreen.showLoading('世界を生成中...');

        try {
            // Initialize new game state
            this.gameState = await this.sessionController.startNewSession(1, playerName);

            // Render game screen
            this.mainScreen.renderGameScreen(this.gameState);

            // Display opening scene (from AI response during world generation)
            const openingDialogue = this.gameState.buddy.dialogueHistory.find(d => d.speaker === 'gm');
            if (openingDialogue) {
                this.mainScreen.showOpeningScene(openingDialogue.content);
            }

            // Setup input handler
            this.mainScreen.onPlayerInput((input: string) => this.handlePlayerInput(input));

            console.log('GameEngine: Game started successfully');
        } catch (error) {
            console.error('GameEngine: Failed to start game:', error);
            this.mainScreen.showError('ゲームの開始に失敗しました');
        }
    }

    private async handlePlayerInput(input: string): Promise<void> {
        if (!this.gameState) return;

        console.log(`GameEngine: Processing input: "${input}"`);
        this.mainScreen.disableInput();

        try {
            // Process turn
            const response: GMResponse = await this.sessionController.processTurn(
                this.gameState,
                input
            );

            // Update turn counter BEFORE updating UI
            this.gameState.turnNumber++;

            // Update UI with new turn number
            this.mainScreen.appendGMResponse(response, this.gameState);

            // Check for ending
            if (response.internalEvaluation.endingFlags.shouldEnd) {
                // Only pass 'breakdown' if explicitly that type, otherwise let determineEndingType decide
                const explicitBreakdown = response.internalEvaluation.endingFlags.endingType === 'breakdown'
                    ? 'breakdown' as const
                    : undefined;
                await this.handleSessionEnd(explicitBreakdown);
                return;
            }

            // Re-enable input
            this.mainScreen.enableInput();
        } catch (error) {
            console.error('GameEngine: Turn processing failed:', error);
            this.mainScreen.showError('処理に失敗しました');
            this.mainScreen.enableInput();
        }
    }

    private async handleSessionEnd(requestedEndingType?: 'breakdown'): Promise<void> {
        console.log(`GameEngine: Session ending...`);

        if (!this.gameState) return;

        // Determine actual ending type
        const endingType = requestedEndingType || determineEndingType(this.gameState);
        console.log(`GameEngine: Ending type determined: ${endingType}`);

        // Disable input during ending generation
        this.mainScreen.disableInput();

        try {
            // Generate AI ending scene
            console.log('GameEngine: Generating ending scene...');
            const endingScene = await this.geminiClient.generateEnding(this.gameState, endingType);
            console.log('GameEngine: Ending scene generated');

            // Display ending scene
            this.mainScreen.showEndingScene(endingScene, this.gameState);

            // Wait for ending scene to display (setTimeout is 500ms + buffer)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Award memory fragments based on ending type
            if (endingType === EndingType.PERFECT) {
                // TODO: Implement fragment awarding logic (perfect)
                console.log('Awarding memory fragments (perfect)...');
            } else if (endingType === EndingType.NORMAL) {
                // TODO: Implement fragment awarding logic (normal)
                console.log('Awarding memory fragments (normal)...');
            }

            // Save game state
            this.saveManager.saveGame(this.gameState.saveSlot, this.gameState, endingType === EndingType.BREAKDOWN);

            // Show ending screen with fixed message
            this.mainScreen.showEndingScreen(endingType, () => {
                // Return to title
                this.gameState = null;
                this.mainScreen.showTitleScreen((playerName: string) => this.startNewGame(playerName));
            });
        } catch (error) {
            console.error('GameEngine: Failed to generate ending:', error);
            // Show basic ending if AI fails
            this.mainScreen.showEndingScreen(endingType, () => {
                this.gameState = null;
                this.mainScreen.showTitleScreen((playerName: string) => this.startNewGame(playerName));
            });
        }
    }
}
