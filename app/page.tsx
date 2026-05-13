'use client'
import { useState, useEffect, useRef } from 'react'
import { brand, locales, Lang } from '@/lib/content'

// ─── Aquapark hero preview — real background photo ────────────────────────────
function AquaparkHeroPreview() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      {/* Real photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/aquapark-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}/>

      {/* Purple overlay like original */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(45,27,78,0.88) 0%, rgba(45,27,78,0.6) 45%, rgba(45,27,78,0.15) 100%)',
      }}/>

      {/* Header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 36,
        background: 'rgba(45,27,78,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c6ba6, #c9a961)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            border: '1.5px solid #c9a961', borderRadius: 14, padding: '2px 8px',
            color: 'white', fontSize: 9, fontWeight: 700,
          }}>ET ▼</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '2px 4px' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 16, height: 2, background: '#c9a961', borderRadius: 1 }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div style={{
        position: 'absolute', left: 14, right: '42%', top: 46,
        bottom: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 13, fontWeight: 900, color: 'white',
          textTransform: 'uppercase', letterSpacing: 1.5,
          marginBottom: 10, lineHeight: 1.1,
          textShadow: '1px 1px 6px rgba(0,0,0,0.6)',
        }}>
          ATLANTIS H2O AQUAPARK
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 12,
          padding: '12px 14px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: 6 }}>
            Mugavus ja lõõgastus<br/>veekeskuse kõrval
          </div>
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: 10 }}>
            Broneeri majutus ja naudi veemõnusid ning sauna
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg, #c9a961 0%, #e6c876 50%, #c9a961 100%)',
            color: '#1a0f2e', padding: '6px 14px', borderRadius: 20,
            fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
            boxShadow: '0 4px 12px rgba(201,169,97,0.5)',
          }}>
            AVA HINNAKIRI →
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  // Стартуем с 'en' — H1 рендерится сразу, без ожидания JS (LCP fix)
  // После mount читаем localStorage / navigator.languages
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', contact: '', business: '', budget: '', message: '' })
  const [lightbox, setLightbox] = useState<{ link: string; title: string } | null>(null)
  const [soroArticles, setSoroArticles] = useState<Array<{
    id: number; soroId: string; slug: string; title: string; date: string; excerpt: string; html: string; image: string;
  }>>([])
  const [articlesExpanded, setArticlesExpanded] = useState(false)
  const [articleLightboxIdx, setArticleLightboxIdx] = useState<number | null>(null)
  const soroArticlesRef = useRef<typeof soroArticles>([])
  const t = locales[lang]

  useEffect(() => {
    const saved = localStorage.getItem('np-lang') as Lang | null
    if (saved && ['en', 'ru', 'et'].includes(saved)) {
      setLang(saved)
    } else {
      // Auto-detect from browser language
      const browserLangs = navigator.languages || [navigator.language]
      let detected: Lang = 'en'
      for (const bl of browserLangs) {
        const l = bl.toLowerCase()
        if (l.startsWith('ru')) { detected = 'ru'; break }
        if (l.startsWith('et')) { detected = 'et'; break }
      }
      setLang(detected)
    }
  }, [])

  const changeLang = (l: Lang) => { setLang(l); localStorage.setItem('np-lang', l); setMenuOpen(false) }

  useEffect(() => {
    document.documentElement.lang = lang
    // Обновляем title в зависимости от языка (для browser tab / analytics)
    // Для Google-индексации title берётся из metadata в layout.tsx (SSR).
    const titles: Record<string, string> = {
      en: 'NorthPixel — websites and landing pages for business in 7 days',
      ru: 'NorthPixel — сайты и лендинги для бизнеса за 7 дней',
      et: 'NorthPixel — veebilehed ja maandumislehed äriklientidele 7 päevaga',
    }
    document.title = titles[lang] || titles.en
  }, [lang])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || lightbox || articleLightboxIdx !== null) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, lightbox, articleLightboxIdx])

  // ── Soro blog ──────────────────────────────────────────────────────────────
  // Strategy:
  //   1. Show SEED articles instantly (no skeleton)
  //   2. In background, wait for Soro script to set window.SORO_ARTICLES
  //   3. When it arrives, replace with live data (picks up new articles automatically)
  useEffect(() => {
    type RawArticle = { id: string; title: string; date: string; isoDate?: string; excerpt: string; image?: string; slug: string }

    // Known articles — fallback if Soro script is slow / blocked
    // These are shown instantly; live data overwrites them once Soro loads
    const SEED: RawArticle[] = [
      { id: '0e71f5eb-0af8-4536-9822-485bf345cd80', slug: 'kiire-veebilehe-tegemine',
        title: 'Kiire veebilehe tegemine that brings leads', date: 'May 11, 2026',
        excerpt: 'Kiire veebilehe tegemine works when the site is built to generate leads, build trust, and launch fast without wasting time on extras.',
        image: 'https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/009aea0d-be41-4e6c-a094-2361085d5ed4/0e71f5eb-0af8-4536-9822-485bf345cd80.webp' },
      { id: '2ace7a0f-06f0-4d93-b65b-f5c903184c7f', slug: 'miks-koduleht-ei-too-kliente',
        title: 'Miks koduleht ei too kliente? 9 põhjust', date: 'May 9, 2026',
        excerpt: 'Miks koduleht ei too kliente? Vaata 9 levinud põhjust, miks veeb ei too päringuid, ja mida muuta, et rohkem külastajaid võtaks ühendust.',
        image: 'https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/009aea0d-be41-4e6c-a094-2361085d5ed4/2ace7a0f-06f0-4d93-b65b-f5c903184c7f.webp' },
      { id: '09d4ce73-7e01-4e53-8703-f318a6537a77', slug: 'professional-website-for-consultants',
        title: 'Professional Website for Consultants That Converts', date: 'May 7, 2026',
        excerpt: 'A professional website for consultants builds trust, shows expertise, and turns visitors into inquiries with clear messaging and strong structure.',
        image: 'https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/009aea0d-be41-4e6c-a094-2361085d5ed4/09d4ce73-7e01-4e53-8703-f318a6537a77.webp' },
    ]

    const toMapped = (arr: RawArticle[]) => arr.map((a, i) => ({
      id: i, soroId: a.id, slug: a.slug,
      title: a.title || '', date: a.date || '',
      excerpt: a.excerpt || '', image: a.image || '', html: '',
    }))

    // Show seed immediately
    const seedMapped = toMapped(SEED)
    soroArticlesRef.current = seedMapped
    setSoroArticles(seedMapped)

    // Try to get live list (has new articles added after last deploy)
    const tryLive = (): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = (window as any).SORO_ARTICLES as RawArticle[] | undefined
      if (!Array.isArray(raw) || raw.length === 0) return false
      const live = toMapped(raw)
      soroArticlesRef.current = live
      setSoroArticles(live)
      return true
    }

    if (tryLive()) return

    // Watch hidden soro div — Soro sets SORO_ARTICLES before touching DOM
    const soroDiv = document.getElementById('soro-blog')
    let obs: MutationObserver | null = null
    if (soroDiv) {
      obs = new MutationObserver(() => { if (tryLive()) obs!.disconnect() })
      obs.observe(soroDiv, { childList: true, subtree: true })
    }

    // Backup poll for 30s
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (tryLive()) { clearInterval(interval); obs?.disconnect() }
      if (attempts > 150) clearInterval(interval)
    }, 200)

    return () => { clearInterval(interval); obs?.disconnect() }
  }, [])

  // Fetch full article HTML from Soro API when opening lightbox
  const loadArticleContent = async (idx: number) => {
    const art = soroArticlesRef.current[idx]
    if (!art || art.html) return // already loaded
    const SORO_API_BASE = 'https://app.trysoro.com'
    const SORO_TOKEN    = 'c1441b0e-92a4-4fec-b47c-a10a02e5b1e0'
    try {
      const res = await fetch(`${SORO_API_BASE}/api/embed/${SORO_TOKEN}/article/${art.soroId}`)
      if (!res.ok) return
      const data = await res.json()
      setSoroArticles(prev => {
        const next = prev.map((a, i) => i === idx ? { ...a, html: data.content || '' } : a)
        soroArticlesRef.current = next
        return next
      })
    } catch { /* ignore */ }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(null); setArticleLightboxIdx(null) }
      if (articleLightboxIdx !== null) {
        if (e.key === 'ArrowLeft' && articleLightboxIdx > 0) setArticleLightboxIdx(i => i !== null ? i - 1 : null)
        if (e.key === 'ArrowRight' && articleLightboxIdx < soroArticles.length - 1) setArticleLightboxIdx(i => i !== null ? i + 1 : null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [articleLightboxIdx, soroArticles.length])


  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          subject: `Заявка от ${formData.name} — NorthPixel`,
          from_name: formData.name,
          contact: formData.contact,
          business: formData.business,
          budget: formData.budget,
          message: formData.message,
          redirect: false,
        }),
      })
      const data = await res.json()
      if (data.success) { setFormState('success'); setFormData({ name: '', contact: '', business: '', budget: '', message: '' }) }
      else setFormState('error')
    } catch { setFormState('error') }
  }

  const navItems = [
    { label: lang === 'ru' ? 'Услуги' : lang === 'et' ? 'Teenused' : 'Services', id: 'services' },
    { label: lang === 'ru' ? 'Примеры' : lang === 'et' ? 'Tööd' : 'Work', id: 'work' },
    { label: lang === 'ru' ? 'Пакеты' : lang === 'et' ? 'Hinnad' : 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
    { label: lang === 'ru' ? 'Блог' : lang === 'et' ? 'Blogi' : 'Blog', id: 'blog' },
  ]

  const c = (ru: string, et: string, en: string) => lang === 'ru' ? ru : lang === 'et' ? et : en

  const projects = [
    {
      title: 'ManuFarm', industry: c('Металл', 'Metall', 'Metal'),
      desc: c('Лендинг с каталогом продукции', 'Maandumisleht tootekataloogiga', 'Landing page with product catalog'),
      tags: ['Landing Page', 'B2B'], link: 'https://www.manufarm.ee', days: 5,
      accent: '#ff6b00', useIframe: true,
    },
    {
      title: 'Florista', industry: c('Цветы', 'Lilled', 'Flowers'),
      desc: c('Бизнес-сайт со страницами услуг', 'Äriveebileht teenuselehtedega', 'Business site with service pages'),
      tags: ['Business Site', 'Local'], link: 'https://flower-shop-simple.vercel.app', days: 8,
      accent: '#e879f9', useIframe: true,
    },
    {
      title: 'Aquapark H2O', industry: c('Аквапарк', 'Veekeskus', 'Aquapark'),
      desc: c('Сайт для сервиса и онлайн-бронирования', 'Veebileht teenuse ja broneerimise jaoks', 'Website for service & online booking'),
      tags: ['Booking', 'Service'], link: 'https://aquapark-ee.vercel.app', days: 12,
      accent: '#f5c842', useIframe: false,
    },
    {
      title: c('Юлия Петров', 'Julia Petrov', 'Julia Petrov'), industry: c('Нутрициология', 'Toitumine', 'Nutrition'),
      desc: c('Личный бренд с отзывами и мультиязычностью', 'Isiklik bränd arvustuste ja mitmekeelsusega', 'Personal brand with reviews & multilingual'),
      tags: ['Personal Brand', 'Multilingual'], link: 'https://www.nutribalance.ee', days: 10,
      accent: '#4ade80', useIframe: true,
    },
  ]

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .project-card { grid-column: 1 / -1 !important; }
          .project-preview { height: 180px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .preview-hint { opacity: 0 !important; }
        .project-card:hover .preview-hint { opacity: 1 !important; }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(8,13,24,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.svg" alt="NorthPixel" width={140} height={36} style={{ height: 36, width: 'auto' }} />
          </div>

          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {navItems.map(item => (
              <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
              {(['ru', 'et', 'en'] as Lang[]).map(l => (
                <button key={l} onClick={() => changeLang(l)} style={{
                  background: lang === l ? 'var(--accent)' : 'transparent',
                  color: 'white',
                  opacity: lang === l ? 1 : 0.45,
                  border: 'none', cursor: 'pointer', padding: '4px 9px', borderRadius: 6,
                  fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-inter)',
                  textTransform: 'uppercase', transition: 'background 0.2s, opacity 0.2s', letterSpacing: '0.05em',
                }}>{l}</button>
              ))}
            </div>
            <button className="btn-primary hide-mobile" onClick={() => scrollTo('contact')} style={{ padding: '9px 18px', fontSize: 13 }}>
              {c('Оставить заявку', 'Küsi pakkumist', 'Get a Quote')}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile"
              aria-label={menuOpen ? c('Закрыть меню', 'Sulge menüü', 'Close menu') : c('Открыть меню', 'Ava menüü', 'Open menu')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 4 }}>
              {menuOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 26, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              {item.label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo('contact')}>{c('Оставить заявку', 'Küsi pakkumist', 'Get a Quote')}</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['ru', 'et', 'en'] as Lang[]).map(l => (
              <button key={l} onClick={() => changeLang(l)} style={{ background: lang === l ? 'var(--accent)' : 'rgba(255,255,255,0.07)', color: 'white', border: 'none', cursor: 'pointer', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{l}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: 1200,
              height: '90vh', borderRadius: 18, overflow: 'hidden',
              background: '#080d18', border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{
              height: 46, background: 'rgba(8,13,24,0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center',
              padding: '0 16px', gap: 12, flexShrink: 0,
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}/>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }}/>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }}/>
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 8,
                height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-inter)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                🔒 {lightbox.link.replace('https://', '')}
              </div>
              <a
                href={lightbox.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--accent)', color: 'white', padding: '5px 14px',
                  borderRadius: 8, fontSize: 12, fontWeight: 700,
                  textDecoration: 'none', flexShrink: 0, letterSpacing: '-0.01em',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {c('Перейти на сайт', 'Ava sait', 'Visit Site')}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: 'white', cursor: 'pointer',
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s', flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <iframe
              src={lightbox.link}
              style={{ flex: 1, width: '100%', border: 'none' }}
              title={lightbox.title}
            />
          </div>
        </div>
      )}

      {/* ── ARTICLE LIGHTBOX ── */}
      {articleLightboxIdx !== null && soroArticles[articleLightboxIdx] && (() => {
        const art = soroArticles[articleLightboxIdx]
        const hasPrev = articleLightboxIdx > 0
        const hasNext = articleLightboxIdx < soroArticles.length - 1
        return (
          <div
            onClick={() => setArticleLightboxIdx(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(24px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px', animation: 'fadeIn 0.2s ease',
            }}
          >
            <style>{`
              .art-body h1,.art-body h2,.art-body h3,.art-body h4{color:#fff;font-family:var(--font-inter);font-weight:700;margin:1.4em 0 0.5em;letter-spacing:-0.02em}
              .art-body p{color:var(--text-soft);line-height:1.85;margin-bottom:1.1em;font-size:15px}
              .art-body img{width:100%;border-radius:12px;margin:1.2em 0}
              .art-body a{color:var(--accent);text-underline-offset:3px}
              .art-body ul,.art-body ol{color:var(--text-soft);line-height:1.8;padding-left:22px;margin-bottom:1em}
              .art-body li{margin-bottom:0.4em;font-size:15px}
              .art-body strong,.art-body b{color:white}
              .art-body blockquote{border-left:3px solid var(--accent);padding-left:16px;margin:1.4em 0;color:var(--text-muted);font-style:italic}
              .art-body code{background:rgba(79,156,249,0.1);padding:2px 7px;border-radius:5px;font-size:13px}
              .art-body *{box-sizing:border-box}
              @keyframes soro-spin{to{transform:rotate(360deg)}}
            `}</style>
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: 760,
                height: '90vh', borderRadius: 20, overflow: 'hidden',
                background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Top bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0, gap: 12, background: 'rgba(8,13,24,0.98)',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { label: '← Prev', active: hasPrev, action: () => { if (hasPrev) { setArticleLightboxIdx(articleLightboxIdx - 1); loadArticleContent(articleLightboxIdx - 1) } } },
                    { label: 'Next →', active: hasNext, action: () => { if (hasNext) { setArticleLightboxIdx(articleLightboxIdx + 1); loadArticleContent(articleLightboxIdx + 1) } } },
                  ].map(({ label, active, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      disabled={!active}
                      style={{
                        background: active ? 'rgba(79,156,249,0.1)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${active ? 'rgba(79,156,249,0.25)' : 'rgba(255,255,255,0.05)'}`,
                        color: active ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                        borderRadius: 8, cursor: active ? 'pointer' : 'default',
                        padding: '5px 12px', fontSize: 12, fontWeight: 600,
                        fontFamily: 'var(--font-inter)', transition: 'background 0.15s',
                      }}
                    >{label}</button>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  {articleLightboxIdx + 1} / {soroArticles.length}
                </span>
                <button
                  onClick={() => setArticleLightboxIdx(null)}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, color: 'white', cursor: 'pointer',
                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Scrollable article body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '36px 44px' }}>
                {art.title && (
                  <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'white', marginBottom: 10, letterSpacing: '-0.03em' }}>
                    {art.title}
                  </h1>
                )}
                {art.date && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {art.date}
                  </div>
                )}
                {art.html
                  ? <div className="art-body" dangerouslySetInnerHTML={{ __html: art.html }} />
                  : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '40px 0', color: 'var(--text-muted)', fontSize: 14 }}>
                      <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'soro-spin 0.8s linear infinite', flexShrink: 0 }} />
                      Loading article...
                    </div>
                  )
                }
              </div>

              {/* CTA footer */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '18px 44px',
                background: 'rgba(8,13,24,0.98)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexShrink: 0, gap: 16, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
                    {c('Готовы запустить сайт?', 'Valmis veebilehte käivitama?', 'Ready to build your website?')}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {c('Профессиональный сайт за 7 дней — от €290', 'Professionaalne veebileht 7 päevaga — alates €290', 'Professional site in 7 days — starting at €290')}
                  </div>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => { setArticleLightboxIdx(null); setTimeout(() => scrollTo('contact'), 100) }}
                  style={{ padding: '10px 22px', fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  {c('Оставить заявку →', 'Küsi pakkumist →', 'Get a Quote →')}
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      <main>
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 80 }} className="grid-bg">
          <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
          <div style={{ position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(120px, 18vw, 280px)', fontWeight: 900, color: 'rgba(79,156,249,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em' }}>NP</div>

          <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 820 }}>
              <div style={{ marginBottom: 28 }}>
                <span className="section-label">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}/>
                  {c('Веб-студия · Таллин, Эстония', 'Veebistuudio · Tallinn, Eesti', 'Web studio · Tallinn, Estonia')}
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 28, color: 'white' }}>
                {lang === 'ru' && <><span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>Сайт</span> для вашего бизнеса,<br/>который приводит клиентов</>}
                {lang === 'et' && <><span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>Veebileht</span> teie ettevõttele,<br/>mis toob kliente</>}
                {lang === 'en' && <><span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>Website</span> for your business<br/>that brings clients</>}
              </h1>

              <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'var(--text-soft)', lineHeight: 1.75, maxWidth: 580, marginBottom: 14 }}>
                {c(
                  'Создаём современные лендинги с чёткой логикой и фокусом на заявки - от идеи до запуска за 7 дней.',
                  'Loome kaasaegseid maandumislehti selge loogika ja fookusega päringutele - ideest käivitamiseni 7 päevaga.',
                  'We build modern landing pages with clear logic and focus on leads - from idea to launch in 7 days.'
                )}
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 40, fontStyle: 'italic' }}>
                {c('Подходит для специалистов, сервисов и компаний, которым нужен понятный и эффективный сайт.', 'Sobib spetsialistidele, teenustele ja ettevõtetele.', 'Perfect for specialists, services and companies.')}
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
                <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ padding: '15px 32px', fontSize: 15, minWidth: 180 }}>
                  {c('Оставить заявку', 'Küsi pakkumist', 'Get a Quote')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="btn-secondary" onClick={() => scrollTo('work')} style={{ padding: '15px 32px', fontSize: 15, minWidth: 180 }}>
                  {c('Посмотреть примеры', 'Vaata näiteid', 'See Examples')}
                </button>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-soft)', marginBottom: 44, letterSpacing: '-0.01em' }}>
                {c('Без лишних этапов. Только то, что действительно работает.', 'Ilma lisaetappideta. Ainult see, mis tegelikult töötab.', 'No extra steps. Only what actually works.')}
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  c('✓ Запуск за 7 дней', '✓ Käivitus 7 päevaga', '✓ Launch in 7 days'),
                  c('✓ Фокус на заявках', '✓ Fookus päringutele', '✓ Focus on leads'),
                  c('✓ Простое управление', '✓ Lihtne haldamine', '✓ Easy management'),
                ].map((b, i) => <span key={i} className="trust-pill">{b}</span>)}
              </div>
            </div>

            {/* Stats */}
            <div style={{ marginTop: 72, display: 'flex', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 40 }}>
              {[
                { num: '7', suf: c('дней', 'päeva', 'days'), label: c('средний срок запуска', 'keskmine käivitusaeg', 'avg. launch time') },
                { num: '€290', suf: '', label: c('стартовая цена', 'alghind', 'starting price') },
                { num: '100%', suf: '', label: c('адаптация под телефон', 'mobiilisõbralik', 'mobile-ready') },
              ].map((s, i) => (
                <div key={i} style={{ flex: '1 1 140px', padding: '20px 28px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <div className="stat-num">{s.num}<span style={{ fontSize: '0.5em', opacity: 0.6 }}>{s.suf}</span></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4, letterSpacing: '-0.01em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }}/>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ padding: '96px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
              <div>
                <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
                  {c('Проблема', 'Probleem', 'Problem')}
                </span>
                <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                  {c('Почему сайт не даёт результат?', 'Miks veebileht ei anna tulemusi?', 'Why is your website not working?')}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
                  {c('Чаще всего дело не в рекламе - а в том, как выстроен сам сайт.', 'Enamasti pole probleem reklaamis - vaid selles, kuidas veebileht on üles ehitatud.', 'Most often it\'s not the ads - it\'s how the website itself is built.')}
                </p>
                <div style={{ borderRadius: 14, border: '1px solid rgba(239,68,68,0.15)', overflow: 'hidden', background: 'rgba(239,68,68,0.02)' }}>
                  {[
                    c('Непонятно, чем вы занимаетесь с первых секунд', 'Esimestest sekunditest pole selge, millega tegelete', 'It\'s unclear what you do in the first seconds'),
                    c('Дизайн перегружен или выглядит устаревшим', 'Disain on ülekoormatud või näeb vananenud välja', 'Design is cluttered or looks outdated'),
                    c('Нет чёткого пути для клиента', 'Puudub selge tee kliendile', 'No clear path for the customer'),
                    c('Нет акцента на действии', 'Pole rõhku tegevusele', 'No emphasis on action'),
                    c('Сайт есть, но не работает', 'Veebileht on olemas, aga ei tööta', 'Website exists but doesn\'t convert'),
                  ].map((pain, i) => (
                    <div key={i} className="pain-item" style={{ padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: i < 4 ? '1px solid rgba(239,68,68,0.08)' : 'none' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </div>
                      <span style={{ color: 'var(--text-soft)', fontSize: 14, lineHeight: 1.5 }}>{pain}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 20, fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '2px solid rgba(239,68,68,0.3)', paddingLeft: 14 }}>
                  {c('В результате - вы теряете клиентов, которые могли бы стать вашими.', 'Tulemusena kaotate kliente, kes oleksid võinud teie omad olla.', 'As a result - you\'re losing clients who could have been yours.')}
                </p>
              </div>

              <div>
                <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
                  {c('Решение', 'Lahendus', 'Solution')}
                </span>
                <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
                  {c('Хороший сайт - это не просто дизайн. Это система.', 'Hea veebileht ei ole lihtsalt disain. See on süsteem.', 'A good website is not just design. It\'s a system.')}
                </p>
                <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                  {c('Мы создаём сайты, которые работают на результат', 'Loome veebilehti, mis töötavad tulemuste nimel', 'We build websites that work for results')}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                  {c('Каждое решение строится на понимании того, как человек воспринимает информацию и принимает решение.', 'Iga otsus põhineb mõistmisel, kuidas inimene infot tajub ja otsuseid teeb.', 'Every decision is based on understanding how a person perceives information and makes decisions.')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { icon: '🎯', text: c('Понятная структура, которая раскрывает суть за первые секунды', 'Selge struktuur, mis avab olemuse esimeste sekunditega', 'Clear structure that reveals the essence in seconds') },
                    { icon: '💎', text: c('Современный дизайн, который формирует доверие', 'Kaasaegne disain, mis tekitab usaldust', 'Modern design that builds trust') },
                    { icon: '🛤️', text: c('Продуманный путь клиента от первого экрана до действия', 'Läbimõeldud klienditeekond esimesest ekraanist tegevuseni', 'Thoughtful customer journey from first screen to action') },
                    { icon: '📱', text: c('Адаптация под телефон - где основная часть аудитории', 'Mobiiliadaptatsioon - kus on põhiosa publikust', 'Mobile-first - where most of your audience is') },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px', borderRadius: 12, background: 'rgba(79,156,249,0.03)', border: '1px solid rgba(79,156,249,0.08)' }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <span style={{ color: 'var(--text-soft)', fontSize: 14, lineHeight: 1.6 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 20, fontSize: 14, color: 'var(--text-soft)', borderLeft: '2px solid rgba(79,156,249,0.4)', paddingLeft: 14 }}>
                  {c('Мы создаём не просто сайт - а инструмент, который помогает стабильно привлекать клиентов.', 'Me ei loo lihtsalt veebilehte - vaid tööriista, mis aitab kliente stabiilselt meelitada.', 'We don\'t just build a website - we build a tool that helps consistently attract clients.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ── */}
        <section id="services" style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
                {c('Что вы получаете', 'Mida saate', 'What you get')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {c('Всё, что нужно для запуска и первых заявок', 'Kõik, mida vajate käivitamiseks ja esimesteks päringuteks', 'Everything you need to launch and get first leads')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
                {c('Мы берём на себя ключевые задачи, чтобы сайт начал работать сразу после запуска.', 'Võtame peamised ülesanded enda peale, et veebileht hakkaks tööle kohe pärast käivitamist.', 'We handle the key tasks so your website starts working right after launch.')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 12 }}>
              {[
                { icon: '⚡', title: c('Готовый сайт за 7 дней', 'Valmis veebileht 7 päevaga', 'Ready website in 7 days'), desc: c('Запускаем быстро без потери качества', 'Käivitame kiiresti ilma kvaliteeti kaotamata', 'Launch fast without sacrificing quality') },
                { icon: '🎨', title: c('Индивидуальный дизайн', 'Individuaalne disain', 'Individual design'), desc: c('Под ваш бизнес, не шаблонное решение', 'Teie äri jaoks, mitte malli lahendus', 'For your business, not a template') },
                { icon: '🎯', title: c('Структура под заявки', 'Struktuur päringutele', 'Structure for leads'), desc: c('Ведём клиента к действию на каждом шаге', 'Juhime kliendi igal sammul tegevuseni', 'Guide the client to action at every step') },
                { icon: '⚙️', title: c('Удобная админка', 'Mugav adminpaneel', 'Easy admin panel'), desc: c('Управляйте контентом самостоятельно', 'Haldage sisu iseseisvalt', 'Manage content on your own') },
                { icon: '📩', title: c('Форма заявок', 'Päringuvorm', 'Lead form'), desc: c('Подключаем email и мессенджеры', 'Ühendame e-posti ja sõnumirakendused', 'Connect email and messengers') },
                { icon: '📱', title: c('Мобильная версия', 'Mobiiliversioon', 'Mobile version'), desc: c('Идеально на любом устройстве', 'Ideaalselt igal seadmel', 'Perfect on any device') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, transition: 'border-color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(79,156,249,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(79,156,249,0.07)', border: '1px solid rgba(79,156,249,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2, letterSpacing: '-0.01em' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{item.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.4"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 36, color: 'var(--text-soft)', fontSize: 14, fontStyle: 'italic' }}>
              {c('Вы получаете не просто сайт - а инструмент, который помогает привлекать клиентов.', 'Te saate mitte lihtsalt veebilehe - vaid tööriista, mis aitab kliente meelitada.', 'You get not just a website - but a tool that helps attract clients.')}
            </p>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section style={{ padding: '96px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
                {c('Процесс', 'Protsess', 'Process')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {c('Простой процесс - без лишних шагов', 'Lihtne protsess - ilma lisasammudeta', 'Simple process - no extra steps')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
                {c('От идеи до запуска - без перегрузки и сложных этапов.', 'Ideest käivitamiseni - ilma ülekoormuse ja keeruliste etappideta.', 'From idea to launch - no overload, no complex stages.')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                { num: '01', icon: '💬', title: c('Заявка и консультация', 'Päring ja konsultatsioon', 'Inquiry & consultation'), desc: c('Обсуждаем ваш бизнес, задачи и цели. Определяем оптимальное решение.', 'Arutame teie äri, ülesandeid ja eesmärke. Määrame optimaalse lahenduse.', 'We discuss your business, tasks and goals. Define the optimal solution.') },
                { num: '02', icon: '✏️', title: c('Структура и дизайн', 'Struktuur ja disain', 'Structure & design'), desc: c('Продумываем логику и внешний вид. Согласовываем перед разработкой.', 'Mõtleme läbi loogika ja välimuse. Kooskõlastame enne arendust.', 'We think through logic and appearance. Agree before development.') },
                { num: '03', icon: '🔧', title: c('Разработка и настройка', 'Arendus ja seadistamine', 'Development & setup'), desc: c('Собираем сайт, подключаем формы и контакты. Готовим к запуску.', 'Ehitame veebilehe, ühendame vormid ja kontaktid. Valmistame käivitamiseks.', 'We build the site, connect forms and contacts. Prepare for launch.') },
                { num: '04', icon: '🚀', title: c('Запуск', 'Käivitamine', 'Launch'), desc: c('Публикуем сайт и передаём доступ. Вы готовы принимать заявки.', 'Avaldame veebilehe ja anname juurdepääsu üle. Olete valmis päringuid vastu võtma.', 'We publish the site and hand over access. You\'re ready to receive leads.') },
              ].map((step, i) => (
                <div key={i} className="card" style={{ padding: '28px', textAlign: 'center' }}>
                  <div className="step-num">{step.num}</div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 36, color: 'var(--text-muted)', fontSize: 14 }}>
              {c('Весь процесс занимает около 7 дней и не требует технической подготовки.', 'Kogu protsess võtab umbes 7 päeva ega nõua tehnilist ettevalmistust.', 'The entire process takes about 7 days and requires no technical knowledge.')}
            </p>
          </div>
        </section>

        {/* ── WORK / PROJECTS ── */}
        <section id="work" style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
                {c('Примеры работ', 'Tööde näited', 'Portfolio')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {c('Примеры наших работ', 'Meie tööde näited', 'Examples of our work')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
                {c('Реальные и концептуальные проекты, которые показывают наш подход.', 'Reaalsed ja kontseptuaalsed projektid, mis näitavad meie lähenemist.', 'Real and conceptual projects that show our approach.')}
              </p>
            </div>

            {/* ── BENTO GRID: 0=wide(2/3), 1=narrow, 2=narrow, 3=wide(2/3) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {projects.map((project, i) => {
                const gridColumn = i === 0 ? '1 / 3' : i === 1 ? '3' : i === 2 ? '1' : '2 / 4'
                return (
                  <div
                    key={i}
                    className="card project-card"
                    onClick={() => {
  if (project.useIframe) {
    setLightbox({ link: project.link, title: project.title })
  } else {
    window.open(project.link, '_blank', 'noopener,noreferrer')
  }
}}
                    style={{
                      gridColumn,
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.accent}33`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = ''
                    }}
                  >
                    <div
                      className="project-preview"
                      style={{
                        width: '100%',
                        height: 260,
                        borderRadius: '18px 18px 0 0',
                        position: 'relative',
                        overflow: 'hidden',
                        background: project.useIframe ? '#080d18' : 'transparent',
                      }}
                    >
                      {project.useIframe ? (
                        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                          <iframe
                            src={project.link}
                            style={{
                              width: '200%',
                              height: '200%',
                              border: 'none',
                              transform: 'scale(0.5)',
                              transformOrigin: 'top left',
                              pointerEvents: 'none',
                              display: 'block',
                            }}
                            loading="lazy"
                            title={project.title}
                            sandbox="allow-scripts allow-same-origin"
                          />
                        </div>
                      ) : (
                        <AquaparkHeroPreview />
                      )}

                      {/* Bottom gradient */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(8,13,24,0.6))', pointerEvents: 'none' }}/>

                      {/* Industry badge */}
                      <div style={{ position: 'absolute', top: 12, right: 12 }}>
                        <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: `1px solid ${project.accent}55`, color: project.accent, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{project.industry}</span>
                      </div>

                      {/* Days badge */}
                      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '3px 10px', borderRadius: 100 }}>
                          ⏱ {project.days} {c('дней', 'päeva', 'days')}
                        </span>
                      </div>

                      {/* Click hint */}
                      <div className="preview-hint" style={{ position: 'absolute', top: 12, left: 12, transition: 'opacity 0.2s' }}>
                        <span style={{ color: 'white', fontSize: 11, background: 'rgba(79,156,249,0.7)', backdropFilter: 'blur(8px)', padding: '3px 10px', borderRadius: 100, fontWeight: 600 }}>
                          {c('Открыть', 'Ava', 'Open')} ↗
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '22px 26px 26px' }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{project.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{project.desc}</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                        {project.tags.map((tag: string, j: number) => <span key={j} className="tag">{tag}</span>)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
                        {c('Открыть проект', 'Ava projekt', 'Open project')}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" style={{ padding: '96px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
                {c('Пакеты', 'Paketid', 'Packages')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {c('Выберите решение для вашего бизнеса', 'Valige oma äri jaoks lahendus', 'Choose the solution for your business')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17 }}>
                {c('Всё, что нужно для запуска - уже внутри.', 'Kõik käivitamiseks vajalik on juba sees.', 'Everything you need to launch is already included.')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, alignItems: 'start' }}>
              {[
                {
                  name: 'START', price: '290€', badge: null,
                  fit: c('Для быстрого запуска', 'Kiireks käivitamiseks', 'For fast launch'),
                  features: [
                    c('1 страница (лендинг)', '1 lehekülg (maandumine)', '1 page (landing)'),
                    c('Базовая структура', 'Põhistruktuur', 'Basic structure'),
                    c('Аккуратный дизайн', 'Korralik disain', 'Clean design'),
                    c('Форма заявки', 'Päringuvorm', 'Lead form'),
                    c('Мобильная версия', 'Mobiiliversioon', 'Mobile version'),
                    c('Запуск за 5–7 дней', 'Käivitus 5–7 päevaga', 'Launch in 5–7 days'),
                  ], featured: false,
                },
                {
                  name: 'BUSINESS', price: '490€', badge: c('Самый популярный', 'Populaarseim', 'Most popular'),
                  fit: c('Оптимальный выбор', 'Optimaalne valik', 'Optimal choice'),
                  features: [
                    c('Индивидуальный дизайн', 'Individuaalne disain', 'Individual design'),
                    c('Структура под ваш бизнес', 'Struktuur teie äri jaoks', 'Structure for your business'),
                    c('Фокус на заявках', 'Fookus päringutele', 'Focus on leads'),
                    c('Подключение контактов', 'Kontaktide ühendamine', 'Contact integration'),
                    c('Удобная админка', 'Mugav adminpaneel', 'Easy admin panel'),
                    c('Базовое SEO', 'Põhiline SEO', 'Basic SEO'),
                    c('Запуск за ~7 дней', 'Käivitus ~7 päevaga', 'Launch in ~7 days'),
                  ], featured: true,
                },
                {
                  name: 'PRO', price: '790€', badge: null,
                  fit: c('Максимальный результат', 'Maksimaalne tulemus', 'Maximum result'),
                  features: [
                    c('Всё из BUSINESS', 'Kõik BUSINESS paketist', 'Everything from BUSINESS'),
                    c('Расширенная структура', 'Laiendatud struktuur', 'Extended structure'),
                    c('Помощь с текстами', 'Abi tekstidega', 'Help with copy'),
                    c('Приоритетная работа', 'Prioriteetne töö', 'Priority work'),
                    c('Дополнительные блоки', 'Lisaplokid', 'Additional blocks'),
                    c('Консультация по развитию', 'Arenduskonsultatsioon', 'Growth consultation'),
                  ], featured: false,
                },
                {
                  name: c('ДОПОЛНИТЕЛЬНО', 'LISATEENUSED', 'ADD-ONS'), price: '', badge: null,
                  fit: c('Расширения к любому пакету', 'Laiendused igale paketile', 'Add-ons for any package'),
                  features: [
                    c('Логотип: 50€', 'Logo: 50€', 'Logo: 50€'),
                    c('Тексты / копирайтинг: 50€', 'Tekstid / copywriting: 50€', 'Copy / copywriting: 50€'),
                    c('Доп. страницы - по договорённости', 'Lisaleheküljed - kokkuleppel', 'Extra pages - by agreement'),
                  ], featured: false,
                },
              ].map((plan, i) => (
                <div key={i} className={`card ${plan.featured ? 'featured-card' : ''}`} style={{ padding: '28px' }}>
                  {plan.badge && (
                    <div style={{ marginBottom: 14 }}>
                      <span style={{ background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⭐ {plan.badge}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{plan.name}</div>
                  {plan.price && <div style={{ fontFamily: 'var(--font-inter)', fontSize: 40, fontWeight: 800, color: plan.featured ? 'var(--accent)' : 'white', marginBottom: 4, letterSpacing: '-0.03em' }}>{plan.price}</div>}
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>{plan.fit}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-soft)', alignItems: 'flex-start', lineHeight: 1.5 }}>
                        <svg style={{ marginTop: 2, flexShrink: 0, color: plan.featured ? 'var(--accent)' : 'var(--green)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.price !== '' && (
                    <button className={plan.featured ? 'btn-primary' : 'btn-secondary'} onClick={() => scrollTo('contact')} style={{ width: '100%', justifyContent: 'center' }}>
                      {c('Выбрать', 'Vali', 'Choose')}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                {c('Не уверены, какой пакет выбрать? Оставьте заявку - подскажем.', 'Pole kindel, millist paketti valida? Jätke päring - anname nõu.', 'Not sure which package to choose? Leave a request - we\'ll advise.')}
                {' '}<button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 14, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>{c('Оставить заявку →', 'Jäta päring →', 'Get in touch →')}</button>
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, opacity: 0.7, fontStyle: 'italic' }}>
                {c('Работаем с ограниченным количеством проектов одновременно.', 'Töötame korraga piiratud arvu projektidega.', 'We work with a limited number of projects at a time.')}
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>FAQ</span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {c('Частые вопросы', 'Korduma kippuvad küsimused', 'Frequently asked questions')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17 }}>
                {c('Ключевые моменты перед началом работы.', 'Põhipunktid enne töö alustamist.', 'Key points before getting started.')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  q: c('Сколько времени занимает разработка?', 'Kui kaua võtab arendus aega?', 'How long does development take?'),
                  a: c('В среднем от 5 до 7 дней. Срок зависит от объёма и скорости согласования.', 'Keskmiselt 5–7 päeva. Tähtaeg sõltub mahust ja kooskõlastamise kiirusest.', 'On average 5–7 days. The timeline depends on scope and approval speed.'),
                },
                {
                  q: c('Что от меня нужно для начала?', 'Mida vajate alustamiseks?', 'What do I need to get started?'),
                  a: c('Краткая информация о вашем бизнесе. Если нет текстов или структуры - поможем.', 'Lühiinfo teie äri kohta. Kui tekste või struktuuri pole - aitame.', 'Brief info about your business. If you don\'t have copy or structure - we\'ll help.'),
                },
                {
                  q: c('Смогу ли я менять сайт самостоятельно?', 'Kas saan saiti ise muuta?', 'Can I edit the site myself?'),
                  a: c('Да, вы получаете удобную админку. Можно редактировать контент без технических знаний.', 'Jah, saate mugava adminpaneeli. Saate sisu redigeerida ilma tehniliste teadmisteta.', 'Yes, you get an easy admin panel. You can edit content without technical knowledge.'),
                },
                {
                  q: c('Нужно ли покупать домен?', 'Kas pean domeeni ostma?', 'Do I need to buy a domain?'),
                  a: c('Да, домен оформляется на вас. Мы поможем подключить его.', 'Jah, domeen registreeritakse teie nimele. Aitame selle ühendada.', 'Yes, the domain is registered in your name. We\'ll help connect it.'),
                },
                {
                  q: c('Будет ли сайт работать на телефоне?', 'Kas veebileht töötab telefonil?', 'Will the site work on mobile?'),
                  a: c('Да, все сайты адаптированы под мобильные устройства.', 'Jah, kõik veebilehed on mobiilseadmetele kohandatud.', 'Yes, all websites are adapted for mobile devices.'),
                },
                {
                  q: c('Есть ли дополнительные расходы?', 'Kas on lisakulusid?', 'Are there any additional costs?'),
                  a: c('Дополнительно оплачивается только домен и расширенные услуги. Основные работы уже включены.', 'Lisatasu võetakse ainult domeeni ja lisateenuste eest. Põhitööd on juba kaasas.', 'Only the domain and extended services are paid extra. Core work is already included.'),
                },
                {
                  q: c('Что происходит после запуска?', 'Mis juhtub pärast käivitamist?', 'What happens after launch?'),
                  a: c('Сайт полностью готов. Вы получаете доступ и можете принимать заявки.', 'Veebileht on täielikult valmis. Saate juurdepääsu ja võite päringuid vastu võtma.', 'The website is fully ready. You get access and can start receiving leads.'),
                },
              ].map((item, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'white', letterSpacing: '-0.01em' }}>{item.q}</span>
                    <svg style={{ flexShrink: 0, color: 'var(--accent)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 22px 18px', color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 14 }}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text-muted)', fontSize: 14 }}>
              {c('Не нашли ответ? ', 'Ei leidnud vastust? ', 'Didn\'t find the answer? ')}
              <button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                {c('Напишите нам →', 'Kirjutage meile →', 'Write to us →')}
              </button>
            </p>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section id="blog" style={{ padding: '96px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label" style={{ marginBottom: 16, display: 'inline-flex' }}>{c('Блог', 'Blogi', 'Blog')}</span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {c('Полезные статьи', 'Kasulikud artiklid', 'Useful articles')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 20px' }}>
                {c('Советы по веб-дизайну, маркетингу и развитию бизнеса онлайн.', 'Näpunäited veebidisaini, turunduse ja veebipõhise äri arendamise kohta.', 'Tips on web design, marketing and growing your business online.')}
              </p>
              {/* ── Partnership badge ── */}
              <a
                href="https://trysoro.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 16px', background: 'rgba(79,156,249,0.06)',
                  border: '1px solid rgba(79,156,249,0.18)', borderRadius: 100,
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(79,156,249,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(79,156,249,0.06)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c('Опубликовано совместно с', 'Avaldatud koostöös', 'Published in partnership with')}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>Soro</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.6"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            </div>

            {/* Hidden Soro source — Soro script populates this */}
            <div
              id="soro-blog"
              className="soro-embed-wrapper"
              aria-hidden="true"
              style={{ visibility: 'hidden', height: 0, overflow: 'hidden', pointerEvents: 'none' }}
            />

            {/* ── Custom article cards ── */}
            {soroArticles.length > 0 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 24 }}>
                  {(articlesExpanded ? soroArticles : soroArticles.slice(0, 3)).map((article, i) => (
                    <article
                      key={article.id}
                      className="card"
                      style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,156,249,0.15)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      {article.image && (
                        <div style={{ width: '100%', height: 180, overflow: 'hidden', flexShrink: 0 }}>
                          <img
                            src={article.image}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                        </div>
                      )}
                      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {article.date && (
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                            {article.date}
                          </div>
                        )}
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.35, flex: 'none' }}>
                          {article.title || `Article ${i + 1}`}
                        </h3>
                        {article.excerpt && (
                          <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, marginBottom: 16, flex: 1,
                            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}>
                            {article.excerpt}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => { setArticleLightboxIdx(i); loadArticleContent(i) }}
                            className="btn-secondary"
                            style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 12 }}
                          >
                            {c('Читать статью', 'Loe artiklit', 'Read article')}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </button>
                          <button
                            onClick={() => scrollTo('contact')}
                            className="btn-primary"
                            style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 12 }}
                          >
                            {c('Оставить заявку', 'Küsi pakkumist', 'Get a Quote')}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Expand / Collapse */}
                {soroArticles.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: 36 }}>
                    <button
                      onClick={() => setArticlesExpanded(prev => !prev)}
                      className="btn-secondary"
                      style={{ padding: '12px 28px', fontSize: 14, gap: 8 }}
                    >
                      {articlesExpanded
                        ? c('Свернуть', 'Näita vähem', 'Show less')
                        : c(`Показать ещё ${soroArticles.length - 3}`, `Näita veel ${soroArticles.length - 3}`, `Show ${soroArticles.length - 3} more article${soroArticles.length - 3 !== 1 ? 's' : ''}`)}
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transition: 'transform 0.3s', transform: articlesExpanded ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Loading skeleton while Soro loads */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 24 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} className="card" style={{ overflow: 'hidden', opacity: 0.5 }}>
                    <div style={{ width: '100%', height: 180, background: 'rgba(255,255,255,0.04)' }} />
                    <div style={{ padding: '22px 24px' }}>
                      <div style={{ height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 6, width: '40%', marginBottom: 10 }} />
                      <div style={{ height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginBottom: 8 }} />
                      <div style={{ height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 6, width: '70%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: '96px 24px', background: 'var(--bg-light)' }}>
          <div
            className="contact-grid"
            style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 56, alignItems: 'start' }}
          >
            <div>
              <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
                {c('Связаться', 'Võtke ühendust', 'Contact')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {c('Готовы запустить сайт?', 'Valmis veebilehte käivitama?', 'Ready to launch your website?')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>
                {c('Оставьте заявку - обсудим ваш проект и предложим подходящее решение.', 'Jätke päring - arutame teie projekti ja pakume sobivat lahendust.', 'Leave a request - we\'ll discuss your project and suggest the right solution.')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '📧', label: brand.email, href: `mailto:${brand.email}` },
                  { icon: '📞', label: brand.phone, href: `tel:${brand.phone}` },
                  { icon: '📍', label: brand.location, href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(79,156,249,0.07)', border: '1px solid rgba(79,156,249,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{item.icon}</div>
                    {item.href
                      ? <a href={item.href} style={{ color: 'var(--text-soft)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-soft)')}>{item.label}</a>
                      : <span style={{ color: 'var(--text-soft)', fontSize: 14 }}>{item.label}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '36px' }}>
              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
                    {c('Заявка отправлена!', 'Päring saadetud!', 'Request sent!')}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                    {c('Ответим в течение дня и подскажем лучший вариант.', 'Vastame päeva jooksul ja soovitame parimat varianti.', 'We\'ll reply within a day and suggest the best option.')}
                  </p>
                  <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setFormState('idle')}>
                    {c('Отправить ещё', 'Saada veel', 'Send another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c('Имя', 'Nimi', 'Name')} *</label>
                      <input className="form-input" required placeholder={c('Ваше имя', 'Teie nimi', 'Your name')} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}/>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c('Email / контакт', 'Email / kontakt', 'Email / contact')} *</label>
                      <input className="form-input" required placeholder={c('Email или телефон', 'Email või telefon', 'Email or phone')} value={formData.contact} onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c('Чем занимаетесь?', 'Millega tegelete?', 'What do you do?')} *</label>
                    <input className="form-input" required placeholder={c('Ваш бизнес / сфера деятельности', 'Teie äri / tegevusvaldkond', 'Your business / field')} value={formData.business} onChange={e => setFormData(p => ({ ...p, business: e.target.value }))}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c('Бюджет', 'Eelarve', 'Budget')}</label>
                    <select className="form-input" aria-label={c('Бюджет', 'Eelarve', 'Budget')} value={formData.budget} onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}>
                      <option value="">{c('Выберите диапазон', 'Valige vahemik', 'Select a range')}</option>
                      <option value="<300">До 300€</option>
                      <option value="300-500">300–500€</option>
                      <option value="500-800">500–800€</option>
                      <option value="unsure">{c('Не уверен', 'Pole kindel', 'Not sure')}</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c('Коротко о задаче', 'Lühidalt ülesandest', 'About the task')}</label>
                    <textarea className="form-input" rows={4} placeholder={c('Что хотите получить? Любые детали...', 'Mida soovite saada? Kõik detailid...', 'What do you want to achieve? Any details...')} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} style={{ resize: 'vertical', minHeight: 100 }}/>
                  </div>
                  {formState === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 13, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 8, padding: '10px 14px' }}>
                      {c('Что-то пошло не так. Напишите нам напрямую.', 'Midagi läks valesti. Kirjutage meile otse.', 'Something went wrong. Please write to us directly.')}
                    </p>
                  )}
                  <button type="submit" className="btn-primary" disabled={formState === 'loading'} style={{ marginTop: 4, justifyContent: 'center', opacity: formState === 'loading' ? 0.7 : 1 }}>
                    {formState === 'loading' ? c('Отправляем...', 'Saadame...', 'Sending...') : c('Обсудить проект', 'Arutle projekti', 'Discuss project')}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                    🔒 {c('Это займёт меньше минуты. Ответим в течение дня.', 'See võtab vähem kui minuti. Vastame päeva jooksul.', 'Takes less than a minute. We\'ll reply within a day.')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '36px 24px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <img src="/logo.svg" alt="NorthPixel" width={117} height={30} style={{ height: 30, width: 'auto' }} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 320, lineHeight: 1.6 }}>
                {c('Создаём современные сайты для бизнеса с фокусом на результат.', 'Loome kaasaegseid veebilehti äridele fookusega tulemusele.', 'We create modern websites for business with a focus on results.')}
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                {[
                  c('Запуск за 7 дней', 'Käivitus 7 päevaga', 'Launch in 7 days'),
                  c('Фокус на заявках', 'Fookus päringutele', 'Focus on leads'),
                  c('Современный дизайн', 'Kaasaegne disain', 'Modern design'),
                ].map((pill, i) => (
                  <span key={i} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ color: 'var(--accent)' }}>•</span> {pill}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, opacity: 0.6 }}>© 2025 NorthPixel. {c('Все права защищены.', 'Kõik õigused kaitstud.', 'All rights reserved.')}</p>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { label: c('Конфиденциальность', 'Privaatsus', 'Privacy'), href: '/privacy' },
                  { label: c('Условия', 'Tingimused', 'Terms'), href: '/terms' },
                  { label: c('Cookies', 'Küpsised', 'Cookies'), href: '/cookies' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    {link.label}
                  </a>
                ))}
              </div>
              {/* Soro partnership */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Blog partner:</span>
                <a
                  href="https://trysoro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 12, fontWeight: 700, color: 'var(--accent)',
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Soro
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
