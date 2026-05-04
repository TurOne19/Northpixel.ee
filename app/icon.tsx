import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const svgData = readFileSync(join(process.cwd(), 'public', 'favicon.png'))
  const base64 = svgData.toString('base64')
  const src = `data:image/svg+xml;base64,${base64}`

  return new ImageResponse(
    (
      <img
        src={src}
        width={32}
        height={32}
        style={{ borderRadius: 6 }}
      />
    ),
    { ...size }
  )
}
