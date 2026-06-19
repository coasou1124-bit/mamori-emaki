export type Tier = '神獣' | '神使' | '妖異' | '守護霊'

export interface LifeTheme {
  label: string
  rank: '◎' | '○' | '△'
}

export interface Guardian {
  id: string
  name: string
  nameReading: string
  title: string       // 二つ名
  tier: Tier
  attributes: string[]
  mission: string     // 魂の使命
  talents: string[]   // 才能の核（3つ）
  lifeThemes: LifeTheme[]
  message: string     // 守護存在からの一言
  personality: string // 性格
  symbolMotif: string // 象徴紋のモチーフ
  accentColor: string // 個別アクセントカラー（HEX）
}
