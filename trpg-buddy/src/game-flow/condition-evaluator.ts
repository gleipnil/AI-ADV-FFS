// Clear condition evaluation and ending determination logic

import type { GameState, Condition, ClearConditions } from '../types';
import { EndingType } from '../types';

/**
 * プレイヤーの行動とGM応答から、クリア条件の達成をチェックする
 */
export function evaluateClearConditions(
    gameState: GameState,
    playerInput: string,
    gmResponse: string
): void {
    // Normal条件の評価
    evaluateConditionList(
        gameState.currentWorld.clearConditions.normal,
        playerInput,
        gmResponse
    );

    // Perfect条件の評価
    evaluateConditionList(
        gameState.currentWorld.clearConditions.perfect,
        playerInput,
        gmResponse
    );
}

/**
 * 条件リストを評価
 */
function evaluateConditionList(
    conditions: Condition[],
    playerInput: string,
    gmResponse: string
): void {
    for (const condition of conditions) {
        if (condition.met) continue; // Already met

        const combinedText = `${playerInput} ${gmResponse}`.toLowerCase();

        // キーワードマッチング
        const matchCount = condition.keywords.filter(kw =>
            combinedText.includes(kw.toLowerCase())
        ).length;

        // 抽象的条件は緩い判定（40%）、具体的条件は厳しい判定（70%）
        const threshold = condition.isAbstract ? 0.4 : 0.7;

        if (matchCount >= Math.ceil(condition.keywords.length * threshold)) {
            condition.met = true;
            console.log(`Condition met: ${condition.description}`);
        }
    }
}

/**
 * エンディングタイプを決定
 */
export function determineEndingType(gameState: GameState): EndingType {
    // 1. 破局チェック（最優先）
    if (gameState.buddy.trustLevel <= -70 && gameState.buddy.warnings >= 3) {
        console.log('EndingType: BREAKDOWN (trust too low)');
        return EndingType.BREAKDOWN;
    }

    // 2. Perfect条件チェック
    if (isPerfectConditionMet(gameState.currentWorld.clearConditions)) {
        console.log('EndingType: PERFECT (perfect condition met)');
        return EndingType.PERFECT;
    }

    // 3. Normal条件チェック（いずれか1つ）
    if (isAnyNormalConditionMet(gameState.currentWorld.clearConditions)) {
        console.log('EndingType: NORMAL (normal condition met)');
        return EndingType.NORMAL;
    }

    // 4. デフォルト: Survival
    console.log('EndingType: SURVIVAL (reached ending without clear)');
    return EndingType.SURVIVAL;
}

/**
 * Perfect条件が達成されているか
 */
function isPerfectConditionMet(clearConditions: ClearConditions): boolean {
    return clearConditions.perfect.some(c => c.met);
}

/**
 * Normal条件のいずれかが達成されているか
 */
function isAnyNormalConditionMet(clearConditions: ClearConditions): boolean {
    return clearConditions.normal.some(c => c.met);
}

/**
 * いずれかのクリア条件が達成されているか（Perfect or Normal）
 */
export function isAnyConditionMet(gameState: GameState): boolean {
    return isPerfectConditionMet(gameState.currentWorld.clearConditions) ||
        isAnyNormalConditionMet(gameState.currentWorld.clearConditions);
}

/**
 * 早期クリアを抑制すべきかチェック
 */
export function shouldPreventEarlyClear(gameState: GameState): boolean {
    // 前半10ターン以内でクリア条件が達成されそうな場合
    return gameState.turnNumber <= 10 && isAnyConditionMet(gameState);
}

/**
 * エンディングタイプの日本語名を取得
 */
export function getEndingTypeNameJa(endingType: EndingType): string {
    const names: Record<EndingType, string> = {
        [EndingType.PERFECT]: '完全クリア',
        [EndingType.NORMAL]: '通常クリア',
        [EndingType.SURVIVAL]: '生還',
        [EndingType.BREAKDOWN]: '破局'
    };
    return names[endingType];
}
