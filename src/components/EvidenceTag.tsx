import type { ReactNode } from 'react'

export function EvidenceTag({ children, color = 'gold' }: { children: ReactNode; color?: 'gold' | 'caramel' | 'red' | 'green' | 'muted' }) {
  const colors = {
    // Pink text tones (not the raw #FF91A8) keep >=4.5:1 contrast on chocolate/espresso backgrounds
    gold: 'border-[#FF91A8] text-[#FFC2D1]',
    caramel: 'border-[#FF91A8]/60 text-[#FFC2D1]',
    red: 'border-[#F2967D] text-[#F2967D]',
    green: 'border-[#A8C296] text-[#A8C296]',
    muted: 'border-[#E8DFD1]/20 text-[#D4C5B3]',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 border rounded-full text-[10px] tracking-widest uppercase ${colors[color]}`}
      style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
      {children}
    </span>
  )
}
