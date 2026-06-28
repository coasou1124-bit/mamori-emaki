export interface ComboStrength {
  title: string
  body: string
}

export interface ComboReportData {
  id: string                          // "tengu_shirohebi"
  keyword: string                     // 「極めた実力が豊かさへ変わる」
  subtitle: string                    // "木・風と水・金の守護構成"
  catchCopy: string                   // 一言キャッチコピー 20〜40文字
  meaning: string                     // この組み合わせの意味
  strengths: ComboStrength[]          // 強み 3項目
  cautions: string[]                  // 注意すべきこと 2〜3項目
  advice: string                      // 開運の鍵
  jointMessage: string                // 二守護からの共同メッセージ 100〜150文字
}
