'use client'

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-fukai z-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-10">
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-kin/40 animate-ripple" />
          <span className="absolute inset-0 rounded-full border border-kin/30 animate-ripple delay-200" />
          <span className="absolute inset-0 rounded-full border border-kin/20 animate-ripple delay-400" />
          <span className="text-kin text-2xl">◈</span>
        </div>

        <div className="space-y-3">
          <p className="text-washi/70 text-base font-serif-jp tracking-widest">
            守護の気配を感じています
          </p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-kin inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
