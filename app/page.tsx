import Link from 'next/link'
import HeroSection from '@/components/top/HeroSection'
import HowItWorks from '@/components/top/HowItWorks'
import GuardianGrid from '@/components/top/GuardianGrid'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <GuardianGrid />

      <section className="py-24 px-6 text-center">
        <p className="text-washi text-lg font-serif-jp mb-8">
          あなたの守護存在を知る
        </p>
        <Link
          href="/shindan"
          className="inline-block px-10 py-4 bg-kin text-fukai font-bold text-base font-serif-jp
                     hover:bg-kin-light transition-all duration-300
                     border border-kin hover:border-kin-light"
        >
          無料で診断する →
        </Link>
      </section>
    </main>
  )
}
