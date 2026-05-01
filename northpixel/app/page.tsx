'use client'
import { useState, useEffect, useRef } from 'react'
import { brand, locales, Lang } from '@/lib/content'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const t = locales[lang]

  useEffect(() => {
    const saved = localStorage.getItem('np-lang') as Lang | null
    if (saved && ['en', 'ru', 'et'].includes(saved)) setLang(saved)
  }, [])

  const changeLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('np-lang', l)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY',
          subject: `New inquiry from ${formData.name} — NorthPixel`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          redirect: false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormState('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const navItems = [
    { key: 'services', id: 'services' },
    { key: 'work', id: 'work' },
    { key: 'pricing', id: 'pricing' },
    { key: 'faq', id: 'faq' },
  ]

  return (
    <>
      {/* ═══════════ NAVBAR ═══════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(10,15,30,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
              <path d="M8 22V10l8 8 8-8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs><linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#0284c7"/></linearGradient></defs>
            </svg>
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'white', letterSpacing: '-0.01em' }}>NorthPixel</span>
          </div>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
            {navItems.map(item => (
              <button key={item.key} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => scrollTo(item.id)}>
                {t.nav[item.key as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Lang switcher */}
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 4 }}>
              {(['en', 'ru', 'et'] as Lang[]).map(l => (
                <button key={l} onClick={() => changeLang(l)} style={{
                  background: lang === l ? 'var(--accent)' : 'transparent',
                  color: lang === l ? 'white' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: 6,
                  fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase', transition: 'all 0.2s',
                }}>
                  {l}
                </button>
              ))}
            </div>

            {/* CTA button */}
            <button className="btn-primary hidden-mobile" onClick={() => scrollTo('contact')} style={{ padding: '10px 20px', fontSize: 14 }}>
              {t.nav.contact}
            </button>

            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 4 }}>
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          {navItems.map(item => (
            <button key={item.key} onClick={() => scrollTo(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-syne)', fontSize: 28, fontWeight: 700, color: 'white' }}>
              {t.nav[item.key as keyof typeof t.nav]}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ marginTop: 16 }}>
            {t.nav.contact}
          </button>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {(['en', 'ru', 'et'] as Lang[]).map(l => (
              <button key={l} onClick={() => changeLang(l)} style={{
                background: lang === l ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                color: 'white', border: 'none', cursor: 'pointer',
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                fontFamily: 'var(--font-syne)', textTransform: 'uppercase',
              }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ═══════════ HERO ═══════════ */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 80 }} className="grid-bg">
          <div className="hero-orb-1"/>
          <div className="hero-orb-2"/>
          <div className="hero-orb-3"/>

          {/* Big background number */}
          <div style={{
            position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--font-syne)', fontSize: 'clamp(160px, 22vw, 340px)',
            fontWeight: 800, color: 'rgba(6,182,212,0.04)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em',
          }}>NP</div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 780 }}>
              {/* Badge */}
              <div className="animate-fade-up" style={{ marginBottom: 28 }}>
                <span className="section-label">
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
                  {t.hero.badge}
                </span>
              </div>

              {/* Main title */}
              <h1 className="animate-fade-up delay-1" style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(52px, 8vw, 100px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: 32,
                color: 'white',
              }}>
                {t.hero.title.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {i === 0 ? <>{line} </> : i === 1 ? <span className="text-shimmer">{line}</span> : line}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-up delay-2" style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 44,
              }}>
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
                <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ padding: '16px 36px', fontSize: 16 }}>
                  {t.hero.ctaPrimary}
                  <svg style={{ marginLeft: 8, display: 'inline', verticalAlign: 'middle' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="btn-secondary" onClick={() => scrollTo('work')} style={{ padding: '16px 36px', fontSize: 16 }}>
                  {t.hero.ctaSecondary}
                </button>
              </div>

              {/* Trust bullets */}
              <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {t.hero.trustBullets.map((bullet, i) => (
                  <div key={i} className="trust-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {bullet}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up delay-5" style={{ marginTop: 80, display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              {[
                { num: '3–14', label: lang === 'en' ? 'Days delivery' : lang === 'ru' ? 'Дней сдача' : 'Päeva tarneaeg' },
                { num: '€490', label: lang === 'en' ? 'Starting price' : lang === 'ru' ? 'Стартовая цена' : 'Alghind' },
                { num: '100%', label: lang === 'en' ? 'Satisfaction' : lang === 'ru' ? 'Удовлетворённость' : 'Rahulolu' },
                { num: '3+', label: lang === 'en' ? 'Projects live' : lang === 'ru' ? 'Сайтов запущено' : 'Projekti elus' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: '1 1 160px',
                  padding: '24px 32px',
                  borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                }}>
                  <div className="counter-num">{s.num}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }}/>
        </section>

        {/* ═══════════ PROBLEM ═══════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>⚠️ Problem</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.problem.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.problem.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {t.sections.problem.items.map((item, i) => (
                <div key={i} className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #ef4444, transparent)' }}/>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SOLUTION ═══════════ */}
        <section style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>✅ Solution</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.solution.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.solution.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {t.sections.solution.items.map((item, i) => (
                <div key={i} className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }}/>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section id="services" style={{ padding: '100px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>🛠 Services</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.services.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.services.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {t.sections.services.items.map((item, i) => (
                <div key={i} className="card" style={{ padding: '28px', cursor: 'default' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 14 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PROCESS ═══════════ */}
        <section style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>🔄 Process</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.processSteps.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.processSteps.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {t.sections.processSteps.items.map((item, i) => (
                <div key={i} style={{ position: 'relative', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))',
                    border: '1px solid rgba(6,182,212,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 800, color: 'var(--accent)',
                  }}>
                    {item.step}
                  </div>
                  {i < t.sections.processSteps.items.length - 1 && (
                    <div style={{ position: 'absolute', top: 32, left: 'calc(50% + 40px)', right: 'calc(-50% + 40px)', height: 1, background: 'linear-gradient(90deg, rgba(6,182,212,0.3), transparent)', display: 'none' }} className="step-connector"/>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 14 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WORK / PROJECTS ═══════════ */}
        <section id="work" style={{ padding: '100px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>💼 Portfolio</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.projects.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.projects.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {t.sections.projects.items.map((project, i) => (
                <a key={i} href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  className="card">
                  <div style={{ padding: '32px' }}>
                    {/* Preview placeholder */}
                    <div style={{
                      width: '100%', height: 180, borderRadius: 10, marginBottom: 24,
                      background: `linear-gradient(135deg, hsl(${i * 60 + 190}, 70%, 15%), hsl(${i * 60 + 210}, 60%, 10%))`,
                      border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ fontFamily: 'var(--font-syne)', fontSize: 36, fontWeight: 800, color: 'rgba(255,255,255,0.15)' }}>{project.title[0]}</div>
                      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                        <div style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--accent)', fontWeight: 600 }}>
                          {project.industry}
                        </div>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'white' }}>{project.title}</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>{project.result}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                      {project.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
                      {lang === 'en' ? 'View site' : lang === 'ru' ? 'Смотреть сайт' : 'Vaata saiti'}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PRICING ═══════════ */}
        <section id="pricing" style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>💰 Pricing</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.pricingPlans.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>{t.sections.pricingPlans.subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'start' }}>
              {t.sections.pricingPlans.items.map((plan, i) => (
                <div key={i} className={`card ${plan.featured ? 'featured-card' : ''}`} style={{ padding: '32px' }}>
                  {plan.featured && (
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {lang === 'en' ? '⭐ Most Popular' : lang === 'ru' ? '⭐ Популярный' : '⭐ Populaarne'}
                      </span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-syne)', fontSize: 36, fontWeight: 800, color: plan.featured ? 'var(--accent)' : 'white' }}>{plan.price}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                    ⏱ {plan.duration}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', alignItems: 'flex-start' }}>
                        <svg style={{ marginTop: 2, flexShrink: 0, color: 'var(--accent)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={plan.featured ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => scrollTo('contact')}
                    style={{ width: '100%', textAlign: 'center' }}>
                    {lang === 'en' ? 'Get Started' : lang === 'ru' ? 'Начать' : 'Alusta'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" style={{ padding: '100px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>❓ FAQ</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t.sections.faq.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 18 }}>{t.sections.faq.subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.sections.faq.items.map((item, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 600, color: 'white' }}>{item.question}</span>
                    <svg style={{ flexShrink: 0, color: 'var(--accent)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15 }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact" style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
            {/* Left side info */}
            <div>
              <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>📩 Contact</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
                {t.sections.contact.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
                {t.sections.contact.subtitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📧', label: brand.email, href: `mailto:${brand.email}` },
                  { icon: '📞', label: brand.phone, href: `tel:${brand.phone}` },
                  { icon: '📍', label: brand.location, href: null },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    {c.href ? (
                      <a href={c.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 15, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        {c.label}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>{c.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: '40px' }}>
              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    {lang === 'en' ? 'Message Sent!' : lang === 'ru' ? 'Сообщение отправлено!' : 'Sõnum saadetud!'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>{t.sections.contact.successMessage}</p>
                  <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setFormState('idle')}>
                    {lang === 'en' ? 'Send another' : lang === 'ru' ? 'Отправить ещё' : 'Saada uus'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                        {t.sections.contact.namePlaceholder} *
                      </label>
                      <input className="form-input" required
                        placeholder={t.sections.contact.namePlaceholder}
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}/>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                        Email *
                      </label>
                      <input className="form-input" type="email" required
                        placeholder={t.sections.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                      {t.sections.contact.phonePlaceholder}
                    </label>
                    <input className="form-input"
                      placeholder={t.sections.contact.phonePlaceholder}
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                      {lang === 'en' ? 'Message' : lang === 'ru' ? 'Сообщение' : 'Sõnum'} *
                    </label>
                    <textarea className="form-input" required rows={5}
                      placeholder={t.sections.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      style={{ resize: 'vertical', minHeight: 120 }}/>
                  </div>
                  {formState === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 14, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '10px 14px' }}>
                      {t.sections.contact.errorMessage}
                    </p>
                  )}
                  <button type="submit" className="btn-primary" disabled={formState === 'loading'}
                    style={{ marginTop: 8, opacity: formState === 'loading' ? 0.7 : 1 }}>
                    {formState === 'loading' ? (
                      <>{lang === 'en' ? 'Sending...' : lang === 'ru' ? 'Отправляем...' : 'Saadan...'}</>
                    ) : t.sections.contact.submitButton}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                    {lang === 'en' ? '🔒 Your data is safe. No spam.' : lang === 'ru' ? '🔒 Данные в безопасности. Без спама.' : '🔒 Andmed on kaitstud. Rämpsposti pole.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)"/>
                <path d="M8 22V10l8 8 8-8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs><linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#0284c7"/></linearGradient></defs>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: 'white' }}>NorthPixel</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2025 {t.footer.rights}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: t.footer.privacy, href: '/privacy' },
                { label: t.footer.terms, href: '/terms' },
                { label: t.footer.cookies, href: '/cookies' },
              ].map((link, i) => (
                <a key={i} href={link.href} style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
