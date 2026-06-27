export interface LuckItem {
  title: string
  body: string
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
}
