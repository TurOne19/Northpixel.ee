import { NextResponse } from 'next/server'

const BLOG_ID = 'd872c3fb-ae74-4b04-9b16-cd4eaf34f084'

const BASE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
  'Referer': 'https://northpixel.ee/',
  'Origin': 'https://northpixel.ee',
  'Accept': 'application/json, text/html, */*',
  'Accept-Language': 'en-US,en;q=0.9',
}

const POST_LIST_URLS = [
  `https://app.trysoro.com/api/v1/embed/${BLOG_ID}/posts`,
  `https://app.trysoro.com/api/v1/blogs/${BLOG_ID}/posts`,
  `https://app.trysoro.com/api/embed/${BLOG_ID}/posts`,
  `https://app.trysoro.com/api/posts?blog=${BLOG_ID}`,
  `https://app.trysoro.com/api/posts?blogId=${BLOG_ID}`,
  `https://app.trysoro.com/api/blogs/${BLOG_ID}/posts`,
  `https://app.trysoro.com/${BLOG_ID}/posts.json`,
]

async function tryFetch(url: string) {
  return fetch(url, { headers: BASE_HEADERS, next: { revalidate: 60 } })
}

// GET /api/soro           → list posts
// GET /api/soro?slug=xxx  → full single post
// GET /api/soro?id=xxx    → full single post by id
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const postId = searchParams.get('id')

  // ── Single post ───────────────────────────────────────────────────────────
  if (slug || postId) {
    const key = slug || postId
    const singleUrls = [
      `https://app.trysoro.com/api/v1/embed/${BLOG_ID}/posts/${key}`,
      `https://app.trysoro.com/api/embed/${BLOG_ID}/posts/${key}`,
      `https://app.trysoro.com/api/blogs/${BLOG_ID}/posts/${key}`,
      `https://app.trysoro.com/api/posts/${key}`,
    ]
    for (const url of singleUrls) {
      try {
        const res = await tryFetch(url)
        if (res.ok && res.headers.get('content-type')?.includes('json')) {
          const data = await res.json()
          return NextResponse.json({ ok: true, post: data })
        }
      } catch { /* next */ }
    }
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  }

  // ── Post list ─────────────────────────────────────────────────────────────
  for (const url of POST_LIST_URLS) {
    try {
      const res = await tryFetch(url)
      if (!res.ok) continue
      if (!res.headers.get('content-type')?.includes('json')) continue
      const data = await res.json()
      const items: unknown[] =
        Array.isArray(data) ? data :
        Array.isArray(data?.posts) ? data.posts :
        Array.isArray(data?.data) ? data.data :
        Array.isArray(data?.items) ? data.items :
        Array.isArray(data?.results) ? data.results : []
      if (!items.length) continue
      return NextResponse.json({ ok: true, source: url, posts: items })
    } catch { /* next */ }
  }

  // ── Embed JS fallback ─────────────────────────────────────────────────────
  try {
    const res = await tryFetch(`https://app.trysoro.com/api/embed/${BLOG_ID}`)
    if (res.ok) {
      const text = await res.text()
      for (const pat of [/window\.__SORO[^=]*=\s*({[\s\S]*?});/, /"posts"\s*:\s*(\[[\s\S]*?\])/, /posts\s*=\s*(\[[\s\S]*?\])/]) {
        const m = text.match(pat)
        if (m) {
          try {
            const parsed = JSON.parse(m[1])
            return NextResponse.json({ ok: true, source: 'js', posts: Array.isArray(parsed) ? parsed : [parsed] })
          } catch { /* next */ }
        }
      }
      return NextResponse.json({ ok: false, debug: text.slice(0, 1000) })
    }
  } catch { /* ignore */ }

  return NextResponse.json({ ok: false, error: 'Soro API unreachable from this host — must be deployed on northpixel.ee' }, { status: 502 })
}
