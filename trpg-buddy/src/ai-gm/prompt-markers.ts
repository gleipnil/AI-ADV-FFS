/**
 * プロンプトマーカーの一元管理
 * 
 * プロンプト生成とパース処理で同じマーカー定義を使用することで、
 * フォーマット不一致による問題を防止します。
 */

// ========================================
// マーカー定義
// ========================================
export const MARKERS = {
    SCENE: '---SCENE---',
    BUDDY: '---BUDDY---',
    JUDGMENT: '---JUDGMENT---',
    EVAL: '---EVAL---',
    END: '---END---'
} as const;

// ========================================
// パーサー用正規表現パターン
// ========================================
export const MARKER_PATTERNS = {
    SCENE: /---SCENE---([\s\S]*?)(?:---BUDDY---|---JUDGMENT---|---EVAL---|$)/,
    BUDDY: /---BUDDY---([\s\S]*?)(?:---JUDGMENT---|---EVAL---|$)/,
    JUDGMENT: /---JUDGMENT---([\s\S]*?)---EVAL---/,
    EVAL: /---EVAL---([\s\S]*?)---END---/
} as const;

// ========================================
// EVAL形式定義
// ========================================
export const EVAL_FORMAT = {
    trustChange: {
        key: 'trustChange',
        pattern: /trustChange:\s*(-?\d+)/,
        example: 'trustChange: -5～5'
    },
    progressionScore: {
        key: 'progressionScore',
        pattern: /progressionScore:\s*(\d+)/,
        example: 'progressionScore: 0-5'
    },
    shouldEnd: {
        key: 'shouldEnd',
        pattern: /shouldEnd:\s*(true|false)/,
        example: 'shouldEnd: true|false'
    },
    endingType: {
        key: 'endingType',
        pattern: /endingType:\s*(\w+)/,
        example: 'endingType: clear|fail（shouldEndがtrueの場合のみ）'
    }
} as const;

// ========================================
// プロンプトテンプレート生成ヘルパー
// ========================================

/**
 * 構造化されたプロンプトの出力例を生成
 * プロンプト内で一貫したフォーマットを使用するため
 */
export function buildPromptOutputExample(options: {
    includeJudgment?: boolean;
    evalValues?: {
        trustChange?: string;
        progressionScore?: string;
        shouldEnd?: string;
        endingType?: string;
    };
}): string {
    const { includeJudgment = true, evalValues = {} } = options;

    const judgment = includeJudgment ? `${MARKERS.JUDGMENT}
    ability: 剣術|体術|射撃|隠密|工作|学問|観察|話術|威圧|医術（から選択、または none）
    difficulty: 易|中|難（判定不要な場合は指定不要）
    context: 判定の状況説明（判定不要な場合は指定不要）
` : '';

    return `${MARKERS.SCENE}
情景描写をここに
${MARKERS.BUDDY}
バディのセリフをここに（セリフのみ、名前は不要）
${judgment}${MARKERS.EVAL}
    ${evalValues.trustChange || EVAL_FORMAT.trustChange.example}
    ${evalValues.progressionScore || EVAL_FORMAT.progressionScore.example}
    ${evalValues.shouldEnd || EVAL_FORMAT.shouldEnd.example}
    ${evalValues.endingType || EVAL_FORMAT.endingType.example}
${MARKERS.END}`;
}

/**
 * プロンプトのマーカー整合性をチェック
 * 開発時のデバッグ用
 */
export function validatePromptStructure(prompt: string): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 必須マーカーの存在チェック
    const requiredMarkers = [MARKERS.SCENE, MARKERS.EVAL, MARKERS.END];
    requiredMarkers.forEach(marker => {
        if (!prompt.includes(marker)) {
            errors.push(`必須マーカーが見つかりません: ${marker}`);
        }
    });

    // マーカーの順序チェック
    const markerOrder = [
        MARKERS.SCENE,
        MARKERS.BUDDY,
        MARKERS.JUDGMENT,
        MARKERS.EVAL,
        MARKERS.END
    ];

    let lastValidIndex = -1;
    markerOrder.forEach(marker => {
        const index = prompt.indexOf(marker);
        if (index !== -1) {
            if (index < lastValidIndex) {
                errors.push(`マーカーの順序が不正: ${marker} が ${markerOrder[markerOrder.indexOf(marker) - 1]} より前にあります`);
            }
            lastValidIndex = index;
        }
    });

    // 旧形式のマーカー（スペース付き）を警告
    const deprecatedPatterns = [
        /--- SCENE-- -/,
        /--- BUDDY-- -/,
        /--- JUDGMENT-- -/,
        /--- EVAL-- -/,
        /--- END-- -/
    ];

    deprecatedPatterns.forEach((pattern, i) => {
        if (pattern.test(prompt)) {
            const markerName = Object.keys(MARKERS)[i];
            warnings.push(`旧形式のマーカーが検出されました: ${markerName} - 正しい形式は ${Object.values(MARKERS)[i]} です`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}
