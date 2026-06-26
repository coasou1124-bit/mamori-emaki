import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import { calculateLifePathNumber } from '@/lib/numerology'
import { getGuardianByLifePath, getSubGuardianByMonth } from '@/lib/guardians'

export const dynamic = 'force-dynamic'

const TIER_HEX: Record<string, string> = {
  神獣:   '#d4a843',
  神使:   '#7ab8c5',
  妖異:   '#9b72c8',
  守護霊:  '#7db87d',
}

async function loadJapaneseFont(text: string): Promise<ArrayBuffer[]> {
  const unique = [...new Set(text.split(''))].join('')
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=${encodeURIComponent(unique)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
      }
    ).then((r) => r.text())

    const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(
      (m) => m[1]
    )
    if (urls.length === 0) return []

    return Promise.all(urls.map((url) => fetch(url).then((r) => r.arrayBuffer())))
  } catch {
    return []
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const year  = Number(searchParams.get('y'))
  const month = Number(searchParams.get('m'))
  const day   = Number(searchParams.get('d'))
  const nameParam = searchParams.get('name') ?? ''

  if (!year || !month || !day) {
    return new Response('Bad Request', { status: 400 })
  }

  const lifePathNumber = calculateLifePathNumber(year, month, day)
  const guardian    = getGuardianByLifePath(lifePathNumber)
  const subGuardian = getSubGuardianByMonth(month)

  if (!guardian || !subGuardian) {
    return new Response('Not Found', { status: 404 })
  }

  const isDouble    = guardian.id === subGuardian.id
  const displayName = nameParam ? decodeURIComponent(nameParam) : ''
  const mainColor   = TIER_HEX[guardian.tier]    ?? '#c9a047'
  const subColor    = TIER_HEX[subGuardian.tier] ?? '#c9a047'

  const allText = [
    '護り絵巻', '日本の霊的守護体系', '主守護存在', '副守護存在',
    '守護存在', '二重守護', '主と副、同じ存在に守護される', '極めて稀な組み合わせ',
    'さんの守護存在', 'あなたの守護存在',
    '#守護存在診断', '#護り絵巻',
    guardian.name, guardian.nameReading, guardian.tier, guardian.title,
    subGuardian.name, subGuardian.nameReading, subGuardian.tier, subGuardian.title,
    guardian.message.split('\n')[0],
    displayName,
  ].join('')

  const fontArrays = await loadJapaneseFont(allText)
  const hasFont = fontArrays.length > 0
  const ff = hasFont ? 'NotoSerifJP, serif' : 'serif'

  // ── 装飾用のグラデーションライン ──────────────────────────────
  const goldLine = {
    position: 'absolute' as const,
    left: 0 as const,
    right: 0 as const,
    height: 3,
    background: 'linear-gradient(90deg, transparent 0%, #c9a047 25%, #c9a047 75%, transparent 100%)',
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '44px 72px',
          position: 'relative',
          fontFamily: ff,
        }}
      >
        {/* 上下の金ライン */}
        <div style={{ ...goldLine, top: 0 }} />
        <div style={{ ...goldLine, bottom: 0 }} />

        {/* 左右の縦ライン（装飾） */}
        <div style={{
          position: 'absolute', top: 24, bottom: 24, left: 32, width: 1,
          background: 'linear-gradient(180deg, transparent 0%, #c9a04730 30%, #c9a04730 70%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 24, bottom: 24, right: 32, width: 1,
          background: 'linear-gradient(180deg, transparent 0%, #c9a04730 30%, #c9a04730 70%, transparent 100%)',
        }} />

        {/* ── ヘッダー ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <p style={{ color: '#c9a047', fontSize: 22, letterSpacing: '0.5em', margin: 0 }}>
            護り絵巻
          </p>
          <p style={{ color: 'rgba(240,235,224,0.45)', fontSize: 13, letterSpacing: '0.3em', margin: 0 }}>
            日本の霊的守護体系
          </p>
        </div>

        {/* ── 診断タイトル ── */}
        <p style={{
          color: 'rgba(240,235,224,0.65)',
          fontSize: 18,
          letterSpacing: '0.25em',
          margin: 0,
        }}>
          {displayName ? `${displayName}さんの守護存在` : 'あなたの守護存在'}
        </p>

        {/* ── 守護存在カード 2列 ── */}
        <div style={{ display: 'flex', gap: 28, width: '100%' }}>

          {/* 主守護存在カード */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            flex: 1,
            background: 'rgba(22,29,39,0.95)',
            border: `1px solid ${mainColor}55`,
            padding: '26px 36px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                color: '#0d1117',
                background: mainColor,
                fontSize: 11,
                padding: '4px 12px',
                letterSpacing: '0.35em',
                fontWeight: 700,
              }}>
                {guardian.tier}
              </span>
              <span style={{ color: 'rgba(240,235,224,0.4)', fontSize: 12, letterSpacing: '0.35em' }}>
                主守護存在
              </span>
            </div>

            <p style={{
              color: '#f0ebe0',
              fontSize: 62,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.05,
            }}>
              {guardian.name}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ height: 1, flex: 1, background: `${mainColor}40` }} />
              <p style={{ color: mainColor, fontSize: 14, margin: 0, letterSpacing: '0.15em', opacity: 0.85 }}>
                {guardian.title}
              </p>
              <div style={{ height: 1, flex: 1, background: `${mainColor}40` }} />
            </div>
          </div>

          {/* 副守護存在カード */}
          {isDouble ? (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 14,
              flex: 1,
              background: 'rgba(22,29,39,0.95)',
              border: '1px solid rgba(201,160,71,0.4)',
              padding: '26px 36px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ color: '#c9a047', fontSize: 20, letterSpacing: '0.5em', margin: 0 }}>
                ── 二 重 守 護 ──
              </p>
              <p style={{
                color: 'rgba(240,235,224,0.55)',
                fontSize: 14,
                margin: 0,
                letterSpacing: '0.15em',
                textAlign: 'center',
                lineHeight: 2,
              }}>
                主と副、同じ存在に守護される
              </p>
              <p style={{
                color: 'rgba(240,235,224,0.4)',
                fontSize: 13,
                margin: 0,
                letterSpacing: '0.1em',
              }}>
                極めて稀な組み合わせ
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12,
              flex: 1,
              background: 'rgba(22,29,39,0.95)',
              border: `1px solid ${subColor}55`,
              padding: '26px 36px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  color: '#0d1117',
                  background: subColor,
                  fontSize: 11,
                  padding: '4px 12px',
                  letterSpacing: '0.35em',
                  fontWeight: 700,
                }}>
                  {subGuardian.tier}
                </span>
                <span style={{ color: 'rgba(240,235,224,0.4)', fontSize: 12, letterSpacing: '0.35em' }}>
                  副守護存在
                </span>
              </div>

              <p style={{
                color: '#f0ebe0',
                fontSize: 62,
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.05,
              }}>
                {subGuardian.name}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 1, flex: 1, background: `${subColor}40` }} />
                <p style={{ color: subColor, fontSize: 14, margin: 0, letterSpacing: '0.15em', opacity: 0.85 }}>
                  {subGuardian.title}
                </p>
                <div style={{ height: 1, flex: 1, background: `${subColor}40` }} />
              </div>
            </div>
          )}
        </div>

        {/* ── メッセージ + ハッシュタグ ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{
            color: 'rgba(240,235,224,0.4)',
            fontSize: 14,
            margin: 0,
            letterSpacing: '0.15em',
          }}>
            {guardian.message.split('\n')[0]}
          </p>
          <p style={{
            color: 'rgba(201,160,71,0.55)',
            fontSize: 12,
            margin: 0,
            letterSpacing: '0.2em',
          }}>
            #守護存在診断　#護り絵巻
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontArrays.map((data) => ({
        name: 'NotoSerifJP',
        data,
        style: 'normal' as const,
        weight: 700 as const,
      })),
    }
  )
}
