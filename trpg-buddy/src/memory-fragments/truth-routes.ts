import type { TruthRoute } from '../types';

/**
 * 真実ルート定義
 * 複数のカケラを集めることで解放される真エンドへの道
 */
export const TRUTH_ROUTES: TruthRoute[] = [
    // ========================================
    // ルート1: 和解の道（Reconciliation）
    // ========================================
    {
        id: 'route_reconciliation',
        name: '和解の道',
        requiredFragments: [
            'desert_oasis_perfect',      // 調停者の記憶
            'lawless_wonderland_perfect', // 女王の冠
            'neon_dystopia_perfect',      // 統合の光
            'rhetorical_empire_perfect'   // 弁論の勝利
        ],
        finalEnding: {
            id: 'true_ending_reconciliation',
            type: 'true',
            title: '真実エンド：調和の帰還',
            description: '対立を和解へと導く力を得た君は、記憶の源流へと辿り着く。全ての世界の争いが、実は君自身の内なる葛藤の投影だったことに気づく。分断された心の欠片が一つに融合し、真の自分を取り戻す。'
        }
    },

    // ========================================
    // ルート2: 絆の道（Bonds）
    // ========================================
    {
        id: 'route_bonds',
        name: '絆の道',
        requiredFragments: [
            'desert_oasis_normal',      // 砂塵の絆
            'rhetorical_empire_normal', // 尊敬の証
            'forsaken_island_normal',   // 希望の種
            'eternal_school_normal'     // 拒絶の意志
        ],
        finalEnding: {
            id: 'true_ending_bonds',
            type: 'true',
            title: '真実エンド：繋がりの記憶',
            description: 'バディと共に歩んだ道のりが、真実への扉を開く。記憶を失った君を支え続けたバディこそが、実は失われた記憶の一部だったことを知る。二人で一つ。分かたれた魂が再会し、完全な自己を取り戻す。'
        }
    },

    // ========================================
    // ルート3: 自由と真実の道（Freedom & Truth）
    // ========================================
    {
        id: 'route_truth',
        name: '真実の道',
        requiredFragments: [
            'lawless_wonderland_normal', // 鏡の真実
            'neon_dystopia_normal',      // 暴露の真実
            'eternal_school_perfect',    // 脱出の鍵
            'forsaken_island_perfect'    // 救世の光
        ],
        finalEnding: {
            id: 'true_ending_truth',
            type: 'true',
            title: '真実エンド：覚醒の刻',
            description: '真実を見抜き、束縛から解放される力を手にした君は、遂に全ての謎を解き明かす。これらの世界は実験装置であり、君は記憶を封じられた被験者だった。しかし真実を知った今、君は檻を破壊し、本当の世界へと帰還する。'
        }
    }
];

/**
 * 収集済みカケラIDから解放される真実ルートをチェック
 */
export function checkRouteUnlock(collectedFragmentIds: string[]): TruthRoute[] {
    const unlockedRoutes: TruthRoute[] = [];

    for (const route of TRUTH_ROUTES) {
        const hasAllFragments = route.requiredFragments.every(
            fragmentId => collectedFragmentIds.includes(fragmentId)
        );

        if (hasAllFragments) {
            unlockedRoutes.push(route);
        }
    }

    return unlockedRoutes;
}

/**
 * 特定ルートの解放進捗を取得（何個中何個集めたか）
 */
export function getRouteProgress(routeId: string, collectedFragmentIds: string[]): { collected: number; required: number } {
    const route = TRUTH_ROUTES.find(r => r.id === routeId);
    if (!route) {
        return { collected: 0, required: 0 };
    }

    const collected = route.requiredFragments.filter(
        fragmentId => collectedFragmentIds.includes(fragmentId)
    ).length;

    return {
        collected,
        required: route.requiredFragments.length
    };
}
