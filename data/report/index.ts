import { ryujinReport } from './ryujin'
import { hououReport } from './houou'
import { shirohebiReport } from './shirohebi'
import type { GuardianReportData } from './types'

export type { GuardianReportData, LuckItem } from './types'

const REPORT_DATA: Record<string, GuardianReportData> = {
  ryujin: ryujinReport,
  houou: hououReport,
  shirohebi: shirohebiReport,
}

export function getReportContent(guardianId: string): GuardianReportData | null {
  return REPORT_DATA[guardianId] ?? null
}
