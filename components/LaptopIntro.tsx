'use client'
import { useEffect, useState, useRef } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

function ScreenContent({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ width:'100%', height:'100%', background:'#080d18', fontFamily:'sans-serif', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(79,156,249,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,156,249,0.04) 1px,transparent 1px)`, backgroundSize:`${48*scale}px ${48*scale}px` }}/>
      <div style={{ position:'absolute', width:220*scale, height:220*scale, borderRadius:'50%', background:'radial-gradient(circle,rgba(79,156,249,0.18) 0%,transparent 70%)', top:-60*scale, left:-40*scale, filter:`blur(${30*scale}px)`, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:160*scale, height:160*scale, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)', bottom:-30*scale, right:0, filter:`blur(${20*scale}px)`, pointerEvents:'none' }}/>
      <div style={{ height:18*scale, background:'rgba(5,8,16,0.98)', borderBottom:`${0.5*scale}px solid rgba(26,37,64,0.8)`, display:'flex', alignItems:'center', padding:`0 ${8*scale}px`, gap:5*scale, position:'relative', zIndex:2 }}>
        <div style={{ width:8*scale, height:8*scale, borderRadius:'50%', background:'linear-gradient(135deg,#4f9cf9,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:5*scale, height:5*scale, borderRadius:'50%', background:'rgba(255,255,255,0.3)' }}/>
        </div>
        <span style={{ fontSize:5*scale, fontWeight:800, color:'#4f9cf9', letterSpacing:0.5*scale }}>NorthPixel</span>
        <div style={{ marginLeft:'auto', display:'flex', gap:5*scale }}>
          {['Услуги','Примеры','Цены'].map(l => (<span key={l} style={{ fontSize:4*scale, color:'#7a8fa8' }}>{l}</span>))}
        </div>
        <div style={{ background:'linear-gradient(135deg,#4f9cf9,#3b82f6)', color:'white', fontSize:3.5*scale, fontWeight:700, padding:`${1.5*scale}px ${4*scale}px`, borderRadius:2*scale, marginLeft:3*scale, boxShadow:`0 ${2*scale}px ${6*scale}px rgba(79,156,249,0.4)` }}>Заявка</div>
      </div>
      <div style={{ padding:`${10*scale}px`, position:'relative', zIndex:2 }}>
        <div style={{ fontSize:3.5*scale, color:'#4f9cf9', fontWeight:700, marginBottom:5*scale, display:'flex', alignItems:'center', gap:2*scale }}>
          <div style={{ width:3*scale, height:3*scale, borderRadius:'50%', background:'#4f9cf9' }}/> Веб-студия · Таллин, Эстония
        </div>
        <div style={{ fontSize:9*scale, fontWeight:900, color:'white', lineHeight:1.15, marginBottom:6*scale, letterSpacing:-0.3*scale }}>
          Превращаем бизнес<br/>в <span style={{ borderBottom:`${1.5*scale}px solid rgba(79,156,249,0.7)` }}>сайт</span>, который<br/>приводит <span style={{ background:'linear-gradient(120deg,#4f9cf9,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>клиентов</span>
        </div>
        <div style={{ fontSize:4.5*scale, color:'#7a8fa8', lineHeight:1.6, marginBottom:8*scale, maxWidth:120*scale }}>Современные лендинги с чёткой логикой.<br/>От идеи до запуска за 7 дней.</div>
        <div style={{ fontSize:3.5*scale, color:'rgba(176,192,212,0.7)', marginBottom:8*scale, fontStyle:'italic' }}>Подходит для специалистов, сервисов и компаний.</div>
        <div style={{ display:'flex', gap:4*scale, marginBottom:10*scale }}>
          <div style={{ background:'linear-gradient(135deg,#4f9cf9,#3b82f6)', color:'white', fontSize:4*scale, fontWeight:700, padding:`${2.5*scale}px ${6*scale}px`, borderRadius:3*scale, boxShadow:`0 ${3*scale}px ${10*scale}px rgba(79,156,249,0.35)` }}>Оставить заявку →</div>
          <div style={{ border:`${0.5*scale}px solid rgba(26,37,64,0.9)`, color:'#b0c0d4', fontSize:4*scale, padding:`${2.5*scale}px ${6*scale}px`, borderRadius:3*scale }}>Примеры работ</div>
        </div>
        <div style={{ fontSize:3.5*scale, color:'rgba(176,192,212,0.5)', marginBottom:8*scale }}>Без лишних этапов. Только то, что действительно работает.</div>
        <div style={{ display:'flex', gap:5*scale, marginBottom:12*scale }}>
          {['✓ Запуск за 7 дней','✓ Фокус на заявках','✓ Простое управление'].map((b,i) => (
            <div key={i} style={{ fontSize:3.5*scale, color:'#b0c0d4', padding:`${1.5*scale}px ${4*scale}px`, borderRadius:20*scale, background:'rgba(79,156,249,0.06)', border:`${0.5*scale}px solid rgba(79,156,249,0.15)` }}>{b}</div>
          ))}
        </div>
        <div style={{ display:'flex', borderTop:`${0.5*scale}px solid rgba(26,37,64,0.9)`, paddingTop:8*scale }}>
          {[['7','дней'],['€290','старт'],['100%','mobile'],['3+','проектов']].map(([n,l]) => (
            <div key={l} style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontSize:8*scale, fontWeight:900, color:'white', letterSpacing:-0.3*scale }}>{n}</div>
              <div style={{ fontSize:3.5*scale, color:'#7a8fa8', marginTop:1*scale }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MacBook({ phase }: { phase: string }) {
  const isOpen = ['open','brand','zoom','done'].includes(phase)
  const isZoom = phase === 'zoom' || phase === 'done'

  // The laptop is ~420px tall total: lid=240px on top, base=180px on bottom.
  // transform-origin is center (210px from top). The screen center is ~120px from top.
  // To zoom INTO the screen we need translateY(-90px / total_height) ≈ -21% BEFORE scale.
  // In CSS transforms, translateY runs AFTER scale when written left-to-right,
  // so we put translate BEFORE scale: translate then scale.
  // zoom target: screen center is ~57% from top of lid (120px into 240px lid)
  const zoomOrigin = isZoom ? 'center 28%' : 'center center'
  const wrapTransform = isZoom
    ? 'scale(18)'
    : phase === 'start'
    ? 'perspective(1400px) rotateX(8deg) rotateY(38deg) rotateZ(-10deg) scale(0.65)'
    : 'perspective(1400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)'

  const wrapTransition = isZoom
    ? 'transform 1.6s cubic-bezier(0.16,1,0.3,1), transform-origin 0s'
    : phase === 'start'
    ? 'none'
    : 'transform 1.1s cubic-bezier(0.34,1.1,0.64,1)'

  const Key = ({ flex=1, h=11, bright=false }: { flex?:number; h?:number; bright?:boolean }) => (
    <div style={{ height:h, flex, background:`linear-gradient(180deg,${bright?'#4a4a4c':'#3a3a3c'} 0%,#2e2e30 100%)`, borderRadius:2, border:'0.5px solid #484848', boxShadow:'0 1px 0 rgba(0,0,0,0.5),inset 0 0.5px 0 rgba(255,255,255,0.05)' }}/>
  )

  return (
    <div style={{ position:'relative', width:400, transformStyle:'preserve-3d', transform:wrapTransform, transition:wrapTransition, willChange:'transform', transformOrigin:zoomOrigin }}>
      <div style={{ width:'100%', height:240, transformOrigin:'bottom center', transform:isOpen?'perspective(1400px) rotateX(0deg)':'perspective(1400px) rotateX(-130deg)', transition:'transform 1.15s cubic-bezier(0.34,1.1,0.64,1)', transformStyle:'preserve-3d', position:'relative', zIndex:2 }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'14px 14px 0 0', background:'linear-gradient(160deg,#3d3d3f 0%,#2c2c2e 40%,#1e1e20 100%)', border:'1.5px solid #4c4c50', borderBottom:'none' }}>
          <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)' }}/>
        </div>
        <div style={{ position:'absolute', inset:0, borderRadius:'14px 14px 0 0', background:'#080d0f', border:'1.5px solid #242426', borderBottom:'none', overflow:'hidden', boxShadow:isOpen?'0 -8px 60px rgba(79,156,249,0.14),inset 0 0 40px rgba(79,156,249,0.03)':'none', transition:'box-shadow 0.9s ease 0.2s' }}>
          <div style={{ position:'absolute', top:7, left:'50%', transform:'translateX(-50%)', width:8, height:8, borderRadius:'50%', background:'#1a1a1a', border:'1px solid #2a2a2a', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:3.5, height:3.5, borderRadius:'50%', background:'#0d1117', boxShadow:'inset 0 0 2px rgba(79,156,249,0.3)' }}/>
          </div>
          <div style={{ position:'absolute', inset:'20px 14px 10px', borderRadius:5, overflow:'hidden', opacity:isOpen?1:0, transition:'opacity 0.6s ease 0.4s' }}>
            <ScreenContent scale={1} />
          </div>
          <div style={{ position:'absolute', bottom:0, left:'8%', right:'8%', height:1, background:'linear-gradient(90deg,transparent,rgba(79,156,249,0.5),transparent)', opacity:isOpen?1:0, transition:'opacity 0.7s ease 0.8s' }}/>
        </div>
      </div>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ background:'linear-gradient(180deg,#2e2e30 0%,#1e1e20 100%)', borderLeft:'1.5px solid #3c3c3e', borderRight:'1.5px solid #3c3c3e', padding:'14px 16px 0', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(180deg,#4c4c50,#3c3c3e)' }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'rgba(255,255,255,0.12)' }}/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:2.5, marginBottom:7 }}>
            <div style={{ display:'flex', gap:2 }}>{Array(13).fill(0).map((_,i)=><Key key={i} h={9} bright={i===12}/>)}</div>
            <div style={{ display:'flex', gap:2 }}>{Array(13).fill(0).map((_,i)=><Key key={i} h={11}/>)}</div>
            <div style={{ display:'flex', gap:2 }}><Key flex={1.8}/>{Array(11).fill(0).map((_,i)=><Key key={i} h={11}/>)}<Key flex={1.8}/></div>
            <div style={{ display:'flex', gap:2 }}><Key flex={2.2}/>{Array(10).fill(0).map((_,i)=><Key key={i} h={11}/>)}<Key flex={2.2}/></div>
            <div style={{ display:'flex', gap:2 }}><Key flex={2.8}/>{Array(9).fill(0).map((_,i)=><Key key={i} h={11}/>)}<Key flex={2.8}/></div>
            <div style={{ display:'flex', gap:2 }}><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={7}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/><Key flex={1.2}/></div>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center', padding:'0 0 12px', background:'linear-gradient(180deg,#1e1e20,#181820)' }}>
          <div style={{ width:150, height:90, background:'linear-gradient(160deg,#2c2c2e,#242426)', borderRadius:10, border:'0.5px solid #3c3c3e', boxShadow:'inset 0 0.5px 0 rgba(255,255,255,0.04),0 1px 4px rgba(0,0,0,0.5)' }}/>
        </div>
        <div style={{ background:'linear-gradient(180deg,#1c1c1e,#181820)', border:'1.5px solid #2e2e30', borderTop:'1px solid #2a2a2c', borderRadius:'0 0 12px 12px', height:16, position:'relative' }}>
          <div style={{ position:'absolute', bottom:4, left:'50%', transform:'translateX(-50%)', width:44, height:2.5, borderRadius:2, background:'rgba(255,255,255,0.06)' }}/>
          <div style={{ position:'absolute', top:3, left:18, width:5, height:9, borderRadius:1, background:'#2c2c2e', border:'0.5px solid #3c3c3e' }}/>
          <div style={{ position:'absolute', top:3, right:18, width:5, height:9, borderRadius:1, background:'#2c2c2e', border:'0.5px solid #3c3c3e' }}/>
        </div>
        <div style={{ position:'absolute', bottom:-28, left:'5%', right:'5%', height:28, background:'radial-gradient(ellipse,rgba(0,0,0,0.7) 0%,transparent 70%)', filter:'blur(14px)', opacity:isOpen?0.9:0, transition:'opacity 0.8s ease 0.4s' }}/>
      </div>
    </div>
  )
}

function PhoneScreenContent() {
  return (
    <div style={{ width:'100%', height:'100%', background:'#080d18', overflow:'hidden', position:'relative', fontFamily:'sans-serif' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(79,156,249,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,156,249,0.04) 1px,transparent 1px)', backgroundSize:'24px 24px', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(79,156,249,0.2) 0%,transparent 70%)', top:-50, left:-40, filter:'blur(30px)', pointerEvents:'none' }}/>
      <div style={{ height:36, background:'rgba(5,8,16,0.98)', borderBottom:'1px solid rgba(26,37,64,0.8)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:20, height:20, borderRadius:'50%', border:'1.5px solid rgba(79,156,249,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:7, fontWeight:900, color:'#4f9cf9' }}>NP</span>
          </div>
          <span style={{ fontSize:9, fontWeight:800, color:'#4f9cf9' }}>NorthPixel</span>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {['RU','ET','EN'].map(l => <span key={l} style={{ fontSize:7, color:l==='RU'?'white':'#7a8fa8', fontWeight:700, padding:'2px 5px', borderRadius:4, background:l==='RU'?'rgba(79,156,249,0.3)':'transparent' }}>{l}</span>)}
        </div>
      </div>
      <div style={{ padding:'20px 16px', position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:20, border:'1px solid rgba(79,156,249,0.2)', background:'rgba(79,156,249,0.04)', marginBottom:14 }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#4f9cf9' }}/>
          <span style={{ fontSize:8, color:'#4f9cf9', fontWeight:700, letterSpacing:0.5 }}>ВЕБ-СТУДИЯ · ТАЛЛИН, ЭСТОНИЯ</span>
        </div>
        <div style={{ fontSize:18, fontWeight:900, color:'white', lineHeight:1.2, marginBottom:12, letterSpacing:-0.5 }}>
          Превращаем<br/>ваш бизнес<br/>в <span style={{ borderBottom:'2px solid rgba(79,156,249,0.7)' }}>сайт</span>, который<br/>приводит <span style={{ background:'linear-gradient(120deg,#4f9cf9,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>клиентов</span>
        </div>
        <div style={{ fontSize:10, color:'#7a8fa8', lineHeight:1.6, marginBottom:10 }}>Создаём современные лендинги с чёткой логикой и фокусом на заявки — от идеи до запуска за 7 дней.</div>
        <div style={{ fontSize:9, color:'rgba(176,192,212,0.6)', fontStyle:'italic', marginBottom:18 }}>Подходит для специалистов, сервисов и компаний.</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#4f9cf9,#3b82f6)', color:'white', fontSize:11, fontWeight:700, padding:'12px 20px', borderRadius:12, marginBottom:10, boxShadow:'0 6px 20px rgba(79,156,249,0.4)' }}>Оставить заявку →</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(26,37,64,0.9)', color:'#b0c0d4', fontSize:11, padding:'12px 20px', borderRadius:12 }}>Посмотреть примеры</div>
      </div>
    </div>
  )
}

function Phone({ phase }: { phase: string }) {
  const isFaceDown = phase === 'start'
  const isFacing = ['face','brand','zoom','done'].includes(phase)
  const isZoom = phase === 'zoom' || phase === 'done'

  let transform: string
  let transition: string
  // For zoom: pivot at screen center (top 35% of phone body = hero content area)
  const phoneOrigin = isZoom ? 'center 35%' : 'center center'

  if (isFaceDown) {
    transform = 'perspective(1000px) rotateX(75deg) scale(0.72)'
    transition = 'none'
  } else if (phase === 'rise') {
    transform = 'perspective(1000px) rotateX(38deg) scale(0.86)'
    transition = 'transform 0.95s cubic-bezier(0.34,1.1,0.64,1)'
  } else if (isFacing && !isZoom) {
    transform = 'perspective(1000px) rotateX(0deg) scale(1)'
    transition = 'transform 0.95s cubic-bezier(0.34,1.1,0.64,1)'
  } else if (isZoom) {
    transform = 'scale(18)'
    transition = 'transform 1.6s cubic-bezier(0.16,1,0.3,1)'
  } else {
    transform = 'perspective(1000px) scale(1)'
    transition = 'transform 0.9s ease'
  }

  const W = 170, H = 330

  return (
    <div style={{ width:W, height:H, transform, transition, transformStyle:'preserve-3d', position:'relative', willChange:'transform', transformOrigin:phoneOrigin }}>
      <div style={{ width:'100%', height:'100%', borderRadius:30, background:'linear-gradient(160deg,#3a3a3c 0%,#242426 50%,#1a1a1c 100%)', border:'1.5px solid #4a4a4c', position:'relative', overflow:'hidden', boxShadow:isFacing&&!isZoom?'0 30px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.05),inset 0 1px 0 rgba(255,255,255,0.1)':'0 10px 40px rgba(0,0,0,0.5)', transition:'box-shadow 0.8s ease' }}>
        <div style={{ position:'absolute', left:-2.5, top:70, width:2.5, height:30, background:'#3a3a3c', borderRadius:'2px 0 0 2px' }}/>
        <div style={{ position:'absolute', left:-2.5, top:110, width:2.5, height:30, background:'#3a3a3c', borderRadius:'2px 0 0 2px' }}/>
        <div style={{ position:'absolute', right:-2.5, top:90, width:2.5, height:50, background:'#3a3a3c', borderRadius:'0 2px 2px 0' }}/>
        <div style={{ position:'absolute', inset:0, borderRadius:28, overflow:'hidden', background:'#080d18' }}>
          <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:80, height:22, borderRadius:11, background:'#000', zIndex:10 }}/>
          <div style={{ position:'absolute', inset:0, top:0, opacity:isFacing?1:0, transition:'opacity 0.5s ease 0.3s' }}>
            <PhoneScreenContent />
          </div>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,#2c2c2e 0%,#1c1c1e 100%)', opacity:isFacing?0:1, transition:'opacity 0.5s ease 0.3s', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6, background:'rgba(0,0,0,0.4)', borderRadius:16, padding:12, border:'0.5px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display:'flex', gap:6 }}>
                {[0,1].map(i => (
                  <div key={i} style={{ width:36, height:36, borderRadius:12, background:'#0a0a0c', border:'1px solid #3a3a3c', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#1a1a1c,#0a0a0c)', border:'1px solid #2a2a2c', boxShadow:'inset 0 0 8px rgba(0,0,0,0.8)' }}/>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
                <div style={{ width:36, height:36, borderRadius:12, background:'#0a0a0c', border:'1px solid #3a3a3c', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg,#1a1a1c,#0a0a0c)', border:'1px solid #2a2a2c', boxShadow:'inset 0 0 8px rgba(0,0,0,0.8)' }}/>
                </div>
              </div>
            </div>
            <div style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,0.06)', letterSpacing:3 }}>NP</div>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', bottom:-20, left:'10%', right:'10%', height:20, background:'radial-gradient(ellipse,rgba(0,0,0,0.6) 0%,transparent 70%)', filter:'blur(10px)', opacity:isFacing?0.8:0.4, transition:'opacity 0.8s ease' }}/>
    </div>
  )
}

function Sparks({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!active || !ref.current) return
    const container = ref.current
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('div')
      const size = Math.random() * 5 + 2
      const angle = Math.random() * 360
      const dist = 100 + Math.random() * 200
      const tx = Math.cos(angle * Math.PI / 180) * dist
      const ty = Math.sin(angle * Math.PI / 180) * dist
      const color = Math.random() > 0.5 ? '#4f9cf9' : '#a78bfa'
      s.style.cssText = `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;border-radius:50%;background:${color};pointer-events:none;opacity:0;`
      container.appendChild(s)
      s.animate([
        { opacity:0, transform:'translate(-50%,-50%) scale(1)' },
        { opacity:1, transform:`translate(calc(-50% + ${tx*0.3}px),calc(-50% + ${ty*0.3}px)) scale(1.5)`, offset:0.2 },
        { opacity:0, transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)` },
      ], { duration:800+Math.random()*500, delay:i*28, easing:'ease-out', fill:'forwards' })
        .onfinish = () => s.remove()
    }
  }, [active])
  return <div ref={ref} style={{ position:'absolute', inset:0, pointerEvents:'none' }}/>
}

type Phase = 'start'|'tilt'|'open'|'rise'|'face'|'brand'|'zoom'|'done'

export default function LaptopIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('start')
  const [sparks, setSparks] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      const t1 = setTimeout(() => setPhase('rise'), 500)
      const t2 = setTimeout(() => { setPhase('face'); setSparks(true); setTimeout(() => setSparks(false), 100) }, 1450)
      const t3 = setTimeout(() => setPhase('brand'), 2400)
      const t4 = setTimeout(() => setPhase('zoom'), 3400)
      const t5 = setTimeout(() => { setPhase('done'); onComplete() }, 5100)
      return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
    } else {
      const t1 = setTimeout(() => setPhase('tilt'), 200)
      const t2 = setTimeout(() => { setPhase('open'); setSparks(true); setTimeout(() => setSparks(false), 100) }, 1150)
      const t3 = setTimeout(() => setPhase('brand'), 2000)
      const t4 = setTimeout(() => setPhase('zoom'), 3000)
      const t5 = setTimeout(() => { setPhase('done'); onComplete() }, 4700)
      return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
    }
  }, [isMobile, onComplete])

  if (phase === 'done') return null

  const isZooming = phase === 'zoom'
  const showBrand = phase === 'brand'
  const laptopPhase = phase === 'tilt' ? 'straighten' : phase === 'open' ? 'open' : phase

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Black background layer — separate so it doesn't clip the zoom */}
      <div style={{ position:'absolute', inset:0, background:'#000', zIndex:0 }}/>
      <style>{`
        @keyframes npBrandIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scanPulse { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(79,156,249,0.09) 0%,transparent 70%)', top:-200, left:-150, filter:'blur(70px)', pointerEvents:'none', opacity:['open','face','brand'].includes(phase)?1:0, transition:'opacity 1.5s ease' }}/>
      <div style={{ position:'absolute', width:450, height:450, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)', bottom:-120, right:-80, filter:'blur(70px)', pointerEvents:'none', opacity:['open','face','brand'].includes(phase)?1:0, transition:'opacity 1.5s ease 0.3s' }}/>

      {/* Subtle scanlines */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)', animation:'scanPulse 4s ease-in-out infinite' }}/>

      <Sparks active={sparks} />

      <div style={{ position:'relative' }}>
        {isMobile ? <Phone phase={phase} /> : <MacBook phase={laptopPhase} />}
      </div>

      {/* Brand */}
      <div style={{ position:'absolute', bottom:'10%', display:'flex', alignItems:'center', gap:10, opacity:showBrand?1:0, animation:showBrand?'npBrandIn 0.65s cubic-bezier(0.34,1.2,0.64,1) forwards':'none', pointerEvents:'none', transition:showBrand?'none':'opacity 0.3s ease' }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(79,156,249,0.1)', border:'1px solid rgba(79,156,249,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:10, fontWeight:900, color:'#4f9cf9' }}>NP</span>
        </div>
        <div style={{ fontSize:14, fontWeight:800, color:'rgba(79,156,249,0.95)', letterSpacing:'3px', textTransform:'uppercase' }}>NorthPixel</div>
        <div style={{ width:5, height:5, borderRadius:'50%', background:'#4f9cf9', boxShadow:'0 0 10px rgba(79,156,249,0.9)' }}/>
      </div>

      {/* Zoom vignette */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.9) 100%)', opacity:isZooming?1:0, transition:'opacity 0.8s ease' }}/>
    </div>
  )
}
