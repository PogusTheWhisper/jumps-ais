'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { CATEGORIES, CategoryKey, Track } from '@/lib/data'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'

type TeamSize = 'individual' | 'duo' | 'group'
const TEAM: { id: TeamSize; label: string; sub: string; n: number; e: string }[] = [
  { id: 'individual', label: 'เดี่ยว', sub: 'ทำคนเดียว', n: 1, e: '🙂' },
  { id: 'duo', label: 'คู่', sub: '2 คน', n: 2, e: '👥' },
  { id: 'group', label: 'กลุ่ม', sub: 'สูงสุด 4 คน', n: 4, e: '👨‍👩‍👧‍👦' },
]

function IntakeContent() {
  const params = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [team, setTeam] = useState<TeamSize | null>(null)
  const [uploaded, setUploaded] = useState<Set<number>>(new Set())
  const [age, setAge] = useState('')
  const [uni, setUni] = useState('')
  const [major, setMajor] = useState('')
  const [why, setWhy] = useState('')
  const [track, setTrack] = useState<Track>((params.get('track') as Track) ?? 'sme')
  const [cat, setCat] = useState<CategoryKey | null>(null)
  const [sub, setSub] = useState<string | null>(null)

  const memberCount = TEAM.find(t => t.id === team)?.n ?? 1

  // Screen list — one question per screen. Category screens only for SME track.
  const screens: string[] = [
    'team', 'verify', 'demo', 'track',
    ...(track === 'sme' ? ['cat', 'sub'] : []),
    'confirm',
  ]
  const screen = screens[step]
  const isLast = step === screens.length - 1

  function next() {
    if (isLast) {
      const q = new URLSearchParams({ track })
      if (cat) q.set('cat', cat)
      if (sub) q.set('sub', sub)
      router.push('/select?' + q.toString())
      return
    }
    setStep(s => Math.min(s + 1, screens.length - 1))
  }
  function back() {
    if (step === 0) { router.back(); return }
    setStep(s => Math.max(s - 1, 0))
  }

  // Per-screen "can continue" guard.
  const canNext =
    screen === 'team' ? !!team :
    screen === 'verify' ? uploaded.size === memberCount :
    screen === 'demo' ? age.trim() !== '' && uni.trim() !== '' && major.trim() !== '' :
    screen === 'track' ? !!track :
    screen === 'cat' ? !!cat :
    screen === 'sub' ? !!sub :
    true

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Topbar chip="ขั้นที่ 1 · สมัคร" />

      <div className="stage-body stage-body-narrow">
        <Steps current={1} />

        {/* TEAM SIZE */}
        {screen === 'team' && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">ทีมของคุณมีกี่คน?</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">เลือกรูปแบบพื้นที่ทำงานที่คุณอยากทำ</p>
            <div className="grid grid-cols-3 gap-3">
              {TEAM.map(t => (
                <button key={t.id} type="button" onClick={() => setTeam(t.id)}
                  className={['card card-sel flex flex-col items-center gap-2 p-5 text-center cursor-pointer', team === t.id ? 'selected' : 'card-hover'].join(' ')}>
                  <span className="text-3xl">{t.e}</span>
                  <span className="font-extrabold text-sm text-[#1C2833]">{t.label}</span>
                  <span className="text-xs text-[#4F5A5D]">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VERIFY — Phase 1 stub (real OCR/authenticity check comes in Phase 3) */}
        {screen === 'verify' && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">ยืนยันตัวตนด้วยบัตรนักศึกษา</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">ต้องยืนยันทุกคน ({memberCount} คน) เพื่อความปลอดภัยของข้อมูล SME / ชุมชน</p>
            <div className={`grid gap-3 mb-4 ${memberCount > 1 ? 'sm:grid-cols-2' : ''}`}>
              {Array.from({ length: memberCount }).map((_, i) => {
                const up = uploaded.has(i)
                return (
                  <div key={i} onClick={() => setUploaded(s => new Set([...s, i]))}
                    className={[
                      'dropzone flex flex-col items-center justify-center gap-2 rounded-2xl border-[2.5px] border-dashed p-6 text-center cursor-pointer min-h-[150px]',
                      up ? 'border-[#73C23A] bg-[#F8FFF0]' : 'border-[#CBD5E1] bg-white',
                    ].join(' ')}>
                    {up ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-[#E8F5D0] border-2 border-[#73C23A] flex items-center justify-center shadow-[0_3px_0_0_#3A7A1A] animate-spring-in">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A7A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div className="font-bold text-sm text-[#1C2833]">สมาชิกคนที่ {i + 1}</div>
                        <span className="pill pill-green">อัปโหลดแล้ว</span>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl">🪪</div>
                        <div className="font-bold text-sm text-[#1C2833]">สมาชิกคนที่ {i + 1}</div>
                        <div className="text-xs text-[#9CA3AF]">แตะเพื่ออัปโหลดบัตรนักศึกษา</div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-[#9CA3AF]">⚠️ ข้อมูลที่เก็บเป็นไปตาม PDPA (ผู้เยาว์ &lt; 20 ปี)</p>
          </div>
        )}

        {/* DEMOGRAPHICS */}
        {screen === 'demo' && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">เล่าเกี่ยวกับคุณหน่อย</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">ข้อมูลนี้ช่วยจับคู่ SME ที่เหมาะกับคุณ</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { v: age, set: setAge, lb: 'อายุ', ph: 'เช่น 20', type: 'number' },
                { v: uni, set: setUni, lb: 'มหาวิทยาลัย', ph: 'เช่น จุฬาฯ', type: 'text' },
                { v: major, set: setMajor, lb: 'สาขา / คณะ', ph: 'เช่น บริหารธุรกิจ', type: 'text' },
              ] as const).map((f, i) => (
                <label key={i} className="block">
                  <span className="text-xs font-extrabold text-[#1C2833] mb-1.5 block">{f.lb}</span>
                  <input type={f.type} value={f.v} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                    className="w-full border-[2.5px] border-[#E5E5E5] rounded-xl p-3 text-sm bg-[#F8FFF0] focus:border-[#73C23A] focus:outline-none text-[#1C2833] transition-colors" />
                </label>
              ))}
            </div>
            <label className="block mt-4">
              <span className="text-xs font-extrabold text-[#1C2833] mb-1.5 block">ทำไมถึงอยากเข้าร่วม? <span className="font-normal text-[#9CA3AF]">(ไม่บังคับ)</span></span>
              <textarea value={why} onChange={e => setWhy(e.target.value)} maxLength={200} placeholder="อยากลองแก้ปัญหาธุรกิจจริง..."
                className="w-full border-[2.5px] border-[#E5E5E5] rounded-xl p-3 text-sm bg-[#F8FFF0] focus:border-[#73C23A] focus:outline-none resize-none min-h-[80px] text-[#1C2833] transition-colors" />
            </label>
          </div>
        )}

        {/* TRACK */}
        {screen === 'track' && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">อยากช่วยแบบไหน?</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">เลือกเส้นทางที่ตรงกับคุณ</p>
            <div className="grid grid-cols-2 gap-3">
              {([['sme', '🏪', 'SME', 'ธุรกิจขนาดเล็ก'], ['community', '🏘️', 'ชุมชน', 'พื้นที่ท้องถิ่น']] as const).map(([id, e, l, s]) => (
                <button key={id} type="button" onClick={() => { setTrack(id); setCat(null); setSub(null) }}
                  className={['card card-sel flex flex-col items-center gap-2 p-6 text-center cursor-pointer', track === id ? 'selected' : 'card-hover'].join(' ')}>
                  <span className="text-4xl">{e}</span>
                  <span className="font-extrabold text-base text-[#1C2833]">{l}</span>
                  <span className="text-xs text-[#4F5A5D]">{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY (SME only) */}
        {screen === 'cat' && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">อยากช่วย SME ประเภทไหน?</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">เพื่อกำหนดขอบเขตปัญหาหลัก</p>
            <div className="space-y-2.5">
              {(Object.keys(CATEGORIES) as CategoryKey[]).map(k => (
                <button key={k} type="button" onClick={() => { setCat(k); setSub(null) }}
                  className={['card card-sel flex items-center gap-3 p-4 text-left w-full cursor-pointer', cat === k ? 'selected' : 'card-hover'].join(' ')}>
                  <span className="text-2xl">{CATEGORIES[k].e}</span>
                  <span className="font-extrabold text-sm text-[#1C2833]">{CATEGORIES[k].label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUB-CATEGORY (SME only, branched) */}
        {screen === 'sub' && cat && (
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-[#1C2833] tracking-tight mb-1">เจาะจงลงไปอีกนิด</h2>
            <p className="text-xs text-[#4F5A5D] mb-5">{CATEGORIES[cat].label} · เลือก 1 อย่าง</p>
            <div className="space-y-2.5">
              {CATEGORIES[cat].subs.map(s => (
                <button key={s.id} type="button" onClick={() => setSub(s.id)}
                  className={['card card-sel flex items-center gap-3 p-4 text-left w-full cursor-pointer', sub === s.id ? 'selected' : 'card-hover'].join(' ')}>
                  <span className="font-extrabold text-sm text-[#1C2833]">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONFIRM echo */}
        {screen === 'confirm' && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl animate-bounce-in">✅</span>
              <div>
                <h2 className="text-lg font-black text-[#1C2833] tracking-tight">เข้าใจแล้ว!</h2>
                <p className="text-xs text-[#4F5A5D]">สรุปข้อมูลของคุณก่อนไปเลือก</p>
              </div>
            </div>
            <div className="card p-5 space-y-3">
              {[
                ['ทีม', TEAM.find(t => t.id === team)?.label ?? '—'],
                ['เส้นทาง', track === 'sme' ? 'SME' : 'ชุมชน'],
                ...(track === 'sme' && cat ? [['ประเภท', CATEGORIES[cat].label]] as [string, string][] : []),
                ...(track === 'sme' && cat && sub ? [['เจาะจง', CATEGORIES[cat].subs.find(s => s.id === sub)?.label ?? '—']] as [string, string][] : []),
                ['มหาวิทยาลัย', uni || '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm border-b border-[#E5E5E5] pb-2 last:border-0 last:pb-0">
                  <span className="text-[#9CA3AF] font-bold">{k}</span>
                  <span className="text-[#1C2833] font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3.5 flex justify-between items-center shrink-0">
        <button type="button" onClick={back} className="btn-secondary text-sm">← ย้อนกลับ</button>
        <button type="button" disabled={!canNext} onClick={next} className="btn-primary text-sm">
          {isLast ? 'ไปเลือก SME →' : 'ถัดไป →'}
        </button>
      </footer>
    </div>
  )
}

export default function IntakePage() {
  return (
    <Suspense>
      <IntakeContent />
    </Suspense>
  )
}
