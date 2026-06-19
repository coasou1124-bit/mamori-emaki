import { ALL_GUARDIANS } from '@/lib/guardians'
import { TIER_COLORS, TIER_ORDER } from '@/lib/tierColors'

export default function GuardianGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-kin text-xs tracking-[0.4em] mb-3 font-serif-jp">
          守護存在 12体
        </h2>
        <p className="text-center text-washi/40 text-sm mb-14 font-serif-jp">
          あなたを護る存在は、この12体の中にいます
        </p>

        <div className="space-y-8">
          {TIER_ORDER.map((tier) => {
            const guardiansInTier = ALL_GUARDIANS.filter((g) => g.tier === tier)
            const colors = TIER_COLORS[tier]
            return (
              <div
                key={tier}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
              >
                <div
                  className={`text-xs tracking-[0.3em] font-serif-jp shrink-0 sm:w-16 ${colors.text}`}
                >
                  {tier}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {guardiansInTier.map((g) => (
                    <div
                      key={g.id}
                      className={`border px-4 py-1.5 text-sm font-serif-jp text-washi/70 ${colors.border}`}
                    >
                      {g.name}
                      <span className="text-xs text-washi/30 ml-1.5">
                        （{g.nameReading}）
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
