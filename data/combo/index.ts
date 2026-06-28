import { ryujinCombos } from './ryujin'
import { hououCombos } from './houou'
import { kirinCombos } from './kirin'
import { tenguCombos } from './tengu'
import type { ComboReportData } from './types'

export type { ComboReportData, ComboStrength } from './types'

const COMBO_DATA: Record<string, Partial<Record<string, ComboReportData>>> = {
  ryujin: ryujinCombos,
  houou: hououCombos,
  kirin: kirinCombos,
  tengu: tenguCombos,
  // 他の主守護は順次追加予定
}

/**
 * 主守護ID × 副守護ID でコンボコンテンツを取得する。
 * 未実装の組み合わせは null を返し、呼び出し側でフォールバック表示する。
 */
export function getComboContent(mainId: string, subId: string): ComboReportData | null {
  return COMBO_DATA[mainId]?.[subId] ?? null
}
