import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '守護存在 詳細鑑定書 | 護り絵巻',
  description:
    '主守護存在と副守護存在、144通りの組み合わせが持つ意味を。性格・才能・恋愛・仕事・開運アドバイスを詳しく解説したPDF鑑定書です。',
}

const CONTENTS = [
  {
    category: '性格・才能',
    title: '守護存在が映す本質の性格と深層の才能',
    desc: '守護存在のエネルギーがあなたの性格にどう宿っているか。日常では気づきにくい深層の才能と、開花させるべき素質を詳述します。',
  },
  {
    category: '恋愛',
    title: '恋愛傾向と相性の良い守護存在',
    desc: '守護存在別の恋愛パターン、惹かれやすい相手の特徴、関係性の落とし穴、そして相性の良い守護存在の組み合わせを解説します。',
  },
  {
    category: '仕事',
    title: '天職の方向性と仕事で発揮されるギフト',
    desc: '守護のエネルギーが最も輝く職域と、あなたが無意識に発揮している仕事上の強みを明らかにします。',
  },
  {
    category: '開運',
    title: '2026年の転機と具体的な開運アドバイス',
    desc: '2026年にあなたの守護存在が示す転機と、意識すべき行動・場所・タイミングを守護の観点からまとめます。',
  },
  {
    category: '組み合わせ',
    title: '主守護 × 副守護の固有タイトルと解説',
    desc: '144通りの組み合わせにはそれぞれ固有のタイトルと意味があります。あなたの組み合わせだけが持つ守護の構造を読み解きます。',
  },
  {
    category: '特別メッセージ',
    title: '両守護存在からあなたへの言葉',
    desc: '主守護存在と副守護存在それぞれから、この時代に生きるあなたへの個別メッセージを収録しています。',
  },
]

const STRUCTURE = [
  { page: '第一章', title: '主守護存在の全貌', note: '性格・才能・宿命・仕事・恋愛' },
  { page: '第二章', title: '副守護存在の全貌', note: '誕生月が宿すエネルギーと使命' },
  { page: '第三章', title: '二守護の組み合わせ', note: '144通りの固有タイトルと深読み' },
  { page: '第四章', title: '2026年の開運指針', note: '転機・行動アドバイス・意識すること' },
  { page: '第五章', title: '両守護からのメッセージ', note: 'あなただけへの言葉' },
]

const FAQS = [
  {
    q: 'どんな形式で受け取れますか？',
    a: 'PDFデジタルデータでお届けします。スマートフォン・PC・タブレット、いずれからでも閲覧いただけます。',
  },
  {
    q: 'いつ受け取れますか？',
    a: '決済完了後、登録メールアドレスへ即時お届けします。通常5分以内に届きます。',
  },
  {
    q: '紙の冊子は届きますか？',
    a: 'デジタルPDF専用商品のため、紙の郵送には対応しておりません。',
  },
  {
    q: '診断結果によって内容は変わりますか？',
    a: 'はい。主守護存在（ライフパスナンバー）× 副守護存在（誕生月）の144通りの組み合わせに対応した個別の鑑定書です。生年月日が異なれば、ほぼ固有の内容をお届けします。',
  },
  {
    q: '返金・返品は可能ですか？',
    a: 'デジタル商品の性質上、購入後の返金・返品には対応できません。あらかじめご了承ください。',
  },
]

function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-kin/10" />
      <span className="text-kin/30 text-xs">✦</span>
      <div className="flex-1 h-px bg-kin/10" />
    </div>
  )
}

export default function PaidPage() {
  return (
    <main className="min-h-screen px-5 py-12 md:py-20">
      <div className="max-w-2xl mx-auto space-y-20">

        {/* ── ナビ ── */}
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-kin/60 text-xs tracking-[0.4em] font-serif-jp hover:text-kin/90 transition-colors">
            護り絵巻
          </Link>
          <Link href="/shindan" className="text-washi/30 text-xs font-serif-jp hover:text-washi/60 transition-colors">
            無料診断へ →
          </Link>
        </nav>

        {/* ── ヒーロー ── */}
        <section className="text-center space-y-6 animate-fade-in-up">
          <p className="text-washi/25 text-xs tracking-[0.5em] font-serif-jp">
            詳 細 鑑 定 書
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif-jp shimmer-text leading-tight">
            守護存在<br />鑑定書
          </h1>
          <p className="text-washi/50 text-sm font-serif-jp leading-relaxed max-w-sm mx-auto">
            主守護存在と副守護存在、<br />
            2体が重なる意味をすべて読む
          </p>

          <div className="flex flex-col items-center gap-3 pt-2">
            <span className="inline-block bg-shu/70 text-washi/90 text-xs px-5 py-1.5 tracking-[0.35em] font-serif-jp">
              今だけ特別価格
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-washi/25 text-sm font-serif-jp line-through">通常 ¥3,300</span>
              <span className="text-kin text-5xl font-bold font-serif-jp tracking-tight">¥1,980</span>
            </div>
            <p className="text-washi/25 text-xs font-serif-jp">デジタルPDF・購入後すぐに受け取れます</p>
          </div>

          <a
            href="/thanks"
            className="inline-block mt-2 border border-kin/60 bg-kin/8 hover:bg-kin/15 text-kin text-sm font-serif-jp tracking-[0.35em] px-12 py-4 transition-colors duration-200"
          >
            PDF鑑定書を受け取る
          </a>
        </section>

        <Divider />

        {/* ── わかること ── */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="text-center space-y-1">
            <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">鑑定書でわかること</p>
            <p className="text-washi/70 text-lg font-bold font-serif-jp">6つの詳細鑑定</p>
          </div>

          <div className="space-y-5">
            {CONTENTS.map((item, i) => (
              <div key={item.category} className="flex gap-5 items-start border border-washi/6 bg-kard/60 p-5">
                <span className="text-kin/40 text-xs font-serif-jp shrink-0 w-4 text-right mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-kin/70 text-xs tracking-widest font-serif-jp">{item.category}</span>
                  </div>
                  <p className="text-washi/80 text-sm font-bold font-serif-jp">{item.title}</p>
                  <p className="text-washi/45 text-sm font-serif-jp leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── ページ構成 ── */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="text-center space-y-1">
            <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">ページ構成</p>
            <p className="text-washi/70 text-lg font-bold font-serif-jp">鑑定書の章立て</p>
          </div>

          <div className="relative border border-kin/20 bg-kard/80 overflow-hidden">
            {/* 四隅装飾 */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-kin/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-kin/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-kin/40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-kin/40 pointer-events-none" />

            <div className="divide-y divide-kin/8">
              {STRUCTURE.map((s) => (
                <div key={s.page} className="flex items-center gap-5 px-7 py-5">
                  <span className="text-kin/40 text-xs font-serif-jp shrink-0 w-14">{s.page}</span>
                  <div className="flex-1">
                    <p className="text-washi/75 text-sm font-bold font-serif-jp">{s.title}</p>
                    <p className="text-washi/35 text-xs font-serif-jp mt-0.5">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-washi/25 text-xs text-center font-serif-jp">
            ※ 全ページ守護存在の世界観に合わせた和風デザインでお届けします
          </p>
        </section>

        <Divider />

        {/* ── 主守護×副守護の解説 ── */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="text-center space-y-1">
            <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">鑑定の核心</p>
            <p className="text-washi/70 text-lg font-bold font-serif-jp">主守護 × 副守護の詳細</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-kin/25 bg-kard/60 p-6 space-y-4">
              <p className="text-kin/70 text-xs tracking-[0.35em] font-serif-jp">主守護存在</p>
              <p className="text-washi/80 text-base font-bold font-serif-jp leading-relaxed">
                ライフパスナンバーで決まる<br />生涯の守護
              </p>
              <p className="text-washi/45 text-sm font-serif-jp leading-relaxed">
                生年月日から算出するライフパスナンバー。この数字が示す守護存在は、あなたの性格の核、仕事の方向性、宿命的な使命を司っています。
              </p>
              <ul className="space-y-2 pt-1">
                {['本質的な性格と強み', '天職の方向性', '宿命の使命', '恋愛・対人関係のパターン'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-washi/55 text-xs font-serif-jp">
                    <span className="text-kin/50 shrink-0">・</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-washi/10 bg-kard/60 p-6 space-y-4">
              <p className="text-washi/40 text-xs tracking-[0.35em] font-serif-jp">副守護存在</p>
              <p className="text-washi/80 text-base font-bold font-serif-jp leading-relaxed">
                誕生月で決まる<br />助力の守護
              </p>
              <p className="text-washi/45 text-sm font-serif-jp leading-relaxed">
                あなたが生まれた月に宿る副守護存在。主守護を補完し、恋愛・日常の流れ・開運行動に深く影響を与える存在です。
              </p>
              <ul className="space-y-2 pt-1">
                {['恋愛傾向の補完', '日常のエネルギー傾向', '開運行動・場所', '2026年の具体的指針'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-washi/55 text-xs font-serif-jp">
                    <span className="text-washi/25 shrink-0">・</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-kin/30 bg-kin/5 p-6 space-y-3 text-center">
            <p className="text-kin/80 text-xs tracking-[0.35em] font-serif-jp">二守護の組み合わせ</p>
            <p className="text-washi/70 text-sm font-bold font-serif-jp leading-relaxed">
              12体 × 12体 ＝ 144通りの固有タイトル
            </p>
            <p className="text-washi/45 text-sm font-serif-jp leading-relaxed">
              主守護と副守護の組み合わせには、それぞれ固有のタイトルと読み解きがあります。<br />
              あなたの生年月日から導かれる、世界にひとつの守護の構造をお届けします。
            </p>
          </div>
        </section>

        <Divider />

        {/* ── よくある質問 ── */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="text-center space-y-1">
            <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">よくある質問</p>
          </div>

          <div className="space-y-1">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-washi/6 bg-kard/50">
                <div className="px-6 py-4 space-y-2">
                  <p className="text-kin/70 text-sm font-serif-jp leading-relaxed">
                    Q. {faq.q}
                  </p>
                  <p className="text-washi/55 text-sm font-serif-jp leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 購入セクション ── */}
        <section id="purchase" className="space-y-7 animate-fade-in-up">
          <div className="text-center space-y-1">
            <p className="text-washi/25 text-xs tracking-[0.4em] font-serif-jp">お申し込み</p>
          </div>

          <div className="relative border border-kin/40 bg-kard/80 p-8 space-y-7 overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-kin/50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-kin/50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-kin/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-kin/50 pointer-events-none" />

            <div className="text-center space-y-4">
              <p className="text-washi/60 text-base font-bold font-serif-jp leading-relaxed">
                守護存在 詳細鑑定書
              </p>
              <p className="text-washi/35 text-sm font-serif-jp">
                主守護存在 × 副守護存在 全章収録 / デジタルPDF
              </p>
              <span className="inline-block bg-shu/70 text-washi/90 text-xs px-5 py-1.5 tracking-[0.35em] font-serif-jp">
                今だけ特別価格
              </span>
              <div className="flex items-baseline justify-center gap-5">
                <span className="text-washi/25 text-sm font-serif-jp line-through">通常 ¥3,300</span>
                <span className="text-kin text-5xl font-bold font-serif-jp tracking-tight">¥1,980</span>
              </div>
              <p className="text-washi/25 text-xs font-serif-jp">デジタルPDF・購入後すぐに受け取れます</p>
            </div>

            <a
              href="/thanks"
              className="block border border-kin/70 bg-kin/10 hover:bg-kin/20 active:bg-kin/25 text-kin text-center text-sm font-serif-jp tracking-[0.35em] py-5 transition-colors duration-200"
            >
              PDF鑑定書を受け取る
            </a>

            <p className="text-washi/20 text-xs text-center font-serif-jp leading-relaxed">
              ※ 決済完了後、登録メールアドレスへ即時お届けします<br />
              ※ デジタル商品のため、返金・返品には対応できません
            </p>
          </div>
        </section>

        {/* ── フッター ── */}
        <div className="text-center space-y-4 pt-8 border-t border-kin/10">
          <Link
            href="/shindan"
            className="block text-washi/40 text-sm font-serif-jp hover:text-washi/70 transition-colors"
          >
            まだ診断していない方は無料診断へ
          </Link>
          <Link
            href="/"
            className="block text-washi/25 text-xs font-serif-jp hover:text-washi/55 transition-colors"
          >
            TOPへ戻る
          </Link>
        </div>

      </div>
    </main>
  )
}
