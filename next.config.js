/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ─── Redirects: очищаем возможные старые RU-пути в индексе Google ──────────
  async redirects() {
    return [
      // Если Google проиндексировал /ru или /ru/* — редиректим на главную (301)
      { source: '/ru',    destination: '/', permanent: true },
      { source: '/ru/:path*', destination: '/', permanent: true },
      // Любые старые Soro-пути, если они попали в индекс
      { source: '/blog/:path*', destination: '/', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
      {
        source: '/(.*)\\.( svg|png|jpg|jpeg|webp|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Защитный X-Robots-Tag для юридических страниц (дополнение к meta noindex)
      // Работает даже если Next.js metadata API вдруг не отдаст тег.
      {
        source: '/terms',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/privacy',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/cookies',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
}

module.exports = nextConfig
