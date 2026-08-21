// Full THAItern program spine — 8 stages.
export const STAGE_LABELS = ['สมัคร', 'เลือก', 'เรียน', 'เคส', 'พี่เลี้ยง', 'ส่งงาน', 'รีวิว', 'จบ']

export default function Steps({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8">
      {STAGE_LABELS.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold border-[3px] transition-all duration-200',
                done ? 'bg-[#73C23A] text-white border-[#3A7A1A] shadow-[0_3px_0_0_#3A7A1A]' : '',
                active ? 'bg-[#73C23A] text-white border-[#3A7A1A] shadow-[0_3px_0_0_#3A7A1A] animate-pop' : '',
                !done && !active ? 'bg-white text-gray-400 border-[#D0D0D0]' : '',
              ].join(' ')}>
                {done ? '✓' : n}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider hidden md:block ${active ? 'text-[#3A7A1A]' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < STAGE_LABELS.length - 1 && (
              <div className="flex-1 h-[3px] mx-1.5 rounded-full" style={{ background: n < current ? '#73C23A' : '#E5E5E5' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
