// ========================================
// Game State Types
// ========================================

// Import Scene type
import type { Scene } from './scene-management/scene-types';

// ========================================
// Ending Types
// ========================================

export enum EndingType {
    PERFECT = 'perfect',      // 完全クリア
    NORMAL = 'normal',        // 通常クリア
    SURVIVAL = 'survival',    // 生還
    BREAKDOWN = 'breakdown'   // 破局
}

export interface GameState {
    sessionNumber: number;
    turnNumber: number;
    cumulativeProgression: number; // 累積進行度スコア（0-100目安）
    currentScene: Scene; // 現在のシーン
    currentWorld: WorldInstance;
    buddy: BuddyState;
    inventory: InventoryItem[];
    memoryFragments: MemoryFragment[];
    truthProgress: {
        collectedFragments: string[];
        unlockedRoutes: TruthRoute[];
        reachedEndings: string[];
    };
    saveSlot: number;
    pendingJudgment?: {
        request: JudgmentRequest;
        context: string;
        alternatives?: string[];
        uiMode: 'action' | 'judgment';  // トグルスイッチのモード状態
    };
    sessionItems: NPCItem[]; // セッション内で入手したNPC固有アイテム
}

// ========================================
// World Types
// ========================================

export interface ClearConditions {
    normal: Condition[];     // 通常クリア条件（3-5個、いずれか1つ達成）
    perfect: Condition[];    // 完全クリア条件（1個、具体的）
}

export interface WorldTemplate {
    id: string;
    name: string;
    locations: string[];
    possibleNPCs: NPCTemplate[];
    baseClearConditions: ClearConditions;
}

export interface WorldInstance {
    templateId: string;
    name: string;
    abnormalityTags: string[];
    themeTags: string[];
    locations: Location[];
    npcs: NPC[];
    clearConditions: ClearConditions;
}

export interface Location {
    id: string;
    name: string;
    description: string;
    visited: boolean;
}

export interface NPCTemplate {
    id: string;
    name: string;
    role: string;
    appearance?: string; // 見た目の詳細（AI GMへのヒント）
    uniqueItem?: NPCItem; // 固有アイテム（セッション内のみ有効）
}

export interface NPC extends NPCTemplate {
    dialogueHistory: DialogueLine[];
    alive: boolean;
}

export interface Condition {
    id: string;
    description: string;
    keywords: string[];      // 判定用キーワード（オプション）
    met: boolean;
    isAbstract: boolean;     // 抽象的条件（柔軟な判定）かどうか
}

// ========================================
// Buddy Types
// ========================================

export interface BuddyState {
    name: string;
    trustLevel: number; // -100 ~ 100
    personalityTrait: string;
    dialogueHistory: DialogueLine[];
    warnings: number; // 虐待警告カウント
    abilities: AbilityCount[]; // 記憶のカケラから得た能力
}

export interface DialogueLine {
    speaker: 'player' | 'buddy' | 'npc' | 'gm';
    speakerName?: string;
    content: string;
    turn: number;
}

// ========================================
// Inventory Types
// ========================================

export interface InventoryItem {
    id: string;
    name: string;
    description: string;
    abilities: AbilityGrant[]; // 判定能力
    quantity: number;
}

// ========================================
// Judgment System Types
// ========================================

export type AbilityId =
    | 'swordsmanship'  // 剣術
    | 'martialArts'    // 体術
    | 'shooting'       // 射撃
    | 'stealth'        // 隠密
    | 'crafting'       // 工作
    | 'knowledge'      // 学問
    | 'observation'    // 観察
    | 'persuasion'     // 話術
    | 'intimidation'   // 威圧
    | 'medicine';      // 医術

// NPC固有アイテムの効果タイプ
export type ItemEffect =
    | { type: 'judgment_bonus'; ability: AbilityId; bonus: number } // 判定ボーナス
    | { type: 'unlock_path'; pathId: string } // ルート解放
    | { type: 'story_key'; conditionId: string }; // ストーリーキー

// NPC固有アイテム（セッション内のみ有効）
export interface NPCItem {
    id: string;
    name: string;
    description: string;
    effect: ItemEffect;
    sourceNPC: string; // どのNPCから入手可能か
}

export interface Ability {
    id: AbilityId;
    name: string;
    description: string;
}

export interface AbilityGrant {
    ability: AbilityId;
    count: number;
}

export interface AbilityCount {
    ability: AbilityId;
    count: number;
}

export enum Difficulty {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard'
}

export type AbilityMatchType = 'withAbility' | 'withRelated' | 'withoutAbility';

// Roleplay bonus evaluation
export interface RoleplayBonus {
    level: number;        // -2 ~ +2 の評価レベル
    modifier: number;     // 目標値への修正値（-2 ~ +2）
    reasoning: string;    // AIによる評価理由
}

export interface JudgmentParams {
    requiredAbility: AbilityId;
    difficulty: Difficulty;
    playerAbilities: AbilityCount[];
    buddyAbilities: AbilityCount[];
    context: string;
}

export interface JudgmentResult {
    success: boolean;
    isFumble: boolean;
    isCritical: boolean;
    roll: number;
    threshold: number;
    matchType: AbilityMatchType;
    narrative: string; // AI GMが生成する物語的描写
}

// ========================================
// Memory Fragment Types
// ========================================

export interface MemoryFragment {
    id: string;
    title: string;
    description: string; // 詩的・曖昧な短文
    truthRouteId: string;
    iconicImagery: string;
    abilities: AbilityGrant[]; // 記憶のカケラから得られる能力
}

export interface TruthRoute {
    id: string;
    name: string;
    requiredFragments: string[]; // 必要なカケラID
    finalEnding: EndingData;
}

export interface TruthProgress {
    collectedFragments: string[];
    unlockedRoutes: string[];
    reachedEndings: string[];
}

export interface EndingData {
    id: string;
    type: 'bad' | 'normal' | 'good' | 'true';
    title: string;
    description: string;
}

// ========================================
// Tarot Types
// ========================================

export interface TarotCard {
    id: string;
    name: string;
    arcana: number; // 0-21
    keywords: string[];
    imagery: string;
}

export interface TarotSuggestion {
    card: TarotCard;
    actionSuggestion: string;
}

// ========================================
// GM Response Types
// ========================================

export interface GMResponse {
    sceneDescription: string;
    buddyDialogue?: string;
    hints?: string[];
    judgment?: JudgmentRequest;
    judgmentResult?: JudgmentResult;
    internalEvaluation: InternalEvaluation;
}

export interface JudgmentRequest {
    requiredAbility: AbilityId;
    difficulty: Difficulty;
    context: string;
}

export interface InternalEvaluation {
    trustChange: number;
    progressionScore: number; // 物語の進行度評価
    stagnationFlag: boolean; // 停滞検出
    endingFlags: {
        shouldEnd: boolean;
        endingType?: 'clear' | 'fail' | 'breakdown';
    };
}

// ========================================
// Save Data Types
// ========================================

export interface SaveData {
    slot: number;
    timestamp: number;
    gameState: GameState;
    isBreakdown: boolean; // 破局エンドフラグ
}

export interface GalleryData {
    collectedFragments: MemoryFragment[];
    reachedEndings: EndingData[];
    totalSessions: number;
}

// ========================================
// UI State Types
// ========================================

export interface UIState {
    mode: 'title' | 'game' | 'gallery' | 'save-load';
    loading: boolean;
    error?: string;
}
