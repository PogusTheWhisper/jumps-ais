import Link from 'next/link'
import Topbar from '@/components/Topbar'

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#F8FFF0' }}>
      <Topbar chip="AIS JUMP 2026" />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Decorative blobs */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '-80px', right: '-60px', width: 320, height: 320, background: 'radial-gradient(circle, #A8E063 0%, #73C23A 60%, transparent 80%)', opacity: 0.15, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', pointerEvents: 'none', zIndex: 0 }} className="animate-blob" />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '0px', left: '-80px', width: 280, height: 280, background: 'radial-gradient(circle, #60C7F7 0%, #1CB0F6 60%, transparent 80%)', opacity: 0.12, borderRadius: '40% 60% 50% 50% / 60% 30% 70% 40%', pointerEvents: 'none', zIndex: 0, animation: 'blob-morph 8s ease-in-out 3s infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #73C23A 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.06, pointerEvents: 'none', zIndex: 0 }} />

        {/* Two-column layout on desktop */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 60px)', display: 'flex', gap: 'clamp(24px, 5vw, 60px)', alignItems: 'center' }}>

          {/* Left: text + CTA */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Mascot + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(12px, 2.5vh, 20px)' }}>
              <div className="animate-float" style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', lineHeight: 1 }}>🦉</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span className="pill pill-green" style={{ fontSize: '0.72rem' }}>★ AIS Jump Thailand · 2026</span>
                <span className="pill pill-blue" style={{ fontSize: '0.72rem' }}>AI-Powered Learning</span>
              </div>
            </div>

            {/* Heading — no rotation, no italic */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#1C2833',
              marginBottom: 'clamp(10px, 2vh, 16px)',
            }}>
              เรียนรู้จาก<br />
              <span style={{ color: '#73C23A' }}>ธุรกิจไทยจริง</span>
            </h1>

            <p style={{ fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)', color: '#4F5A5D', lineHeight: 1.65, marginBottom: 'clamp(20px, 3vh, 32px)', maxWidth: 480 }}>
              เลือก SME หรือชุมชน เรียนรู้จากเคสจริง แล้วลงมือทำ —
              ทุกการตัดสินใจบันทึกเป็น Decision Trace ไม่ใช่คะแนน
            </p>

            {/* CTA — full width of left column */}
            <Link href="/select?track=sme" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 'clamp(16px, 2.5vh, 24px)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
              เริ่มเลย! →
            </Link>

            {/* Stat strip */}
            <div style={{ display: 'flex', borderRadius: 16, border: '2.5px solid #E5E5E5', boxShadow: '4px 4px 0 0 #D0D0D0', overflow: 'hidden', background: 'white' }}>
              {[
                { n: '7', label: 'STAGES', color: '#73C23A' },
                { n: '3', label: 'MODULES', color: '#1CB0F6' },
                { n: '0', label: 'SCORES', color: '#1C2833', note: 'by design' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: 'clamp(10px, 2vh, 16px) clamp(12px, 2vw, 20px)', borderRight: i < 2 ? '1px solid #E5E5E5' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4F5A5D', marginTop: 3 }}>{s.label}</div>
                  {s.note && <div style={{ fontSize: '0.6rem', color: '#9CA3AF' }}>{s.note}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right: track cards — full height */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vh, 18px)' }}>
            <Link href="/select?track=sme"
              className="card card-hover card-sel animate-spring-in"
              style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 'clamp(16px, 3vh, 24px)', cursor: 'pointer', animationDelay: '80ms' }}>
              <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>🏪</div>
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" aria-hidden="true" style={{ flex: 1 }}>
                  <rect x="2" y="20" width="8" height="18" rx="2" fill="#D97706" opacity="0.5"/>
                  <rect x="14" y="12" width="8" height="26" rx="2" fill="#D97706" opacity="0.7"/>
                  <rect x="26" y="5" width="8" height="33" rx="2" fill="#D97706"/>
                  <rect x="38" y="14" width="8" height="24" rx="2" fill="#D97706" opacity="0.65"/>
                  <rect x="50" y="20" width="8" height="18" rx="2" fill="#D97706" opacity="0.5"/>
                  <polyline points="6,20 18,12 30,5 42,14 54,20" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 800, color: '#1C2833', letterSpacing: '-0.01em' }}>SME Track</div>
                <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)', color: '#4F5A5D', marginTop: 4, lineHeight: 1.5 }}>วิเคราะห์ปัญหาธุรกิจขนาดเล็ก หาทางออกที่วัดผลได้</p>
              </div>
              <span className="pill pill-green" style={{ width: 'fit-content' }}>ธุรกิจ / บริหาร</span>
            </Link>

            <Link href="/select?track=community"
              className="card card-hover card-sel animate-spring-in"
              style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 'clamp(16px, 3vh, 24px)', cursor: 'pointer', animationDelay: '160ms' }}>
              <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #C7D2FE)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>🏘️</div>
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" aria-hidden="true" style={{ flex: 1 }}>
                  <circle cx="12" cy="28" r="10" fill="#6366F1" opacity="0.25"/>
                  <circle cx="30" cy="22" r="14" fill="#6366F1" opacity="0.4"/>
                  <circle cx="48" cy="28" r="10" fill="#6366F1" opacity="0.25"/>
                  <circle cx="30" cy="22" r="7" fill="#6366F1" opacity="0.8"/>
                  <line x1="12" y1="28" x2="30" y2="22" stroke="#6366F1" strokeWidth="1.5" opacity="0.5"/>
                  <line x1="48" y1="28" x2="30" y2="22" stroke="#6366F1" strokeWidth="1.5" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 800, color: '#1C2833', letterSpacing: '-0.01em' }}>Community Track</div>
                <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)', color: '#4F5A5D', marginTop: 4, lineHeight: 1.5 }}>พัฒนาชุมชนและพื้นที่ท้องถิ่นในจังหวัด</p>
              </div>
              <span className="pill pill-indigo" style={{ width: 'fit-content' }}>ศิลปะ / สังคม</span>
            </Link>
          </div>
        </div>

        {/* Mobile: stack vertically */}
        <style>{`
          @media (max-width: 640px) {
            .home-layout { flex-direction: column !important; }
            .home-right { order: -1; }
          }
        `}</style>
      </main>
    </div>
  )
}
