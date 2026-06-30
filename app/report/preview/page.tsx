import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { calculateLifePathNumber } from '@/lib/numerology'
import { getGuardianByLifePath, getSubGuardianByMonth, GUARDIANS } from '@/lib/guardians'
import { TIER_COLORS } from '@/lib/tierColors'
import { getReportContent } from '@/data/report'
import { getComboContent } from '@/data/combo'

export const metadata: Metadata = {
  title: '鑑定書プレビュー | 護り絵巻',
  description: 'PDF鑑定書のプレビューです。',
  robots: { index: false, follow: false },
}

const KANJI_MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

// ── 共通パーツ ─────────────────────────────────────────────
const gradientGold = 'linear-gradient(90deg,transparent 0%,#c9a04770 15%,#c9a047 45%,#c9a047 55%,#c9a04770 85%,transparent 100%)'

function guardianImageSrc(id: string): string {
  const map: Record<string, string> = {
    inarikitsune: 'inari',
    zashikiwarashi: 'zashiki',
    mamoriOni: 'mamorioni',
  }
  return `/images/guardians/${map[id] ?? id}.jpg`
}

function GuardianArt({ id, name, color }: { id: string; name: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative mx-auto"
        style={{
          width: '320px',
          height: '220px',
          boxShadow: `0 0 40px ${color}1c, 0 0 12px ${color}0e`,
        }}
      >
        <Image
          src={guardianImageSrc(id)}
          alt={name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          quality={100}
          priority
        />
        <div
          className="absolute inset-0 border pointer-events-none"
          style={{ borderColor: `${color}35` }}
        />
        <div
          className="absolute inset-[4px] border pointer-events-none"
          style={{ borderColor: `${color}12` }}
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-px w-10" style={{ background: `linear-gradient(90deg,transparent,${color}40)` }} />
        <span className="text-[10px] font-serif-jp tracking-[0.45em]" style={{ color: `${color}60` }}>{name}</span>
        <div className="h-px w-10" style={{ background: `linear-gradient(270deg,transparent,${color}40)` }} />
      </div>
    </div>
  )
}

function GoldLine() {
  return <div className="h-[2px] w-full" style={{ background: gradientGold }} />
}

function CornerDeco({ size = 'w-10 h-10', weight = 'border-t-2 border-l-2', color = 'border-kin/35' }) {
  const tl = weight
  const tr = weight.replace('border-l-', 'border-r-')
  const bl = weight.replace('border-t-', 'border-b-')
  const br = bl.replace('border-l-', 'border-r-')
  return (
    <>
      <div className={`absolute top-5 left-5 ${size} ${tl} ${color} pointer-events-none`} />
      <div className={`absolute top-5 right-5 ${size} ${tr} ${color} pointer-events-none`} />
      <div className={`absolute bottom-5 left-5 ${size} ${bl} ${color} pointer-events-none`} />
      <div className={`absolute bottom-5 right-5 ${size} ${br} ${color} pointer-events-none`} />
    </>
  )
}

function Page({ num, chapter, children }: { num: number; chapter: string; children: React.ReactNode }) {
  return (
    <div id={`page-${num}`} className="w-full bg-fukai border border-kin/20 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_4px_12px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.04] overflow-hidden print-page">
      <GoldLine />
      <div className="flex items-center justify-between px-12 py-[18px] border-b border-kin/15">
        <p className="text-kin/50 text-[11px] tracking-[0.5em] font-serif-jp">護り絵巻 公式鑑定書</p>
        <p className="text-washi/30 text-[11px] font-serif-jp tracking-[0.3em]">{chapter}</p>
        <p className="text-washi/25 text-[11px] font-serif-jp">{num} / 13</p>
      </div>
      <div className="px-14 py-12 min-h-[860px] print-page-content">{children}</div>
      <div className="px-12 py-[18px] border-t border-kin/15 flex items-center justify-center gap-4">
        <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,#c9a04752)' }} />
        <span className="text-kin/35 text-xs">✦</span>
        <div className="h-px w-24" style={{ background: 'linear-gradient(270deg,transparent,#c9a04752)' }} />
      </div>
      <GoldLine />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-[3px] h-7 shrink-0 rounded-sm" style={{ background: 'linear-gradient(180deg,#c9a047cc,#c9a04730)' }} />
        <h2 className="text-washi/88 text-2xl font-bold font-serif-jp tracking-[0.04em]">{children}</h2>
      </div>
      <div className="h-px ml-7" style={{ background: 'linear-gradient(90deg,#c9a04760,#c9a04728,transparent)' }} />
    </div>
  )
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-washi/75 text-base font-serif-jp leading-[2.4] ${className}`}>{children}</p>
  )
}

function Dot({ color }: { color: string }) {
  return <span className="shrink-0 mt-[5px]" style={{ color, fontSize: '10px' }}>・</span>
}

function TierBadge({ tier, color }: { tier: string; color: string }) {
  return (
    <span
      className="inline-block text-[11px] tracking-[0.4em] px-5 py-1.5 border font-serif-jp"
      style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
    >
      {tier}
    </span>
  )
}

// ── ページコンポーネント ────────────────────────────────────
export default async function ReportPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ y?: string; m?: string; d?: string }>
}) {
  const params = await searchParams
  const y = Math.max(1900, Math.min(2100, parseInt(params.y ?? '1990', 10) || 1990))
  const m = Math.max(1, Math.min(12, parseInt(params.m ?? '11', 10) || 11))
  const d = Math.max(1, Math.min(31, parseInt(params.d ?? '15', 10) || 15))

  const lifePathNum = calculateLifePathNumber(y, m, d)
  const mainG = getGuardianByLifePath(lifePathNum) ?? GUARDIANS.ryujin
  const subG = getSubGuardianByMonth(m) ?? GUARDIANS.shirohebi

  const mainColor = TIER_COLORS[mainG.tier].hex
  const subColor = TIER_COLORS[subG.tier].hex

  const mainReport = getReportContent(mainG.id)
  const subReport = getReportContent(subG.id)
  const comboReport = getComboContent(mainG.id, subG.id)

  const D = {
    birthdate: `${y}年${m}月${d}日`,
    issuedDate: '2026年6月',
    main: {
      name: mainG.name,
      reading: mainG.nameReading,
      tier: mainG.tier,
      color: mainColor,
      title: mainG.title,
      attrs: mainG.attributes,
      personality: mainG.personality,
      talent: mainG.talents.join('。'),
      mission: mainG.mission,
      message: mainG.message,
    },
    sub: {
      name: subG.name,
      reading: subG.nameReading,
      tier: subG.tier,
      color: subColor,
      title: subG.title,
      attrs: subG.attributes,
      birthMonth: KANJI_MONTHS[m - 1] ?? '一月',
      description: subG.personality,
      mission: subG.mission,
      message: subG.message,
    },
    combo: {
      title: `${mainG.name}と${subG.name}の守護`,
      subtitle: `${mainG.attributes[0]}と${subG.attributes[0]}のエネルギーが重なる守護構成`,
      description: `${mainG.name}と${subG.name}の組み合わせは、144通りの守護構成の中に固有の意味を持ちます。主守護のエネルギーが人生の大きな流れを定め、副守護がその流れの中で縁・財・日常の質を高めていきます。あなたの人生はこの二体の守護のエネルギーによって、静かに、しかし確実に支えられています。`,
      advice: `この守護構成が示す最大の開運キーワードは「${mainG.attributes[0]}と${subG.attributes[0]}の調和」です。主守護${mainG.name}のエネルギーを日常に意識的に取り入れながら、副守護${subG.name}の助力を活かす生き方が、あなたの開運への道です。`,
    },
  }

  return (
    <div className="min-h-screen bg-[#030507] py-14 px-6 print:bg-transparent print:py-0 print:px-0">

      {/* ── ナビ ── */}
      <div className="max-w-[794px] mx-auto mb-7 flex items-center justify-between print:hidden">
        <Link href="/paid" className="text-washi/30 text-xs font-serif-jp hover:text-washi/60 transition-colors">
          ← 商品ページへ戻る
        </Link>
        <p className="text-kin/35 text-[11px] tracking-[0.5em] font-serif-jp">サンプルプレビュー</p>
        <Link
          href="/paid"
          className="text-kin/55 text-xs font-serif-jp border border-kin/30 px-4 py-1.5 hover:border-kin/55 transition-colors"
        >
          購入する →
        </Link>
      </div>

      <div className="max-w-[794px] mx-auto space-y-10 print:max-w-none print:space-y-0">

        {/* ══════════════ p.1 表紙 ══════════════ */}
        <div
          id="page-cover"
          className="w-full bg-fukai border border-kin/28 shadow-[0_24px_80px_rgba(0,0,0,0.97),0_8px_20px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.04] overflow-hidden relative print-page"
          style={{ minHeight: '960px' }}
        >
          <GoldLine />
          <CornerDeco />
          {/* 縦装飾ライン */}
          <div className="absolute top-20 bottom-20 left-14 w-px" style={{ background: 'linear-gradient(180deg,transparent,#c9a04740 25%,#c9a04740 75%,transparent)' }} />
          <div className="absolute top-20 bottom-20 right-14 w-px" style={{ background: 'linear-gradient(180deg,transparent,#c9a04740 25%,#c9a04740 75%,transparent)' }} />
          {/* 中央放射状グロー（守護色）*/}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${D.main.color}14 0%, ${D.main.color}06 40%, transparent 68%)` }}
          />

          <div className="flex flex-col items-center justify-between px-20 py-16" style={{ minHeight: '960px' }}>
            {/* 上部ロゴ */}
            <div className="text-center space-y-2">
              <p className="text-kin/55 text-xs tracking-[0.6em] font-serif-jp">護り絵巻</p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-14 bg-kin/20" />
                <p className="text-washi/20 text-[11px] tracking-[0.4em] font-serif-jp">守護存在 公式鑑定書</p>
                <div className="h-px w-14 bg-kin/20" />
              </div>
            </div>

            {/* メイン */}
            <div className="text-center space-y-7">
              <div className="space-y-3">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.35em]">{D.main.reading}</p>
                <div className="relative py-3">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${D.main.color}22 0%, transparent 65%)` }}
                  />
                  <h1 className="shimmer-text font-bold font-serif-jp leading-none relative" style={{ fontSize: '108px' }}>
                    {D.main.name}
                  </h1>
                </div>
                <p className="text-sm font-serif-jp tracking-widest" style={{ color: D.main.color }}>
                  ── {D.main.title} ──
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-20 bg-kin/20" />
                <TierBadge tier={D.main.tier} color={D.main.color} />
                <div className="h-px w-20 bg-kin/20" />
              </div>
              <div className="space-y-1">
                <p className="text-washi/30 text-sm font-serif-jp">{D.birthdate}</p>
              </div>
            </div>

            {/* 下部 */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-kin/15" />
                <p className="text-washi/20 text-[11px] tracking-[0.3em] font-serif-jp">
                  副守護存在　{D.sub.name}（{D.sub.tier}）
                </p>
                <div className="h-px w-10 bg-kin/15" />
              </div>
              <p className="text-washi/15 text-[11px] font-serif-jp tracking-wider">{D.issuedDate} 発行</p>
            </div>
          </div>
          <GoldLine />
        </div>

        {/* ══════════════ p.2 はじめに ══════════════ */}
        <Page num={2} chapter="はじめに">
          <SectionTitle>はじめに</SectionTitle>
          <div className="space-y-6">
            <Body>
              この鑑定書は、あなたの生年月日から算出した「ライフパスナンバー」と「誕生月」をもとに、日本の霊的守護体系12体の中からあなたを守護する2体の存在を特定し、その意味と使命を詳しく解説したものです。
            </Body>
            <Body>
              主守護存在はあなたの生涯を通じて寄り添う守護であり、あなたの性格・才能・宿命の根幹を形作ります。副守護存在は誕生月に宿るエネルギーで、日常の流れ・縁・恋愛・財の傾向に深く影響を与えます。
            </Body>
            <div className="border-l-2 border-kin/30 pl-6 py-3 my-4">
              <Body className="text-washi/65">
                この書は呪術でも占いでもありません。日本古来の霊的守護体系に基づいた「あなたの本質の読み解き」です。書かれていることは、すでにあなたの中にある資質であり、可能性です。
              </Body>
            </div>
            <Body>
              各章をゆっくりと読み進め、自分自身の中にある守護の力を感じ取ってください。この書があなたの日常に、確かさと守られている感覚をもたらすことを願っています。
            </Body>
            <div className="pt-10 text-center space-y-1">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-kin/15" />
                <span className="text-kin/25 text-xs">✦</span>
                <div className="h-px w-12 bg-kin/15" />
              </div>
              <p className="text-washi/20 text-xs font-serif-jp tracking-widest pt-2">護り絵巻 鑑定師</p>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.3 主守護存在 ══════════════ */}
        <Page num={3} chapter="主守護存在">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-washi/25 text-xs tracking-[0.5em] font-serif-jp">主 守 護 存 在</p>
              <TierBadge tier={D.main.tier} color={D.main.color} />
              <div className="space-y-1">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.3em]">{D.main.reading}</p>
                <h2 className="shimmer-text font-bold font-serif-jp leading-none" style={{ fontSize: '80px' }}>
                  {D.main.name}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20" style={{ background: `${D.main.color}40` }} />
                <p className="text-sm font-serif-jp" style={{ color: D.main.color }}>{D.main.title}</p>
                <div className="h-px w-20" style={{ background: `${D.main.color}40` }} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {D.main.attrs.map((a) => (
                  <span key={a} className="text-washi/40 text-xs font-serif-jp border border-washi/10 px-4 py-1">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="py-5">
              <GuardianArt id={mainG.id} name={D.main.name} color={D.main.color} />
            </div>
            <div className="border-t border-kin/10 pt-7 space-y-5">
              <div>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${D.main.color}80` }}>守護の姿</p>
                <Body>{D.main.personality}</Body>
              </div>
              <div className="bg-kard/60 border p-6" style={{ borderColor: `${D.main.color}18` }}>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${D.main.color}70` }}>魂の使命</p>
                <Body className="text-washi/65">{D.main.mission}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.4 副守護存在 ══════════════ */}
        <Page num={4} chapter="副守護存在">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-washi/25 text-xs tracking-[0.5em] font-serif-jp">副 守 護 存 在</p>
              <p className="text-washi/20 text-xs font-serif-jp">{D.sub.birthMonth}生まれに宿る守護</p>
              <TierBadge tier={D.sub.tier} color={D.sub.color} />
              <div className="space-y-1">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.3em]">{D.sub.reading}</p>
                <h2 className="text-washi/85 font-bold font-serif-jp leading-none" style={{ fontSize: '80px' }}>
                  {D.sub.name}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20" style={{ background: `${D.sub.color}40` }} />
                <p className="text-sm font-serif-jp" style={{ color: D.sub.color }}>{D.sub.title}</p>
                <div className="h-px w-20" style={{ background: `${D.sub.color}40` }} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {D.sub.attrs.map((a) => (
                  <span key={a} className="text-washi/40 text-xs font-serif-jp border border-washi/10 px-4 py-1">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="py-5">
              <GuardianArt id={subG.id} name={D.sub.name} color={D.sub.color} />
            </div>
            <div className="border-t border-kin/10 pt-7 space-y-5">
              <div>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${D.sub.color}80` }}>守護の姿</p>
                <Body>{D.sub.description}</Body>
              </div>
              <div className="bg-kard/60 border p-6" style={{ borderColor: `${D.sub.color}18` }}>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${D.sub.color}70` }}>副守護の使命</p>
                <Body className="text-washi/65">{D.sub.mission}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.5 組み合わせ ══════════════ */}
        <Page num={5} chapter="二守護の組み合わせ">
          <SectionTitle>二守護の組み合わせ</SectionTitle>
          <div className="space-y-7">

            {/* ① 組み合わせ名 ＋ ② キャッチコピー ＋ キーワード */}
            <div className="text-center space-y-3">
              <p className="text-kin/45 text-xs tracking-[0.4em] font-serif-jp">144通りの中のあなたの守護構成</p>
              <h3 className="text-washi/85 text-2xl font-bold font-serif-jp">{D.combo.title}</h3>
              {comboReport ? (
                <>
                  <p className="text-washi/70 text-sm font-serif-jp leading-relaxed">{comboReport.catchCopy}</p>
                  <div className="inline-flex items-center gap-2 px-5 py-1.5 border border-kin/25 bg-kin/5">
                    <span className="text-kin/55 text-[11px]">✦</span>
                    <p className="text-kin/65 text-xs tracking-widest font-serif-jp">{comboReport.keyword}</p>
                    <span className="text-kin/55 text-[11px]">✦</span>
                  </div>
                </>
              ) : (
                <p className="text-washi/55 text-sm font-serif-jp">{D.combo.subtitle}</p>
              )}
            </div>

            {/* 主守護 × 副守護 */}
            <div className="border border-kin/15 bg-kin/[0.03] flex items-center justify-center gap-12 py-8">
              <div className="text-center space-y-2">
                <div
                  className="relative mx-auto mb-4"
                  style={{
                    width: '112px',
                    height: '90px',
                    boxShadow: `0 0 20px ${D.main.color}1a`,
                  }}
                >
                  <Image
                    src={guardianImageSrc(mainG.id)}
                    alt={D.main.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    quality={100}
                  />
                  <div
                    className="absolute inset-0 border pointer-events-none"
                    style={{ borderColor: `${D.main.color}38` }}
                  />
                </div>
                <span className="inline-block text-[11px] tracking-[0.35em] px-4 py-1 border font-serif-jp" style={{ color: D.main.color, borderColor: `${D.main.color}50`, backgroundColor: `${D.main.color}08` }}>
                  主守護
                </span>
                <p className="text-washi/85 text-2xl font-bold font-serif-jp">{D.main.name}</p>
                <p className="text-washi/30 text-[11px] font-serif-jp tracking-wider">{D.main.tier}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-6" style={{ background: 'linear-gradient(90deg,transparent,#c9a04745)' }} />
                <p className="text-kin/50 text-3xl font-bold font-serif-jp">×</p>
                <div className="h-px w-6" style={{ background: 'linear-gradient(90deg,#c9a04745,transparent)' }} />
              </div>
              <div className="text-center space-y-2">
                <div
                  className="relative mx-auto mb-4"
                  style={{
                    width: '112px',
                    height: '90px',
                    boxShadow: `0 0 20px ${D.sub.color}1a`,
                  }}
                >
                  <Image
                    src={guardianImageSrc(subG.id)}
                    alt={D.sub.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    quality={100}
                  />
                  <div
                    className="absolute inset-0 border pointer-events-none"
                    style={{ borderColor: `${D.sub.color}38` }}
                  />
                </div>
                <span className="inline-block text-[11px] tracking-[0.35em] px-4 py-1 border font-serif-jp" style={{ color: D.sub.color, borderColor: `${D.sub.color}50`, backgroundColor: `${D.sub.color}08` }}>
                  副守護
                </span>
                <p className="text-washi/85 text-2xl font-bold font-serif-jp">{D.sub.name}</p>
                <p className="text-washi/30 text-[11px] font-serif-jp tracking-wider">{D.sub.tier}</p>
              </div>
            </div>

            {comboReport ? (
              <>
                {/* ③ この組み合わせの意味 */}
                <div>
                  <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-3">この組み合わせの意味</p>
                  <div className="border border-kin/20 bg-kin/5 p-6">
                    <Body>{comboReport.meaning}</Body>
                  </div>
                </div>

                {/* ④ この組み合わせの強み */}
                <div>
                  <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-4">この組み合わせの強み</p>
                  <div className="space-y-4">
                    {comboReport.strengths.map((s, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 font-serif-jp mt-[3px]" style={{ color: D.main.color, fontSize: '11px' }}>◆</span>
                        <div>
                          <p className="text-washi/75 text-sm font-serif-jp font-bold mb-1">{s.title}</p>
                          <Body>{s.body}</Body>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ⑤ 注意すべきこと */}
                <div>
                  <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-3">注意すべきこと</p>
                  <div className="bg-kard/60 border border-washi/8 p-5 space-y-3">
                    {comboReport.cautions.map((c, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <Dot color={`${D.sub.color}90`} />
                        <Body className="text-washi/68">{c}</Body>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ⑥ 開運の鍵 */}
                <div>
                  <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-3">開運の鍵</p>
                  <Body>{comboReport.advice}</Body>
                </div>

                {/* ⑦ 二守護からの共同メッセージ */}
                <div className="relative border border-kin/28 bg-kard/90 p-8 space-y-5">
                  <div className="absolute inset-[5px] border border-kin/10 pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,${D.main.color}50)` }} />
                    <p className="text-kin/55 text-[11px] tracking-[0.35em] font-serif-jp whitespace-nowrap">
                      {D.main.name}と{D.sub.name}からのメッセージ
                    </p>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(270deg,transparent,${D.sub.color}50)` }} />
                  </div>
                  <p className="text-washi/78 text-sm font-serif-jp leading-[2.4] whitespace-pre-line">{comboReport.jointMessage}</p>
                </div>
              </>
            ) : (
              <>
                {/* フォールバック：コンボデータ未実装時の動的テキスト */}
                <div className="border border-kin/20 bg-kin/5 p-7">
                  <Body>{D.combo.description}</Body>
                </div>
                <div className="space-y-3">
                  <p className="text-kin/55 text-xs tracking-widest font-serif-jp">この組み合わせの開運の鍵</p>
                  <Body>{D.combo.advice}</Body>
                </div>
              </>
            )}
          </div>
        </Page>

        {/* ══════════════ p.6 性格と才能 ══════════════ */}
        <Page num={6} chapter="性格と才能">
          <SectionTitle>性格と才能</SectionTitle>
          <div className="space-y-7">
            <div>
              <p className="text-kin/55 text-xs tracking-widest font-serif-jp mb-4">本質の性格</p>
              {mainReport ? (
                <div className="space-y-5">
                  {([
                    ['本質の性格', mainReport.personality.essence],
                    ['最大の魅力', mainReport.personality.charm],
                    ['隠れた才能', mainReport.personality.hiddenTalent],
                    ['注意点', mainReport.personality.caution],
                    ['伸びる方向', mainReport.personality.growth],
                  ] as [string, string][]).map(([label, text]) => (
                    <div key={label}>
                      <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-1">{label}</p>
                      <Body>{text}</Body>
                    </div>
                  ))}
                </div>
              ) : <Body>{D.main.personality}</Body>}
            </div>
            <div className="border-t border-kin/10 pt-6">
              <p className="text-kin/55 text-xs tracking-widest font-serif-jp mb-4">開花する才能</p>
              {mainReport ? (
                <div className="space-y-4">
                  {([
                    ['才能の核心', mainReport.talents.core],
                    ['才能を活かす鍵', mainReport.talents.activation],
                    ['才能の表現', mainReport.talents.expression],
                  ] as [string, string][]).map(([label, text]) => (
                    <div key={label}>
                      <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-1">{label}</p>
                      <Body>{text}</Body>
                    </div>
                  ))}
                </div>
              ) : <Body>{D.main.talent}</Body>}
            </div>
            <div className="bg-kard/50 border border-kin/10 p-6 space-y-3">
              <p className="text-washi/25 text-xs tracking-widest font-serif-jp">{D.sub.name}の副守護が加わることで</p>
              <Body className="text-washi/70">
                {D.main.name}の力に、{D.sub.name}の{D.sub.attrs[0]}のエネルギーが加わることで、あなたの才能はさらに人とのつながりの中で輝きます。一人で考えるよりも、誰かとの対話の中で最良のアイデアが生まれる傾向があります。良質な縁を大切にすることが、あなたの才能を最大限に活かす鍵です。
              </Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.7 恋愛傾向 ══════════════ */}
        <Page num={7} chapter="恋愛傾向">
          <SectionTitle>恋愛傾向</SectionTitle>
          <div className="space-y-7">
            {mainReport ? (
              <div className="space-y-5">
                {([
                  ['あなたの愛し方', mainReport.love.style],
                  ['惹かれる相手', mainReport.love.attracted],
                  ['うまくいく関係', mainReport.love.compatible],
                  ['不安になりやすい場面', mainReport.love.anxious],
                  ['恋愛開運アドバイス', mainReport.love.advice],
                ] as [string, string][]).map(([label, text]) => (
                  <div key={label}>
                    <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-1">{label}</p>
                    <Body>{text}</Body>
                  </div>
                ))}
              </div>
            ) : (
              <Body>{`${D.main.name}に守護されたあなたの恋愛は「${D.main.attrs[0]}と${D.main.attrs[1]}」がキーワードです。魂の深いところで共鳴できる相手を無意識に求めています。`}</Body>
            )}
            <Body>
              {D.sub.name}の副守護が加わることで、縁の引き寄せ力が高まります。気づけば自然と出会いが増える時期と、まったく縁が来ない時期のメリハリがはっきりしているのも特徴です。縁が来ている時期は積極的に、来ていない時期は内省の時間として過ごすのが守護のリズムに合います。
            </Body>
            <div className="border-t border-kin/10 pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-kin/55 text-xs tracking-widest font-serif-jp">相性の良い守護存在</p>
                <ul className="space-y-2">
                  {mainG.lifeThemes.map((t) => (
                    <li key={t.label} className="text-washi/70 text-sm font-serif-jp flex gap-2 items-start">
                      <Dot color={D.main.color} />{t.label}（{t.rank}）
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-washi/30 text-xs tracking-widest font-serif-jp">注意が必要な傾向</p>
                <ul className="space-y-2">
                  {mainG.talents.map((t) => (
                    <li key={t} className="text-washi/62 text-sm font-serif-jp flex gap-2 items-start">
                      <Dot color="#ffffff33" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.8 仕事運 ══════════════ */}
        <Page num={8} chapter="仕事運">
          <SectionTitle>仕事運</SectionTitle>
          <div className="space-y-7">
            {mainReport ? (
              <div className="space-y-5">
                {([
                  ['あなたの働き方', mainReport.work.style],
                  ['才能の活かし方', mainReport.work.activation],
                  ['苦手な環境', mainReport.work.weak],
                  ['評価される場面', mainReport.work.shines],
                  ['副業・発信との相性', mainReport.work.sideProject],
                ] as [string, string][]).map(([label, text]) => (
                  <div key={label}>
                    <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-1">{label}</p>
                    <Body>{text}</Body>
                  </div>
                ))}
              </div>
            ) : (
              <Body>{`${D.main.name}の守護を受けたあなたの仕事運は「${D.main.attrs[0]}の力を活かすとき」に最も輝きます。安定した組織の中で守備範囲を守るよりも、新しいプロジェクトの立ち上げや、未開拓の領域に挑戦するときにエネルギーが最大化します。`}</Body>
            )}
            <div className="border-l-2 pl-5 py-2 space-y-2" style={{ borderColor: `${D.main.color}50` }}>
              <p className="text-xs tracking-widest font-serif-jp" style={{ color: `${D.main.color}80` }}>最も輝く仕事環境</p>
              <Body className="text-washi/70">
                {D.main.mission}
              </Body>
            </div>
            <Body>
              {D.sub.name}の副守護が仕事面でもたらすのは「{D.sub.attrs[0]}による発展」です。人脈や紹介を通じて仕事が広がることが多く、良質な縁を丁寧に育てることが長期的な成功につながります。
            </Body>
            <div className="bg-kard/50 border border-kin/10 p-6">
              <p className="text-kin/55 text-xs tracking-widest font-serif-jp mb-3">2026年の仕事のポイント</p>
              <Body className="text-washi/60">
                {mainReport?.fortune2026?.work ?? `2026年は${D.main.name}のエネルギーが仕事面で大きく動く年。新しいつながりを通じて機会が広がり、後半に向けて具体的な成果として形になってくるでしょう。`}
              </Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.9 金運 ══════════════ */}
        <Page num={9} chapter="金運">
          <SectionTitle>金運</SectionTitle>
          <div className="space-y-7">
            {mainReport ? (
              <div className="space-y-5">
                {([
                  ['お金の入り方', mainReport.money.incoming],
                  ['使い方の癖', mainReport.money.spending],
                  ['貯め方のポイント', mainReport.money.saving],
                  ['収入アップの鍵', mainReport.money.incomeUp],
                  ['避けるべき行動', mainReport.money.avoid],
                ] as [string, string][]).map(([label, text]) => (
                  <div key={label}>
                    <p className="text-kin/55 text-[11px] tracking-widest font-serif-jp mb-1">{label}</p>
                    <Body>{text}</Body>
                  </div>
                ))}
              </div>
            ) : (
              <Body>{`${D.main.name}の守護と${D.sub.name}の守護が重なるこの組み合わせは、金運において特に「縁を通じた豊かさ」が強調されます。ひとりで稼ぐことよりも、誰かとの協力・パートナーシップ・紹介を通じた収入の流れが自然に広がる傾向があります。`}</Body>
            )}
            <Body>
              {D.sub.name}の守護はあなたに{D.sub.attrs[0]}と{D.sub.attrs[1]}の感覚をもたらします。金銭に対する直感が鋭く、「今はこの流れに乗るべき」という感覚が金運のシグナルになることがあります。その直感を信頼することが、守護を活かす鍵です。
            </Body>
            <div className="border-t border-kin/10 pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-kin/55 text-xs tracking-widest font-serif-jp">金運を高める行動</p>
                <ul className="space-y-2">
                  {['縁を大切にする場所を訪れる', `${D.main.attrs[0]}のエネルギーを意識する`, '財布を定期的に整理する', '大切な人への感謝を行動で示す'].map((t) => (
                    <li key={t} className="text-washi/70 text-sm font-serif-jp flex gap-2 items-start">
                      <Dot color={D.main.color} />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-washi/30 text-xs tracking-widest font-serif-jp">避けると良いこと</p>
                <ul className="space-y-2">
                  {['焦りからの衝動的な出費', '縁のない話への安易な乗り込み', '流れに逆らう強引な投資'].map((t) => (
                    <li key={t} className="text-washi/62 text-sm font-serif-jp flex gap-2 items-start">
                      <Dot color="#ffffff30" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.10 開運アドバイス ══════════════ */}
        <Page num={10} chapter="開運アドバイス">
          <SectionTitle>開運アドバイス</SectionTitle>
          <div className="space-y-8">
            <Body>
              {D.main.name}と{D.sub.name}の二重守護を持つあなたへの最大の開運アドバイスは「{D.main.attrs[0]}と{D.sub.attrs[0]}の流れに乗ること」です。この2体の守護存在は、あなたが自然な流れを選ぶとき、最もよく働きます。
            </Body>
            <div className="space-y-5">
              {(mainReport?.luckItems ?? [
                { title: '場の選択',  body: `${D.main.name}のエネルギーが宿る場所を定期的に訪れると守護エネルギーが補充されます。節目節目に守護存在と縁のある場所を訪れることで、エネルギーの流れを整えましょう。` },
                { title: '色の活用',  body: `${D.main.name}の色「${D.main.attrs[0]}」、${D.sub.name}の色「${D.sub.attrs[0]}」を日常に取り入れましょう。アクセサリー・財布・手帳の色を意識するだけで、守護の感応が高まります。` },
                { title: '時間の感覚', body: '直感が来たら48時間以内に動くことを習慣にしてください。守護のエネルギーは「タイミング」を重視します。後回しにすると流れが変わってしまうことがあります。' },
                { title: '縁を育てる', body: `${D.sub.name}守護は縁の積み重ねで強化されます。大切な人への連絡・感謝・贈り物などの小さな行動が、長期的な金運と対人運を底上げします。` },
              ]).map(({ title, body }) => (
                <div key={title} className="flex gap-5 items-start">
                  <p className="text-kin/50 text-xs font-serif-jp tracking-widest shrink-0 w-16 text-right mt-1">{title}</p>
                  <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                  <Body className="flex-1">{body}</Body>
                </div>
              ))}
            </div>
          </div>
        </Page>

        {/* ══════════════ p.11 2026年の運勢 ══════════════ */}
        <Page num={11} chapter="2026年の運勢">
          <SectionTitle>2026年の運勢</SectionTitle>
          {mainReport?.fortune2026 ? (
            <div className="space-y-7">
              <div className="border border-kin/20 bg-kin/5 p-6 space-y-2">
                <p className="text-kin/60 text-xs tracking-widest font-serif-jp">2026年 全体運</p>
                <Body className="text-washi/65">{mainReport.fortune2026.overall}</Body>
              </div>
              <div className="space-y-4">
                {[
                  { label: '恋愛運', text: mainReport.fortune2026.love },
                  { label: '仕事運', text: mainReport.fortune2026.work },
                  { label: '金運',   text: mainReport.fortune2026.money },
                ].map(({ label, text }) => (
                  <div key={label} className="flex gap-5 items-start">
                    <p className="text-kin/50 text-xs font-serif-jp shrink-0 w-20 text-right mt-1">{label}</p>
                    <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                    <Body className="text-washi/70 flex-1">{text}</Body>
                  </div>
                ))}
              </div>
              <div className="border-t border-kin/10 pt-5 space-y-3">
                <div className="flex gap-5 items-start">
                  <p className="text-kin/55 text-xs font-serif-jp shrink-0 w-20 text-right mt-1">転機の月</p>
                  <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                  <Body className="text-washi/60 flex-1">{mainReport.fortune2026.pivotMonths}</Body>
                </div>
                <div className="flex gap-5 items-start">
                  <p className="text-kin/55 text-xs font-serif-jp shrink-0 w-20 text-right mt-1">年のテーマ</p>
                  <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                  <Body className="text-washi/60 flex-1">{mainReport.fortune2026.theme}</Body>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              <div className="border border-kin/20 bg-kin/5 p-6 space-y-2">
                <p className="text-kin/60 text-xs tracking-widest font-serif-jp">2026年 総括</p>
                <Body className="text-washi/65">
                  2026年はあなたにとって「転機の年」です。{D.main.name}のエネルギーが外向きに大きく広がり、{D.sub.name}が縁の糸を次々と紡いでいく年。自分から動くよりも、呼ばれる場所・紹介される人・偶然の再会を大切にしてください。
                </Body>
              </div>
              <div className="space-y-4">
                {[
                  { period: '1〜3月',  note: '内省と準備の時期。焦らず、来る波に備える。守護が内に力を蓄えています。' },
                  { period: '4〜6月',  note: '縁が動き始める。出会いと紹介を大切に。新しいプロジェクトの芽が出る。' },
                  { period: '7〜9月',  note: `最大の活動期。${D.main.name}のエネルギーがピーク。大きな決断・行動に適した時期。` },
                  { period: '10〜12月', note: `結実と感謝の時期。今年育てた縁が形になる。${D.sub.name}の守護が財と縁を引き寄せる。` },
                ].map(({ period, note }) => (
                  <div key={period} className="flex gap-5 items-start">
                    <p className="text-kin/50 text-xs font-serif-jp shrink-0 w-16 text-right mt-1">{period}</p>
                    <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                    <Body className="text-washi/70 flex-1">{note}</Body>
                  </div>
                ))}
              </div>
              <div className="border-t border-kin/10 pt-5">
                <Body className="text-washi/62">
                  2026年の守護のメッセージは「焦るな、しかし止まるな」。ゆっくりと確かに、あなたの人生は今、大きな転換点へと向かっています。
                </Body>
              </div>
            </div>
          )}
        </Page>

        {/* ══════════════ p.12 守護存在からの手紙 ══════════════ */}
        <Page num={12} chapter="守護存在からの手紙">
          <SectionTitle>守護存在からの手紙</SectionTitle>
          <div className="space-y-12">
            {/* 主守護 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span
                  className="inline-block text-[11px] tracking-[0.3em] px-5 py-1.5 border font-serif-jp"
                  style={{ color: D.main.color, borderColor: `${D.main.color}55`, backgroundColor: `${D.main.color}08` }}
                >
                  主守護 · {D.main.name}より
                </span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${D.main.color}35,transparent)` }} />
              </div>
              <div className="border-l-[2px] pl-8 py-3 space-y-4" style={{ borderColor: `${D.main.color}60` }}>
                <Body className="text-washi/78 whitespace-pre-line">{mainReport?.message ?? D.main.message}</Body>
              </div>
            </div>
            {/* 副守護 */}
            <div className="space-y-6 border-t border-kin/10 pt-10">
              <div className="flex items-center gap-4">
                <span
                  className="inline-block text-[11px] tracking-[0.3em] px-5 py-1.5 border font-serif-jp"
                  style={{ color: D.sub.color, borderColor: `${D.sub.color}55`, backgroundColor: `${D.sub.color}08` }}
                >
                  副守護 · {D.sub.name}より
                </span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${D.sub.color}35,transparent)` }} />
              </div>
              <div className="border-l-[2px] pl-8 py-3 space-y-4" style={{ borderColor: `${D.sub.color}60` }}>
                <Body className="text-washi/75 whitespace-pre-line">{subReport?.message ?? D.sub.message}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.13 お守りページ ══════════════ */}
        <div
          id="page-13"
          className="w-full bg-fukai border border-kin/28 shadow-[0_24px_80px_rgba(0,0,0,0.97),0_8px_20px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.04] overflow-hidden relative print-page print-page-last"
          style={{ minHeight: '900px' }}
        >
          <GoldLine />
          <CornerDeco size="w-14 h-14" weight="border-t-[1px] border-l-[1px]" color="border-kin/28" />

          {/* 和紙テクスチャ（極薄横縞）*/}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(240,235,224,0.018) 0px, rgba(240,235,224,0.018) 1px, transparent 1px, transparent 6px)',
            }}
          />

          {/* 多層放射状グロー */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${D.main.color}18 0%, ${D.main.color}07 45%, transparent 70%)` }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c9a04718 0%, transparent 70%)' }}
          />

          {/* 縦装飾ライン */}
          <div className="absolute top-16 bottom-16 left-12 w-px pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,#c9a04730 20%,#c9a04730 80%,transparent)' }}
          />
          <div className="absolute top-16 bottom-16 right-12 w-px pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,#c9a04730 20%,#c9a04730 80%,transparent)' }}
          />

          <div
            className="flex flex-col items-center justify-center text-center space-y-10 px-16 py-16"
            style={{ minHeight: '900px' }}
          >
            <p className="text-washi/22 text-[11px] tracking-[0.6em] font-serif-jp">お 守 り ペ ー ジ</p>

            {/* 守護名（グロー付き）*/}
            <div className="space-y-5">
              <p className="text-washi/22 text-xs tracking-[0.4em] font-serif-jp">{D.main.reading}</p>
              <div className="relative">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${D.main.color}28 0%, transparent 60%)` }}
                />
                <p className="shimmer-text font-bold font-serif-jp leading-none relative" style={{ fontSize: '110px' }}>
                  {D.main.name}
                </p>
              </div>
              <p className="font-serif-jp tracking-[0.15em] text-sm" style={{ color: D.main.color }}>
                {D.main.title}
              </p>
            </div>

            {/* 印章（守護印影）*/}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-[100px] h-[100px] rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${D.main.color}14 0%, transparent 70%)` }}
              />
              <div
                className="w-[60px] h-[60px] rounded-full border flex items-center justify-center relative"
                style={{ borderColor: `${D.main.color}50`, backgroundColor: `${D.main.color}06` }}
              >
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center"
                  style={{ borderColor: `${D.main.color}32` }}
                >
                  <span className="font-serif-jp font-bold" style={{ fontSize: '18px', color: `${D.main.color}72` }}>護</span>
                </div>
              </div>
            </div>

            {/* 副守護 */}
            <div className="flex items-center gap-8">
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg,transparent,#c9a04732)' }} />
              <div className="text-center space-y-2">
                <p className="text-washi/22 text-[11px] font-serif-jp tracking-[0.4em]">× 副守護</p>
                <p className="text-washi/68 text-xl font-bold font-serif-jp">{D.sub.name}</p>
                <p className="text-washi/22 text-[11px] font-serif-jp tracking-wider">{D.sub.tier}</p>
              </div>
              <div className="h-px w-20" style={{ background: 'linear-gradient(270deg,transparent,#c9a04732)' }} />
            </div>

            {/* 守護の言葉（二重縁フレーム）*/}
            <div className="relative border border-kin/25 px-12 py-8 max-w-sm w-full space-y-4">
              <div className="absolute inset-[5px] border border-kin/10 pointer-events-none" />
              <p className="text-kin/52 text-xs tracking-[0.4em] font-serif-jp">守 護 の 言 葉</p>
              <Body className="text-washi/72">
                {(mainReport?.message ?? D.main.message).split('\n')[0]}<br />
                {(subReport?.message ?? D.sub.message).split('\n')[0]}<br />
                あなたは守られている。
              </Body>
            </div>

            {/* 発行日 + 護り絵巻マーク */}
            <div className="space-y-3">
              <p className="text-washi/18 text-[11px] font-serif-jp tracking-wider">{D.issuedDate} 発行</p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a04720)' }} />
                <span className="text-kin/22 text-[10px]">✦</span>
                <p className="text-washi/15 text-[10px] font-serif-jp tracking-[0.4em]">護り絵巻</p>
                <span className="text-kin/22 text-[10px]">✦</span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(270deg,transparent,#c9a04720)' }} />
              </div>
            </div>
          </div>
          <GoldLine />
        </div>

        {/* ── 購入CTA ── */}
        <div className="text-center space-y-5 py-10 print:hidden">
          <p className="text-washi/30 text-sm font-serif-jp">
            あなたの守護 :{' '}
            <span className="text-washi/60">{D.main.name}</span>
            <span className="text-washi/30 text-xs mx-2">×</span>
            <span className="text-washi/60">{D.sub.name}</span>
          </p>
          <p className="text-washi/20 text-xs font-serif-jp leading-relaxed">
            あなたの守護存在に合わせた鑑定書は、下記よりお求めいただけます
          </p>
          <Link
            href="/paid"
            className="inline-block border border-kin/60 bg-kin/8 hover:bg-kin/15 text-kin text-sm font-serif-jp tracking-[0.35em] px-12 py-4 transition-colors duration-200"
          >
            PDF鑑定書を購入する →
          </Link>
        </div>

      </div>
    </div>
  )
}
