import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-serif-jp',
})

export const metadata: Metadata = {
  title: '守護存在診断 | 護り絵巻',
  description:
    '生まれた日に、守護は決まっていた。日本の神獣・神使・妖異・守護霊 12体から、あなたを護る存在を診断します。',
  verification: {
    google: 'AdJULe_HSdXsvAjcWo3LNZARiRFAxll-jV4QR6g-uWw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSerifJP.variable}>
      <body className={`${notoSerifJP.className} bg-fukai text-washi min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
