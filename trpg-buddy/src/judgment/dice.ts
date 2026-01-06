// Dice rolling utilities for judgment system

/**
 * Roll 2D6 (two six-sided dice)
 * @returns Sum of two dice (2-12)
 */
export function roll2D6(): number {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    return die1 + die2;
}

/**
 * Check if the roll is a fumble (automatic failure)
 * @param roll The dice roll result
 * @returns True if fumble (snake eyes - both dice showing 1)
 */
export function isFumble(roll: number): boolean {
    return roll === 2;
}

/**
 * Check if the roll is a critical success (automatic success)
 * @param roll The dice roll result
 * @returns True if critical (boxcars - both dice showing 6)
 */
export function isCritical(roll: number): boolean {
    return roll === 12;
}

/**
 * Get descriptive text for dice roll (for logging/debugging)
 * @param roll The dice roll result
 * @returns Descriptive string
 */
export function describeDiceRoll(roll: number): string {
    if (isFumble(roll)) return `${roll} (FUMBLE)`;
    if (isCritical(roll)) return `${roll} (CRITICAL)`;
    return `${roll}`;
}
