import type { Guardian } from '@/types/guardian'
import { TIER_COLORS } from '@/lib/tierColors'

const RANK_STYLE: Record<string, string> = {
  '◎': 'text-kin',
  '○': 'text-washi/60',
  '△': 'text-washi/30',
}

export default function TalentSection({ guardian }: { guardian: Guardian }) {
  const colors = TIER_COLORS[guardian.tier]
  const topThemes = guardian.lifeThemes
    .filter((t) => t.rank === '◎' || t.rank === '○')
    .slice(0, 3)

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <h2 className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">
          {guardian.name}の守護を持つあなたの才能
        </h2>
        <div className="space-y-3">
          {guardian.talents.map((talent, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`shrink-0 mt-0.5 ${colors.text}`}>▸</span>
              <p className="text-washi/80 text-sm font-serif-jp leading-relaxed">
                {talent}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">
          得意な人生テーマ
        </h2>
        <div className="flex flex-wrap gap-2">
          {topThemes.map((theme, i) => (
            <span
              key={i}
              className="border border-kin/20 px-3 py-1.5 text-sm font-serif-jp text-washi/70"
            >
              <span className={`mr-2 ${RANK_STYLE[theme.rank]}`}>
                {theme.rank}
              </span>
              {theme.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
