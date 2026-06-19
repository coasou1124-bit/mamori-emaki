import type { Guardian } from '@/types/guardian'
import { TIER_COLORS } from '@/lib/tierColors'
import GuardianImage from '@/components/result/GuardianImage'

interface Props {
  guardian: Guardian
  displayName: string
  lifePathNumber: number
}

export default function GuardianReveal({
  guardian,
  displayName,
  lifePathNumber,
}: Props) {
  const colors = TIER_COLORS[guardian.tier]

  return (
    <div className="text-center space-y-6 animate-fade-in-up">
      <p className="text-washi/50 text-sm font-serif-jp">
        {displayName ? `${displayName}さんの守護存在` : 'あなたの守護存在'}
      </p>

      <div className="flex justify-center">
        <span
          className={`text-xs tracking-[0.4em] px-4 py-1.5 border font-serif-jp ${colors.text} ${colors.bg} ${colors.border}`}
        >
          {guardian.tier}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl md:text-7xl font-bold font-serif-jp shimmer-text">
          {guardian.name}
        </h1>
        <p className="text-washi/30 text-sm font-serif-jp tracking-widest">
          {guardian.nameReading}
        </p>
      </div>

      <div className="border-t border-b border-kin/20 py-4">
        <p className={`text-lg font-serif-jp ${colors.text}`}>
          ── {guardian.title} ──
        </p>
      </div>

      <GuardianImage guardian={guardian} />

      <div className="space-y-2">
        <p className="text-washi/30 text-xs tracking-widest font-serif-jp">
          守護属性
        </p>
        <p className={`text-sm font-serif-jp ${colors.text}`}>
          {guardian.attributes.join('　・　')}
        </p>
      </div>

      <p className="text-washi/20 text-xs font-serif-jp">
        ライフパスナンバー：{lifePathNumber}
      </p>

      <div className="space-y-3 text-left">
        <p className="text-washi/30 text-xs tracking-widest font-serif-jp text-center">
          性格
        </p>
        <p className="text-washi/70 text-sm leading-loose font-serif-jp">
          {guardian.personality}
        </p>
      </div>

      <div className="bg-kard border border-kin/10 p-6 text-left">
        <p className="text-kin/60 text-xs tracking-widest mb-3 font-serif-jp">
          魂の使命
        </p>
        <p className="text-washi/70 text-sm leading-relaxed font-serif-jp">
          {guardian.mission}
        </p>
      </div>
    </div>
  )
}
