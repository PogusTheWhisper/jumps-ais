'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

interface Item {
  id: string; e: string; title: string; sub: string; cta: string; kind: 'link' | 'file'
}
const ITEMS: Item[] = [
  { id: 'gform', e: '📝', title: 'Google Form', sub: 'ตอบคำถามเฉพาะของ SME นี้', cta: 'วางลิงก์คำตอบ', kind: 'link' },
  { id: 'slides', e: '📊', title: 'สไลด์นำเสนอ', sub: 'สรุปการวิเคราะห์และข้อเสนอ', cta: 'อัปโหลดไฟล์ .pdf / .pptx', kind: 'file' },
  { id: 'pitch', e: '🎬', title: 'วิดีโอพิตช์', sub: 'นำเสนอทางออกใน 3 นาที', cta: 'อัปโหลดวิดีโอ / วางลิงก์', kind: 'file' },
]

function SubmitContent() {
  const params = useSearchParams()
  const router = useRouter()
  const track = params.get('track') ?? 'sme'
  const [done, setDone] = useState<Set<string>>(new Set())

  const pct = Math.round((done.size / ITEMS.length) * 100)
  const all = done.size === ITEMS.length

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 6 · ส่งงาน" />

      <div className="stage-body">
        <Steps current={6} />
        <h2 className="text-2xl font-black text-[#1C2833] tracking-tight mb-1">ส่งคำตอบ 3 อย่าง</h2>
        <p className="text-sm text-[#4F5A5D] mb-5">ครบทั้งสามชิ้นแล้วจึงส่งให้กรรมการตรวจ</p>

        {/* Progress */}
        <div className="card p-4 mb-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-[#1C2833] mb-1.5">
              <span>ความคืบหน้า</span><span>{done.size}/{ITEMS.length}</span>
            </div>
            <div className="h-3 bg-[#E8F5D0] rounded-full border border-[#A8D878] overflow-hidden">
              <div className="h-full bg-[#73C23A] rounded-full transition-all duration-500" style={{ width: pct + '%' }} />
            </div>
          </div>
          <div className="text-2xl font-black text-[#73C23A] w-14 text-right">{pct}%</div>
        </div>

        <div className="space-y-3">
          {ITEMS.map((it, i) => {
            const ok = done.has(it.id)
            return (
              <div key={it.id} className="card p-4 flex items-center gap-4 animate-spring-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 shrink-0 transition-all ${ok ? 'bg-[#E8F5D0] border-[#73C23A] shadow-[3px_3px_0_0_#3A7A1A]' : 'bg-[#F8FFF0] border-[#E5E5E5] shadow-[3px_3px_0_0_#D0D0D0]'}`}>{it.e}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-[#1C2833]">{it.title}</div>
                  <div className="text-xs text-[#4F5A5D]">{it.sub}</div>
                  {!ok && (
                    <div className="mt-2 flex items-center gap-2 border-[2.5px] border-dashed border-[#A8D878] rounded-xl px-3 py-2 text-xs text-[#4F5A5D] dropzone cursor-pointer" onClick={() => setDone(s => new Set([...s, it.id]))}>
                      <span className="text-base">{it.kind === 'file' ? '⬆️' : '🔗'}</span> {it.cta}
                    </div>
                  )}
                </div>
                {ok
                  ? <span className="pill pill-green shrink-0">ส่งแล้ว ✓</span>
                  : <button type="button" onClick={() => setDone(s => new Set([...s, it.id]))} className="btn-secondary text-xs shrink-0">เพิ่ม</button>}
              </div>
            )
          })}
        </div>

        <p className="text-xs text-[#9CA3AF] mt-4">เดโม: กดที่ช่องอัปโหลดเพื่อจำลองการส่ง</p>
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">← ย้อนกลับ</button>
        <button type="button" disabled={!all} onClick={() => router.push('/review?track=' + track)} className="btn-primary text-sm">
          ส่งให้กรรมการ →
        </button>
      </footer>
    </div>
  )
}

export default function SubmitPage() {
  return <Suspense><SubmitContent /></Suspense>
}
