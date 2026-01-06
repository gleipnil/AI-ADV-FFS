// Scene manager for controlling narrative pacing

import type { Scene, SceneTemplate } from './scene-types';
import { SceneType } from './scene-types';
import type { GameState } from '../types';

// Scene templates defining characteristics for each scene type
const SCENE_TEMPLATES: Record<SceneType, SceneTemplate> = {
    [SceneType.INTRODUCTION]: {
        type: SceneType.INTRODUCTION,
        namePatterns: ['導入', '目覚め', '邂逅'],
        objectivePatterns: [
            '状況を把握し、バディとの関係を築く',
            '未知の世界の基本情報を得る',
            '最初の手がかりを見つける'
        ],
        minTurns: 3,
        maxTurns: 5,
        instructions: `
【導入シーン】
- 世界観の提示、プレイヤーの状況説明
- バディとの出会いと初期関係構築
- 基本的な情報提供（ただしメタ情報は避ける）
- 次の行動の選択肢を明示
- このシーンでプレイヤーが「何をすべきか」の方向性を示す`
    },
    [SceneType.EXPLORATION]: {
        type: SceneType.EXPLORATION,
        namePatterns: ['探索', '調査', '発見'],
        objectivePatterns: [
            '世界を探索し、重要な手がかりを見つける',
            'NPCとの出会いと情報収集',
            'クリア条件に関連する発見をする'
        ],
        minTurns: 3,
        maxTurns: 7,
        instructions: `
【探索シーン】
- プレイヤーの行動に応じた発見と展開
- NPCとの遭遇、手がかりの発見
- 世界の深掘り、謎の提示
- クリア条件に近づくヒントを提供
- 変化のある描写（場所、登場人物、状況の変化）`
    },
    [SceneType.CONFLICT]: {
        type: SceneType.CONFLICT,
        namePatterns: ['試練', '対決', '危機'],
        objectivePatterns: [
            '障害や敵を乗り越える',
            '重要な判定チャレンジに挑む',
            '緊張感のある状況を切り抜ける'
        ],
        minTurns: 4,
        maxTurns: 7,
        instructions: `
【試練シーン】
- 障害・敵との遭遇
- 判定チャレンジの積極的な提示
- 緊張感のある展開
- バディとの協力描写
- 成功/失敗どちらでも物語が進む展開`
    },
    [SceneType.CLIMAX]: {
        type: SceneType.CLIMAX,
        namePatterns: ['クライマックス', '決戦', '真実'],
        objectivePatterns: [
            'クリア条件の達成に挑む',
            '最終的な試練を乗り越える',
            '物語の核心に迫る'
        ],
        minTurns: 4,
        maxTurns: 8,
        instructions: `
【クライマックスシーン】
- 最終試練、重要な判定
- クリア条件達成への直接的なチャレンジ
- 感情的な盛り上がり
- バディとの絆が試される瞬間
- 高い progressionScore（7-10）を目指す`
    },
    [SceneType.RESOLUTION]: {
        type: SceneType.RESOLUTION,
        namePatterns: ['解決', '帰還', '余韻'],
        objectivePatterns: [
            '結果を受け止め、世界に別れを告げる',
            'バディとの関係を確認する',
            '元の世界への帰還を描く'
        ],
        minTurns: 2,
        maxTurns: 4,
        instructions: `
【解決シーン】
- 結果の描写、余韻
- バディとの関係の確認
- 帰還の準備と予兆
- エンディングへの自然な導入`
    }
};

export class SceneManager {
    /**
     * Create initial scene for a new session
     */
    createInitialScene(worldName: string): Scene {
        const template = SCENE_TEMPLATES[SceneType.INTRODUCTION];
        return {
            id: 1,
            type: SceneType.INTRODUCTION,
            name: this.selectRandom(template.namePatterns),
            objective: this.selectRandom(template.objectivePatterns),
            targetTurns: this.randomBetween(template.minTurns, template.maxTurns),
            currentTurns: 0,
            location: worldName,
            progressInScene: 0
        };
    }

    /**
     * Update scene progress based on turn result
     */
    updateSceneProgress(scene: Scene, progressionScore: number): Scene {
        const updated = { ...scene };
        updated.currentTurns++;

        // Update scene progress (progressionScore contributes to scene completion)
        const progressIncrement = (progressionScore / updated.targetTurns) * 20;
        updated.progressInScene = Math.min(100, updated.progressInScene + progressIncrement);

        return updated;
    }

    /**
     * Check if scene should transition
     */
    shouldTransitionScene(scene: Scene, gameState: GameState): boolean {
        // Condition 1: Scene objective completed
        if (scene.progressInScene >= 100) {
            console.log(`SceneManager: Scene ${scene.id} completed (progress: ${scene.progressInScene}%)`);
            return true;
        }

        // Condition 2: Scene has run too long (target + 4 turn grace period)
        if (scene.currentTurns >= scene.targetTurns + 4) {
            console.log(`SceneManager: Scene ${scene.id} exceeded time limit (${scene.currentTurns}/${scene.targetTurns})`);
            return true;
        }

        // Condition 3: Special case - resolution scene and ending triggered
        if (scene.type === SceneType.RESOLUTION && gameState.turnNumber >= 25) {
            console.log(`SceneManager: Resolution scene reached turn limit`);
            return true;
        }

        return false;
    }

    /**
     * Create next scene based on current progress
     */
    createNextScene(currentScene: Scene, gameState: GameState): Scene {
        const nextType = this.determineNextSceneType(currentScene, gameState);
        const template = SCENE_TEMPLATES[nextType];

        return {
            id: currentScene.id + 1,
            type: nextType,
            name: this.selectRandom(template.namePatterns),
            objective: this.selectRandom(template.objectivePatterns),
            targetTurns: this.randomBetween(template.minTurns, template.maxTurns),
            currentTurns: 0,
            location: currentScene.location, // May be updated by AI GM
            progressInScene: 0
        };
    }

    /**
     * Determine next scene type based on game progression
     */
    private determineNextSceneType(currentScene: Scene, gameState: GameState): SceneType {
        const totalTurns = gameState.turnNumber;
        const progression = gameState.cumulativeProgression;

        // If clear/fail is imminent, go to resolution
        if (progression >= 80 || totalTurns >= 25) {
            return SceneType.RESOLUTION;
        }

        // Standard progression
        switch (currentScene.type) {
            case SceneType.INTRODUCTION:
                return SceneType.EXPLORATION;

            case SceneType.EXPLORATION:
                // If early game, continue exploration
                if (totalTurns < 10) return SceneType.EXPLORATION;
                // Otherwise move to conflict
                return SceneType.CONFLICT;

            case SceneType.CONFLICT:
                // If late game or high progression, move to climax
                if (totalTurns >= 15 || progression >= 60) return SceneType.CLIMAX;
                // Otherwise return to exploration
                return SceneType.EXPLORATION;

            case SceneType.CLIMAX:
                return SceneType.RESOLUTION;

            case SceneType.RESOLUTION:
                // This shouldn't happen, but fallback
                return SceneType.RESOLUTION;

            default:
                return SceneType.EXPLORATION;
        }
    }

    /**
     * Get scene instructions for AI GM
     */
    getSceneInstructions(sceneType: SceneType): string {
        return SCENE_TEMPLATES[sceneType].instructions;
    }

    /**
     * Get scene context string for AI GM prompt
     */
    getSceneContext(scene: Scene): string {
        return `【現在のシーン】
- シーン ${scene.id}: ${scene.name} (${this.getSceneTypeJa(scene.type)})
- シーンの目的: ${scene.objective}
- シーン内経過ターン: ${scene.currentTurns}/${scene.targetTurns}
- シーン進行度: ${Math.round(scene.progressInScene)}%`;
    }

    private getSceneTypeJa(type: SceneType): string {
        const names: Record<SceneType, string> = {
            [SceneType.INTRODUCTION]: '導入',
            [SceneType.EXPLORATION]: '探索',
            [SceneType.CONFLICT]: '試練',
            [SceneType.CLIMAX]: 'クライマックス',
            [SceneType.RESOLUTION]: '解決'
        };
        return names[type];
    }

    private selectRandom<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
