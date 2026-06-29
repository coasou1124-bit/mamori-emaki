import { ryujinCombos } from './ryujin'
import { hououCombos } from './houou'
import { kirinCombos } from './kirin'
import { inarikitsuneCombos } from './inarikitsune'
import { yatagarasuCombos } from './yatagarasu'
import { shirohebiCombos } from './shirohebi'
import { kyubiCombos } from './kyubi'
import { nekoMataCombos } from './nekomata'
import { tenguCombos } from './tengu'
import { yukionnaCombos } from './yukionna'
import { zashikiwarashiCombos } from './zashikiwarashi'
import { mamoriOniCombos } from './mamoriOni'
import type { ComboReportData } from './types'

export type { ComboReportData, ComboStrength } from './types'

const COMBO_DATA: Record<string, Partial<Record<string, ComboReportData>>> = {
  ryujin: ryujinCombos,
  houou: hououCombos,
  kirin: kirinCombos,
  inarikitsune: inarikitsuneCombos,
  yatagarasu: yatagarasuCombos,
  shirohebi: shirohebiCombos,
  kyubi: kyubiCombos,
  nekomata: nekoMataCombos,
  tengu: tenguCombos,
  yukionna: yukionnaCombos,
  zashikiwarashi: zashikiwarashiCombos,
  mamoriOni: mamoriOniCombos,
}

/**
 * 主守護ID × 副守護ID でコンボコンテンツを取得する。
 * 未実装の組み合わせは null を返し、呼び出し側でフォールバック表示する。
 */
export function getComboContent(mainId: string, subId: string): ComboReportData | null {
  return COMBO_DATA[mainId]?.[subId] ?? null
}
