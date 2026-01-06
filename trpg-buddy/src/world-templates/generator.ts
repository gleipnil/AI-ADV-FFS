import type { WorldTemplate, WorldInstance, Location, NPC, Condition } from '../types';
import { selectRandomWorldTemplate } from './templates';
import { selectRandomAbnormalities, selectRandomTheme, type AbnormalityTag, type ThemeTag } from './tags';

/**
 * 世界テンプレートから実際の世界インスタンスを生成
 */
export function generateWorld(
    templateId?: string,
    abnormalityCount: number = 2
): WorldInstance {
    // テンプレート選択（指定がなければランダム）
    let template: WorldTemplate;
    if (templateId) {
        const found = selectRandomWorldTemplate(); // 実装上はIDで検索すべきだが簡易実装
        template = found;
    } else {
        template = selectRandomWorldTemplate();
    }

    // タグ生成
    const abnormalityTags = selectRandomAbnormalities(abnormalityCount);
    const themeTags = [selectRandomTheme()];

    // ロケーション生成
    const locations: Location[] = template.locations.map((name, index) => ({
        id: `${template.id}_loc_${index}`,
        name,
        description: generateLocationDescription(name, abnormalityTags),
        visited: index === 0 // 最初のロケーションのみ訪問済み
    }));

    // NPC生成（全員は登場させず、ランダムに2-3名）
    const npcCount = Math.floor(Math.random() * 2) + 2; // 2-3名
    const selectedNPCs = [...template.possibleNPCs]
        .sort(() => Math.random() - 0.5)
        .slice(0, npcCount);

    const npcs: NPC[] = selectedNPCs.map(npcTemplate => ({
        ...npcTemplate,
        dialogueHistory: [],
        alive: true
    }));

    // クリア条件は直接テンプレートから使用（既にCondition[]形式）
    const clearConditions = {
        normal: template.baseClearConditions.normal.map(condition => ({ ...condition })),
        perfect: template.baseClearConditions.perfect.map(condition => ({ ...condition }))
    };

    return {
        templateId: template.id,
        name: template.name,
        abnormalityTags,
        themeTags,
        locations,
        npcs,
        clearConditions
    };
}

/**
 * ロケーション名と異常性タグから簡単な説明文を生成
 */
function generateLocationDescription(
    locationName: string,
    abnormalities: AbnormalityTag[]
): string {
    const abnormalityTexts: Record<string, string> = {
        '時間歪曲': 'この場所では時間の流れが不安定だ',
        '時間ループ': '既視感を覚える。ここに来たことがあるような...',
        '時間停滞': '不思議なことに、何も動いていないように見える',
        '重力反転': '足元がふわりと浮き上がる感覚がする',
        '鏡像世界': '何かが左右反転しているように感じる',
        '記憶汚染': '頭の中に靄がかかったような感覚',
        '精神支配': '意識が引っ張られるような違和感',
        '言葉の具現化': '話した言葉が形を持ち始めているようだ',
        '生命巨大化': '全てが異常に大きく見える',
        '閉鎖空間': '見えない壁に閉じ込められているような圧迫感'
    };

    const abnormalityDesc = abnormalities
        .map(tag => abnormalityTexts[tag])
        .filter(Boolean)
        .join('。');

    if (abnormalityDesc) {
        return `${locationName}。${abnormalityDesc}。`;
    }

    return `${locationName}。`;
}

/**
 * 世界情報をAI GMに渡すためのコンテキスト文字列を生成
 */
export function generateWorldContext(world: WorldInstance): string {
    const abnormalities = world.abnormalityTags.join('、');
    const themes = world.themeTags.join('、');
    const locationNames = world.locations.map(l => l.name).join('、');
    const npcNames = world.npcs.map(n => `${n.name}（${n.role}）`).join('、');

    // Normal条件のみをクリア条件として表示（Perfectは隠し目標）
    const clearConds = world.clearConditions.normal
        .map(c => c.description)
        .join(' / ');

    return `【世界情報】
世界名: ${world.name}
異常性: ${abnormalities}
テーマ: ${themes}
ロケーション: ${locationNames}
登場NPC: ${npcNames}
クリア条件のヒント: ${clearConds}

この世界のルールと雰囲気を一貫して描写すること。`;
}
