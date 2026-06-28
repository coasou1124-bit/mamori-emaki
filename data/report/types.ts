export interface LuckItem {
  title: string
  body: string
}

export interface Fortune2026 {
  overall: string
  love: string
  work: string
  money: string
  pivotMonths: string
  theme: string
}

// 性格 — 5 フィールド（AI 生成時は 1 フィールドずつプロンプト可）
export interface PersonalityData {
  essence: string       // 本質の性格
  charm: string         // 最大の魅力
  hiddenTalent: string  // 隠れた才能
  caution: string       // 注意点
  growth: string        // 人生で伸びる方向
}

// 才能 — 3 フィールド
export interface TalentsData {
  core: string          // 才能の核心
  activation: string    // 才能を活かす鍵
  expression: string    // 才能の表現
}

// 恋愛 — 5 フィールド
export interface LoveData {
  style: string         // あなたの愛し方
  attracted: string     // 惹かれる相手
  compatible: string    // うまくいく関係
  anxious: string       // 不安になりやすい場面
  advice: string        // 恋愛開運アドバイス
}

// 仕事 — 5 フィールド
export interface WorkData {
  style: string         // あなたの働き方
  activation: string    // 才能の活かし方・向いている職種
  weak: string          // 苦手な環境
  shines: string        // 評価される場面
  sideProject: string   // 副業・発信との相性
}

// 金運 — 5 フィールド
export interface MoneyData {
  incoming: string      // お金の入り方
  spending: string      // 使い方の癖
  saving: string        // 貯め方のポイント
  incomeUp: string      // 収入アップの鍵
  avoid: string         // 避けるべき行動
}

export interface GuardianReportData {
  id: string
  personality: PersonalityData
  talents: TalentsData
  love: LoveData
  work: WorkData
  money: MoneyData
  luckItems: LuckItem[]
  message: string
  fortune2026?: Fortune2026
}
