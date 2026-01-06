# 記憶のカケラを辿る - バディ同行型・生成AI TRPG

生成AIをGMとしたテキストベースのTRPG。記憶を失ったバディと共に異世界を探索し、「記憶のカケラ」を集めて真実へと迫る。

## 🎮 特徴

- **AI駆動型GM**: Gemini APIによる動的なシナリオ生成
- **レトロCUI**: PC98/MS-DOS風の懐かしいビジュアル
- **バディシステム**: 信頼度により変化するバディの態度
- **事前予告方式の判定システム**: プレイヤーに選択肢を与える判定フロー
- **多層エンディング**: Perfect/Normal/Survival/Breakdownの4段階
- **記憶のカケラ**: 繰り返しプレイで真実ルートへ到達（Phase 3で実装予定）

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. API キーの設定

`.env` ファイルを作成し、Gemini API キーを設定:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

Gemini API キーは [Google AI Studio](https://makersuite.google.com/app/apikey) から取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

## 📁 プロジェクト構造

```
trpg-buddy/
├── src/
│   ├── main.ts                    # エントリポイント
│   ├── types.ts                   # 型定義
│   ├── game-engine.ts             # ゲームエンジンコア
│   ├── ai-gm/
│   │   └── gemini-client.ts       # Gemini API統合
│   ├── buddy/
│   │   └── trust-manager.ts       # バディ信頼度管理
│   ├── game-flow/
│   │   ├── session-controller.ts  # セッション制御
│   │   ├── condition-evaluator.ts # 条件評価
│   │   └── scene-manager.ts       # シーン管理
│   ├── judgment/
│   │   ├── judgment-engine.ts     # 判定エンジン
│   │   └── dice.ts                # ダイスロール
│   ├── world-templates/
│   │   ├── templates.ts           # 6世界テンプレート
│   │   └── generator.ts           # 世界生成
│   ├── scene-management/
│   │   ├── scene-types.ts         # シーン型定義
│   │   └── scene-manager.ts       # シーン制御
│   ├── save-system/
│   │   └── save-manager.ts        # セーブ/ロード
│   └── ui/
│       ├── retro-cui.css          # レトロCUIスタイル
│       └── main-screen.ts         # メイン画面UI
├── index.html
├── package.json
└── tsconfig.json
```

## 🎯 開発ロードマップ

### Phase 1 (MVP) - ✅ 完了
- [x] プロジェクト構造の構築
- [x] 基本的なAI GM統合
- [x] レトロCUIの実装
- [x] セーブ/ロードシステム

### Phase 2 - ✅ 完了
- [x] 世界テンプレートシステム（6世界）
- [x] シーン管理システム
- [x] 多層エンディングシステム（4段階）
- [x] 事前予告方式判定システム
- [x] クリア条件の2層構造（Normal/Perfect）

### Phase 3 - 🔜 予定
- [ ] 判定システム完全版（アイテムによる難易度変更）
- [ ] タロットシステム
- [ ] 記憶のカケラの能力統合
- [ ] 真実ルートシステム

## 🎲 ゲームシステム

### セッション構造
- 1セッション = 基本20ターン（クライマックス延長で最大23ターン）
- 1ターン = プレイヤーの入力1回
- エンディング達成で記憶のカケラを獲得

### バディシステム
- 信頼度: -100〜100
- 信頼度により口調・行動が変化
- 虐待行為は警告→破局エンド

### 判定システム（Phase 2完了）
- **事前予告方式**: AI GMが先に判定を提示、プレイヤーが選択
- **10種類の判定能力**: 剣術、体術、射撃、隠密、工作、学問、観察、話術、威圧、医術
- **3段階の難易度**: 易/中/難（目標値5/7/9）
- **2D6ダイスロール**: クリティカル（12）、ファンブル（2）

### 多層エンディング（Phase 2完了）
- **Perfect**: 完全クリア（全Perfect条件達成）
- **Normal**: 通常クリア（1つ以上Normal条件達成）
- **Survival**: 生還（条件未達成だが生存）
- **Breakdown**: 破局（バディとの関係破綻）

## 🛠️ 技術スタック

- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Gemini API** (`gemini-2.0-flash-exp`) - AI GMエンジン
- **LocalStorage** - セーブデータ管理

## 📚 ドキュメント

- `DESIGN_SPEC.md` - システム設計仕様書
- `AI_DEVELOPMENT_TIPS.md` - AI開発者向けベストプラクティス
- `walkthrough.md` - 実装完了レポート

## 📝 ライセンス

このプロジェクトは個人開発プロジェクトです。

## 🤝 開発

段階的に機能を実装中です。詳細な実装計画は`implementation_plan.md`を参照してください。

---

**現在のステータス**: Phase 2完了 - 判定システムとエンディングシステムが完全に統合され、動作確認済みです。
