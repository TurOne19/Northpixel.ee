import { NextResponse } from 'next/server'

const SORO_BLOG_ID = 'd872c3fb-ae74-4b04-9b16-cd4eaf34f084'

// Try multiple Soro API patterns to find posts
const API_ATTEMPTS = [
  `https://app.trysoro.com/api/v1/blogs/${SORO_BLOG_ID}/posts`,
  `https://app.trysoro.com/api/posts?blogId=${SORO_BLOG_ID}`,
  `https://app.trysoro.com/api/blogs/${SORO_BLOG_ID}`,
  `https://app.trysoro.com/api/${SORO_BLOG_ID}/posts`,
  `https://app.trysoro.com/${SORO_BLOG_ID}/posts.json`,
]

export async function GET() {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; NorthPixel/1.0)',
    'Referer': 'https://northpixel.ee',
    'Origin': 'https://northpixel.ee',
    'Accept': 'application/json, text/html, */*',
  }

  for (const url of API_ATTEMPTS) {
    try {
      const res = await fetch(url, { headers, next: { revalidate: 300 } })
      if (res.ok) {
        const contentType = res.headers.get('content-type') || ''
        if (contentType.includes('json')) {
          const data = await res.json()
          return NextResponse.json({ source: url, data })
        }
      }
    } catch {
      // try next
    }
  }

  // Fallback: fetch the embed script and extract post data from it
  try {
    const scriptRes = await fetch(
      `https://app.trysoro.com/api/embed/${SORO_BLOG_ID}`,
      { headers, next: { revalidate: 300 } }
    )
    if (scriptRes.ok) {
      const text = await scriptRes.text()
      // Try to extract JSON data embedded in the script
      const jsonMatch = text.match(/\{[\s\S]*"posts"[\s\S]*\}/) ||
                        text.match(/posts\s*[:=]\s*(\[[\s\S]*?\])/) ||
                        text.match(/data\s*[:=]\s*(\{[\s\S]*?\})/)
      if (jsonMatch) {
        return NextResponse.json({ source: 'script', raw: jsonMatch[0].slice(0, 5000) })
      }
      return NextResponse.json({ source: 'script-raw', raw: text.slice(0, 3000) })
    }
  } catch {
    // ignore
  }

  return NextResponse.json({ error: 'Could not reach Soro API', attempts: API_ATTEMPTS }, { status: 502 })
}
