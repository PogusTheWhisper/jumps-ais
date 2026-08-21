import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'THAItern',
  description: 'AI-powered work-simulation learning for Thai university students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="font-noto">{children}</body>
    </html>
  )
}
