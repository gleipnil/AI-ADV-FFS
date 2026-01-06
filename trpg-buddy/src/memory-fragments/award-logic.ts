import type { SaveManager } from '../save-system/save-manager';
import type { MemoryFragment, BuddyState, EndingType } from '../types';
import { MEMORY_FRAGMENTS } from './fragments';

/**
 * カケラ授与判定
 * 世界IDとエンディング種別から該当するカケラを返す
 */
export function awardFragment(
    worldId: string,
    endingType: EndingType
): MemoryFragment | null {
    const suffix = endingType === 'perfect' ? '_perfect' : '_normal';
    const fragmentId = `${worldId}${suffix}`;
    return MEMORY_FRAGMENTS.find(f => f.id === fragmentId) || null;
}

/**
 * カケラから能力を付与
 * 同じ能力があれば加算、なければ新規追加
 */
export function grantAbilitiesFromFragments(
    buddy: BuddyState,
    fragments: MemoryFragment[]
): void {
    for (const fragment of fragments) {
        for (const abilityGrant of fragment.abilities) {
            const existing = buddy.abilities.find(a => a.ability === abilityGrant.ability);
            if (existing) {
                existing.count += abilityGrant.count;
            } else {
                buddy.abilities.push({ ...abilityGrant });
            }
        }
    }
}

/**
 * 重複チェック
 * 指定されたカケラIDがすでにコレクションに存在するか
 */
export function hasFragment(
    fragments: MemoryFragment[],
    fragmentId: string
): boolean {
    return fragments.some(f => f.id === fragmentId);
}

/**
 * カケラを永続化（SaveManager経由）
 * Repository パターンでデータアクセスを抽象化
 */
export function persistFragment(
    fragment: MemoryFragment,
    saveManager: SaveManager
): void {
    saveManager.addCollectedFragment(fragment);
}

/**
 * セッション開始時：過去のカケラから能力を復元
 * SaveManagerから取得したカケラをバディに反映
 */
export function restoreAbilitiesFromGallery(
    buddy: BuddyState,
    saveManager: SaveManager
): void {
    const collectedFragments = saveManager.getCollectedFragments();
    grantAbilitiesFromFragments(buddy, collectedFragments);
    console.log(`🔄 Restored ${collectedFragments.length} fragments from gallery`);

    if (collectedFragments.length > 0) {
        console.log(`   Abilities: ${buddy.abilities.map(a => `${a.ability}(${a.count})`).join(', ')}`);
    }
}
