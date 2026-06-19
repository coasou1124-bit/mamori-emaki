import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* 背景グラデーション */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,160,71,0.06) 0%, transparent 70%)',
        }}
      />

      {/* 装飾ライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kin/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kin/20 to-transparent" />

      <div className="relative z-10 max-w-xl mx-auto space-y-10">
        {/* 上部ラベル */}
        <p className="text-kin text-xs tracking-[0.4em] font-serif-jp opacity-80">
          日本の守護存在診断
        </p>

        {/* メインキャッチコピー */}
        <div className="space-y-3">
          <h1 className="font-serif-jp font-bold leading-tight text-washi"
              style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>
            生まれた日に、<br />
            守護は決まっていた。
          </h1>
        </div>

        {/* サブコピー */}
        <p className="text-washi/60 text-sm md:text-base leading-loose font-serif-jp">
          神獣・神使・妖異・守護霊<br />
          日本の霊的守護体系 12体から、<br />
          あなたを護る存在を診断します。
        </p>

        {/* CTAボタン */}
        <div className="space-y-4">
          <Link
            href="/shindan"
            className="inline-block px-10 py-4 bg-kin text-fukai font-bold text-base font-serif-jp
                       hover:bg-kin-light transition-all duration-300
                       border border-kin hover:border-kin-light"
            style={{ letterSpacing: '0.1em' }}
          >
            無料で診断する →
          </Link>
          <p className="text-washi/30 text-xs font-serif-jp">
            生年月日を入力するだけ。登録不要。
          </p>
        </div>
      </div>

    </section>
  )
}
