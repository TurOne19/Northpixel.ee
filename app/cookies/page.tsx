export default function Cookies() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-dm-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: January 2025</p>
      {[
        { title: 'What Are Cookies', body: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences.' },
        { title: 'Cookies We Use', body: 'We use exactly one cookie: "np-lang" — a preference cookie that remembers your selected language (EN, RU, or ET). This cookie is stored in localStorage and never sent to any external server. It has no expiry and is used solely to improve your experience.' },
        { title: 'What We Do NOT Use', body: 'We do not use tracking cookies, advertising cookies, analytics cookies (Google Analytics, Facebook Pixel, etc.), or any third-party cookies.' },
        { title: 'Managing Cookies', body: 'You can clear your localStorage at any time through your browser settings. This will reset your language preference to English on your next visit.' },
        { title: 'Contact', body: 'If you have any questions about our use of cookies, contact us at info.northpixel@gmail.com.' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      ))}
      <a href="/" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>← Back to home</a>
    </div>
  )
}
