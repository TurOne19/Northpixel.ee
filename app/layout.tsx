import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://northpixel.ee'),
  title: 'NorthPixel — сайты и лендинги для бизнеса за 7 дней',
  description: 'Создаём современные лендинги для бизнеса. Понятная структура, дизайн и запуск за 7 дней. Помогаем получать заявки через сайт.',
  keywords: ['сайт для бизнеса', 'лендинг таллин', 'веб-дизайн эстония', 'создать сайт быстро', 'northpixel'],
  openGraph: {
    title: 'NorthPixel — сайты и лендинги за 7 дней',
    description: 'Создаём понятные сайты для бизнеса с фокусом на заявки. Быстрый запуск и современный дизайн.',
    url: 'https://northpixel.ee',
    siteName: 'NorthPixel',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NorthPixel — сайты для бизнеса за 7 дней' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorthPixel — сайты и лендинги за 7 дней',
    description: 'Создаём понятные сайты для бизнеса с фокусом на заявки.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: { canonical: 'https://northpixel.ee' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}
