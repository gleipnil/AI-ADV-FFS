// Scene management type definitions

export enum SceneType {
    INTRODUCTION = 'introduction',  // 導入
    EXPLORATION = 'exploration',    // 探索・調査
    CONFLICT = 'conflict',          // 試練・戦闘
    CLIMAX = 'climax',             // クライマックス
    RESOLUTION = 'resolution'       // 解決・エンディング
}

export interface Scene {
    id: number;                    // シーン番号（1,2,3...）
    type: SceneType;              // シーンタイプ
    name: string;                 // シーン名
    objective: string;            // このシーンの目的
    targetTurns: number;          // 目標ターン数（3-7）
    currentTurns: number;         // このシーンでの経過ターン数
    location: string;             // 現在の場所
    progressInScene: number;      // シーン内進行度（0-100）
}

export interface SceneTemplate {
    type: SceneType;
    namePatterns: string[];       // シーン名の候補
    objectivePatterns: string[];  // 目的の候補
    minTurns: number;
    maxTurns: number;
    instructions: string;         // AI GMへの指示
}
