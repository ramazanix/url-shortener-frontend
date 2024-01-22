import { Inter, Rubik_Doodle_Shadow } from 'next/font/google'

export const interFont = Inter({ subsets: ['latin'] })
export const rubikFont = Rubik_Doodle_Shadow({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})
