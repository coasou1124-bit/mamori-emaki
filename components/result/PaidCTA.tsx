const FEATURES = [
  'あなたの副守護存在',
  '恋愛傾向',
  '仕事で開花する才能',
  '金運の流れ',
  '相性の良い守護存在',
  '2026年の開運行動',
  '守護存在からの特別メッセージ',
]

export default function PaidCTA() {
  return (
    <div className="border border-shu/30 bg-kard/60 p-6 space-y-6 animate-fade-in-up">
      <p className="text-washi/60 text-sm font-serif-jp leading-loose">
        実はあなたには、もう1体の守護存在がいます。
        <br />
        主守護存在と副守護存在が重なることで、
        <br />
        本来の使命、恋愛傾向、仕事で開花する才能、金運の流れがより深く見えてきます。
      </p>

      <div className="border-t border-shu/10 pt-5 text-center space-y-4">
        <p className="text-shu/70 text-xs tracking-[0.3em] font-serif-jp">
          詳細鑑定書
        </p>
        <p className="text-washi/80 text-lg font-serif-jp leading-relaxed">
          あなたの副守護存在と、
          <br />
          2体が重なる本当の意味を知る
        </p>
      </div>

      <div className="border-t border-shu/10 pt-5 space-y-4">
        <p className="text-washi/40 text-xs tracking-[0.25em] font-serif-jp text-center">
          詳細鑑定書でわかること
        </p>
        <ul className="space-y-3">
          {FEATURES.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-washi/65 text-sm font-serif-jp"
            >
              <span className="text-kin/50 shrink-0 text-base leading-none">・</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center pt-1">
        <span className="inline-block border border-shu/40 text-washi/40 text-sm px-6 py-2.5 font-serif-jp">
          詳細鑑定書は準備中です
        </span>
      </div>
    </div>
  )
}
