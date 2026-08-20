'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'
import { Ring } from '@/components/Motion'

const MOCK_PW = '4821'

function CaseContent() {
  const params = useSearchParams()
  const router = useRouter()
  const track = params.get('track') ?? 'sme'

  const [digits, setDigits] = useState(['', '', '', ''])
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function setDigit(i: number, v: string) {
    if (!/^\d?$/.test(v)) return
    const next = [...digits]
    next[i] = v
    setDigits(next)
    setError(false)
    if (v && i < 3) inputs.current[i + 1]?.focus()
  }
  function submit() {
    if (digits.join('') === MOCK_PW) setUnlocked(true)
    else { setError(true); setDigits(['', '', '', '']); inputs.current[0]?.focus() }
  }

  // Mock 14-day window: 11 days left.
  const daysLeft = 11
  const pct = daysLeft / 14

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 4 · เคส" />

      <div className="stage-body">
        <Steps current={4} />

        {!unlocked ? (
          <div className="max-w-lg mx-auto text-center animate-fade-up">
            <div className="text-5xl mb-3 animate-float">🔐</div>
            <h2 className="text-2xl font-black text-[#1C2833] tracking-tight mb-2">ปลดล็อก Case Booklet</h2>
            <p className="text-sm text-[#4F5A5D] mb-7 leading-relaxed">
              กรอกรหัส 4 หลักที่เราส่งให้ทางอีเมล เพื่อเปิดโจทย์จริงของ SME<br />
              <span className="text-xs text-[#9CA3AF]">(เดโม: รหัสคือ {MOCK_PW})</span>
            </p>

            <div className="flex justify-center gap-3 mb-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputs.current[i] = el }}
                  value={d}
                  onChange={e => setDigit(i, e.target.value)}
                  onKeyDown={e => { if (e.key === 'Backspace' && !d && i > 0) inputs.current[i - 1]?.focus() }}
                  inputMode="numeric"
                  maxLength={1}
                  className={[
                    'w-16 h-20 text-center text-3xl font-black rounded-2xl border-[3px] bg-white text-[#1C2833] outline-none transition-all',
                    error ? 'border-[#FF4B4B] shadow-[0_4px_0_0_#C81E1E] animate-wiggle'
                      : d ? 'border-[#73C23A] shadow-[0_4px_0_0_#3A7A1A]'
                      : 'border-[#E5E5E5] shadow-[0_4px_0_0_#D0D0D0] focus:border-[#73C23A] focus:shadow-[0_4px_0_0_#3A7A1A]',
                  ].join(' ')}
                />
              ))}
            </div>
            {error && <p className="text-xs font-bold text-[#FF4B4B] mb-3">รหัสไม่ถูกต้อง ลองอีกครั้ง</p>}

            <button type="button" onClick={submit} disabled={digits.some(d => !d)} className="btn-primary text-sm mt-4">
              ปลดล็อก →
            </button>

            <div className="card p-4 mt-8 flex items-center gap-3 text-left bg-[#FEF3C7] border-[#FCD34D]">
              <span className="text-2xl shrink-0">⏳</span>
              <p className="text-xs text-[#78350F] leading-relaxed">
                <strong>กติกา 14 วัน:</strong> เมื่อได้รหัสแล้ว ต้องส่งงานภายใน 14 วัน นับจากวันรับรหัส
                มิฉะนั้นการเข้าถึงจะถูกล็อก
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-spring-in">
            {/* Countdown + status */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <Ring pct={pct} color="#73C23A">
                <div className="text-3xl font-black text-[#1C2833] leading-none">{daysLeft}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#4F5A5D]">วันเหลือ</div>
              </Ring>
              <div className="flex-1 text-center sm:text-left">
                <span className="pill pill-green mb-2">🔓 ปลดล็อกแล้ว</span>
                <h2 className="text-2xl font-black text-[#1C2833] tracking-tight">Case: ร้านกาแฟอาทิตย์</h2>
                <p className="text-sm text-[#4F5A5D] mt-1 leading-relaxed">
                  โจทย์จริง เผยแล้ว · ยินยอมโดย SME 100% · ส่งภายใน 14 วัน
                </p>
              </div>
            </div>

            {/* Problem statement */}
            <div className="card p-5 mb-4 border-[#73C23A] shadow-[4px_4px_0_0_#3A7A1A]">
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-[#3A7A1A] mb-1">ปัญหาหลัก</div>
              <p className="text-sm text-[#1C2833] leading-relaxed">
                รายได้คงที่แต่กำไรบางลงต่อเนื่อง 6 เดือน เจ้าของสงสัยว่าต้นทุนแฝงตรงไหนกินกำไร
                และควรขึ้นราคาหรือลดต้นทุน — ต้องการการวิเคราะห์ที่วัดผลได้
              </p>
            </div>

            {/* Booklet TOC */}
            <div className="card overflow-hidden mb-2">
              <div className="px-5 py-3 bg-[#1C2833] text-white font-extrabold text-sm">📕 สารบัญ Case Booklet</div>
              {[
                ['01', 'บริบทธุรกิจและประวัติร้าน', 'เปิดแล้ว'],
                ['02', 'งบกำไรขาดทุน 12 เดือน', 'เปิดแล้ว'],
                ['03', 'โครงสร้างต้นทุนแยกรายการ', 'เปิดแล้ว'],
                ['04', 'ข้อมูลลูกค้าและยอดขายรายเมนู', 'เปิดแล้ว'],
                ['05', 'โจทย์ที่ SME อยากให้ช่วย', 'เปิดแล้ว'],
              ].map(([n, t, s]) => (
                <div key={n} className="flex items-center gap-3 px-5 py-3.5 border-b border-[#E5E5E5] last:border-0 hover:bg-[#F8FFF0] transition-colors cursor-pointer">
                  <span className="w-8 h-8 rounded-lg bg-[#E8F5D0] border-2 border-[#A8D878] flex items-center justify-center text-xs font-black text-[#3A7A1A] shrink-0">{n}</span>
                  <span className="flex-1 text-sm font-bold text-[#1C2833]">{t}</span>
                  <span className="pill pill-green">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">← ย้อนกลับ</button>
        <button type="button" disabled={!unlocked} onClick={() => router.push('/mentoring?track=' + track)} className="btn-primary text-sm">
          ไปพบพี่เลี้ยง →
        </button>
      </footer>
    </div>
  )
}

export default function CasePage() {
  return <Suspense><CaseContent /></Suspense>
}
