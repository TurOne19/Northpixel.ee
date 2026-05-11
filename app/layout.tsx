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
    default: 'NorthPixel — websites and landing pages for business in 7 days',
    template: '%s | NorthPixel',
  },
  description: 'We build modern websites and landing pages for business. Clear structure, design and launch in 7 days. Get leads through your website.',
  // NOTE: keywords здесь намеренно не задаём глобально —
  // чтобы юридические страницы (terms/privacy/cookies) не наследовали
  // поисковые ключевые слова главной страницы.
  openGraph: {
    title: 'NorthPixel — websites and landing pages in 7 days',
    description: 'We build clear websites for business focused on leads. Fast launch and modern design.',
    url: 'https://northpixel.ee',
    siteName: 'NorthPixel',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NorthPixel — websites and landing pages in 7 days',
    description: 'We build clear websites for business focused on leads.',
  },
  // Canonical + hreflang для одноURL мультиязычного сайта
  // Все три языка живут на одном URL — сигнализируем это Google через alternates.
  alternates: {
    canonical: 'https://northpixel.ee',
    languages: {
      'en': 'https://northpixel.ee',
      'ru': 'https://northpixel.ee',
      'et': 'https://northpixel.ee',
      'x-default': 'https://northpixel.ee',
    },
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon — forces browsers to use logo.svg, overrides any cached old icon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* GTM грузится lazy — preconnect бесполезен, только dns-prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://app.trysoro.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}

        {/* Google Analytics — fully deferred */}
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


        {/* Soro blog embed */}
        <Script
          src="https://app.trysoro.com/api/embed/c1441b0e-92a4-4fec-b47c-a10a02e5b1e0"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
