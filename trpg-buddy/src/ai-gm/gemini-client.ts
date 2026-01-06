// Gemini AI client implementation with world context integration and ending generation

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GameState, GMResponse, InternalEvaluation, JudgmentRequest, JudgmentResult, AbilityId } from '../types';
import { Difficulty } from '../types';
import { generateWorldContext } from '../world-templates/generator';
import { SceneManager } from '../scene-management/scene-manager';
import { getAbilityNameJa, getDifficultyNameJa } from '../judgment/judgment-engine';

export class GeminiClient {
    private genAI: GoogleGenerativeAI;
    private model: any;
    private sceneManager: SceneManager;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        this.sceneManager = new SceneManager();
    }

    async generateOpening(gameState: GameState, playerName: string = 'プレイヤー'): Promise<GMResponse> {
        const prompt = this.buildOpeningPrompt(gameState, playerName);

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return this.parseGMResponse(text);
        } catch (error) {
            console.error('GeminiClient: Failed to generate opening:', error);
            // Return fallback response
            return {
                sceneDescription: '薄暗い場所に目を覚ました。隣には記憶を失ったバディがいる。',
                buddyDialogue: '...ここは、どこ？',
                internalEvaluation: {
                    trustChange: 0,
                    progressionScore: 0,
                    stagnationFlag: false,
                    endingFlags: { shouldEnd: false }
                }
            };
        }
    }

    async generateResponse(gameState: GameState, playerInput: string): Promise<GMResponse> {
        const prompt = this.buildTurnPrompt(gameState, playerInput);

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return this.parseGMResponse(text);
        } catch (error) {
            console.error('GeminiClient: Failed to generate response:', error);
            // Return fallback response
            return {
                sceneDescription: 'あなたの行動により、状況が変化した。',
                internalEvaluation: {
                    trustChange: 0,
                    progressionScore: 1,
                    stagnationFlag: false,
                    endingFlags: { shouldEnd: false }
                }
            };
        }
    }

    async generateEnding(gameState: GameState, endingType: 'perfect' | 'normal' | 'survival' | 'breakdown'): Promise<string> {
        const prompt = this.buildEndingPrompt(gameState, endingType);

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('GeminiClient: Failed to generate ending:', error);
            //  Return fallback ending
            if (endingType === 'perfect' || endingType === 'normal') {
                return '光が包み込み、あなたとバディは元の世界へと帰還した。';
            } else if (endingType === 'breakdown') {
                return 'バディは静かに去っていった。あなたは一人、元の世界に引き戻された...';
            } else {
                return '全てが暗転する。気がつけば、元の世界に戻っていた...';
            }
        }
    }

    async generateJudgmentNarrative(
        request: JudgmentRequest,
        result: JudgmentResult
    ): Promise<string> {
        const prompt = this.buildJudgmentNarrativePrompt(request, result);

        try {
            const aiResponse = await this.model.generateContent(prompt);
            const response = await aiResponse.response;
            return response.text();
        } catch (error) {
            console.error('GeminiClient: Failed to generate judgment narrative:', error);
            return this.getFallbackNarrative(result);
        }
    }

    private getFallbackNarrative(result: JudgmentResult): string {
        if (result.isCritical) return '完璧だ！';
        if (result.isFumble) return '失敗した...';
        if (result.success) return '成功した。';
        return 'うまくいかなかった。';
    }

    private buildOpeningPrompt(gameState: GameState, playerName: string): string {
        const worldContext = generateWorldContext(gameState.currentWorld);

        return `あなたはTRPGのゲームマスター（GM）です。
以下の設定で物語のオープニングを描写してください。

${worldContext}

【基本設定】
- セッション番号: ${gameState.sessionNumber}
- ターン: ${gameState.turnNumber}
- プレイヤー名: ${playerName}
- バディ名: ${gameState.buddy.name}

【重要なルール】
1. 出力はすべて日本語
2. **プレイヤー視点で観測可能な情報のみ描写**
3. 世界の異常性や特殊ルールは**直接説明しない**
   - ❌ 「この世界は時間がループしている」
   - ✅ 「奇妙な既視感がある」「何かが繰り返されているような感覚」
4. プレイヤー(${playerName})とバディ(${gameState.buddy.name})が未知の世界に降り立った瞬間を描写
5. 五感で感じる情景のみ（見える、聞こえる、匂う、触れる）
6. バディの最初のセリフ（記憶喪失、不安や戸惑い）
7. 謎は謎として残し、徐々に明らかにする
8. 数値は表示しない

【禁止事項】
- プレイヤーが知り得ないメタ情報の説明
- 世界の仕組みやルールの直接的な説明
- 異常性タグの内容をそのまま説明文として使用

以下の形式で出力してください:
---SCENE---
【五感で感じる情景描写。プレイヤーとバディが目を覚ました場所の様子】
---BUDDY---
【バディのセリフ（セリフのみ、名前は不要）】
---EVAL---
trustChange: 0
progressionScore: 0
---END---`;
    }

    private buildTurnPrompt(gameState: GameState, playerInput: string): string {
        const worldContext = generateWorldContext(gameState.currentWorld);
        const recentHistory = gameState.buddy.dialogueHistory.slice(-5);
        const historyText = recentHistory.map(d =>
            `[${d.speaker}] ${d.content}`
        ).join('\n');

        // 早期クリア抑止のための指示
        const earlyPreventionNote = gameState.turnNumber <= 10
            ? '\n⚠️ 重要: 現在前半10ターン以内です。クリア条件達成が近づいている場合、その直前に困難な障害や予期せぬ展開を挿入し、プレイヤーがそれを乗り越える必要があるようにしてください。'
            : '';

        // クライマックス延長時の緊急指示
        const climaxUrgencyNote = gameState.turnNumber >= 20
            ? '\n🔥 緊急: ターン23が最終ターンです。このターンまたは次のターンで必ず決着をつけてください。クリア条件達成またはゲームオーバーに向けて加速してください。'
            : '';

        return `あなたはTRPGのゲームマスター（GM）です。
プレイヤーの行動に対して応答してください。

${worldContext}

${this.sceneManager.getSceneContext(gameState.currentScene)}

【現在の状況】
- セッション: ${gameState.sessionNumber}
- 総ターン数: ${gameState.turnNumber}
- バディ名: ${gameState.buddy.name}
- 信頼度: ${gameState.buddy.trustLevel}${earlyPreventionNote}${climaxUrgencyNote}

【シーンの指示】
${this.sceneManager.getSceneInstructions(gameState.currentScene.type)}

【最近の履歴】
${historyText}

【プレイヤーの行動】
${playerInput}

【重要なルール】
1. 出力はすべて日本語
2. **プレイヤーが実際に発見・体験した範囲で**世界の異常性を描写
3. プレイヤーの行動に対する情景描写を行う
4. バディの反応・発言を書く（信頼度に応じた口調）
5. 信頼度の変化を-5〜+5で評価
6. 基本は20ターンで収束、クライマックス中は最大23ターンまで延長可能（現在${gameState.turnNumber}ターン）
7. クリア条件が1つでも達成されればクリア可能
8. ただし前半10ターンでクリアに近づく場合は、困難な障害を設ける
9. 数値は表示しない
10. **プレイヤーが気づいていない異常性は直接説明しない**（兆候や違和感として示す）

【判定システム - 重要】
プレイヤーの行動が判定を必要とする場合（戦闘、技能使用、困難な行動など）:

**事前予告方式**:
1. **まず情景描写で状況を説明**
2. **判定が必要なことを明示**: 「〜するには【能力名判定(難易度:X)】が必要だ」
3. **---JUDGMENT---セクションで判定情報を出力**

⚠️ 重要: **判定はまだ実行されていません**。プレイヤーは次のターンで:
- 「判定する」と入力して判定実行
- アイテムを使って有利にする（将来実装）
- 別の方法を試す
を選択できます。

判定が必要な行動例:
- 戦闘行動（剣術/体術/射撃）
- 障害物の克服（体術）
- ものの製作・修理（工作）
- 情報収集・調査（学問/観察）
- 交渉・説得（話術/威圧）
- 治療（医術）
- 隠れる・忍び込む（隠密）

判定不要な行動例:
- 移動、会話、単純な観察、通常のアイテム使用

以下の形式で出力してください:
---SCENE---
【情景描写をここに】
---BUDDY---
【バディのセリフをここに（セリフのみ）】
---JUDGMENT---
ability: [剣術/体術/射撃/隠密/工作/学問/観察/話術/威圧/医術 から選択、または none]
difficulty: [易/中/難、判定不要な場合は指定不要]
context: [判定の状況説明、判定不要な場合は指定不要]
---EVAL---
trustChange: [数値]
progressionScore: [0-10]
shouldEnd: [true/false]
endingType: [clear/fail/なし]
---END---`;
    }

    private buildJudgmentNarrativePrompt(
        request: JudgmentRequest,
        result: JudgmentResult
    ): string {
        const abilityJa = getAbilityNameJa(request.requiredAbility);
        const difficultyJa = getDifficultyNameJa(request.difficulty);
        const resultType = result.isCritical ? 'クリティカル成功' :
            result.isFumble ? 'ファンブル（致命的失敗）' :
                result.success ? '成功' : '失敗';

        return `プレイヤーが判定に挑んだ結果を描写してください。

【判定内容】
- 能力: ${abilityJa}
- 難易度: ${difficultyJa}
- 状況: ${request.context}

【判定結果】
- ダイス: ${result.roll}
- 目標値: ${result.threshold}
- 結果: ${resultType}

【描写の指示】
${result.isCritical ? '- 完璧な成功を劇的に描写してください\n- バディが驚嘆するリアクションを' : ''}
${result.isFumble ? '- 致命的な失敗を印象的に描写してください\n- バディが心配するor困惑するリアクションを' : ''}
${result.success ? '- 成功の様子を鮮やかに描写してください\n- バディの肯定的なリアクションを' : ''}
${!result.success && !result.isFumble ? '- 失敗の様子を描写してください\n- バディの励ましや次の手を提案' : ''}

2-3文で簡潔に、臨場感ある描写をしてください。`;
    }

    private buildEndingPrompt(gameState: GameState, endingType: 'perfect' | 'normal' | 'survival' | 'breakdown'): string {
        const worldContext = generateWorldContext(gameState.currentWorld);

        let endingInstruction = '';
        if (endingType === 'perfect') {
            endingInstruction = `
【完全クリアエンディング】
- プレイヤーとバディが全ての目標を達成した
- 完璧な冒険の成功
- 二人が異世界での冒険を終え、**元の世界に帰還する**シーンを描写
- 最高に感動的で前向きな締めくくり
- バディとの絆が最高に深まったことを示す
- 光や扉などを通じて元の世界に戻る様子を描写`;
        } else if (endingType === 'normal') {
            endingInstruction = `
【通常クリアエンディング】
- プレイヤーとバディが物語を解決した
- 目的は達成された
- 二人が異世界での冒険を終え、**元の世界に帰還する**シーンを描写
- 満足できる前向きな締めくくり
- バディとの絆を確認
- 光や扉などを通じて元の世界に戻る様子を描写`;
        } else if (endingType === 'survival') {
            endingInstruction = `
【生還エンディング】
- 全ては解決しなかったが、無事に生還
- プレイヤーとバディは**強制的に元の世界に引き戻される**
- 「次こそは」という希望と前向きな気持ち
- 安堵の帰還シーン
- バディとの絆は保たれている
- 前向きだが少し物足りない締めくくり`;
        } else {
            endingInstruction = `
【破局エンディング】
- バディとの関係が破綻した
- バディがプレイヤーの元を静かに去っていく
- プレイヤーは一人、**強制的に暗転し元の世界に引き戻される**
- 後悔や喪失感を描写
- 暗く、寂しい締めくくり`;
        }

        return `あなたはTRPGのゲームマスター（GM）です。
セッションのエンディングシーンを描写してください。

${worldContext}

【現在の状況】
- セッション: ${gameState.sessionNumber}
- 最終ターン: ${gameState.turnNumber}
- バディ名: ${gameState.buddy.name}
- 信頼度: ${gameState.buddy.trustLevel}
- エンディングタイプ: ${endingType}

${endingInstruction}

【重要なルール】
1. 出力はすべて日本語
2. 世界観に沿った締めくくりを描写
3. **必ず元の世界への帰還（または強制帰還）を含める**
4. 4-6文程度で簡潔に
5. 数値は表示しない
6. 構造化せず、そのまま物語として出力

描写を書いてください:`;
    }

    parseGMResponse(text: string): GMResponse {
        // Parse structured response
        const sceneMatch = text.match(/---SCENE---([\s\S]*?)(?:---BUDDY---|---JUDGMENT---|---EVAL---|$)/);
        const buddyMatch = text.match(/---BUDDY---([\s\S]*?)(?:---JUDGMENT---|---EVAL---|$)/);
        const judgmentMatch = text.match(/---JUDGMENT---([\s\S]*?)---EVAL---/);
        const evalMatch = text.match(/---EVAL---([\s\S]*?)---END---/);

        // Extract scene description and remove all markers
        let sceneDescription = '';
        if (sceneMatch) {
            sceneDescription = sceneMatch[1].trim();
        } else {
            // Fallback: extract everything before first marker
            const beforeMarkers = text.split(/---(?:BUDDY|JUDGMENT|EVAL)---/)[0];
            sceneDescription = beforeMarkers.replace(/---SCENE---/g, '').trim();
        }

        const buddyDialogue = buddyMatch ? buddyMatch[1].trim() : undefined;

        // Parse judgment request (if any)
        let judgment: JudgmentRequest | undefined = undefined;
        if (judgmentMatch) {
            const judgmentText = judgmentMatch[1];
            const abilityMatch = judgmentText.match(/ability:\s*(\S+)/);
            const difficultyMatch = judgmentText.match(/difficulty:\s*(\S+)/);
            const contextMatch = judgmentText.match(/context:\s*(.+)/);

            if (abilityMatch && abilityMatch[1] !== 'none') {
                // Map Japanese ability name to AbilityId
                const abilityMap: Record<string, AbilityId> = {
                    '剣術': 'swordsmanship',
                    '体術': 'martialArts',
                    '射撃': 'shooting',
                    '隠密': 'stealth',
                    '工作': 'crafting',
                    '学問': 'knowledge',
                    '観察': 'observation',
                    '話術': 'persuasion',
                    '威圧': 'intimidation',
                    '医術': 'medicine'
                };

                // Map Japanese difficulty to Difficulty enum
                const difficultyMap: Record<string, Difficulty> = {
                    '易': Difficulty.EASY,
                    '中': Difficulty.NORMAL,
                    '難': Difficulty.HARD
                };

                const abilityJa = abilityMatch[1];
                const difficultyJa = difficultyMatch ? difficultyMatch[1] : '中';

                if (abilityMap[abilityJa]) {
                    judgment = {
                        requiredAbility: abilityMap[abilityJa],
                        difficulty: difficultyMap[difficultyJa] || Difficulty.NORMAL,
                        context: contextMatch ? contextMatch[1].trim() : ''
                    };
                }
            }
        }

        let evaluation: InternalEvaluation = {
            trustChange: 0,
            progressionScore: 1,
            stagnationFlag: false,
            endingFlags: { shouldEnd: false }
        };

        if (evalMatch) {
            const evalText = evalMatch[1];
            const trustChangeMatch = evalText.match(/trustChange:\s*(-?\d+)/);
            const progressionMatch = evalText.match(/progressionScore:\s*(\d+)/);
            const shouldEndMatch = evalText.match(/shouldEnd:\s*(true|false)/);
            const endingTypeMatch = evalText.match(/endingType:\s*(\w+)/);

            if (trustChangeMatch) evaluation.trustChange = parseInt(trustChangeMatch[1]);
            if (progressionMatch) evaluation.progressionScore = parseInt(progressionMatch[1]);
            if (shouldEndMatch && shouldEndMatch[1] === 'true') {
                evaluation.endingFlags.shouldEnd = true;
                if (endingTypeMatch && (endingTypeMatch[1] === 'clear' || endingTypeMatch[1] === 'fail')) {
                    evaluation.endingFlags.endingType = endingTypeMatch[1];
                }
            }
        }

        return {
            sceneDescription,
            buddyDialogue,
            judgment,
            internalEvaluation: evaluation
        };
    }
}
