# Phase 3 実装詳細

最終更新: 2026-01-06

## 実装完了項目

### 1. 記憶のカケラシステム（基礎）

#### 概要

エンディング達成時にカケラを獲得し、次回プレイ時にカケラから得た能力をバディに付与するメタ進行システム。

#### データ構造

**12個の記憶のカケラ**（6世界 × 2種類）

| 世界 | Perfectカケラ | Normalカケラ |
|------|--------------|-------------|
| 荒涼の砂漠オアシス | 調停者の記憶 | 砂塵の絆 |
| 混沌の不思議国 | 女王の冠 | 鏡の真実 |
| 永遠の全寮制学校 | 脱出の鍵 | 拒絶の意志 |
| ネオン・ディストピア | 統合の光 | 暴露の真実 |
| 弁舌の帝国 | 弁論の勝利 | 尊敬の証 |
| 見捨てられた島 | 救世の光 | 希望の種 |

**3つの真実ルート**

- **和解の道** - 対立を和解へ導く力（4個のPerfectカケラ必要）
- **絆の道** - バディとの絆を深める（4個のNormalカケラ必要）
- **真実の道** - 真実を見抜き自由を得る（Perfect/Normal混合4個）

#### 実装ファイル

```
src/memory-fragments/
├── fragments.ts          # 12個のカケラデータ定義
├── truth-routes.ts       # 3つの真実ルート定義
└── award-logic.ts        # 授与・能力付与・復元ロジック
```

#### データフロー

1. **エンディング達成** → `awardFragment()` でカケラ授与
2. **能力付与** → `grantAbilitiesFromFragments()` でバディに能力追加
3. **永続化** → `SaveManager.addCollectedFragment()` でギャラリーに保存
4. **次回プレイ** → `restoreAbilitiesFromGallery()` で能力復元

#### Repository パターン

```typescript
// ビジネスロジック層は SaveManager のインターフェースのみに依存
award-logic.ts → SaveManager → LocalStorage/SQL DB
```

**メリット**:
- SQL移行時は`SaveManager`の実装のみ変更
- ユーザー認証対応も同様に容易
- テスト可能性の向上

---

### 2. シーン進行システムの改善

#### 変更内容

**20ターン強制終了ロジックを削除**（`session-controller.ts`）

**理由**:
- シーンベース進行システムと矛盾
- 物語の自然な展開を妨げる

#### 現在の進行管理

完全に**Scene Manager**で管理：

| シーンタイプ | 目標ターン数 | 役割 |
|------------|------------|------|
| Introduction | 3-5 | 導入・世界観提示 |
| Exploration | 3-7 | 探索・情報収集 |
| Conflict | 4-7 | 試練・判定チャレンジ |
| Climax | 4-8 | クライマックス・クリア条件挑戦 |
| Resolution | 2-4 | 解決・エンディング導入 |

**遷移条件**:
- シーン進行度100%到達
- 目標ターン+4の猶予期間超過
- 累積進行度80以上でResolutionへ

---

## 技術的な決定事項

### TypeScript環境変数対応

**問題**: `import.meta.env`でTypeScriptエラー

**解決**: `src/vite-env.d.ts`を作成

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 未実装項目（Phase 3後半）

1. **ギャラリー画面UI** - 収集したカケラの視覚的表示
2. **真実ルート判定UI** - 解放状況の表示
3. **タロットシステム** - プレイヤーへのヒント提供
4. **アイテムによる判定難易度変更** - インベントリアイテムの能力統合

---

## 開発プラクティス

### ビルド＆実行

```bash
# ビルド
npm run build

# 開発サーバー起動
npm run dev
# → http://localhost:5173
```

### 動作確認方法

1. 新規ゲーム開始
2. Normal/Perfectエンディング到達
3. ブラウザ開発者ツール（F12）でコンソール確認
   - `💎 記憶のカケラ獲得: [カケラ名]` のログ
4. ページリロード → 新規ゲーム開始
5. `🔄 Restored X fragments from gallery` のログ確認

### 将来の拡張性

- **SQL移行**: `SaveManager`の実装のみ変更
- **ユーザー認証**: SaveManager層にAPI連携追加
- **マルチプレイヤー**: バックエンドAPI経由でデータ管理

---

## アーキテクチャ図

```
┌─────────────────────────────────────┐
│     Game Engine & Business Logic    │
│  (award-logic, game-engine, etc.)   │
└──────────────┬──────────────────────┘
               │ Interface
┌──────────────▼──────────────────────┐
│         SaveManager (Repository)    │
│  - addCollectedFragment()           │
│  - getCollectedFragments()          │
└──────────────┬──────────────────────┘
               │ Implementation
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐         ┌──────▼─────┐
│LocalStg│         │  SQL + API │
│(現在)  │         │  (将来)    │
└────────┘         └────────────┘
```
