'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { DATA, Entity, Track } from '@/lib/data'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

function SelectContent() {
  const params = useSearchParams()
  const router = useRouter()
  const track = (params.get('track') ?? 'sme') as Track
  const [selected, setSelected] = useState<Entity | null>(null)

  const entities = DATA[track] ?? DATA.sme
  const label = track === 'sme' ? 'SME Track' : 'Community Track'
  const title = track === 'sme' ? 'เลือก SME ที่อยากช่วย' : 'เลือกชุมชนที่อยากช่วย'

  function handleNext() {
    if (!selected) return
    const q = new URLSearchParams({
      track,
      entityId: selected.id,
      entityName: selected.n,
      entityType: selected.t,
      entityLoc: selected.l,
      entityEmoji: selected.e,
      entityBg: selected.bg,
      entityBc: selected.bc,
    })
    router.push('/learn?' + q.toString())
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip={label} />

      <div className="stage-body">
        <Steps current={2} />

        {/* Matched banner */}
        <div className="card p-4 mb-5 flex items-center gap-3 bg-[#F8FFF0] border-[#A8D878] animate-spring-in">
          <span className="text-2xl shrink-0">🎉</span>
          <p className="text-sm text-[#1C2833] font-bold leading-snug">
            ยินดีด้วย! ทุกที่นี้ตรงสไตล์คุณและรอให้คุณช่วยอยู่
            <span className="block text-xs font-normal text-[#4F5A5D] mt-0.5">จับคู่จากความสนใจที่คุณเลือกไว้</span>
          </p>
        </div>

        <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 900, color: '#1C2833', letterSpacing: '-0.01em', marginBottom: 2 }}>{title}</h2>
        <p className="text-xs text-[#4F5A5D] mb-4">อ่านข้อมูลเบื้องต้น แล้วเลือก 1 แห่ง — ยังไม่บอกปัญหา</p>

        <div className="grid grid-cols-2 gap-4">
          {entities.map((it, i) => {
            const isSel = selected?.id === it.id
            return (
              <button
                key={it.id}
                onClick={() => setSelected(it)}
                type="button"
                className={[
                  'card card-sel flex flex-col gap-3 p-4 text-left cursor-pointer animate-spring-in',
                  isSel ? 'selected' : 'card-hover',
                ].join(' ')}
                style={{ animationDelay: `${i * 65}ms` }}
              >
                {/* Colored header band */}
                <div style={{ background: `linear-gradient(135deg, ${it.bg}, ${it.bc}40)`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                  <div style={{ fontSize: 28 }}>{it.e}</div>
                  <div className="min-w-0">
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1C2833' }} className="truncate">{it.n}</div>
                    <div style={{ fontSize: '0.68rem', color: '#4F5A5D' }}>{it.l}</div>
                  </div>
                  <span className="pill pill-green" style={{ position: 'absolute', top: 8, right: 8, background: '#fff' }}>{92 - i * 6}% ตรง</span>
                </div>
                <p className="text-xs text-[#4F5A5D] leading-relaxed">{it.d}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="pill pill-green">{it.t}</span>
                  <span className="text-xs text-[#F59E0B] font-bold">★ {(4.9 - i * 0.2).toFixed(1)}</span>
                </div>
                {isSel && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3A7A1A]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    เลือกแล้ว
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">
          ← ย้อนกลับ
        </button>
        <button type="button" disabled={!selected} onClick={handleNext} className="btn-primary text-sm">
          ถัดไป →
        </button>
      </footer>
    </div>
  )
}

export default function SelectPage() {
  return (
    <Suspense>
      <SelectContent />
    </Suspense>
  )
}
