import type { MemoryFragment } from '../types';

/**
 * 記憶のカケラ定義
 * 各世界から2種類（Perfect + Normal）= 計12個
 */
export const MEMORY_FRAGMENTS: MemoryFragment[] = [
    // ========================================
    // 1. 荒涼の砂漠オアシス
    // ========================================
    {
        id: 'desert_oasis_perfect',
        title: '調停者の記憶',
        description: '砂の民と略奪者、両者の声が胸に響く。対話という名の剣で、憎しみを断ち切った記憶。',
        truthRouteId: 'route_reconciliation',
        iconicImagery: '握手する二つの影',
        abilities: [
            { ability: 'persuasion', count: 2 },
            { ability: 'observation', count: 1 }
        ]
    },
    {
        id: 'desert_oasis_normal',
        title: '砂塵の絆',
        description: 'バディと共に砂嵐を越えた。信頼という名の羅針盤が、道を示してくれた。',
        truthRouteId: 'route_bonds',
        iconicImagery: '二人の足跡',
        abilities: [
            { ability: 'observation', count: 1 }
        ]
    },

    // ========================================
    // 2. 混沌の不思議国
    // ========================================
    {
        id: 'lawless_wonderland_perfect',
        title: '女王の冠',
        description: '狂気の中に秩序を見出した。不条理な法廷で、論理という武器が勝利を呼んだ。',
        truthRouteId: 'route_reconciliation',
        iconicImagery: '逆さまの王冠',
        abilities: [
            { ability: 'persuasion', count: 2 },
            { ability: 'knowledge', count: 1 }
        ]
    },
    {
        id: 'lawless_wonderland_normal',
        title: '鏡の真実',
        description: '鏡に映る自分と向き合った。歪んだ世界の中で、真実だけが変わらなかった。',
        truthRouteId: 'route_truth',
        iconicImagery: '割れた鏡',
        abilities: [
            { ability: 'observation', count: 1 }
        ]
    },

    // ========================================
    // 3. 永遠の全寮制学校
    // ========================================
    {
        id: 'eternal_school_perfect',
        title: '脱出の鍵',
        description: '禁じられた地下室の扉を開けた。安寧という名の牢獄から、自由へと飛び出した記憶。',
        truthRouteId: 'route_freedom',
        iconicImagery: '錆びた鍵',
        abilities: [
            { ability: 'stealth', count: 2 },
            { ability: 'crafting', count: 1 }
        ]
    },
    {
        id: 'eternal_school_normal',
        title: '拒絶の意志',
        description: '誘惑を振り払った。永遠の学園生活よりも、一瞬の自由を選んだ。',
        truthRouteId: 'route_freedom',
        iconicImagery: '破られた制服',
        abilities: [
            { ability: 'intimidation', count: 1 }
        ]
    },

    // ========================================
    // 4. ネオン・ディストピア
    // ========================================
    {
        id: 'neon_dystopia_perfect',
        title: '統合の光',
        description: '対立する二つの勢力を和解させた。秩序と自由、両者が手を取り合う奇跡。',
        truthRouteId: 'route_reconciliation',
        iconicImagery: '融合するネオン',
        abilities: [
            { ability: 'persuasion', count: 2 },
            { ability: 'intimidation', count: 1 }
        ]
    },
    {
        id: 'neon_dystopia_normal',
        title: '暴露の真実',
        description: '企業の陰謀を白日の下に晒した。嘘で塗り固められた街に、真実の光を。',
        truthRouteId: 'route_truth',
        iconicImagery: 'ハックされた画面',
        abilities: [
            { ability: 'knowledge', count: 1 }
        ]
    },

    // ========================================
    // 5. 弁舌の帝国
    // ========================================
    {
        id: 'rhetorical_empire_perfect',
        title: '弁論の勝利',
        description: '大広場で論破した。哲学者と神官、両者を納得させる完璧な弁論。',
        truthRouteId: 'route_reconciliation',
        iconicImagery: '金の舌',
        abilities: [
            { ability: 'persuasion', count: 3 }
        ]
    },
    {
        id: 'rhetorical_empire_normal',
        title: '尊敬の証',
        description: '論理的対話で相手の心を動かした。言葉という武器で、尊敬を勝ち取った。',
        truthRouteId: 'route_bonds',
        iconicImagery: '握手する手',
        abilities: [
            { ability: 'persuasion', count: 1 }
        ]
    },

    // ========================================
    // 6. 見捨てられた島
    // ========================================
    {
        id: 'forsaken_island_perfect',
        title: '救世の光',
        description: '巨大植物を撃退し、島を救った。兎人たちの希望の灯が、胸に宿る。',
        truthRouteId: 'route_salvation',
        iconicImagery: '燃える樹',
        abilities: [
            { ability: 'shooting', count: 2 },
            { ability: 'swordsmanship', count: 1 }
        ]
    },
    {
        id: 'forsaken_island_normal',
        title: '希望の種',
        description: '兎人に希望をもたらした。小さな勇気が、誰かの未来を変える。',
        truthRouteId: 'route_bonds',
        iconicImagery: '芽吹く種',
        abilities: [
            { ability: 'medicine', count: 1 }
        ]
    }
];

/**
 * IDからカケラを取得
 */
export function getFragmentById(id: string): MemoryFragment | undefined {
    return MEMORY_FRAGMENTS.find(f => f.id === id);
}
