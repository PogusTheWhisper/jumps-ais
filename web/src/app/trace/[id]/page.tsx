import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAttempt } from '@/lib/db'
import { OPTS, OptKey } from '@/lib/data'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

export default async function TracePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const attempt = await getAttempt(id)
  if (!attempt) notFound()

  const optText = attempt.option_selected
    ? OPTS[attempt.option_selected as OptKey]
    : '(ไม่ได้เลือก)'

  return (
    <div className="flex flex-col min-h-screen animate-fade-up">
      <Topbar chip="Decision Trace" />

      <div className="flex-1 max-w-3xl mx-auto w-full px-7 py-8">
        <Steps current={4} />

        {/* Hero completion */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl animate-bounce-in" style={{ animationDelay: '50ms' }}>🎉</div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1C2833] tracking-tight">Stage 1 เสร็จแล้ว!</h2>
            <p className="text-xs text-[#4F5A5D] mt-0.5">Trace ถูกบันทึก — ไม่มีคะแนน มีแค่การเรียนรู้</p>
          </div>
        </div>

        {/* Trace card */}
        <div className="card overflow-hidden mb-5">
          {/* Header */}
          <div className="px-6 py-5 bg-[#1C2833] text-white">
            <div className="font-extrabold tracking-tight">THAItern · Decision Trace</div>
            <div className="text-xs opacity-60 mt-1">
              {attempt.entity_name} · {attempt.entity_type} · {attempt.entity_loc}
            </div>
            <p className="text-xs italic opacity-70 mt-3 leading-relaxed max-w-md">
              &ldquo;บันทึกนี้ไม่ระบุว่าคุณทำงานได้ดีแค่ไหน — แต่บันทึกว่าเมื่อเจอสถานการณ์เหล่านี้ คุณคิดอย่างไร ตัดสินใจอย่างไร และปรับตัวอย่างไร อ่านแล้วตัดสินเอง&rdquo;
            </p>
          </div>

          {[
            { label: 'สถานการณ์', text: 'ร้านกาแฟรายได้ 180,000 ฿/เดือน กำไรเหลือ 8,000 ฿ — เลือกกรอบการวิเคราะห์' },
            { label: 'ตัวเลือกที่เลือก', text: optText },
            { label: 'เหตุผลที่ให้', text: attempt.justification ?? '(ไม่ได้ให้เหตุผล)' },
            { label: 'Feedback จากผู้เชี่ยวชาญ', text: 'Fixed/Variable เผยต้นทุนคงที่ 83,000 ฿/เดือน — ชี้สาเหตุกำไรบาง' },
          ].map(r => (
            <div key={r.label} className="px-6 py-4 border-b border-[#E5E5E5] bg-white">
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-[#9CA3AF] mb-1">{r.label}</div>
              <div className="text-sm text-[#1C2833]">{r.text}</div>
            </div>
          ))}

          <div className="px-6 py-4 bg-[#F8FFF0] border-b border-[#E5E5E5]">
            <div className="text-[10px] uppercase tracking-widest font-extrabold text-[#3A7A1A] mb-1">ครั้งหน้าฉันจะ…</div>
            <div className="text-sm text-[#1C2833]">{attempt.reflection ?? '(ยังไม่ได้เขียน)'}</div>
          </div>

          <div className="px-6 py-3 bg-[#F3F4F6] text-xs text-[#9CA3AF]">
            ⚠️ ไม่มีคะแนน · ไม่มี percentile · Stage 1/7 · ยังไม่สรุปจาก unit เดียว
          </div>
        </div>

        {/* Next steps */}
        <div className="card p-5">
          <h3 className="font-extrabold text-sm text-[#1C2833]">ขั้นต่อไป</h3>
          <p className="text-xs text-[#4F5A5D] mt-1">
            ผ่าน Stage 1 ได้ 1 ครั้ง — ต้องผ่านอีก 1 ครั้งใน<strong>อุตสาหกรรมที่ต่างกัน</strong> จึงไป Stage 2
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Link href={`/select?track=${attempt.track}`} className="btn-primary text-sm">
              เล่น Case ถัดไป →
            </Link>
            <Link href="/" className="btn-secondary text-sm">
              ← หน้าแรก
            </Link>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3 shrink-0">
        <span className="text-xs text-[#9CA3AF]">Trust Gate G1 · Internal · {new Date().toISOString().slice(0, 10)}</span>
      </footer>
    </div>
  )
}
