const FEATURES = [
  { category: '性格・才能', detail: '守護存在が映す本質的な性格と、開花すべき深層の才能' },
  { category: '恋愛',       detail: '恋愛傾向・相性の良い守護存在・関係性のパターン' },
  { category: '仕事',       detail: '天職の方向性と、仕事で発揮される守護のギフト' },
  { category: '開運',       detail: '2026年の転機と守護存在が示す開運アドバイス' },
  { category: '組み合わせ', detail: '主守護 × 副守護が重なることで生まれる固有の意味' },
  { category: '特別メッセージ', detail: '両守護存在からあなただけへの言葉' },
]

export default function PaidCTA() {
  return (
    <div className="space-y-3 animate-fade-in-up">
      <div className="text-center">
        <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">
          詳 細 鑑 定 書
        </p>
      </div>

      <div className="relative border border-kin/35 bg-kard/80 p-7 space-y-7 overflow-hidden">
        {/* 四隅の装飾 */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-kin/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-kin/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-kin/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-kin/50 pointer-events-none" />

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <p className="text-washi/85 text-xl font-bold font-serif-jp leading-relaxed">
            守護の全貌を、PDF鑑定書で読む
          </p>
          <p className="text-washi/45 text-sm font-serif-jp leading-relaxed">
            主守護存在と副守護存在、2体の詳細と<br />
            144通りの組み合わせが持つ固有の意味をお届けします
          </p>
        </div>

        {/* 特典リスト */}
        <div className="border-t border-kin/10 pt-6 space-y-4">
          <p className="text-washi/25 text-xs tracking-[0.35em] font-serif-jp text-center">
            PDF鑑定書でわかること
          </p>
          <ul className="space-y-4">
            {FEATURES.map((item) => (
              <li key={item.category} className="flex items-start gap-4">
                <span className="text-kin/60 text-xs tracking-widest font-serif-jp shrink-0 mt-0.5 w-16 text-right leading-5">
                  {item.category}
                </span>
                <span className="w-px bg-kin/20 self-stretch shrink-0" />
                <span className="text-washi/60 text-sm font-serif-jp leading-relaxed">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 価格 */}
        <div className="border-t border-kin/10 pt-6 space-y-4 text-center">
          <span className="inline-block bg-shu/70 text-washi/90 text-xs px-5 py-1.5 tracking-[0.35em] font-serif-jp">
            今だけ特別価格
          </span>
          <div className="flex items-baseline justify-center gap-5">
            <span className="text-washi/25 text-sm font-serif-jp line-through decoration-washi/20">
              通常 ¥3,300
            </span>
            <span className="text-kin text-4xl font-bold font-serif-jp tracking-tight">
              ¥1,980
            </span>
          </div>
          <p className="text-washi/25 text-xs font-serif-jp tracking-wide">
            デジタルPDF・購入後すぐに受け取れます
          </p>
        </div>

        {/* CTAボタン */}
        <a
          href="/paid"
          className="block border border-kin/60 bg-kin/8 hover:bg-kin/15 active:bg-kin/20 text-kin text-center text-sm font-serif-jp tracking-[0.35em] py-4 transition-colors duration-200"
        >
          PDF鑑定書を詳しく見る →
        </a>

        <p className="text-washi/20 text-xs text-center font-serif-jp">
          ※ 決済完了後、登録メールアドレスへ即時お届けします
        </p>
      </div>
    </div>
  )
}
