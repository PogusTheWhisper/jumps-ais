export default function Topbar({ chip }: { chip: string }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-3 px-6 h-[60px] bg-white border-b-[3px] border-[#E5E5E5] shrink-0">
      <span className="flex items-center gap-2 font-extrabold text-[#1C2833] text-lg tracking-tight">
        <span className="w-3 h-3 rounded-full bg-[#73C23A] inline-block shadow-[0_2px_0_0_#3A7A1A]" />
        THAItern
      </span>
      <span className="ml-auto text-xs font-bold text-[#4F5A5D] border border-[#E5E5E5] bg-[#F8FFF0] rounded-full px-3 py-1">
        {chip}
      </span>
    </nav>
  )
}
