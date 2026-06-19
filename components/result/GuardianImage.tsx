'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Guardian } from '@/types/guardian'
import { TIER_COLORS } from '@/lib/tierColors'

const IMAGE_FILE_MAP: Record<string, string> = {
  inarikitsune: 'inari',
  zashikiwarashi: 'zashiki',
  mamoriOni: 'mamorioni',
}

interface Props {
  guardian: Guardian
}

export default function GuardianImage({ guardian }: Props) {
  const [hasError, setHasError] = useState(false)
  const colors = TIER_COLORS[guardian.tier]

  const fileName = IMAGE_FILE_MAP[guardian.id] ?? guardian.id
  const src = `/images/guardians/${fileName}.jpg`

  if (hasError) {
    return (
      <div className="space-y-3">
        <div
          className={`w-28 h-28 mx-auto border-2 flex items-center justify-center ${colors.border} ${colors.bg}`}
        >
          <span className={`text-4xl font-bold font-serif-jp ${colors.text}`}>
            {guardian.name.charAt(0)}
          </span>
        </div>
        <p className="text-washi/30 text-xs font-serif-jp tracking-widest text-center">
          象徴紋：{guardian.symbolMotif}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="w-[85%] max-w-[420px] mx-auto">
        <Image
          src={src}
          alt={guardian.name}
          width={900}
          height={1200}
          priority
          onError={() => setHasError(true)}
          className="rounded-2xl border border-kin/30 shadow-xl shadow-black/50"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="flex justify-center">
        <a
          href={src}
          download={`${fileName}.jpg`}
          className="text-washi/40 text-xs font-serif-jp hover:text-washi/70 transition-colors border border-washi/10 hover:border-washi/30 px-4 py-2"
        >
          ↓ 守護アートを保存する
        </a>
      </div>
      <p className="text-washi/30 text-xs font-serif-jp tracking-widest text-center">
        象徴紋：{guardian.symbolMotif}
      </p>
    </div>
  )
}
