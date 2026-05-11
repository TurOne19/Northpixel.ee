import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | NorthPixel',
  robots: { index: false, follow: false },
}

export default function Privacy() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: May 2026</p>
      {[
        {
          title: '1. Information We Collect',
          body: 'We may collect information you voluntarily provide through our contact forms, including your name, email address, phone number, company details, and project-related information.',
        },
        {
          title: '2. How We Use Information',
          body: 'The information provided is used to: respond to inquiries, communicate regarding projects and services, provide website and digital services, improve communication and customer experience.',
        },
        {
          title: '3. Contact Forms & Data Processing',
          body: 'Contact form submissions are processed through third-party form services and delivered directly to our email inbox for communication purposes.',
        },
        {
          title: '4. Cookies & Analytics',
          body: 'NorthPixel may use cookies and analytics tools to improve website functionality, user experience, and website performance. This may include: language preference cookies, basic website analytics, performance and functionality tracking.',
        },
        {
          title: '5. Third-Party Services',
          body: 'Our website may use trusted third-party tools and services for forms, analytics, hosting, integrations, and website functionality. Third-party services may process limited technical or usage-related information according to their own privacy policies.',
        },
        {
          title: '6. Data Protection',
          body: 'We take reasonable steps to protect submitted information and limit access to authorized communication and project-related purposes only.',
        },
        {
          title: '7. Your Rights',
          body: 'You may request access, correction, or deletion of your personal information by contacting us directly.',
        },
        {
          title: '8. Contact',
          body: 'For privacy-related questions or requests, please contact: info.northpixel@gmail.com',
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
