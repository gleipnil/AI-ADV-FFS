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

    // 3. 永遠の全寮制学校
    {
        id: 'eternal_school',
        name: '永遠の全寮制学校',
        locations: [
            '整然とした教室棟',
            '賑やかな部活棟',
            '静謐な図書館',
            '禁じられた地下室'
        ],
        possibleNPCs: [
            {
                id: 'class_president',
                name: '優等生の級長',
                role: '完璧な模範生。しかし目に生気がない'
            },
            {
                id: 'club_captain',
                name: '陽気な部活部長',
                role: '明るく親しみやすい。引き留めようとする'
            },
            {
                id: 'librarian',
                name: '司書',
                role: '静かで知的。真実を知っているかもしれない'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'resist_temptation',
                    description: '学校の誘惑を見抜き、拒絶する意志を持つ',
                    keywords: ['誘惑', '拒絶', '意志', '抵抗'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'discover_anomaly',
                    description: '学校システムの異常性を理解する',
                    keywords: ['異常', 'システム', '理解', '矛盾'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'escape_determination',
                    description: 'バディと共に脱出への決意を固める',
                    keywords: ['脱出', '決意', '共に'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'find_key',
                    description: '地下室への鍵を発見し、脱出路を開く',
                    keywords: ['鍵', '地下室', '脱出路', '発見'],
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

    // 5. 弁舌の帝国
    {
        id: 'rhetorical_empire',
        name: '弁舌の帝国',
        locations: [
            '大広場（アゴラ）',
            '哲学者のアカデミア',
            '神殿',
            '皇帝の宮殿'
        ],
        possibleNPCs: [
            {
                id: 'eloquent_philosopher',
                name: '雄弁な哲学者',
                role: '論理と理性で全てを解決しようとする'
            },
            {
                id: 'fanatic_priest',
                name: '狂信的な神官',
                role: '信仰こそが真理と信じて疑わない'
            },
            {
                id: 'calm_emperor',
                name: '冷静な皇帝',
                role: '哲学者と神官の対立を利用して統治している'
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_rhetoric',
                    description: '帝国の弁論文化と対立の本質を理解する',
                    keywords: ['弁論', '対立', '理解', '本質'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'gain_respect',
                    description: '論理的な対話で相手の尊敬を得る',
                    keywords: ['尊敬', '対話', '論理'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'discover_truth',
                    description: '哲学と宗教の対立の真の原因を見抜く',
                    keywords: ['真相', '原因', '発見'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'achieve_reconciliation',
                    description: '弁論大会で勝利し、哲学者と神官の和解を実現する',
                    keywords: ['弁論', '勝利', '和解', '実現'],
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
