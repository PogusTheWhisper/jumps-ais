'use client'

import { useEffect, useRef, useState } from 'react'

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Count-up number. Eases to `to` over `dur` ms. Respects reduced-motion. */
export function CountUp({ to, dur = 900, suffix = '', className }: { to: number; dur?: number; suffix?: string; className?: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (prefersReduced()) { setN(to); return }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, dur])
  return <span className={className}>{n}{suffix}</span>
}

/** SVG progress/countdown ring. pct = fraction filled (0..1). */
export function Ring({ pct, size = 140, stroke = 12, color = '#73C23A', track = '#E8F5D0', children }:
  { pct: number; size?: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const to = c * (1 - pct)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} className="animate-ring"
          style={{ ['--ring-from' as string]: c, ['--ring-to' as string]: to }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

/** One-shot confetti burst. Renders N pieces falling once. */
export function Confetti({ count = 70 }: { count?: number }) {
  const [on, setOn] = useState(true)
  const pieces = useRef(
    Array.from({ length: count }).map((_, i) => ({
      left: (i / count) * 100 + (i % 5) * 1.3,
      delay: (i % 12) * 0.12,
      dur: 2.4 + (i % 7) * 0.35,
      color: ['#73C23A', '#1CB0F6', '#FFC800', '#FF4B4B', '#A855F7'][i % 5],
      w: 7 + (i % 4) * 2,
    }))
  )
  useEffect(() => {
    if (prefersReduced()) { setOn(false); return }
    const t = setTimeout(() => setOn(false), 5200)
    return () => clearTimeout(t)
  }, [])
  if (!on) return null
  return (
    <div aria-hidden="true">
      {pieces.current.map((p, i) => (
        <span key={i} className="confetti-pc" style={{
          left: p.left + '%', background: p.color, width: p.w, height: p.w + 5,
          animationDelay: p.delay + 's', animationDuration: p.dur + 's',
        }} />
      ))}
    </div>
  )
}
