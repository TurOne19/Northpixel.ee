import { redirect } from 'next/navigation'

// /blog/some-slug → redirects to /#blog?article=some-slug
// The main page.tsx reads ?article= param and opens the lightbox
export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/?article=${slug}#blog`)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const res = await fetch(
      `https://app.trysoro.com/api/embed/c1441b0e-92a4-4fec-b47c-a10a02e5b1e0`,
      { headers: { Origin: 'https://northpixel.ee', Referer: 'https://northpixel.ee/' } }
    )
    if (res.ok) {
      const js = await res.text()
      const match = js.match(/var SORO_ARTICLES\s*=\s*(\[[\s\S]*?\]);/)
      if (match) {
        const articles = JSON.parse(match[1])
        const article = articles.find((a: { slug: string }) => a.slug === slug)
        if (article) {
          return {
            title: `${article.title} | northpixel.ee`,
            description: article.excerpt,
            openGraph: {
              title: article.title,
              description: article.excerpt,
              images: article.image ? [article.image] : [],
              url: `https://northpixel.ee/blog/${slug}`,
            },
          }
        }
      }
    }
  } catch { /* ignore */ }

  return {
    title: 'Blog | northpixel.ee',
  }
}
