'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

interface Mentor {
  id: string; name: string; role: string; e: string; tag: string
  bio: string; slots: string[]; pill: string
}
const MENTORS: Mentor[] = [
  { id: 'sme', name: 'คุณอาทิตย์ เจริญสุข', role: 'เจ้าของร้านกาแฟอาทิตย์', e: '☕', tag: 'SME', pill: 'pill-green',
    bio: 'เปิดร้าน 3 ปี ผ่านช่วงโควิดและคู่แข่งเปิดใหม่ รู้ปัญหาจริงหน้างาน', slots: ['จ. 10:00', 'พ. 14:00', 'ศ. 16:00'] },
  { id: 'influ', name: 'พิม บิสสิเนส', role: 'Content Creator · ธุรกิจ SME', e: '🎤', tag: 'Special Mentor', pill: 'pill-indigo',
    bio: 'อินฟลูฯ สาย SME ผู้ติดตาม 240K ช่วยมองมุมการตลาดและการสื่อสาร', slots: ['อ. 11:00', 'พฤ. 15:00', 'ส. 13:00'] },
]

function MentoringContent() {
  const params = useSearchParams()
  const router = useRouter()
  const track = params.get('track') ?? 'sme'
  const [booked, setBooked] = useState<Record<string, string>>({})

  const allBooked = MENTORS.every(m => booked[m.id])

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 5 · พี่เลี้ยง" />

      <div className="stage-body">
        <Steps current={5} />
        <h2 className="text-2xl font-black text-[#1C2833] tracking-tight mb-1">จองเวลาพบพี่เลี้ยง</h2>
        <p className="text-sm text-[#4F5A5D] mb-6">พบ SME 1 ครั้ง + Special Mentor 1 ครั้ง เพื่อรับคำแนะนำก่อนลงมือ</p>

        <div className="grid md:grid-cols-2 gap-5">
          {MENTORS.map((m, idx) => {
            const done = !!booked[m.id]
            return (
              <div key={m.id} className="card p-5 animate-spring-in" style={{ animationDelay: `${idx * 90}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 border-[#E5E5E5] shadow-[3px_3px_0_0_#D0D0D0] shrink-0 bg-[#F8FFF0]">{m.e}</div>
                  <div className="min-w-0">
                    <span className={`pill ${m.pill}`}>{m.tag}</span>
                    <div className="font-extrabold text-sm text-[#1C2833] mt-1 truncate">{m.name}</div>
                    <div className="text-xs text-[#4F5A5D] truncate">{m.role}</div>
                  </div>
                </div>
                <p className="text-xs text-[#4F5A5D] leading-relaxed mb-4">{m.bio}</p>

                {done ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#E8F5D0] border-2 border-[#73C23A] text-sm font-bold text-[#3A7A1A] animate-spring-in">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    จองแล้ว · {booked[m.id]}
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-widest font-extrabold text-[#9CA3AF] mb-2">เลือกเวลานัด</div>
                    <div className="flex flex-wrap gap-2">
                      {m.slots.map(s => (
                        <button key={s} type="button" onClick={() => setBooked(b => ({ ...b, [m.id]: s }))}
                          className="px-3.5 py-2 rounded-xl border-[2.5px] border-[#E5E5E5] bg-white text-xs font-bold text-[#1C2833] shadow-[2px_2px_0_0_#D0D0D0] hover:border-[#73C23A] hover:bg-[#F8FFF0] hover:-translate-y-0.5 transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {!allBooked && <p className="text-xs text-[#9CA3AF] mt-5 text-center">จองครบทั้ง 2 พี่เลี้ยงเพื่อไปต่อ</p>}
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">← ย้อนกลับ</button>
        <button type="button" disabled={!allBooked} onClick={() => router.push('/submit?track=' + track)} className="btn-primary text-sm">
          ไปส่งงาน →
        </button>
      </footer>
    </div>
  )
}

export default function MentoringPage() {
  return <Suspense><MentoringContent /></Suspense>
}
