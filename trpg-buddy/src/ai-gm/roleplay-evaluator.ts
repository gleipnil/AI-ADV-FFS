import type { RoleplayBonus, JudgmentRequest } from '../types';
import { getAbilityNameJa } from '../judgment/judgment-engine';

/**
 * AI evaluates roleplay quality and returns bonus level
 */
export async function evaluateRoleplayBonus(
    geminiModel: any,
    playerIntent: string,
    judgmentRequest: JudgmentRequest
): Promise<RoleplayBonus> {
    const prompt = buildRoleplayEvaluationPrompt(playerIntent, judgmentRequest);

    try {
        const response = await geminiModel.generateContent(prompt);
        const text = await response.response.text();
        return parseRoleplayEvaluation(text);
    } catch (error) {
        console.error('Failed to evaluate roleplay:', error);
        // フォールバック: ボーナスなし
        return { level: 0, modifier: 0, reasoning: '評価できませんでした' };
    }
}

function buildRoleplayEvaluationPrompt(
    playerIntent: string,
    request: JudgmentRequest
): string {
    const abilityJa = getAbilityNameJa(request.requiredAbility);

    return `# ロールプレイ評価

あなたはプレイヤーの行動を評価し、判定の難易度調整を決定します。

## 状況
${request.context}

## 必要な能力
${abilityJa}

## プレイヤーの行動意図
「${playerIntent}」

## 難易度スケール（参考）
- 目標値2: 自動成功（ファンブル以外は必ず成功）
- 目標値3-4: 非常に簡単（訓練された者なら確実）
- 目標値5-6: 簡単（少しの注意で成功）
- 目標値7-8: 普通（技能が試される）
- 目標値9-10: 困難（熟練者でも難しい）
- 目標値11-12: 非常に困難（クリティカルに頼る）

## 評価基準
1. **状況への適切さ**: この行動は状況に対して合理的か？
2. **創造性**: 独創的で面白いアプローチか？
3. **具体性**: 行動が具体的に描写されているか？
4. **リスク管理**: 無謀すぎないか？慎重すぎないか？

## 評価レベル（必ず以下から1つ選択）
- **+2**: 非常に適切で創造的。状況を深く理解した素晴らしいアプローチ（目標値-2）
- **+1**: 適切で具体的。よく考えられた行動（目標値-1）
- **0**: 普通。特に問題もないが工夫も少ない
- **-1**: やや不適切。状況に合っていない、または曖昧すぎる（目標値+1）
- **-2**: 不適切または無謀。危険すぎる、または全く状況に合わない（目標値+2）

## 出力形式（厳守）
LEVEL: [評価レベル -2~+2の数値のみ]
REASON: [評価理由を1-2文で簡潔に]

例：
LEVEL: +1
REASON: 慎重に構造を確認するという具体的なアプローチで、状況に適している。`;
}

function parseRoleplayEvaluation(text: string): RoleplayBonus {
    // LEVEL抽出
    const levelMatch = text.match(/LEVEL:\s*([-+]?\d+)/);
    let level = levelMatch ? parseInt(levelMatch[1]) : 0;
    level = Math.max(-2, Math.min(2, level));

    // REASON抽出
    const reasonMatch = text.match(/REASON:\s*(.+?)(?:\n|$)/);
    const reasoning = reasonMatch ? reasonMatch[1].trim() : 'ボーナスなし';

    // レベルから修正値を計算（プラスレベルは目標値を下げる）
    const modifier = -level;

    return { level, modifier, reasoning };
}
