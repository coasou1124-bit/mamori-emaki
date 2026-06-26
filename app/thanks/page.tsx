import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ご購入ありがとうございます | 護り絵巻',
  description: 'PDF鑑定書のお申し込みを受け付けました。正式販売開始後にお届けします。',
}

export default function ThanksPage() {
  return (
    <main className="min-h-screen px-5 py-12 md:py-20 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto space-y-12 text-center animate-fade-in-up">

        {/* ロゴ */}
        <p className="text-kin/60 text-xs tracking-[0.5em] font-serif-jp">
          護り絵巻
        </p>

        {/* メインメッセージ */}
        <div className="space-y-5">
          <div className="flex justify-center">
            <span className="text-kin/50 text-3xl leading-none">✦</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif-jp shimmer-text leading-relaxed">
            ご購入ありがとうございます
          </h1>
          <p className="text-washi/50 text-sm font-serif-jp leading-loose">
            PDF鑑定書のお申し込みを<br />
            確かに受け付けました。
          </p>
        </div>

        {/* 準備中の案内カード */}
        <div className="relative border border-kin/30 bg-kard/80 p-8 space-y-5 overflow-hidden">
          {/* 四隅装飾 */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-kin/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-kin/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-kin/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-kin/40 pointer-events-none" />

          <p className="text-kin/60 text-xs tracking-[0.4em] font-serif-jp">
            PDF 鑑定書
          </p>
          <p className="text-washi/75 text-base font-bold font-serif-jp leading-relaxed">
            現在、鑑定書を準備中です
          </p>
          <p className="text-washi/45 text-sm font-serif-jp leading-loose">
            正式な販売開始後、ダウンロードできる予定です。<br />
            今しばらくお待ちください。
          </p>

          <div className="border-t border-kin/10 pt-5 space-y-2">
            <p className="text-washi/30 text-xs font-serif-jp leading-relaxed">
              販売開始の際はトップページよりご案内いたします
            </p>
          </div>
        </div>

        {/* ボタン */}
        <div className="space-y-4">
          <Link
            href="/shindan"
            className="block border border-kin/60 bg-kin/8 hover:bg-kin/15 text-kin text-sm font-serif-jp tracking-[0.35em] py-4 transition-colors duration-200"
          >
            無料診断ページへ戻る
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
