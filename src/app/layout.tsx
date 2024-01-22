import './globals.css'
import type { Metadata } from 'next'
import { twJoin } from 'tailwind-merge'
import { interFont } from '@/fonts'
export const metadata: Metadata = {
  title: 'Url Shortener',
  description: 'Generate short url',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={twJoin('bg-[#bdd3e7] text-[#141414]', interFont.className)}
      >
        {children}
      </body>
    </html>
  )
}
