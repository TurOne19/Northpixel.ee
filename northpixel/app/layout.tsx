import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://northpixel.vercel.app'),
  title: 'NorthPixel — Fast Websites for Small Business | Tallinn',
  description: 'Professional landing pages and business websites delivered in 3–14 days. Fixed price, guaranteed deadline. Based in Tallinn, Estonia.',
  keywords: ['web design tallinn', 'website design estonia', 'landing page', 'small business website', 'fast website'],
  openGraph: {
    title: 'NorthPixel — Fast Websites for Small Business',
    description: 'Professional landing pages and business websites delivered in 3–14 days. Fixed price, guaranteed deadline.',
    url: 'https://northpixel.vercel.app',
    siteName: 'NorthPixel',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NorthPixel — Fast Websites for Small Business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorthPixel — Fast Websites for Small Business',
    description: 'Professional landing pages and business websites delivered in 3–14 days.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  )
}
