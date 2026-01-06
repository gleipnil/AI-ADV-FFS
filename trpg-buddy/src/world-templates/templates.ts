import type { WorldTemplate } from '../types';

// 6つの固定世界テンプレート

export const WORLD_TEMPLATES: WorldTemplate[] = [
    // 1. 荒涼の砂漠オアシス（読み聞かせの冒険譚の記憶）
    {
        id: 'desert_oasis',
        name: '荒涼の砂漠オアシス',
        locations: [
            'オアシスの集落',
            '砂嵐の荒野',
            '略奪者の野営地',
            '古代遺跡',
            '枯れた井戸',
            '隠された水脈',
            '中立地帯の市場'
        ],
        possibleNPCs: [
            {
                id: 'oasis_elder',
                name: 'オアシスの長老',
                role: '優しい祖父のような存在。知恵と調和を重んじる。アリアの祖父の記憶？',
                appearance: '白い髭、砂色のローブ、慈愛に満ちた目',
                uniqueItem: {
                    id: 'ancient_water_jar',
                    name: '古代の水瓶',
                    description: '水源を浄化する力を持つ聖遺物。',
                    effect: { type: 'story_key', conditionId: 'achieve_peace' },
                    sourceNPC: 'oasis_elder'
                }
            },
            {
                id: 'raider_chief',
                name: '略奪者の頭目',
                role: '恐ろしいが、実は飢えから民を守ろうとしている。一定の規律を持つ。',
                appearance: '傷だらけの顔、黒いターバン、鋭い目',
                uniqueItem: {
                    id: 'sandstorm_flag',
                    name: '砂嵐の旗',
                    description: '砂嵐を操る古の旗。戦闘や移動に有利。',
                    effect: { type: 'judgment_bonus', ability: 'stealth', bonus: 2 },
                    sourceNPC: 'raider_chief'
                }
            },
            {
                id: 'ruin_guardian',
                name: '遺跡の守護者',
                role: '半ば化け物化した古の番人。石像と植物の融合体。理性は残っている。',
                appearance: '古代の石像に蔦が絡みつき、半ば植物化した姿',
                uniqueItem: {
                    id: 'ruin_key',
                    name: '遺跡の鍵',
                    description: '真実への扉を開く古代の鍵。',
                    effect: { type: 'unlock_path', pathId: 'secret_chamber' },
                    sourceNPC: 'ruin_guardian'
                }
            },
            {
                id: 'desert_orphan',
                name: '砂漠の孤児',
                role: 'アリア自身の投影。両陣営の間で揺れる少年。',
                appearance: 'ぼろぼろの服、大きな瞳、コンパスを握る',
                uniqueItem: {
                    id: 'truth_compass',
                    name: '真実のコンパス',
                    description: '正しい道を示すコンパス。迷った時に。',
                    effect: { type: 'judgment_bonus', ability: 'observation', bonus: 1 },
                    sourceNPC: 'desert_orphan'
                }
            },
            {
                id: 'water_keeper',
                name: '水守りの巫女',
                role: '中立の存在。水源の真実を知る神秘的な女性。',
                appearance: '青い衣、水差しを持つ、神秘的な雰囲気',
                uniqueItem: {
                    id: 'healing_water',
                    name: '癒しの水差し',
                    description: '傷を癒す聖なる水。HP回復効果。',
                    effect: { type: 'unlock_path', pathId: 'healing_route' },
                    sourceNPC: 'water_keeper'
                }
            },
            {
                id: 'wandering_merchant',
                name: '放浪商人',
                role: '情報屋。どちらにも武器を売る中立の存在。',
                appearance: 'ラクダを連れた商人、狡猾な笑み',
                uniqueItem: {
                    id: 'versatile_knife',
                    name: '万能ナイフ',
                    description: '様々な場面で役立つ道具。',
                    effect: { type: 'judgment_bonus', ability: 'crafting', bonus: 1 },
                    sourceNPC: 'wandering_merchant'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_conflict',
                    description: 'オアシスと略奪者の対立の真相を理解する',
                    keywords: ['対立', '真相', '理解', '背景', '水源'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'bond_with_buddy',
                    description: 'バディとの絆を深め、困難を共に乗り越える',
                    keywords: ['絆', '信頼', '協力', '共に'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'discover_truth',
                    description: '遺跡の秘密または化け物の正体を明らかにする',
                    keywords: ['秘密', '真実', '発見', '遺跡', '守護者'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'achieve_peace',
                    description: 'オアシスと略奪者の完全な和解を実現する',
                    keywords: ['和解', '平和', '協定', '同盟', '水瓶'],
                    met: false,
                    isAbstract: false
                }
            ]
        }
    },

    // 2. 混沌の不思議国（第2話ピュアコンバータ + アリス）
    {
        id: 'lawless_wonderland',
        name: '混沌の不思議国',
        locations: [
            '逆さまの森',
            '永遠の茶会',
            '鏡の回廊',
            '女王の法廷',
            '時計塔（時間が逆行）'
        ],
        possibleNPCs: [
            {
                id: 'mad_queen',
                name: 'ハートの女王',
                role: '不条理な法で支配。論破されることを恐れる気まぐれな暴君。',
                appearance: 'ハートの王冠、赤いドレス、常に怒っている',
                uniqueItem: {
                    id: 'heart_crown',
                    name: 'ハートの王冠',
                    description: '命令を絶対にする力。しかし代償もある。',
                    effect: { type: 'judgment_bonus', ability: 'intimidation', bonus: 3 },
                    sourceNPC: 'mad_queen'
                }
            },
            {
                id: 'mad_hatter',
                name: '狂った帽子屋',
                role: '時間を失った元時計職人。謎かけが好き。親切だが支離滅裂。',
                appearance: '派手な帽子、ティーカップ、奇妙な笑顔',
                uniqueItem: {
                    id: 'broken_watch',
                    name: '壊れた懐中時計',
                    description: '時間を巻き戻す力。一度だけ使える。',
                    effect: { type: 'unlock_path', pathId: 'time_reversal' },
                    sourceNPC: 'mad_hatter'
                }
            },
            {
                id: 'cheshire_cat',
                name: 'チェシャ猫',
                role: '姿を消す謎の存在。ヒントをくれるが、全ては謎かけ。',
                appearance: '縞模様、不敵な笑み、消えたり現れたり',
                uniqueItem: {
                    id: 'vanishing_smile',
                    name: '消える笑顔',
                    description: '姿を隠す力。ステルス能力付与。',
                    effect: { type: 'judgment_bonus', ability: 'stealth', bonus: 2 },
                    sourceNPC: 'cheshire_cat'
                }
            },
            {
                id: 'alice',
                name: 'アリス',
                role: 'アリア自身の投影。この世界に囚われた少女。脱出の鍵を握る。',
                appearance: '青いドレス、金髪、困惑した表情',
                uniqueItem: {
                    id: 'mirror_shard',
                    name: '鏡の欠片',
                    description: '真実を映す鏡の破片。嘘を見破る。',
                    effect: { type: 'story_key', conditionId: 'find_self' },
                    sourceNPC: 'alice'
                }
            },
            {
                id: 'white_rabbit',
                name: '白兎',
                role: '常に急いでいる。脱出の鍵を持つ？時間に追われている。',
                appearance: '白い毛皮、懐中時計、赤い目',
                uniqueItem: {
                    id: 'silver_watch',
                    name: '銀の懐中時計',
                    description: '正確な時間を示す唯一の時計。',
                    effect: { type: 'story_key', conditionId: 'win_queen_favor' },
                    sourceNPC: 'white_rabbit'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_madness',
                    description: '不思議国の法則を理解し、適応する',
                    keywords: ['法則', '理解', '適応', '謎', '不条理'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'navigate_chaos',
                    description: '混沌を乗り越え、バディと無事に進む',
                    keywords: ['混沌', '乗り越える', '進む', '絆'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'find_self',
                    description: '鏡の中で真実の自分を見出す',
                    keywords: ['真実', '自分', '鏡', '発見', 'アリス'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'win_queen_favor',
                    description: '女王の完全な信任を得て、出口を開いてもらう',
                    keywords: ['女王', '信任', '許可', '出口', '時計'],
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

    // 4. ネオン・ディストピア（第8話ピュアブレーカー）
    {
        id: 'neon_dystopia',
        name: 'ネオン・ディストピア',
        locations: [
            '摩天楼の繁華街',
            '地下街のスラム',
            '企業タワー',
            '廃墟工場地帯',
            'データセンター',
            '秘密ラボ'
        ],
        possibleNPCs: [
            {
                id: 'security_captain',
                name: '冷徹な警備隊長',
                role: '秩序を守るためなら手段を選ばない。企業の忠実な犬。',
                appearance: 'サイバー装備、冷たい目、企業ロゴ',
                uniqueItem: {
                    id: 'security_pass',
                    name: 'セキュリティパス',
                    description: '全てのドアを開く最高権限カード。',
                    effect: { type: 'unlock_path', pathId: 'corporate_access' },
                    sourceNPC: 'security_captain'
                }
            },
            {
                id: 'hacker_leader',
                name: 'カリスマ的ハッカー',
                role: '非合法組織のリーダー。正義感はあるが過激。',
                appearance: 'フード、ネオンマスク、ハッキングデバイス',
                uniqueItem: {
                    id: 'hacking_tool',
                    name: 'ハッキングツール',
                    description: 'セキュリティを突破する最強ツール。',
                    effect: { type: 'judgment_bonus', ability: 'knowledge', bonus: 2 },
                    sourceNPC: 'hacker_leader'
                }
            },
            {
                id: 'rogue_android',
                name: '狂乱のアンドロイド',
                role: '暴走ロボの残骸から生まれた意識体。人間への憎しみと憧れ。',
                appearance: '半壊した機械、赤く光る目、人型',
                uniqueItem: {
                    id: 'ai_core',
                    name: 'AIコア',
                    description: 'アンドロイドの心。企業の秘密が記録されている。',
                    effect: { type: 'story_key', conditionId: 'expose_conspiracy' },
                    sourceNPC: 'rogue_android'
                }
            },
            {
                id: 'street_doc',
                name: '裏医者',
                role: 'サイバーウェア密売人。中立だが情報通。',
                appearance: '白衣、サイバー義手、商売人の笑み',
                uniqueItem: {
                    id: 'cyber_enhancer',
                    name: 'サイバー強化剤',
                    description: '一時的に能力を向上させる薬物。',
                    effect: { type: 'judgment_bonus', ability: 'martialArts', bonus: 2 },
                    sourceNPC: 'street_doc'
                }
            },
            {
                id: 'corpo_defector',
                name: '元企業幹部',
                role: '良心の呵責から離反。内部情報を持つ。',
                appearance: 'スーツ、疲れた顔、データチップ',
                uniqueItem: {
                    id: 'data_chip',
                    name: '機密データチップ',
                    description: '企業の陰謀の証拠。真実を暴く鍵。',
                    effect: { type: 'story_key', conditionId: 'unite_factions' },
                    sourceNPC: 'corpo_defector'
                }
            },
            {
                id: 'ai_child',
                name: 'AIの残滓',
                role: '消されたAIの記憶。アリアの純粋さの投影。',
                appearance: 'ホログラム、子供の姿、透明',
                uniqueItem: {
                    id: 'memory_fragment',
                    name: '記憶の断片',
                    description: 'システムの真実が記録された断片。',
                    effect: { type: 'unlock_path', pathId: 'hidden_truth' },
                    sourceNPC: 'ai_child'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_conflict',
                    description: '都市の対立構造と真の脅威を理解する',
                    keywords: ['対立', '脅威', '理解', '構造', '企業'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'survive_dystopia',
                    description: 'ディストピアの危険を乗り越え、生き延びる',
                    keywords: ['生存', '乗り越える', '危険', 'サバイバル'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'expose_conspiracy',
                    description: '企業の陰謀または暴走の原因を明らかにする',
                    keywords: ['陰謀', '原因', '暴露', '真実', 'データ'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'unite_factions',
                    description: '警備隊とハッカーを和解させ、暴走ロボを撃退する',
                    keywords: ['和解', '同盟', '撃退', '勝利', '統合'],
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

    // 6. 見捨てられた島（夏の旅行の記憶）
    {
        id: 'forsaken_island',
        name: '見捨てられた島',
        locations: [
            '白砂のビーチ',
            '兎人の集落',
            '密林の奥地',
            '断崖の岬',
            '廃研究所',
            '毒の沼地',
            '古い船の残骸'
        ],
        possibleNPCs: [
            {
                id: 'rabbit_chief',
                name: '臆病な兎人の長',
                role: '平和を愛するが、決断力に欠ける。人間を恐れている。',
                appearance: '白い兎の耳と尾、破れた服、怯えた目',
                uniqueItem: {
                    id: 'peace_offering',
                    name: '平和の印',
                    description: '兎人との友好を示す印。信頼の証。',
                    effect: { type: 'story_key', conditionId: 'help_rabbits' },
                    sourceNPC: 'rabbit_chief'
                }
            },
            {
                id: 'plant_incarnation',
                name: '巨大植物の化身',
                role: '知性を持った巨大食虫植物。人面花。交渉可能かもしれない。',
                appearance: '巨大な人面花、触手状の蔦、緑と赤',
                uniqueItem: {
                    id: 'seed_of_life',
                    name: '生命の種',
                    description: '植物の心臓。島を救う鍵かもしれない。',
                    effect: { type: 'story_key', conditionId: 'save_island' },
                    sourceNPC: 'plant_incarnation'
                }
            },
            {
                id: 'sea_prophet',
                name: '海の預言者',
                role: 'リヴァイアサンの到来を予言する謎の隠者。真実を知る。',
                appearance: 'ボロボロのローブ、杖、海藻の髪',
                uniqueItem: {
                    id: 'prophecy_scroll',
                    name: '予言の巻物',
                    description: '未来が書かれた巻物。島の運命を変える。',
                    effect: { type: 'unlock_path', pathId: 'prophecy_path' },
                    sourceNPC: 'sea_prophet'
                }
            },
            {
                id: 'castaway',
                name: '漂流者',
                role: '最近流れ着いた人間。脱出を望む。協力者になりうる。',
                appearance: '日焼けした肌、破れた服、筏の破片',
                uniqueItem: {
                    id: 'salvage_kit',
                    name: 'サルベージキット',
                    description: '船の残骸から拾った道具。修理に使える。',
                    effect: { type: 'judgment_bonus', ability: 'crafting', bonus: 2 },
                    sourceNPC: 'castaway'
                }
            },
            {
                id: 'mutant_rabbit',
                name: '変異兎人',
                role: '植物に寄生された兎人。理性と本能の間で揺れる。',
                appearance: '半分植物化した兎人、蔦が絡みつく',
                uniqueItem: {
                    id: 'symbiotic_serum',
                    name: '共生の血清',
                    description: '植物と兎人の融合の秘密。治療か進化か。',
                    effect: { type: 'unlock_path', pathId: 'symbiosis_route' },
                    sourceNPC: 'mutant_rabbit'
                }
            },
            {
                id: 'scientist_ghost',
                name: '研究者の幻影',
                role: 'AIか幻覚？過去の研究者の残留思念。真実を語る。',
                appearance: '透明な姿、白衣、悲しげな表情',
                uniqueItem: {
                    id: 'research_notes',
                    name: '研究ノート',
                    description: '全ての真実が記された最後のノート。',
                    effect: { type: 'story_key', conditionId: 'find_solution' },
                    sourceNPC: 'scientist_ghost'
                }
            }
        ],
        baseClearConditions: {
            normal: [
                {
                    id: 'understand_island',
                    description: '島の危機と兎人の窮状を理解する',
                    keywords: ['危機', '窮状', '理解', '実験', '真実'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'find_solution',
                    description: '巨大植物または脱出の方法を見出す',
                    keywords: ['方法', '解決', '発見', 'ノート'],
                    met: false,
                    isAbstract: true
                },
                {
                    id: 'help_rabbits',
                    description: '兎人を助け、希望をもたらす',
                    keywords: ['助ける', '希望', '支援', '平和'],
                    met: false,
                    isAbstract: true
                }
            ],
            perfect: [
                {
                    id: 'save_island',
                    description: '巨大植物を説得または撃退し、島を救う',
                    keywords: ['撃退', '救う', '勝利', '平和', '種'],
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
