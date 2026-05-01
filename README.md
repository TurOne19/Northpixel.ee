# NorthPixel — Next.js Website

Fast, multilingual (EN/RU/ET) business website built with Next.js 14.

## Stack
- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS**
- **Web3Forms** (contact form, free)
- **Google Fonts**: Syne + DM Sans

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variable:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = your key from [web3forms.com](https://web3forms.com)
4. Deploy ✅

## Get Web3Forms Key (30 seconds, free)

1. Go to [web3forms.com](https://web3forms.com)
2. Enter `info.northpixel@gmail.com`
3. Check your email for the access key
4. Add it to Vercel Environment Variables as `NEXT_PUBLIC_WEB3FORMS_KEY`

## Connect Custom Domain

In Vercel dashboard → Project → Settings → Domains → Add your domain.

## Project Structure

```
northpixel/
├── app/
│   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   ├── page.tsx          # Main landing page (all sections)
│   ├── globals.css       # Design tokens, animations
│   ├── privacy/page.tsx  # Privacy policy
│   ├── terms/page.tsx    # Terms of service
│   └── cookies/page.tsx  # Cookie policy
├── lib/
│   └── content.ts        # All translations (EN/RU/ET) + brand info
└── public/
    ├── favicon.svg
    └── og-image.png      # Open Graph image
```

## Edit Content

All text content is in `lib/content.ts`. To change translations, pricing, projects, FAQ — edit that file only.

To update brand info (phone, email, name):
```ts
// lib/content.ts
export const brand = {
  name: "NorthPixel",
  phone: "+372 5541895",
  email: "info.northpixel@gmail.com",
  location: "Tallinn, Estonia",
}
```
