import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | NorthPixel',
  robots: { index: false, follow: false },
}

export default function Terms() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', color: '#f1f5f9', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>Last updated: May 2026</p>
      {[
        {
          title: '1. Services',
          body: 'NorthPixel provides modern website and landing page design services for businesses, professionals, and service-based companies. Services may include website design, development, redesigns, SEO optimization, integrations, and related digital solutions.',
        },
        {
          title: '2. Project Process & Payment',
          body: 'Most projects begin with an upfront deposit before work starts. The remaining balance is paid upon project completion and before the final website transfer or launch. Specific payment terms may vary depending on the scope and complexity of the project.',
        },
        {
          title: '3. Revisions',
          body: 'All projects include revision rounds during the design and development process. Additional requests outside the agreed project scope may require additional charges.',
        },
        {
          title: '4. Delivery Timelines',
          body: 'Estimated delivery timelines are discussed individually for each project. Delays in receiving content, feedback, approvals, or materials from the client may affect project timelines.',
        },
        {
          title: '5. Ownership',
          body: 'After final payment is completed, the client receives ownership of the final approved website and project materials created specifically for the project.',
        },
        {
          title: '6. Hosting & Domains',
          body: 'NorthPixel can assist with hosting and domain setup if needed. Clients may also use their own hosting providers and domain registrars. Hosting-related services, third-party subscriptions, domains, and external platform costs may require separate ongoing payments depending on the project setup.',
        },
        {
          title: '7. Third-Party Services',
          body: 'Some projects may include third-party tools, plugins, integrations, or external services. NorthPixel is not responsible for outages, pricing changes, or issues caused by third-party platforms.',
        },
        {
          title: '8. Limitation of Liability',
          body: 'NorthPixel is not liable for indirect, incidental, or consequential damages related to the use of websites, services, hosting providers, or third-party platforms.',
        },
        {
          title: '9. Governing Law',
          body: 'These terms are governed by the laws of the Republic of Estonia.',
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
