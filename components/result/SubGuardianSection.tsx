import type { Guardian } from '@/types/guardian'
import { TIER_COLORS } from '@/lib/tierColors'

interface Props {
  subGuardian: Guardian
  mainGuardian: Guardian
  birthMonth: number
}

const MONTH_LABELS: Record<number, string> = {
  1: '一月', 2: '二月', 3: '三月', 4: '四月',
  5: '五月', 6: '六月', 7: '七月', 8: '八月',
  9: '九月', 10: '十月', 11: '十一月', 12: '十二月',
}

export default function SubGuardianSection({ subGuardian, mainGuardian, birthMonth }: Props) {
  const colors = TIER_COLORS[subGuardian.tier]
  const isDouble = subGuardian.id === mainGuardian.id

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center space-y-1">
        <p className="text-washi/30 text-xs tracking-[0.4em] font-serif-jp">
          副 守 護 存 在
        </p>
        <p className="text-washi/20 text-xs font-serif-jp">
          {MONTH_LABELS[birthMonth]}生まれに宿る
        </p>
      </div>

      {isDouble ? (
        <div className="border border-kin/30 bg-kin/5 p-6 text-center space-y-3">
          <p className="text-kin text-xs tracking-widest font-serif-jp">
            ── 二 重 守 護 ──
          </p>
          <p className="text-washi/70 text-sm leading-loose font-serif-jp">
            あなたを守護する存在は、主と副、どちらも同じ存在でした。
          </p>
          <p className="text-washi/50 text-sm leading-loose font-serif-jp">
            これは極めて稀な「二重守護」の状態です。
            この守護存在はあなたの人生と、深く深く結ばれています。
          </p>
        </div>
      ) : (
        <div className="border border-washi/10 bg-kard p-6 space-y-5">
          <div className="flex items-center gap-4">
            <span
              className={`text-xs tracking-[0.3em] px-3 py-1 border font-serif-jp ${colors.text} ${colors.bg} ${colors.border}`}
            >
              {subGuardian.tier}
            </span>
            <div>
              <p className="text-washi/80 text-xl font-bold font-serif-jp">
                {subGuardian.name}
              </p>
              <p className="text-washi/30 text-xs font-serif-jp">
                {subGuardian.nameReading}
              </p>
            </div>
          </div>

          <p className={`text-sm font-serif-jp ${colors.text}`}>
            ── {subGuardian.title} ──
          </p>

          <div className="space-y-1">
            <p className="text-washi/30 text-xs tracking-widest font-serif-jp">
              守護属性
            </p>
            <p className={`text-sm font-serif-jp ${colors.text}`}>
              {subGuardian.attributes.join('　・　')}
            </p>
          </div>

          <div className="space-y-2 border-t border-washi/10 pt-4">
            <p className="text-washi/30 text-xs tracking-widest font-serif-jp">
              副守護の使命
            </p>
            <p className="text-washi/60 text-sm leading-loose font-serif-jp">
              {subGuardian.mission}
            </p>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-washi/20 text-xs font-serif-jp leading-relaxed">
          主守護存在 × 副守護存在の組み合わせ詳細は<br />
          PDF鑑定書でご確認いただけます
        </p>
      </div>
    </div>
  )
}
