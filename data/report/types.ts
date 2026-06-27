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

export interface GuardianReportData {
  id: string
  personality: string
  talents: string
  love: string
  work: string
  money: string
  luckItems: LuckItem[]
  message: string
  fortune2026?: Fortune2026
}
