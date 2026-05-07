import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://northpixel.ee/favicon.png"
        width={32}
        height={32}
        alt="NorthPixel"
        style={{ borderRadius: 6 }}
      />
    ),
    { ...size }
  )
}
