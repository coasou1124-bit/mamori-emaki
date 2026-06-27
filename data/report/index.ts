import { ryujinReport } from './ryujin'
import { hououReport } from './houou'
import { kirinReport } from './kirin'
import { inarikitsuneReport } from './inarikitsune'
import { yatagarasuReport } from './yatagarasu'
import { shirohebiReport } from './shirohebi'
import { kyubiReport } from './kyubi'
import { nekomataReport } from './nekomata'
import { tenguReport } from './tengu'
import { yukionnaReport } from './yukionna'
import { zashikiwarashiReport } from './zashikiwarashi'
import { mamoriOniReport } from './mamoriOni'
import type { GuardianReportData } from './types'

export type { GuardianReportData, LuckItem } from './types'

const REPORT_DATA: Record<string, GuardianReportData> = {
  ryujin: ryujinReport,
  houou: hououReport,
  kirin: kirinReport,
  inarikitsune: inarikitsuneReport,
  yatagarasu: yatagarasuReport,
  shirohebi: shirohebiReport,
  kyubi: kyubiReport,
  nekomata: nekomataReport,
  tengu: tenguReport,
  yukionna: yukionnaReport,
  zashikiwarashi: zashikiwarashiReport,
  mamoriOni: mamoriOniReport,
}

export function getReportContent(guardianId: string): GuardianReportData | null {
  return REPORT_DATA[guardianId] ?? null
}
