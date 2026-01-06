// 異常性タグとテーマタグの定義

export const ABNORMALITY_TAGS = [
    // 時間系
    '時間歪曲',
    '時間ループ',
    '時間停滞',
    '時間遡行',

    // 空間系
    '重力反転',
    '鏡像世界',
    '閉鎖空間',

    // 精神系
    '記憶汚染',
    '記憶改変',
    '精神支配',
    '電脳汚染',

    // 現象系
    '言葉の具現化',
    '信仰の力',
    '生命巨大化',
    '海の呼び声',

    // 技術系
    'AI反乱',
    '仮想現実'
] as const;

export const THEME_TAGS = [
    // 関係性
    '対立と共存',
    '共存',

    // 状態
    '生存',
    '混沌',
    '絶望',

    // 内面
    '自己探求',
    '自由と束縛',
    '意志の力',

    // 価値観
    '正義の相対性',
    '人間性',
    '真理の探求',
    '理性と信仰'
] as const;

export type AbnormalityTag = typeof ABNORMALITY_TAGS[number];
export type ThemeTag = typeof THEME_TAGS[number];

// タグからランダムに選択するヘルパー関数
export function selectRandomAbnormalities(count: number = 2): AbnormalityTag[] {
    const shuffled = [...ABNORMALITY_TAGS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function selectRandomTheme(): ThemeTag {
    const index = Math.floor(Math.random() * THEME_TAGS.length);
    return THEME_TAGS[index];
}
