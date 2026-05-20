import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache 1 hour

export async function GET() {
  try {
    const res = await fetch(
      'https://app.trysoro.com/api/embed/c1441b0e-92a4-4fec-b47c-a10a02e5b1e0',
      { headers: { 'Origin': 'https://northpixel.ee', 'Referer': 'https://northpixel.ee/' }, next: { revalidate: 3600 } }
    )
    if (!res.ok) return NextResponse.json({ articles: [] })
    const js = await res.text()
    const match = js.match(/var SORO_ARTICLES\s*=\s*(\[[\s\S]*?\]);/)
    if (!match) return NextResponse.json({ articles: [] })
    const articles = JSON.parse(match[1])
    return NextResponse.json({ articles })
  } catch {
    return NextResponse.json({ articles: [] })
  }
}
