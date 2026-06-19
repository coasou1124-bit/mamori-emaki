import type { Guardian } from '@/types/guardian'
import { TIER_COLORS } from '@/lib/tierColors'

export default function MessageCard({ guardian }: { guardian: Guardian }) {
  const colors = TIER_COLORS[guardian.tier]

  return (
    <div
      className={`border-l-2 ${colors.border} pl-6 py-2 space-y-4 animate-fade-in-up`}
    >
      <p className={`text-xs tracking-widest font-serif-jp ${colors.text}`}>
        {guardian.name}からの言葉
      </p>
      <blockquote className="text-washi/80 text-sm leading-loose font-serif-jp whitespace-pre-line">
        「{guardian.message}」
      </blockquote>
    </div>
  )
}
