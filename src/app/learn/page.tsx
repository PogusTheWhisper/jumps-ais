'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

const LESSONS = [
  { id: 'l1', title: 'บทที่ 1 · โครงสร้างธุรกิจ SME', sub: 'Fixed vs Variable cost · 8 นาที', icon: '📐' },
  { id: 'l2', title: 'บทที่ 2 · วิเคราะห์ P&L', sub: 'อ่านงบกำไรขาดทุน · 10 นาที', icon: '📊' },
  { id: 'l3', title: 'บทที่ 3 · ลำดับความสำคัญข้อมูล', sub: 'เลือกข้อมูลภายใต้ข้อจำกัด · 7 นาที', icon: '🎯' },
]

function LearnContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [done, setDone] = useState<Set<string>>(new Set(['l1']))
  const [activeTab, setActiveTab] = useState<'textbook' | 'quiz' | 'cases' | 'session'>('textbook')
  const [quizPick, setQuizPick] = useState<number | null>(null)

  const entityName = params.get('entityName') ?? '—'
  const entityEmoji = params.get('entityEmoji') ?? '🏪'
  const entityBg = params.get('entityBg') ?? '#FEF3C7'
  const entityBc = params.get('entityBc') ?? '#FCD34D'

  const pct = Math.round((done.size / LESSONS.length) * 100)

  function handleNext() {
    router.push('/case?track=' + (params.get('track') ?? 'sme'))
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 2 · เรียนรู้" />

      <div className="stage-body">
        <Steps current={3} />

        {/* Entity header */}
        <div className="card flex items-center gap-4 p-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl border-2 shrink-0"
            style={{ background: entityBg, borderColor: entityBc, boxShadow: `3px 3px 0 0 ${entityBc}` }}>
            {entityEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-sm text-[#1C2833] truncate">{entityName}</div>
            <div className="text-xs text-[#4F5A5D]">Stage 1 of 7</div>
            <div className="mt-2 h-2.5 bg-[#E8F5D0] rounded-full border border-[#A8D878] overflow-hidden">
              <div className="h-full bg-[#73C23A] rounded-full transition-all duration-500"
                style={{ width: pct + '%' }} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-extrabold text-[#73C23A] text-lg">{done.size}/{LESSONS.length}</div>
            <div className="text-xs text-[#4F5A5D]">เสร็จ</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {(['textbook', 'quiz', 'cases', 'session'] as const).map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={[
                'px-4 py-2.5 rounded-xl border-[2.5px] text-xs font-bold transition-all',
                activeTab === tab
                  ? 'bg-[#1C2833] text-white border-[#1C2833] shadow-[3px_3px_0_0_#000]'
                  : 'bg-white text-[#4F5A5D] border-[#E5E5E5] shadow-[3px_3px_0_0_#D0D0D0] hover:border-[#73C23A] hover:text-[#3A7A1A]',
              ].join(' ')}>
              {tab === 'textbook' ? '📖 Textbook' : tab === 'quiz' ? '✏️ Quiz' : tab === 'cases' ? '🗂 Cases' : '🎥 Special Session'}
            </button>
          ))}
        </div>

        {/* Textbook */}
        {activeTab === 'textbook' && (
          <div className="space-y-2 animate-fade-up">
            {LESSONS.map(l => {
              const isDone = done.has(l.id)
              return (
                <div key={l.id} onClick={() => setDone(prev => new Set([...prev, l.id]))}
                  className="flex items-center gap-3 p-4 rounded-2xl border-[2.5px] border-[#E5E5E5] bg-white cursor-pointer transition-all hover:border-[#73C23A] hover:shadow-[3px_3px_0_0_#A8D878]">
                  <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 text-lg transition-all ${isDone ? 'bg-[#E8F5D0] border-[#73C23A] shadow-[2px_2px_0_0_#3A7A1A]' : 'bg-[#F3F4F6] border-[#D1D5DB]'}`}>
                    {isDone
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A7A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : l.icon
                    }
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1C2833]">{l.title}</div>
                    <div className="text-xs text-[#4F5A5D]">{l.sub}</div>
                  </div>
                  <span className={`pill ${isDone ? 'pill-green' : 'pill-gray'}`}>
                    {isDone ? 'เสร็จ ✓' : 'เรียน'}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="animate-fade-up">
            <div className="card overflow-hidden">
              <div className="px-5 py-3.5 bg-[#1C2833] text-white flex items-center gap-2">
                <span className="text-lg">✏️</span>
                <span className="font-extrabold text-sm">Quiz · บทที่ 1</span>
                <span className="pill pill-gray ml-auto text-[10px]">AI สร้างจากทฤษฎี</span>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-[#1C2833] mb-4">
                  ร้านมีค่าเช่า 38,000 ฿/เดือน — จัดเป็นต้นทุนประเภทใด?
                </p>
                <div className="space-y-2.5">
                  {['ต้นทุนคงที่ (Fixed)', 'ต้นทุนผันแปร (Variable)', 'ต้นทุนจม (Sunk)', 'ไม่ใช่ต้นทุน'].map((opt, i) => {
                    const picked = quizPick === i
                    const correct = i === 0
                    const show = quizPick !== null
                    return (
                      <button key={i} type="button" disabled={show} onClick={() => setQuizPick(i)}
                        className={[
                          'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-[2.5px] text-left text-sm font-medium transition-all',
                          show && correct ? 'border-[#73C23A] bg-[#F8FFF0] shadow-[3px_3px_0_0_#3A7A1A]'
                            : show && picked && !correct ? 'border-[#FF4B4B] bg-[#FFF5F5] shadow-[3px_3px_0_0_#C81E1E]'
                            : picked ? 'border-[#73C23A] bg-[#F8FFF0]'
                            : 'border-[#E5E5E5] bg-white hover:border-[#73C23A] shadow-[3px_3px_0_0_#D0D0D0]',
                        ].join(' ')}>
                        <span className="text-[#1C2833]">{opt}</span>
                        {show && correct && <span className="ml-auto text-[#3A7A1A]">✓</span>}
                        {show && picked && !correct && <span className="ml-auto text-[#FF4B4B]">✗</span>}
                      </button>
                    )
                  })}
                </div>
                {quizPick !== null && (
                  <div className="mt-4 p-4 rounded-xl bg-[#F8FFF0] border-2 border-[#A8D878] animate-spring-in">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`pill ${quizPick === 0 ? 'pill-green' : 'pill-blue'}`}>{quizPick === 0 ? 'EXCEEDS' : 'MEETS'}</span>
                      <span className="text-xs font-bold text-[#1C2833]">แถบผล — ไม่มีคะแนน</span>
                    </div>
                    <p className="text-xs text-[#4F5A5D] leading-relaxed">
                      ค่าเช่าไม่เปลี่ยนตามยอดขาย = ต้นทุนคงที่ ตัวเลขนี้คือฐานของ Breakeven
                    </p>
                    <button type="button" onClick={() => setQuizPick(null)} className="btn-secondary text-xs mt-3">ลองใหม่</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-3 animate-fade-up">
            <div className="card flex gap-3 p-4">
              <span className="text-3xl">🧃</span>
              <div>
                <div className="font-bold text-sm text-[#1C2833]">เคส: ร้านน้ำผลไม้ปั่น อ.เมือง</div>
                <p className="text-xs text-[#4F5A5D] mt-1 leading-relaxed">รายได้ลดลง 30% หลังห้างเปิดสาขาใกล้เคียง — ลดราคา เปลี่ยนเมนู หรือย้ายทำเล?</p>
                <div className="flex gap-2 mt-2">
                  <span className="pill pill-green">ค้าปลีก</span>
                  <span className="pill pill-gray">Stage 2</span>
                </div>
              </div>
            </div>
            <div className="card flex gap-3 p-4 opacity-40">
              <span className="text-3xl">🔒</span>
              <div>
                <div className="font-bold text-sm text-[#1C2833]">เคส: ร้านอาหารอีสาน</div>
                <p className="text-xs text-[#4F5A5D] mt-1">ปลดล็อคเมื่อผ่าน Stage 2</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'session' && (
          <div className="animate-fade-up">
            <div className="card p-4">
              <div className="aspect-video bg-[#1C2833] rounded-xl flex items-center justify-center gap-2 text-white cursor-pointer mb-4 border-2 border-[#E5E5E5] shadow-[4px_4px_0_0_#D0D0D0]">
                <div className="w-14 h-14 rounded-full bg-[#73C23A] flex items-center justify-center shadow-[0_4px_0_0_#3A7A1A]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="font-bold text-sm text-[#1C2833]">คุณสมศรี วานิชกร · ที่ปรึกษา SME 15 ปี</div>
              <p className="text-xs text-[#4F5A5D] mt-1">&ldquo;สิ่งที่เจ้าของ SME มักพลาดคือการไม่รู้ต้นทุนที่แท้จริง...&rdquo;</p>
              <div className="flex gap-2 mt-3">
                <span className="pill pill-amber">วิดีโอจากมนุษย์จริง</span>
                <span className="pill pill-gray">ไม่ใช่ AI</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">
          ← ย้อนกลับ
        </button>
        <button type="button" onClick={handleNext} className="btn-primary text-sm">
          เข้าสู่ Case →
        </button>
      </footer>
    </div>
  )
}

export default function LearnPage() {
  return (
    <Suspense>
      <LearnContent />
    </Suspense>
  )
}
