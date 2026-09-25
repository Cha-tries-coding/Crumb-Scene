import type { Verdict } from '../types/game'

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const config = {
    confirmed: { label: 'CONFIRMED', bg: 'bg-[#7C9A6B]', text: 'text-[#2E1E17]', icon: '✓' },
    ruled_out: { label: 'RULED OUT', bg: 'bg-[#C1462F]', text: 'text-[#FFFBF2]', icon: '✕' },
    inconclusive: { label: 'INCONCLUSIVE', bg: 'bg-[#3D2A24]', text: 'text-[#E8DFD1]', icon: '◎', border: 'border border-[#FF91A8]/50' },
  }[verdict]

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} ${'border' in config ? config.border : ''}`}
      style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em', fontSize: 13 }}
      role="status" aria-live="polite">
      <span aria-hidden="true">{config.icon}</span>
      <span>{config.label}</span>
    </div>
  )
}
