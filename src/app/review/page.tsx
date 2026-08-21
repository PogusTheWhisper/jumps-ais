'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

// Bands only — no aggregate score (P-A4). Each carries evidence (P-D3 spirit).
const BANDS: { dim: string; band: 'MEETS' | 'EXCEEDS' | 'BELOW'; note: string }[] = [
  { dim: 'โครงสร้างปัญหา', band: 'EXCEEDS', note: 'แยก Fixed/Variable ชัดเจน อ้างตัวเลขจริงจากงบ' },
  { dim: 'การใช้ข้อมูล', band: 'MEETS', note: 'ใช้ยอดขายรายเมนูประกอบ แต่ยังไม่แตะข้อมูลลูกค้า' },
  { dim: 'การสื่อสาร', band: 'BELOW', note: 'ข้อเสนอชัด แต่สไลด์แน่นไป ผู้ฟังตามยาก' },
]
const BAND_STYLE = {
  EXCEEDS: { pill: 'pill-green', label: 'EXCEEDS', bar: '#73C23A', w: '100%' },
  MEETS: { pill: 'pill-blue', label: 'MEETS', bar: '#1CB0F6', w: '66%' },
  BELOW: { pill: 'pill-amber', label: 'BELOW', bar: '#FFC800', w: '33%' },
} as const

function ReviewContent() {
  const params = useSearchParams()
  const router = useRouter()
  const track = params.get('track') ?? 'sme'
  const [interview, setInterview] = useState(false)

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 7 · รีวิว" />

      <div className="stage-body">
        <Steps current={7} />
        <h2 className="text-2xl font-black text-[#1C2833] tracking-tight mb-1">Judges Checking</h2>
        <p className="text-sm text-[#4F5A5D] mb-6">AI ตรวจก่อนส่ง SME · SME ให้ฟีดแบ็กเสมอ · มีตัวเลือกสัมภาษณ์</p>

        {/* AI pre-check */}
        <div className="card overflow-hidden mb-5">
          <div className="px-5 py-3.5 bg-[#1C2833] text-white flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="font-extrabold text-sm">AI Pre-check · ตรวจก่อนส่งจริง</span>
            <span className="pill pill-gray ml-auto text-[10px]">ไม่มีคะแนนรวม · แถบเท่านั้น</span>
          </div>
          <div className="divide-y divide-[#E5E5E5]">
            {BANDS.map((b, i) => {
              const s = BAND_STYLE[b.band]
              return (
                <div key={b.dim} className="px-5 py-4 animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#1C2833]">{b.dim}</span>
                    <span className={`pill ${s.pill}`}>{s.label}</span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: s.w, background: s.bar }} />
                  </div>
                  <p className="text-xs text-[#4F5A5D] leading-relaxed">{b.note}</p>
                </div>
              )
            })}
          </div>
          <div className="px-5 py-3 bg-[#F8FFF0] text-xs text-[#9CA3AF]">
            AI ตรวจจากเนื้อหา Business School · ช่วยแก้ก่อนส่ง SME ไม่ตัดสินผ่าน/ตก
          </div>
        </div>

        {/* SME feedback */}
        <div className="card overflow-hidden mb-5">
          <div className="px-5 py-3.5 bg-[#F8FFF0] border-b-2 border-[#A8D878] flex items-center gap-2">
            <span className="text-lg">💬</span><span className="font-extrabold text-sm text-[#1C2833]">ฟีดแบ็กจาก SME</span>
            <span className="pill pill-amber ml-auto text-[10px]">ให้เสมอ ชอบ/ไม่ชอบก็ตาม</span>
          </div>
          <div className="p-5 flex flex-col sm:flex-row gap-4">
            <div className="aspect-video sm:w-48 shrink-0 bg-[#1C2833] rounded-xl flex items-center justify-center border-2 border-[#E5E5E5] shadow-[3px_3px_0_0_#D0D0D0] cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#73C23A] flex items-center justify-center shadow-[0_3px_0_0_#3A7A1A]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div>
              <div className="font-bold text-sm text-[#1C2833] mb-1">คุณอาทิตย์ · เจ้าของร้าน</div>
              <p className="text-sm text-[#4F5A5D] leading-relaxed italic">
                &ldquo;วิเคราะห์ต้นทุนตรงจุดที่ผมไม่เคยมอง ชอบข้อเสนอเรื่องราคา
                แต่อยากให้ลองคิดเรื่องเมนูเช้าที่ขายดีเพิ่มด้วย&rdquo;
              </p>
              <span className="pill pill-green mt-3">วิดีโอฟีดแบ็ก</span>
            </div>
          </div>
        </div>

        {/* Interview offer */}
        <div className={`card p-5 flex items-center gap-4 transition-all ${interview ? 'border-[#73C23A] shadow-[4px_4px_0_0_#3A7A1A]' : ''}`}>
          <span className="text-3xl shrink-0">🎙️</span>
          <div className="flex-1">
            <div className="font-extrabold text-sm text-[#1C2833]">คุยส่วนตัวกับ SME (ไม่บังคับ)</div>
            <p className="text-xs text-[#4F5A5D] mt-0.5">สัมภาษณ์สั้น ๆ อธิบายสิ่งที่ทำและถามต่อได้</p>
          </div>
          <button type="button" onClick={() => setInterview(v => !v)} className={interview ? 'btn-primary text-xs' : 'btn-secondary text-xs'}>
            {interview ? 'จองแล้ว ✓' : 'ขอสัมภาษณ์'}
          </button>
        </div>
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">← ย้อนกลับ</button>
        <button type="button" onClick={() => router.push('/certificate/demo?track=' + track)} className="btn-primary text-sm">รับเกียรติบัตร →</button>
      </footer>
    </div>
  )
}

export default function ReviewPage() {
  return <Suspense><ReviewContent /></Suspense>
}
