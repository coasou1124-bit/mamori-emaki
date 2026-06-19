function sumDigits(n: number): number {
  return n
    .toString()
    .split('')
    .reduce((sum, d) => sum + parseInt(d, 10), 0)
}

function isMasterNumber(n: number): boolean {
  return n === 11 || n === 22 || n === 33
}

/**
 * 生年月日からライフパスナンバーを計算する。
 * 全桁を合計し、1桁またはマスターナンバー(11/22/33)になるまで繰り返す。
 *
 * 例: 1990年5月15日
 *   1+9+9+0+0+5+1+5 = 30 → 3+0 = 3
 */
export function calculateLifePathNumber(
  year: number,
  month: number,
  day: number
): number {
  const dateStr =
    year.toString() +
    month.toString().padStart(2, '0') +
    day.toString().padStart(2, '0')

  let sum = dateStr
    .split('')
    .reduce((acc, d) => acc + parseInt(d, 10), 0)

  while (sum > 9 && !isMasterNumber(sum)) {
    sum = sumDigits(sum)
  }

  return sum
}
