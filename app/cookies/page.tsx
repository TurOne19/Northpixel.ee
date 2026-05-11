import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | NorthPixel',
  description: 'Cookie Policy for NorthPixel web design services.',
  keywords: [],
  alternates: {
    canonical: 'https://northpixel.ee/cookies',
  },
  robots: { index: false, follow: false },
  openGraph: { title: 'Cookie Policy | NorthPixel', description: 'Cookie Policy for NorthPixel.' },
}

export default function Cookies() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: May 2026</p>
      {[
        {
          title: 'What Are Cookies',
          body: 'Cookies are small text files stored on your device when visiting a website. They help improve website functionality, user experience, and performance.',
        },
        {
          title: 'How We Use Cookies',
          body: 'NorthPixel may use cookies and similar technologies for: language and user preferences, website functionality, analytics and website performance, improving user experience.',
        },
        {
          title: 'Analytics & Third-Party Tools',
          body: 'Our website may use third-party services such as analytics, integrations, or embedded tools that may place cookies or collect limited technical information to improve website functionality and performance.',
        },
        {
          title: 'Managing Cookies',
          body: 'Most browsers allow you to control, disable, or delete cookies through browser settings. Please note that disabling certain cookies may affect website functionality or user experience.',
        },
        {
          title: 'Contact',
          body: 'If you have any questions regarding our Cookie Policy, please contact: info.northpixel@gmail.com',
        },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      ))}
      <a href="/" style={{ color: '#4f9cf9', textDecoration: 'none', fontWeight: 600 }}>← Back to home</a>
    </div>
  )
}