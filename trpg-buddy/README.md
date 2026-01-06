# 記憶のカケラを辿る - バディ同行型・生成AI TRPG

生成AIをGMとしたテキストベースのTRPG。記憶を失ったバディと共に異世界を探索し、「記憶のカケラ」を集めて真実へと迫る。

## 🎮 特徴

- **AI駆動型GM**: Gemini APIによる動的なシナリオ生成
- **レトロCUI**: PC98/MS-DOS風の懐かしいビジュアル
- **バディシステム**: 信頼度により変化するバディの態度
- **判定システム**: アイテムと記憶のカケラによる能力判定
- **記憶のカケラ**: 繰り返しプレイで真実ルートへ到達

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
│   ├── main.ts                 # エントリポイント
│   ├── types.ts                # 型定義
│   ├── game-engine.ts          # ゲームエンジンコア
│   ├── ai-gm/
│   │   └── gemini-client.ts    # Gemini API統合
│   ├── buddy/
│   │   └── trust-manager.ts    # バディ信頼度管理
│   ├── game-flow/
│   │   └── session-controller.ts  # セッション制御
│   ├── save-system/
│   │   └── save-manager.ts     # セーブ/ロード
│   └── ui/
│       ├── retro-cui.css       # レトロCUIスタイル
│       └── main-screen.ts      # メイン画面UI
├── index.html
├── package.json
└── tsconfig.json
```

## 🎯 開発ロードマップ

### Phase 1 (MVP) - 完了
- [x] プロジェクト構造の構築
- [x] 基本的なAI GM統合
- [x] レトロCUIの実装
- [x] セーブ/ロードシステム

### Phase 2 - 進行中
- [ ] 世界テンプレートシステム
- [ ] 判定システム（簡易版）
- [ ] タロットシステム
- [ ] 記憶のカケラ基本実装

### Phase 3 - 予定
- [ ] 判定システム完全版（アイテム能力）
- [ ] 記憶のカケラの能力統合
- [ ] 真実ルートシステム

## 🎲 ゲームシステム（概要）

### セッション構造
- 1セッション = 15〜20ターン
- 1ターン = プレイヤーの入力1回
- クリア/失敗で記憶のカケラを獲得

### バディシステム
- 信頼度: -100〜100
- 信頼度により口調・行動が変化
- 虐待行為は警告→破局エンド

### 判定システム（Phase 2以降）
- 10種類の判定能力（剣術、体術、射撃、隠密、工作、学問、観察、話術、威圧、医術）
- 3段階の難易度（易/中/難）
- アイテムと記憶のカケラで能力を獲得

## 🛠️ 技術スタック

- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Gemini API** - AI GMエンジン
- **LocalStorage** - セーブデータ管理

## 📝 ライセンス

このプロジェクトは個人開発プロジェクトです。

## 🤝 開発

段階的に機能を実装中です。詳細な実装計画は `implementation_plan.md` を参照してください。
