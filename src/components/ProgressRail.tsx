import type { Screen } from '../types/game'

const STEPS = ['The Scene', 'The Hypothesis', 'The Test Bench', 'The Result', 'The Debrief']
const SCREEN_STEP: Partial<Record<Screen, number>> = {
  intro: 0, hypothesis: 1, bench: 2, result: 3, debrief: 4,
}

export function ProgressRail({ screen }: { screen: Screen }) {
  const current = SCREEN_STEP[screen] ?? -1
  if (current < 0) return null
  return (
    <nav aria-label="Case progress" className="border-b border-[#E8DFD1]/15 bg-[#553B32]/90 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-center gap-0">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center">
            {i > 0 && (
              <div className={`h-px w-6 sm:w-10 mx-1 transition-colors duration-300 ${i <= current ? 'bg-[#FF91A8]/70' : 'bg-[#3D2A24]'}`} aria-hidden="true" />
            )}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-all duration-300 ${
                i < current ? 'bg-[#FF91A8] text-[#2E1E17]' :
                i === current ? 'bg-[#FF91A8] text-[#2E1E17] ring-2 ring-[#FF91A8]/30 ring-offset-1 ring-offset-[#553B32]' :
                'bg-[#3D2A24] text-[#D4C5B3]'
              }`}
                aria-current={i === current ? 'step' : undefined}
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {i < current ? '✓' : i + 1}
              </div>
              <span className={`hidden sm:block text-[9px] tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${i <= current ? 'text-[#FFC2D1]' : 'text-[#D4C5B3]'}`}
                style={{ fontFamily: 'var(--font-mono)' }}>
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
}
