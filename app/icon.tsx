import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/svg+xml'

export default function Icon() {
  return new ImageResponse(
    (
      <img
        src="/Northpixel.ee/public/logo.svg"
        width={32}
        height={32}
        alt="NorthPixel"
      />
    ),
    { ...size }
  )
}
