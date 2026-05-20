import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://northpixel.ee'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: 'monthly' },
  ]

  // Fetch articles from Soro
  try {
    const res = await fetch(
      'https://app.trysoro.com/api/embed/c1441b0e-92a4-4fec-b47c-a10a02e5b1e0',
      {
        headers: { Origin: base, Referer: `${base}/` },
        next: { revalidate: 3600 },
      }
    )
    if (res.ok) {
      const js = await res.text()
      const match = js.match(/var SORO_ARTICLES\s*=\s*(\[[\s\S]*?\]);/)
      if (match) {
        const articles: Array<{ slug: string; isoDate: string }> = JSON.parse(match[1])
        const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
          url: `${base}/blog?post=${a.slug}`,
          lastModified: new Date(a.isoDate),
          priority: 0.8,
          changeFrequency: 'monthly',
        }))
        return [...staticPages, ...articlePages]
      }
    }
  } catch { /* ignore */ }

  return staticPages
}