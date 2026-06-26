import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import GuardianReveal from '@/components/result/GuardianReveal'
import SubGuardianSection from '@/components/result/SubGuardianSection'
import TalentSection from '@/components/result/TalentSection'
import MessageCard from '@/components/result/MessageCard'
import ShareButtons from '@/components/result/ShareButtons'
import PaidCTA from '@/components/result/PaidCTA'
import { calculateLifePathNumber } from '@/lib/numerology'
import { getGuardianByLifePath, getSubGuardianByMonth } from '@/lib/guardians'

interface SearchParams {
  y?: string
  m?: string
  d?: string
  name?: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  const params = await searchParams
  const { y, m, d, name } = params

  if (!y || !m || !d) {
    return { title: '守護存在診断結果 | 護り絵巻' }
  }

  const displayName = name ? decodeURIComponent(name) : ''
  const ogTitle = displayName
    ? `${displayName}さんの守護存在 | 護り絵巻`
    : '守護存在診断結果 | 護り絵巻'
  const ogImageUrl = `/api/og?y=${y}&m=${m}&d=${d}${name ? `&name=${encodeURIComponent(displayName)}` : ''}`

  return {
    title: ogTitle,
    description: '日本の霊的守護体系12体から、あなたを護る守護存在が決まりました。',
    openGraph: {
      title: ogTitle,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      images: [ogImageUrl],
    },
  }
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const year = Number(params.y)
  const month = Number(params.m)
  const day = Number(params.d)

  const isValidDate =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    year >= 1920 &&
    year <= new Date().getFullYear() &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31

  if (!isValidDate) {
    redirect('/shindan')
  }

  const lifePathNumber = calculateLifePathNumber(year, month, day)
  const guardian = getGuardianByLifePath(lifePathNumber)
  const subGuardian = getSubGuardianByMonth(month)

  if (!guardian || !subGuardian) {
    redirect('/shindan')
  }

  const displayName = params.name ? decodeURIComponent(params.name) : ''

  return (
    <main className="min-h-screen px-5 py-12 md:py-20">
      <div className="max-w-xl mx-auto space-y-10 md:space-y-16">
        <GuardianReveal
          guardian={guardian}
          displayName={displayName}
          lifePathNumber={lifePathNumber}
        />
        <SubGuardianSection
          subGuardian={subGuardian}
          mainGuardian={guardian}
          birthMonth={month}
        />
        <TalentSection guardian={guardian} />
        <MessageCard guardian={guardian} />
        <ShareButtons guardian={guardian} />

        <PaidCTA />

        <div className="text-center space-y-4 pt-8 border-t border-kin/10">
          <Link
            href="/shindan"
            className="block text-washi/40 text-sm font-serif-jp hover:text-washi/70 transition-colors"
          >
            もう一度診断する
          </Link>
          <Link
            href="/"
            className="block text-washi/30 text-xs font-serif-jp hover:text-washi/60 transition-colors"
          >
            TOPへ戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
