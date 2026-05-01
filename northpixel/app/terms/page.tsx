export default function Terms() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-dm-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: January 2025</p>
      {[
        { title: '1. Services', body: 'NorthPixel provides web design and development services including landing pages, business websites, redesigns, SEO optimization, and third-party integrations.' },
        { title: '2. Payment', body: 'All projects require a 50% deposit before work begins, with the remaining 50% due upon project completion and before the final handover.' },
        { title: '3. Revisions', body: 'Each package includes a specified number of revision rounds. Additional revisions beyond what is included are charged at €75/hour.' },
        { title: '4. Delivery', body: 'We commit to delivery timelines stated in each package. Delays caused by the client (e.g., late content delivery) may extend these timelines accordingly.' },
        { title: '5. Ownership', body: 'Upon final payment, you receive full ownership of all code, design assets, and content created for your project.' },
        { title: '6. Hosting', body: 'Included hosting is provided for 1 year. After that, hosting can be renewed at market rates, or you may migrate to your own hosting provider.' },
        { title: '7. Limitation of Liability', body: 'NorthPixel is not liable for any indirect, incidental, or consequential damages arising from the use of our services.' },
        { title: '8. Governing Law', body: 'These terms are governed by the laws of the Republic of Estonia.' },
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
