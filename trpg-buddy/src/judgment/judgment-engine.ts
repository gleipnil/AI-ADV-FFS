// Judgment engine for ability checks

import type { AbilityId, AbilityCount, JudgmentParams, JudgmentResult } from '../types';
import { Difficulty } from '../types';
import { roll2D6, isFumble, isCritical, describeDiceRoll } from './dice';

/**
 * Determine ability match type
 */
type AbilityMatchType = 'withAbility' | 'withRelated' | 'withoutAbility';

/**
 * Check if player/buddy has the required ability
 */
function checkAbilityMatch(
    requiredAbility: AbilityId,
    playerAbilities: AbilityCount[],
    buddyAbilities: AbilityCount[]
): AbilityMatchType {
    const allAbilities = [...playerAbilities, ...buddyAbilities];

    // Check for exact match
    const hasAbility = allAbilities.some(a => a.ability === requiredAbility && a.count > 0);
    if (hasAbility) return 'withAbility';

    // Phase 1: No related ability matching (implement in Phase 2)
    return 'withoutAbility';
}

/**
 * Calculate success threshold based on difficulty and ability match
 */
function calculateSuccessThreshold(
    difficulty: Difficulty,
    matchType: AbilityMatchType
): number {
    // Success threshold table (2D6)
    const thresholds: Record<Difficulty, Record<AbilityMatchType, number>> = {
        [Difficulty.EASY]: {
            withAbility: 3,      // 97.2% success rate
            withRelated: 4,      // 91.7% (for Phase 2)
            withoutAbility: 5    // 83.3%
        },
        [Difficulty.NORMAL]: {
            withAbility: 5,      // 83.3% success rate
            withRelated: 6,      // 72.2% (for Phase 2)
            withoutAbility: 7    // 58.3%
        },
        [Difficulty.HARD]: {
            withAbility: 7,      // 58.3% success rate
            withRelated: 8,      // 41.7% (for Phase 2)
            withoutAbility: 9    // 27.8%
        }
    };

    return thresholds[difficulty][matchType];
}

/**
 * Execute a judgment check
 */
export function executeJudgment(params: JudgmentParams): JudgmentResult {
    console.log(`Judgment: ${params.requiredAbility} (${params.difficulty}) - ${params.context}`);

    // Determine ability match
    const matchType = checkAbilityMatch(
        params.requiredAbility,
        params.playerAbilities,
        params.buddyAbilities
    );

    // Calculate success threshold
    const threshold = calculateSuccessThreshold(params.difficulty, matchType);

    // Roll dice
    const diceRoll = roll2D6();

    // Determine success/failure
    const fumble = isFumble(diceRoll);
    const critical = isCritical(diceRoll);
    const success = critical || (!fumble && diceRoll >= threshold);

    console.log(`  Roll: ${describeDiceRoll(diceRoll)} vs Threshold: ${threshold}`);
    console.log(`  Match: ${matchType}, Result: ${success ? 'SUCCESS' : 'FAILURE'}`);

    return {
        success,
        isFumble: fumble,
        isCritical: critical,
        roll: diceRoll,
        threshold,
        matchType,
        narrative: '' // AI GM will generate this
    };
}

/**
 * Get difficulty name in Japanese (for AI GM prompts)
 */
export function getDifficultyNameJa(difficulty: Difficulty): string {
    const names: Record<Difficulty, string> = {
        [Difficulty.EASY]: '易',
        [Difficulty.NORMAL]: '中',
        [Difficulty.HARD]: '難'
    };
    return names[difficulty];
}

/**
 * Get ability name in Japanese (for AI GM prompts)
 */
export function getAbilityNameJa(ability: AbilityId): string {
    const names: Record<AbilityId, string> = {
        swordsmanship: '剣術',
        martialArts: '体術',
        shooting: '射撃',
        stealth: '隠密',
        crafting: '工作',
        knowledge: '学問',
        observation: '観察',
        persuasion: '話術',
        intimidation: '威圧',
        medicine: '医術'
    };
    return names[ability];
}
