import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://northpixel.ee'),
  title: {
    default: 'NorthPixel — сайты и лендинги для бизнеса за 7 дней',
    template: '%s | NorthPixel',
  },
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
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: { canonical: 'https://northpixel.ee' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://app.trysoro.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Logo preload for LCP */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}

        {/* Google Analytics — fully deferred, non-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XR5VNE2NYD"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XR5VNE2NYD', { send_page_view: false });
            window.addEventListener('load', function(){ gtag('event', 'page_view'); }, { once: true });
          `}
        </Script>

        {/* Soro blog — fully deferred */}
        <Script
          src="https://app.trysoro.com/api/embed/e4fb3d9e-a149-4648-851d-64fcf07d2789"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
