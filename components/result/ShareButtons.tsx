'use client'

import { useState } from 'react'
import type { Guardian } from '@/types/guardian'

export default function ShareButtons({ guardian }: { guardian: Guardian }) {
  const [copied, setCopied] = useState(false)

  const shareText = `私の守護存在は【${guardian.name}】でした\n「${guardian.title}」── ${guardian.tier}\n\nあなたの守護存在は？\n#守護存在診断 #護り絵巻`

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードAPIが使えない環境では無視する
    }
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <p className="text-washi/30 text-xs tracking-widest text-center font-serif-jp">
        この結果をシェアする
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={handleTwitterShare}
          className="border border-kin/20 text-washi/60 text-sm px-5 py-2.5 font-serif-jp
                     hover:border-kin/40 hover:text-washi/80 transition-colors"
        >
          X（旧Twitter）で投稿
        </button>
        <button
          onClick={handleCopy}
          className="border border-kin/20 text-washi/60 text-sm px-5 py-2.5 font-serif-jp
                     hover:border-kin/40 hover:text-washi/80 transition-colors"
        >
          {copied ? 'コピーしました ✓' : 'リンクをコピー'}
        </button>
      </div>
    </div>
  )
}
