import type { WorldTemplate } from '../types';

// 6つの固定世界テンプレート

export const WORLD_TEMPLATES: WorldTemplate[] = [
    // 1. 荒涼の砂漠オアシス
    {
        id: 'desert_oasis',
        name: '荒涼の砂漠オアシス',
        locations: [
            'オアシスの集落',
            '砂嵐の荒野',
            '略奪者の野営地',
            '古代遺跡'
        ],
        possibleNPCs: [
            {
                id: 'oasis_elder',
                name: 'オアシスの長老',
                role: '平和な民のリーダー。知恵と調和を重んじる'
            },
            {
                id: 'raider_chief',
                name: '略奪者の頭目',
                role: '暴力的だが一定の規律を持つ収奪者のボス'
            },
            {
                id: 'ruin_guardian',
                name: '遺跡の守護者',
                role: '半ば化け物化した古の番人。理性は残っている'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_conflict',
                    description: 'オアシスと略奪者の対立の真相を理解する',
                    keywords: ['対立', '真相', '理解', '背景'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'bond_with_buddy',
                    description: 'バディとの絆を深め、困難を共に乗り越える',
                    keywords: ['絆', '信頼', '協力'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'discover_truth',
                    description: '遺跡の秘密または化け物の正体を明らかにする',
                    keywords: ['秘密', '真実', '発見', '遺跡'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'achieve_peace',
                    description: 'オアシスと略奪者の完全な和解を実現する',
                    keywords: ['和解', '平和', '協定', '同盟'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 2. 混沌の不思議国
    {
        id: 'lawless_wonderland',
        name: '混沌の不思議国',
        locations: [
            '逆さまの森',
            '永遠の茶会',
            '鏡の回廊',
            '女王の法廷'
        ],
        possibleNPCs: [
            {
                id: 'mad_hatter',
                name: '狂った帽子屋',
                role: '時間感覚を失った元時計職人。親切だが支離滅裂'
            },
            {
                id: 'cheshire_cat',
                name: 'チェシャ猫',
                role: '姿を消したり現れたりする謎の存在。ヒントをくれる'
            },
            {
                id: 'queen_of_hearts',
                name: 'ハートの女王',
                role: '気まぐれで暴君的。しかし一定のルールには従う'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_madness',
                    description: '不思議国の法則を理解し、適応する',
                    keywords: ['法則', '理解', '適応', '謎'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'navigate_chaos',
                    description: '混沌を乗り越え、バディと無事に進む',
                    keywords: ['混沌', '乗り越える', '進む'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'find_self',
                    description: '鏡の中で真実の自分を見出す',
                    keywords: ['真実', '自分', '鏡', '発見'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'win_queen_favor',
                    description: '女王の完全な信任を得て、出口を開いてもらう',
                    keywords: ['女王', '信任', '許可', '出口'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 3. 永遠の全寮制学校（アリアの学校生活の記憶）
    {
        id: 'eternal_school',
        name: '永遠の全寮制学校',
        locations: [
            '1-A教室（永遠の授業）',
            '図書室（禁書の棚）',
            '屋上（施錠されている）',
            '保健室（記憶操作の場）',
            '地下室（不適合者の牢獄）',
            '音楽室（ピアノが勝手に鳴る）',
            '美術室（不気味な絵画）',
            '中庭（お茶会の場）'
        ],
        possibleNPCs: [
            {
                id: 'class_president',
                name: '生徒会長 シオン',
                role: '完璧な優等生。常に笑顔だが、目に光がない。他の生徒を「正しく」導こうとする。',
                appearance: '黒髪ロング、整った制服、金のバッジ',
                uniqueItem: {
                    id: 'president_badge',
                    name: '会長のバッジ',
                    description: '権威の象徴。これを持つ者の言葉は重みを持つ。',
                    effect: { type: 'judgment_bonus', ability: 'persuasion', bonus: 2 },
                    sourceNPC: 'class_president'
                }
            },
            {
                id: 'library_girl',
                name: '図書委員 ユキ',
                role: '物静かで知的。禁書の棚を守っている。真実を知っているが、話そうとしない。',
                appearance: '銀髪ショート、眼鏡、古い本を抱えている',
                uniqueItem: {
                    id: 'forbidden_book',
                    name: '禁書「真実の記録」',
                    description: '学校システムの秘密が書かれた本。読むと真実が明らかに。',
                    effect: { type: 'story_key', conditionId: 'discover_anomaly' },
                    sourceNPC: 'library_girl'
                }
            },
            {
                id: 'sports_captain',
                name: '体育部長 レナ',
                role: '明るく元気な体育会系。しかし笑顔の裏に疲労が見える。',
                appearance: '茶髪ポニーテール、ジャージ姿、ホイッスル首から下げ',
                uniqueItem: {
                    id: 'emergency_whistle',
                    name: '緊急ホイッスル',
                    description: '吹くと仲間を呼べる。危機的状況で助けが来る。',
                    effect: { type: 'unlock_path', pathId: 'backup_route' },
                    sourceNPC: 'sports_captain'
                }
            },
            {
                id: 'art_student',
                name: '美術部員 サクラ',
                role: '不気味な絵を描く少女。異常性を感じ取っているが、絵でしか表現できない。',
                appearance: '桃色の髪、絵の具まみれのスモック、空虚な瞳',
                uniqueItem: {
                    id: 'prophetic_sketch',
                    name: '予知のスケッチブック',
                    description: '未来を描いた絵。次に起こることが予見できる。',
                    effect: { type: 'judgment_bonus', ability: 'observation', bonus: 2 },
                    sourceNPC: 'art_student'
                }
            },
            {
                id: 'infirmary_girl',
                name: '保健室の常連 ミオ',
                role: '病弱で保健室に居る少女。実は洗脳に抵抗しているため「病気」扱い。',
                appearance: '青白い顔、包帯、小瓶を握りしめている',
                uniqueItem: {
                    id: 'memory_medicine',
                    name: '記憶の薬',
                    description: '一時的に記憶を取り戻す薬。真実が見える。',
                    effect: { type: 'story_key', conditionId: 'resist_temptation' },
                    sourceNPC: 'infirmary_girl'
                }
            },
            {
                id: 'rebel_student',
                name: '不良少女 カノン',
                role: '反抗的な態度の少女。脱出を試みた痕跡（火傷）がある。',
                appearance: '金髪、破れた制服、ライター',
                uniqueItem: {
                    id: 'rebel_lighter',
                    name: '反逆のライター',
                    description: '火を使った行動に有利。禁止されている道具。',
                    effect: { type: 'judgment_bonus', ability: 'crafting', bonus: 1 },
                    sourceNPC: 'rebel_student'
                }
            },
            {
                id: 'scarecrow_teacher',
                name: '担任教師（かかし）',
                role: '常に笑顔の藁人形。動かないが、常に「見ている」。',
                appearance: '藁で作られた人形、教師の服、描かれた笑顔',
                uniqueItem: {
                    id: 'reality_chalk',
                    name: '現実のチョーク',
                    description: '黒板に書いたことが一時的に現実になる魔法のチョーク。',
                    effect: { type: 'unlock_path', pathId: 'written_reality' },
                    sourceNPC: 'scarecrow_teacher'
                }
            },
            {
                id: 'statue_principal',
                name: '理事長（動く彫像）',
                role: '大理石の彫像。夜になると動き、システムを守る番人。',
                appearance: '白い大理石、ローブ姿、鍵を持つ',
                uniqueItem: {
                    id: 'basement_key',
                    name: '地下室の鍵',
                    description: '禁じられた地下室への扉を開く唯一の鍵。',
                    effect: { type: 'story_key', conditionId: 'find_key' },
                    sourceNPC: 'statue_principal'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'resist_temptation',
                    description: '学校の誘惑を見抜き、拒絶する意志を持つ',
                    keywords: ['誘惑', '拒絶', '意志', '抵抗', '記憶の薬'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'discover_anomaly',
                    description: '学校システムの異常性を理解する',
                    keywords: ['異常', 'システム', '理解', '矛盾', '禁書'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'escape_determination',
                    description: 'バディと共に脱出への決意を固める',
                    keywords: ['脱出', '決意', '共に', '絆'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'find_key',
                    description: '地下室への鍵を発見し、真実を暴いて脱出する',
                    keywords: ['鍵', '地下室', '脱出', '真実', '理事長'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 4. ネオン・ディストピア
    {
        id: 'neon_dystopia',
        name: 'ネオン・ディストピア',
        locations: [
            '摩天楼の繁華街',
            '地下街のスラム',
            '企業タワー',
            '廃墟工場地帯'
        ],
        possibleNPCs: [
            {
                id: 'security_captain',
                name: '冷徹な警備隊長',
                role: '秩序を守るためなら手段を選ばない'
            },
            {
                id: 'hacker_leader',
                name: 'カリスマ的ハッカー',
                role: '非合法組織のリーダー。正義感はある'
            },
            {
                id: 'rogue_android',
                name: '狂乱のアンドロイド',
                role: '暴走ロボの残骸から生まれた意識体'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_conflict',
                    description: '都市の対立構造と真の脅威を理解する',
                    keywords: ['対立', '脅威', '理解', '構造'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'survive_dystopia',
                    description: 'ディストピアの危険を乗り越え、生き延びる',
                    keywords: ['生存', '乗り越える', '危険'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'expose_conspiracy',
                    description: '企業の陰謀または暴走の原因を明らかにする',
                    keywords: ['陰謀', '原因', '暴露', '真実'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'unite_factions',
                    description: '警備隊とハッカーを和解させ、暴走ロボを撃退する',
                    keywords: ['和解', '同盟', '撃退', '勝利'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 5. 色彩の絵画世界（アリアのスケッチブックの記憶）
    {
        id: 'painted_world',
        name: '色彩の絵画世界',
        locations: [
            '水彩の森',
            'クレヨンの城',
            '油絵の海',
            '鉛筆スケッチの廃墟',
            '消しゴムで消された谷',
            'パレットの泉',
            '白いキャンバスの平原'
        ],
        possibleNPCs: [
            {
                id: 'color_king',
                name: '虹色の王',
                role: '7色の王冠をかぶった絵の具の王様。創造の象徴だが独裁的。',
                appearance: '虹色のローブ、絵の具のような体、パレット持つ',
                uniqueItem: {
                    id: 'rainbow_palette',
                    name: '虹のパレット',
                    description: '全ての色を自在に操る。現実を塗り替える力。',
                    effect: { type: 'judgment_bonus', ability: 'crafting', bonus: 3 },
                    sourceNPC: 'color_king'
                }
            },
            {
                id: 'monochrome_shadow',
                name: 'モノクロの影',
                role: '色を失った悲しい存在。全てを灰色に塗りつぶそうとする。',
                appearance: '白と黒だけの姿、涙を流している',
                uniqueItem: {
                    id: 'graphite_pencil',
                    name: '黒鉛筆',
                    description: '全てをモノクロにする。色を消す力。',
                    effect: { type: 'unlock_path', pathId: 'monochrome_path' },
                    sourceNPC: 'monochrome_shadow'
                }
            },
            {
                id: 'crayon_children',
                name: 'クレヨンの子供たち',
                role: '無邪気な落書きの子供。アリアの幼少期の投影。',
                appearance: 'カラフルなクレヨンでできた子供たち、笑顔',
                uniqueItem: {
                    id: 'magic_crayon',
                    name: '魔法のクレヨン',
                    description: '描いたものが一時的に現実になる。',
                    effect: { type: 'story_key', conditionId: 'create_bridge' },
                    sourceNPC: 'crayon_children'
                }
            },
            {
                id: 'eraser_monster',
                name: '消しゴムの怪物',
                role: '巨大な消しゴム。全てを消そうとする。忘却の象徴。',
                appearance: '白くて巨大、消しカスをまき散らす',
                uniqueItem: {
                    id: 'giant_eraser',
                    name: '忘却の消しゴム',
                    description: '記憶を消す力。使うと一部の記憶を失う。',
                    effect: { type: 'unlock_path', pathId: 'erasure_ending' },
                    sourceNPC: 'eraser_monster'
                }
            },
            {
                id: 'paintbrush_maiden',
                name: '筆姫',
                role: '美しい絵筆の精霊。創造性と美の象徴。',
                appearance: '長い髪が筆のよう、絵の具のドレス',
                uniqueItem: {
                    id: 'creation_brush',
                    name: '創造の筆',
                    description: '絵を描いて現実化する。最強の創造ツール。',
                    effect: { type: 'story_key', conditionId: 'restore_colors' },
                    sourceNPC: 'paintbrush_maiden'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_world',
                    description: '絵画世界の法則を理解する',
                    keywords: ['絵画', '理解', '色彩', '創造'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'create_bridge',
                    description: '想像力で道を切り開く',
                    keywords: ['想像', '創造', 'クレヨン', '道'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'escape_canvas',
                    description: 'キャンバスの外へ脱出する',
                    keywords: ['脱出', 'キャンバス', '外'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'restore_colors',
                    description: '消しゴムの怪物を説得し、全ての色を取り戻す',
                    keywords: ['色彩', '回復', '説得', '和解', '完成'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 6. 見捨てられた島
    {
        id: 'forsaken_island',
        name: '見捨てられた島',
        locations: [
            '白砂のビーチ',
            '兎人の集落',
            '密林の奥地',
            '断崖の岬'
        ],
        possibleNPCs: [
            {
                id: 'rabbit_chief',
                name: '臆病な兎人の長',
                role: '平和を愛するが、決断力に欠ける'
            },
            {
                id: 'plant_incarnation',
                name: '巨大植物の化身',
                role: '知性を持った植物。交渉可能かもしれない'
            },
            {
                id: 'sea_prophet',
                name: '海の預言者',
                role: 'リヴァイアサンの到来を予言する謎の隠者'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_island',
                    description: '島の危機と兎人の窮状を理解する',
                    keywords: ['危機', '窮状', '理解'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'find_solution',
                    description: '巨大植物または脱出の方法を見出す',
                    keywords: ['方法', '解決', '発見'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'help_rabbits',
                    description: '兎人を助け、希望をもたらす',
                    keywords: ['助ける', '希望', '支援'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'save_island',
                    description: '巨大植物を撃退し、島を救う',
                    keywords: ['撃退', '救う', '勝利', '平和'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    }
];

// ヘルパー関数: IDから世界テンプレートを取得
export function getWorldTemplateById(id: string): WorldTemplate | undefined {
    return WORLD_TEMPLATES.find(template => template.id === id);
}

// ヘルパー関数: ランダムに世界テンプレートを選択
export function selectRandomWorldTemplate(): WorldTemplate {
    const index = Math.floor(Math.random() * WORLD_TEMPLATES.length);
    return WORLD_TEMPLATES[index];
}
