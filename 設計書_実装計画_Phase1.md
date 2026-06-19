# Phase1 実装計画書
# ── TOPページ + 診断 + 結果表示

作成日：2026-06-16

---

## フォルダ構成

```
uranai-app/
│
├── app/                              # Next.js App Router
│   ├── globals.css                   # グローバルスタイル（背景・フォント変数）
│   ├── layout.tsx                    # フォント設定・メタデータ・共通レイアウト
│   ├── page.tsx                      # TOPページ（Server Component）
│   │
│   ├── shindan/
│   │   └── page.tsx                  # 生年月日入力ページ
│   │
│   └── result/
│       └── page.tsx                  # 結果ページ（searchParams受け取り）
│
├── components/
│   ├── top/
│   │   ├── HeroSection.tsx           # キャッチコピー + CTAボタン
│   │   ├── HowItWorks.tsx            # 3ステップ説明
│   │   └── GuardianGrid.tsx          # 12体の名前一覧チラ見せ
│   │
│   ├── shindan/
│   │   ├── BirthdayForm.tsx          # 入力フォーム（Client Component）
│   │   └── LoadingOverlay.tsx        # ローディング演出（Client Component）
│   │
│   └── result/
│       ├── GuardianReveal.tsx        # 主守護存在メイン表示
│       ├── TalentSection.tsx         # 才能の核・人生テーマ
│       ├── MessageCard.tsx           # 守護存在からの一言
│       └── ShareButtons.tsx          # SNSシェアボタン（Client Component）
│
├── lib/
│   ├── numerology.ts                 # 数秘術計算ロジック
│   └── guardians.ts                  # 12体のデータ定義
│
├── types/
│   └── guardian.ts                   # TypeScript型定義
│
├── public/
│   └── ogp/                          # OGP画像（後で追加）
│
├── tailwind.config.ts                # カラー・フォント設定
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## データフロー設計

### URLパラメータ方式を採用

```
[診断ページ]
ユーザーが生年月日を入力
  ↓
フォームsubmit時に router.push()
  ↓
[結果ページ]
/result?y=1990&m=5&d=15

結果ページ（Server Component）で
  → searchParams を受け取る
  → サーバーサイドで数秘術計算
  → 守護存在データを取得
  → HTML生成・返却
```

**メリット：**
- バックエンド不要（純フロントエンド完結）
- URLを共有すれば同じ結果が再表示される
- Server Componentで計算するのでクライアントに計算ロジックを渡さない

---

## 型定義（types/guardian.ts）

```typescript
export type Tier = '神獣' | '神使' | '妖異' | '守護霊'

export interface Guardian {
  id: string               // 'ryujin' など
  name: string             // '龍神'
  nameReading: string      // 'りゅうじん'
  title: string            // 二つ名：'深淵の主宰者'
  tier: Tier               // 階級
  attributes: string[]     // ['水', '天', '豊穣']
  mission: string          // 魂の使命（1〜2文）
  talents: string[]        // 才能の核 3つ
  lifeThemes: {            // 得意な人生テーマ
    label: string          // '金運・豊かさ'
    rank: '◎' | '○' | '△'
  }[]
  message: string          // 守護存在からの一言（無料・詩的短文）
  color: string            // メインカラー（Tailwindクラス名 or HEX）
  accentColor: string      // アクセントカラー
}

export interface LifePathResult {
  lifePathNumber: number
  guardian: Guardian
}
```

---

## 数秘術計算ロジック（lib/numerology.ts）

```typescript
// 計算仕様：
// 1. 生年月日の全桁を合計
// 2. 11 / 22 / 33 が出たら止める（マスターナンバー）
// 3. それ以外で9より大きければ再度桁を合計
// 4. 1〜9のいずれかになるまで繰り返す

// 例: 1990年5月15日
// 1+9+9+0+0+5+1+5 = 30
// 3+0 = 3 → ライフパスナンバー: 3

// 例: マスターナンバー
// ある日付で合計が29 → 2+9 = 11 → 止める

function sumDigits(n: number): number
function isMasterNumber(n: number): boolean  // 11, 22, 33 の判定
export function calculateLifePathNumber(year, month, day): number
```

---

## 守護存在マッピング（lib/guardians.ts）

```typescript
// ライフパスナンバー → 守護存在ID
const LIFE_PATH_MAP: Record<number, string> = {
  1: 'ryujin',       // 龍神
  2: 'houou',        // 鳳凰
  3: 'kirin',        // 麒麟
  4: 'inarikitsune', // 稲荷狐
  5: 'yatagarasu',   // 八咫烏
  6: 'shirohebi',    // 白蛇
  7: 'kyubi',        // 九尾の狐
  8: 'nekomata',     // 猫又
  9: 'tengu',        // 天狗
  11: 'yukionna',    // 雪女
  22: 'zashikiwarashi', // 座敷童子
  33: 'mamoriOni',   // 護り鬼
}

// 12体分のデータオブジェクト
export const GUARDIANS: Record<string, Guardian>

// メイン取得関数
export function getGuardianByLifePath(n: number): Guardian
```

---

## 画面設計・UI仕様

### カラーパレット

```
背景（メイン）: #0d1117   漆黒
背景（カード）: #161d27   深藍グレー
金（メイン）  : #c9a047   金
金（薄）      : #c9a04726  金20%透過
朱            : #a83232   朱
テキスト白    : #f0ebe0   温白
テキスト薄    : #8a8070   灰金

tierごとの色：
  神獣  : #d4a843（金）
  神使  : #7ab8c5（水青）
  妖異  : #9b72c8（深紫）
  守護霊: #7db87d（翠緑）
```

### フォント

```
日本語: 'Noto Serif JP' (Google Fonts)
  → 和の雰囲気に最も合う
  → weight: 400（本文）/ 700（見出し）

数字・英字: システムフォント fallback
```

### tailwind.config.ts で追加する設定

```typescript
theme: {
  extend: {
    colors: {
      'kin':    '#c9a047',   // 金
      'shu':    '#a83232',   // 朱
      'fukai':  '#0d1117',   // 深黒
      'kard':   '#161d27',   // カード背景
      'washi':  '#f0ebe0',   // 温白（テキスト）
    },
    fontFamily: {
      'serif-jp': ['"Noto Serif JP"', 'serif'],
    },
  }
}
```

---

## 各ページ・コンポーネントの実装内容

### 1. layout.tsx

- Google Fonts（Noto Serif JP）読み込み
- 背景色・基本テキスト色設定
- `<html lang="ja">`
- メタデータ（title・description・OGP）

---

### 2. TOPページ（app/page.tsx）

**構成：**
```
<HeroSection />       ← キャッチコピー + CTAボタン
<HowItWorks />        ← 3ステップ
<GuardianGrid />      ← 12体チラ見せ（名前+階級のみ）
<BottomCTA />         ← 再度CTAボタン（シンプルなコンポーネント）
```

**HeroSection の内容：**
```
生まれた日に、守護は決まっていた。

神獣・神使・妖異・守護霊
日本の霊的守護体系 12体から、
あなたを護る存在を診断します。

[ 無料で診断する → ]

※ 生年月日を入力するだけ。登録不要。
```

**HowItWorks の内容：**
```
STEP 1 生年月日を入力する
STEP 2 守護存在が決まる
STEP 3 結果を受け取る
所要時間：約1分
```

**GuardianGrid の内容：**
```
4行 × 3列グリッド（tier別）
各セル: [tierバッジ] 守護存在名（読み）
```

---

### 3. 診断ページ（app/shindan/page.tsx）

**構成：**
```
<BirthdayForm />       ← Client Component（フォーム本体）
<LoadingOverlay />     ← Client Component（submit後に3秒表示）
```

**BirthdayForm の仕様：**
```
タイトル: 「あなたの守護存在を知る」

入力フィールド:
  年: <select> 1920〜2010年
  月: <select> 1〜12月
  日: <select> 1〜31日（月に合わせて動的変更）

ニックネーム:
  <input type="text" placeholder="任意・ニックネーム可">

送信ボタン: 「守護を呼び覚ます」

バリデーション:
  - 年月日がすべて選択されているか
  - 存在する日付か（例: 2月30日はNG）
  - エラー時はメッセージ表示
```

**LoadingOverlay の仕様：**
```
submit後に全画面オーバーレイ表示
テキスト: 「守護の気配を感じています...」
アニメーション: CSSキーフレームで墨が広がる演出（または波紋）
3秒後に /result?y=&m=&d=&name= に遷移
```

---

### 4. 結果ページ（app/result/page.tsx）

**searchParams 受け取り：**
```typescript
export default function ResultPage({
  searchParams
}: {
  searchParams: { y?: string; m?: string; d?: string; name?: string }
})

// バリデーション: パラメータ不正なら /shindan にリダイレクト
// 計算: calculateLifePathNumber(y, m, d)
// データ取得: getGuardianByLifePath(lifePathNumber)
```

**ページ構成：**

```
─────────────────────────────────
① GuardianReveal      主守護存在メイン表示
② TalentSection       才能の核・人生テーマ
③ MessageCard         守護存在からの一言
④ ShareButtons        SNSシェアボタン
─────────────────────────────────
```

**① GuardianReveal の仕様：**
```
[tierバッジ: 神獣]

  ○○さんの守護存在

    龍神
  深淵の主宰者

  [守護存在の象徴紋 SVG or テキスト装飾]

  守護属性: 水 ・ 天 ・ 豊穣
  ライフパスナンバー: 1

  魂の使命:
  「あらゆる流れを生み出し、
   万物に豊かさをもたらすこと」
```

**② TalentSection の仕様：**
```
龍神の守護を持つあなたの才能

  ▸ 場の流れを読む力
  ▸ 豊かさを引き寄せる引力
  ▸ 決定的な瞬間に力が集まる

得意な人生テーマ
  [ 金運・豊かさ ◎ ]  [ 大きな転機 ◎ ]
```

**③ MessageCard の仕様：**
```
龍神からの言葉

「あなたの中に、深淵の水が流れている。
 それは力だ。
 ただし、水は流れなければ澱む。
 止まることを、恐れてはいけない。」
```

**④ ShareButtons の仕様：**
```
この結果をシェアする

[ X（旧Twitter）で投稿 ]
[ リンクをコピー ]

シェアテキスト（自動生成）:
私の守護存在は【龍神】でした
「深淵の主宰者」── 神獣

あなたの守護存在は？
→ [URL]
#守護存在診断 #護り絵巻
```

---

## 実装ステップ（作業順序）

```
Step 1. Next.js + Tailwind プロジェクト初期化
         npx create-next-app@latest

Step 2. tailwind.config.ts
         カラー・フォント変数を追加

Step 3. types/guardian.ts
         型定義

Step 4. lib/numerology.ts
         数秘術計算関数（テストしやすい純粋関数）

Step 5. lib/guardians.ts
         12体のデータ定義（全量）
         マッピング関数

Step 6. app/globals.css + layout.tsx
         フォント・背景色・基本設定

Step 7. app/page.tsx（TOPページ）
         HeroSection → HowItWorks → GuardianGrid

Step 8. app/shindan/page.tsx
         BirthdayForm + LoadingOverlay

Step 9. app/result/page.tsx
         GuardianReveal → TalentSection → MessageCard → ShareButtons

Step 10. 動作確認・調整
          全ケース（1〜9, 11, 22, 33）の結果表示を確認
```

---

## Phase1 対象外（Phase2以降）

- 副守護存在（誕生月）の表示
- 組み合わせタイトル
- PDF購入CTA・決済
- イラスト・象徴紋の画像
- OGP画像の自動生成
- Analyticsの設置

---

## 確認事項

コーディング開始前に確認させてください：

1. **Node.js / npmは導入済みですか？**
2. **プロジェクトフォルダの場所**
   - このまま `uranai-app/` 内に Next.js を初期化しますか？
   - 別フォルダにしますか？（設計書と分けたい場合）
3. **デプロイ先は決まっていますか？**（Vercel推奨）

問題なければ Step 1 から実装を開始します。
```
