'use client'

import Link from 'next/link'
import { use } from 'react'
import Topbar from '@/components/Topbar'
import Steps from '@/components/Steps'
import { Confetti } from '@/components/Motion'

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  use(params)
  const today = '20 สิงหาคม 2569'

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
      <Confetti />
      <Topbar chip="ขั้นที่ 8 · จบ" />

      <div className="stage-body">
        <Steps current={8} />

        <div className="text-center mb-5">
          <h2 className="text-2xl font-black text-[#1C2833] tracking-tight">จบโครงการแล้ว! 🎉</h2>
          <p className="text-sm text-[#4F5A5D] mt-1">AI สร้างเกียรติบัตรให้อัตโนมัติ</p>
        </div>

        {/* Certificate */}
        <div className="card overflow-hidden p-0 animate-spring-in">
          <div className="relative p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(160deg,#FFFFFF,#F8FFF0)' }}>
            {/* border frame */}
            <div className="absolute inset-3 border-[3px] border-[#A8D878] rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-[#73C23A] shadow-[0_2px_0_0_#3A7A1A]" />
                <span className="font-black text-[#1C2833] tracking-tight text-lg">THAItern</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#9CA3AF] mb-3">Certificate of Completion</div>
              <div className="text-xs text-[#4F5A5D] mb-1">มอบให้เพื่อรับรองว่า</div>
              <div className="text-3xl font-black text-[#1C2833] tracking-tight mb-3">นักศึกษาผู้เข้าร่วม</div>
              <p className="text-sm text-[#4F5A5D] leading-relaxed max-w-md mx-auto mb-6">
                ได้ผ่านการเรียนรู้และลงมือช่วย <strong className="text-[#1C2833]">ร้านกาแฟอาทิตย์</strong> จนครบ
                7 ขั้นของโครงการ Work-Simulation Learning
              </p>

              {/* Seal */}
              <div className="animate-stamp inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#73C23A] text-white shadow-[0_5px_0_0_#3A7A1A] mb-5">
                <span className="text-2xl">✓</span>
                <span className="text-[9px] font-black uppercase tracking-wider">Verified</span>
              </div>

              <div className="flex items-center justify-center gap-8 text-xs text-[#4F5A5D]">
                <div><div className="font-bold text-[#1C2833]">{today}</div><div className="text-[10px]">วันที่</div></div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div><div className="font-bold text-[#1C2833]">AIS Jump 2026</div><div className="text-[10px]">โครงการ</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-center flex-wrap">
          <button type="button" className="btn-primary text-sm">ดาวน์โหลด PDF</button>
          <Link href="/" className="btn-secondary text-sm">กลับหน้าแรก</Link>
        </div>
        <p className="text-xs text-[#9CA3AF] mt-4 text-center">เดโม · การสร้าง PDF จริงจะเพิ่มใน Phase 3</p>
      </div>

      <footer className="sticky bottom-0 bg-white/90 backdrop-blur border-t-[3px] border-[#E5E5E5] px-7 py-3 shrink-0">
        <span className="text-xs text-[#9CA3AF]">Trust Gate G1 · Internal</span>
      </footer>
    </div>
  )
}
