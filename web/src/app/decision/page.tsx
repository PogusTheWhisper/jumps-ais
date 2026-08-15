'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { OPTS, OptKey } from '@/lib/data'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

const OPT_KEYS: OptKey[] = ['A', 'B', 'C', 'D']

function DecisionContent() {
  const params = useSearchParams()
  const router = useRouter()

  const [selected, setSelected] = useState<OptKey | null>(null)
  const [justify, setJustify] = useState('')
  const [reflect, setReflect] = useState('')
  const [step, setStep] = useState<'answer' | 'reflect'>('answer')
  const [loading, setLoading] = useState(false)

  const track = params.get('track') ?? 'sme'
  const entityId = params.get('entityId') ?? ''
  const entityName = params.get('entityName') ?? '—'
  const entityType = params.get('entityType') ?? ''
  const entityLoc = params.get('entityLoc') ?? ''

  async function handleSubmit() {
    if (step === 'answer') { setStep('reflect'); return }
    setLoading(true)
    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        track, entityId, entityName, entityType, entityLoc,
        optionSelected: selected,
        justification: justify || null,
        reflection: reflect || null,
      }),
    })
    const { id } = await res.json()
    router.push('/trace/' + id)
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="Stage 1 · Solo · Node 1/2" />

      <div style={{ flex: 1, overflowY: 'auto' }} className="max-w-3xl mx-auto w-full px-7 py-5">
        <Steps current={3} />

        {/* Node card */}
        <div className="card overflow-hidden mb-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-5 py-4 bg-[#1C2833] text-white">
            <div>
              <span className="pill pill-green text-[10px]">Node 1 · โครงสร้างปัญหา</span>
              <div className="font-extrabold mt-2 text-base">คุณจะจำแนกปัญหาด้วยกรอบแนวคิดใด?</div>
            </div>
            <span className="text-xs opacity-50 whitespace-nowrap shrink-0 mt-1">~150 วินาที</span>
          </div>

          <div className="p-5 bg-white">
            {/* Situation */}
            <div className="bg-[#F8FFF0] border-[2px] border-[#A8D878] rounded-xl p-4 text-sm mb-5 leading-relaxed">
              <strong className="text-[#1C2833]">สถานการณ์:</strong>{' '}
              <span className="text-[#4F5A5D]">ร้านกาแฟ &ldquo;อาทิตย์&rdquo; ลาดพร้าว รายได้ 180,000 ฿/เดือน กำไรเหลือ 8,000 ฿</span>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {[['วัตถุดิบ', '72,000 ฿'], ['เงินเดือน', '45,000 ฿'], ['ค่าเช่า', '38,000 ฿'], ['ไฟ/น้ำ', '17,000 ฿']].map(([k, v]) => (
                  <span key={k} className="pill pill-blue">{k} {v}</span>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {OPT_KEYS.map(k => (
                <button key={k} type="button" onClick={() => setSelected(k)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-[2.5px] text-left text-sm font-medium transition-all',
                    selected === k
                      ? 'border-[#73C23A] bg-[#F8FFF0] shadow-[3px_3px_0_0_#3A7A1A]'
                      : 'border-[#E5E5E5] bg-white hover:border-[#73C23A] hover:bg-[#F8FFF0] shadow-[3px_3px_0_0_#D0D0D0]',
                  ].join(' ')}>
                  <span className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold border-2 shrink-0 transition-all',
                    selected === k ? 'bg-[#73C23A] text-white border-[#3A7A1A] shadow-[0_2px_0_0_#3A7A1A]' : 'bg-[#F3F4F6] text-[#4F5A5D] border-[#D1D5DB]',
                  ].join(' ')}>{k}</span>
                  <span className="text-[#1C2833]">{OPTS[k]}</span>
                </button>
              ))}
            </div>

            {/* Justification */}
            <label className="block mt-5 mb-2 text-xs font-extrabold text-[#1C2833]">
              เหตุผลของคุณ <span className="font-normal text-[#4F5A5D]">(ไม่บังคับ · สูงสุด 200 ตัวอักษร)</span>
            </label>
            <textarea
              value={justify}
              onChange={e => setJustify(e.target.value)}
              maxLength={200}
              placeholder="เพราะ..."
              className="w-full border-[2.5px] border-[#E5E5E5] rounded-xl p-3 text-sm bg-[#F8FFF0] focus:border-[#73C23A] focus:outline-none resize-none min-h-[70px] text-[#1C2833] transition-colors"
            />
            <div className="text-right text-xs text-[#9CA3AF] mt-1">{justify.length} / 200</div>
          </div>
        </div>

        {/* Feedback banner — Duolingo style */}
        {step === 'reflect' && (
          <div className="card overflow-hidden mb-5 animate-spring-in border-[#73C23A] shadow-[4px_4px_0_0_#3A7A1A]">
            {[
              { label: '📊 ผลธุรกิจ', text: 'Fixed/Variable เผยว่าค่าเช่า + เงินเดือน = 83,000 ฿ คือต้นทุนคงที่ที่กินกำไร 46%' },
              { label: '🔍 ผู้เชี่ยวชาญ', text: 'นักวิเคราะห์มักเริ่ม Fixed/Variable เพื่อหา Breakeven — ตัวเลือก D ถูกแต่ต้องการข้อมูลเพิ่ม' },
            ].map(r => (
              <div key={r.label} className="flex gap-3 px-5 py-3.5 bg-white border-b border-[#E5E5E5] text-sm">
                <span className="font-extrabold min-w-[90px] shrink-0 text-xs text-[#1C2833]">{r.label}</span>
                <span className="text-[#4F5A5D]">{r.text}</span>
              </div>
            ))}
            <div className="flex gap-3 px-5 py-3.5 bg-[#F8FFF0] text-sm">
              <span className="font-extrabold text-[#3A7A1A] min-w-[90px] shrink-0 text-xs">⏭ ครั้งหน้า</span>
              <span className="text-[#4F5A5D]">ใช้ Fixed/Variable ก่อนเสมอ แล้วค่อยคำนวณ Breakeven</span>
            </div>
          </div>
        )}

        {/* Reflection — P-C3 enforced */}
        {step === 'reflect' && (
          <div className="card p-5 animate-spring-in border-[#73C23A] shadow-[4px_4px_0_0_#3A7A1A]">
            <label className="block font-extrabold text-sm text-[#1C2833] mb-2">
              ครั้งหน้าฉันจะ… <span className="font-normal text-[#4F5A5D]">สูงสุด 120 ตัวอักษร · เขียนเอง AI ไม่ช่วย</span>
            </label>
            <textarea
              value={reflect}
              onChange={e => setReflect(e.target.value)}
              maxLength={120}
              placeholder="ครั้งหน้าฉันจะ..."
              className="w-full border-[2.5px] border-[#E5E5E5] rounded-xl p-3 text-sm bg-[#F8FFF0] focus:border-[#73C23A] focus:outline-none resize-none min-h-[60px] text-[#1C2833] transition-colors"
            />
            <p className="text-xs text-[#9CA3AF] mt-2">⚠️ ช่องนี้ไม่มี AI — ความคิดนี้เป็นของคุณ (P-C3)</p>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">
          ← ย้อนกลับ
        </button>
        <button
          type="button"
          disabled={!selected || loading}
          onClick={handleSubmit}
          className="btn-primary text-sm"
        >
          {loading ? 'กำลังบันทึก...' : step === 'answer' ? 'ส่งคำตอบ →' : 'บันทึก Trace →'}
        </button>
      </footer>
    </div>
  )
}

export default function DecisionPage() {
  return (
    <Suspense>
      <DecisionContent />
    </Suspense>
  )
}
