'use client'
import { useEffect, useState, useRef } from 'react'

export default function LaptopIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'start'|'straighten'|'open'|'brand'|'zoom'|'done'>('start')
  const sparksRef = useRef<HTMLDivElement>(null)

  const spawnSparks = () => {
    if (!sparksRef.current) return
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('div')
      const size = Math.random() * 4 + 1
      const angle = Math.random() * 360
      const dist = 160 + Math.random() * 100
      s.style.cssText = `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;border-radius:50%;background:${Math.random()>0.5?'#4f9cf9':'#a78bfa'};pointer-events:none;opacity:0;`
      sparksRef.current.appendChild(s)
      const tx = Math.cos(angle * Math.PI / 180) * dist
      const ty = Math.sin(angle * Math.PI / 180) * dist
      s.animate([
        { opacity: 0, transform: 'translate(-50%,-50%) scale(1)' },
        { opacity: 0.9, transform: `translate(calc(-50% + ${tx*0.3}px),calc(-50% + ${ty*0.3}px)) scale(1.3)`, offset: 0.15 },
        { opacity: 0, transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)` },
      ], { duration: 700 + Math.random() * 400, delay: i * 35, easing: 'ease-out', fill: 'forwards' })
        .onfinish = () => s.remove()
    }
  }

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('straighten'), 100)
    const t2 = setTimeout(() => { setPhase('open'); spawnSparks() }, 1000)
    const t3 = setTimeout(() => setPhase('brand'), 1700)
    const t4 = setTimeout(() => setPhase('zoom'), 2700)
    const t5 = setTimeout(() => { setPhase('done'); onComplete() }, 4300)
    return () => { [t1,t2,t3,t4,t5].forEach(clearTimeout) }
  }, [onComplete])

  if (phase === 'done') return null

  const isOpen = ['open','brand','zoom'].includes(phase)
  const isZooming = phase === 'zoom'
  const showBrand = phase === 'brand'

  const wrapTransform = isZooming
    ? 'perspective(1400px) scale(10) translateY(-5%)'
    : phase === 'start'
    ? 'perspective(1400px) rotateY(40deg) rotateX(-30deg) rotateZ(-12deg) scale(0.7)'
    : 'perspective(1400px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1)'

  const Key = ({ flex=1, h=11, bright=false }: {flex?:number, h?:number, bright?:boolean}) => (
    <div style={{
      height: h, flex,
      background: `linear-gradient(180deg,${bright?'#4a4a4c':'#3a3a3c'} 0%,#2e2e30 100%)`,
      borderRadius: 2, border: '0.5px solid #484848',
      boxShadow: '0 1px 0 rgba(0,0,0,0.5),inset 0 0.5px 0 rgba(255,255,255,0.05)',
    }}/>
  )

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#000', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      {/* orbs */}
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(79,156,249,0.07) 0%,transparent 70%)', top:-100, left:-80, filter:'blur(50px)', opacity:isOpen?1:0, transition:'opacity 1.2s ease 0.8s', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 70%)', bottom:-60, right:-40, filter:'blur(50px)', opacity:isOpen?1:0, transition:'opacity 1.2s ease 1s', pointerEvents:'none' }}/>
      <div ref={sparksRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }}/>

      {/* MacBook */}
      <div style={{ position:'relative', width:380, transformStyle:'preserve-3d', transform:wrapTransform, transition: isZooming ? 'transform 1.5s cubic-bezier(0.16,1,0.3,1)' : 'transform 1s cubic-bezier(0.34,1.2,0.64,1)' }}>

        {/* LID */}
        <div style={{ width:'100%', height:230, transformOrigin:'bottom center', transform: isOpen ? 'perspective(1400px) rotateX(0deg)' : 'perspective(1400px) rotateX(-120deg)', transition:'transform 1.1s cubic-bezier(0.34,1.15,0.64,1)', transformStyle:'preserve-3d', position:'relative', zIndex:2 }}>
          {/* back */}
          <div style={{ position:'absolute', inset:0, borderRadius:'12px 12px 0 0', background:'linear-gradient(160deg,#3a3a3c 0%,#2a2a2c 40%,#1c1c1e 100%)', border:'1.5px solid #4a4a4e', borderBottom:'none' }}>
            <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}/>
          </div>
          {/* bezel */}
          <div style={{ position:'absolute', inset:0, borderRadius:'12px 12px 0 0', background:'#0a0a0a', border:'1.5px solid #2a2a2c', borderBottom:'none', overflow:'hidden', boxShadow: isOpen ? '0 -10px 50px rgba(79,156,249,0.12)' : 'none', transition:'box-shadow 0.8s ease' }}>
            {/* camera */}
            <div style={{ position:'absolute', top:6, left:'50%', transform:'translateX(-50%)', width:7, height:7, borderRadius:'50%', background:'#1a1a1a', border:'1px solid #2a2a2a', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:3, height:3, borderRadius:'50%', background:'#0d1117' }}/>
            </div>
            {/* screen content */}
            <div style={{ position:'absolute', inset:'18px 12px 8px', borderRadius:4, overflow:'hidden', background:'#080d18', opacity:isOpen?1:0, transition:'opacity 0.5s ease 0.5s' }}>
              {/* navbar */}
              <div style={{ height:18, background:'rgba(5,8,16,0.98)', borderBottom:'1px solid #1a2540', display:'flex', alignItems:'center', padding:'0 8px', gap:5 }}>
                <span style={{ fontSize:5, fontWeight:800, color:'#4f9cf9', fontFamily:'sans-serif', letterSpacing:0.5 }}>NorthPixel</span>
                <div style={{ marginLeft:'auto', display:'flex', gap:5 }}>
                  {['Услуги','Примеры','Цены'].map(l=><span key={l} style={{ fontSize:4, color:'#7a8fa8', fontFamily:'sans-serif' }}>{l}</span>)}
                </div>
                <div style={{ background:'#4f9cf9', color:'white', fontSize:3.5, fontWeight:700, padding:'1.5px 4px', borderRadius:2, fontFamily:'sans-serif', marginLeft:3 }}>Заявка</div>
              </div>
              {/* hero */}
              <div style={{ padding:'10px 10px 8px', position:'relative', backgroundImage:'linear-gradient(rgba(79,156,249,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(79,156,249,0.025) 1px,transparent 1px)', backgroundSize:'12px 12px' }}>
                <div style={{ position:'absolute', right:-5, top:-5, fontSize:42, fontWeight:900, color:'rgba(79,156,249,0.03)', fontFamily:'sans-serif', lineHeight:1, pointerEvents:'none' }}>NP</div>
                <div style={{ fontSize:3.5, color:'#4f9cf9', fontWeight:700, marginBottom:5, fontFamily:'sans-serif', display:'flex', alignItems:'center', gap:2 }}>
                  <div style={{ width:3, height:3, borderRadius:'50%', background:'#4f9cf9' }}/> Веб-студия · Таллин
                </div>
                <div style={{ fontSize:9, fontWeight:800, color:'white', lineHeight:1.2, marginBottom:5, fontFamily:'sans-serif', letterSpacing:-0.3 }}>
                  Превращаем бизнес<br/>в <span style={{ color:'#4f9cf9' }}>сайт</span>, который<br/>
                  приводит <span style={{ background:'linear-gradient(120deg,#4f9cf9,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>клиентов</span>
                </div>
                <div style={{ fontSize:4.5, color:'#7a8fa8', lineHeight:1.5, marginBottom:7, fontFamily:'sans-serif' }}>Современные лендинги с чёткой логикой.<br/>От идеи до запуска за 7 дней.</div>
                <div style={{ display:'flex', gap:4, marginBottom:8 }}>
                  <div style={{ background:'#4f9cf9', color:'white', fontSize:4, fontWeight:700, padding:'2.5px 6px', borderRadius:3, fontFamily:'sans-serif' }}>Оставить заявку →</div>
                  <div style={{ border:'0.5px solid #1e2d4a', color:'#b0c0d4', fontSize:4, padding:'2.5px 6px', borderRadius:3, fontFamily:'sans-serif' }}>Примеры работ</div>
                </div>
                <div style={{ display:'flex', borderTop:'1px solid #1a2540', paddingTop:6 }}>
                  {[['7','дней'],['€290','старт'],['100%','mobile'],['3+','проектов']].map(([n,l])=>(
                    <div key={l} style={{ flex:1, textAlign:'center' }}>
                      <div style={{ fontSize:7, fontWeight:800, color:'white', fontFamily:'sans-serif' }}>{n}</div>
                      <div style={{ fontSize:3.5, color:'#7a8fa8', fontFamily:'sans-serif', marginTop:1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* reflection */}
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.018) 50%,transparent 60%)', opacity:isOpen?1:0, transition:'opacity 0.8s ease 0.9s' }}/>
            </div>
            {/* edge light */}
            <div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(79,156,249,0.4),transparent)', opacity:isOpen?1:0, transition:'opacity 0.6s ease 0.9s' }}/>
          </div>
        </div>

        {/* BASE */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ background:'linear-gradient(180deg,#2c2c2e 0%,#1c1c1e 100%)', borderLeft:'1.5px solid #3a3a3c', borderRight:'1.5px solid #3a3a3c', padding:'12px 14px 0', position:'relative' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(180deg,#4a4a4e,#3a3a3c)' }}>
              <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'rgba(255,255,255,0.1)' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:2, marginBottom:6 }}>
              <div style={{ display:'flex', gap:2 }}>{Array(13).fill(0).map((_,i)=><Key key={i} h={8} bright={i===12}/>)}</div>
              <div style={{ display:'flex', gap:2 }}>{Array(13).fill(0).map((_,i)=><Key key={i}/>)}</div>
              <div style={{ display:'flex', gap:2 }}><Key flex={1.8}/>{Array(11).fill(0).map((_,i)=><Key key={i}/>)}<Key flex={1.8}/></div>
              <div style={{ display:'flex', gap:2 }}><Key flex={2.2}/>{Array(10).fill(0).map((_,i)=><Key key={i}/>)}<Key flex={2.2}/></div>
              <div style={{ display:'flex', gap:2 }}><Key flex={2.8}/>{Array(9).fill(0).map((_,i)=><Key key={i}/>)}<Key flex={2.8}/></div>
              <div style={{ display:'flex', gap:2 }}><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={7}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/></div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'center', padding:'0 0 10px', background:'linear-gradient(180deg,#1c1c1e,#161618)' }}>
            <div style={{ width:140, height:80, background:'linear-gradient(160deg,#2a2a2c,#222224)', borderRadius:8, border:'0.5px solid #3a3a3c', boxShadow:'inset 0 0.5px 0 rgba(255,255,255,0.04),0 1px 3px rgba(0,0,0,0.4)' }}/>
          </div>
          <div style={{ background:'linear-gradient(180deg,#1c1c1e,#161618)', border:'1.5px solid #2c2c2e', borderTop:'1px solid #282828', borderRadius:'0 0 10px 10px', height:14, position:'relative' }}>
            <div style={{ position:'absolute', bottom:3, left:'50%', transform:'translateX(-50%)', width:40, height:2, borderRadius:2, background:'rgba(255,255,255,0.05)' }}/>
            <div style={{ position:'absolute', top:3, left:16, width:5, height:8, borderRadius:1, background:'#2a2a2c', border:'0.5px solid #3a3a3c' }}/>
            <div style={{ position:'absolute', top:3, right:16, width:5, height:8, borderRadius:1, background:'#2a2a2c', border:'0.5px solid #3a3a3c' }}/>
          </div>
          <div style={{ position:'absolute', bottom:-22, left:'5%', right:'5%', height:22, background:'radial-gradient(ellipse,rgba(0,0,0,0.6) 0%,transparent 70%)', filter:'blur(12px)', opacity:isOpen?1:0, transition:'opacity 0.8s ease 0.5s' }}/>
        </div>
      </div>

      {/* Brand */}
      <div style={{ position:'absolute', bottom:'12%', display:'flex', alignItems:'center', gap:8, opacity:showBrand?1:0, transition:'opacity 0.5s ease', pointerEvents:'none' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'rgba(79,156,249,0.9)', letterSpacing:'2.5px', fontFamily:'sans-serif', textTransform:'uppercase' }}>NorthPixel</div>
        <div style={{ width:4, height:4, borderRadius:'50%', background:'#4f9cf9' }}/>
      </div>
    </div>
  )
}