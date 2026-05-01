export default function Privacy() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-dm-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: January 2025</p>
      {[
        { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as your name, email address, phone number, and project details when you fill out our contact form.' },
        { title: '2. How We Use Your Information', body: 'We use the information we collect to respond to your inquiries, provide our web development services, and communicate with you about your project.' },
        { title: '3. Data Storage', body: 'Your contact form submissions are processed through Web3Forms and sent directly to our email. We do not store your personal data on our servers beyond what is necessary for communication.' },
        { title: '4. Cookies', body: 'We use a single cookie to remember your language preference (EN/RU/ET). We do not use tracking cookies or third-party analytics cookies.' },
        { title: '5. Third-Party Services', body: 'We use Web3Forms to process contact form submissions. Please review their privacy policy at web3forms.com.' },
        { title: '6. Your Rights', body: 'You have the right to access, correct, or delete any personal data we hold about you. Contact us at info.northpixel@gmail.com to exercise these rights.' },
        { title: '7. Contact', body: 'For any privacy-related questions, please contact us at info.northpixel@gmail.com.' },
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
