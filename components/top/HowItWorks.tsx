const STEPS = [
  {
    number: '01',
    title: '生年月日を入力',
    description: '年・月・日を選択するだけ。\nニックネームは任意です。',
  },
  {
    number: '02',
    title: '守護存在が決まる',
    description: '数秘術によって、あなたの\n守護存在が明らかになります。',
  },
  {
    number: '03',
    title: '結果を受け取る',
    description: '守護存在の才能・使命・\nメッセージを確認できます。',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-kard border-y border-kin/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-kin text-xs tracking-[0.4em] mb-16 font-serif-jp">
          診断の流れ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center space-y-4">
              <div className="text-kin/30 text-3xl font-bold font-serif-jp">
                {step.number}
              </div>
              <h3 className="text-washi text-base font-bold font-serif-jp">
                {step.title}
              </h3>
              <p className="text-washi/50 text-sm leading-relaxed whitespace-pre-line font-serif-jp">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-washi/30 text-xs mt-14 font-serif-jp tracking-widest">
          所要時間：約1分
        </p>
      </div>
    </section>
  )
}
