import { redirect } from 'next/navigation'
import Link from 'next/link'
import GuardianReveal from '@/components/result/GuardianReveal'
import TalentSection from '@/components/result/TalentSection'
import MessageCard from '@/components/result/MessageCard'
import ShareButtons from '@/components/result/ShareButtons'
import PaidCTA from '@/components/result/PaidCTA'
import { calculateLifePathNumber } from '@/lib/numerology'
import { getGuardianByLifePath } from '@/lib/guardians'

interface SearchParams {
  y?: string
  m?: string
  d?: string
  name?: string
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

  if (!guardian) {
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
