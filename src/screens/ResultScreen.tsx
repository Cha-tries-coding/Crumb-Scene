import { EvidenceTag } from '../components/EvidenceTag'
import { GanachePreview, ChouxPreview, MacaronPreview } from '../components/previews/BatchPreview'
import { VerdictBadge } from '../components/VerdictBadge'
import type { CaseData, RunResult } from '../types/game'

export function ResultScreen({ caseData, caseIndex, hypothesis, result, runCount, onContinue, onTestAgain }: {
  caseData: CaseData; caseIndex: number; hypothesis: string; result: RunResult; runCount: number
  onContinue: () => void; onTestAgain: () => void
}) {
  const suspect = caseData.suspects.find(s => s.id === hypothesis)!

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
          <h2 className="mt-3 text-2xl sm:text-3xl text-[#E8DFD1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            Run Result
          </h2>
          <div className="text-[10px] text-[#D4C5B3] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
            Run #{runCount}, Hypothesis: {suspect.label}
          </div>
        </div>

        {/* Before / After */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="relative bg-[#553B32] border border-[#E8DFD1]/15 rounded-xl overflow-hidden">
            <div className="absolute top-2 left-2 z-10">
              <EvidenceTag color="muted">Before</EvidenceTag>
            </div>
            <img src={caseData.imageUrl} alt={caseData.imageAlt} className="w-full aspect-[4/3] object-cover opacity-50" />
            <p className="px-4 py-3 text-xs text-[#D4C5B3] italic" style={{ fontFamily: 'var(--font-mono)' }}>
              Original failure
            </p>
          </div>
          <div className="bg-[#3D2A24] border border-[#E8DFD1]/15 rounded-xl flex flex-col">
            <div className="p-2">
              <EvidenceTag color={result.verdict === 'confirmed' ? 'green' : result.verdict === 'ruled_out' ? 'red' : 'muted'}>
                After Run
              </EvidenceTag>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 min-h-[140px]">
              {caseIndex === 0 && <MacaronPreview sliders={{ temperature: 325, hydration: 40, mixingTime: result.verdict === 'confirmed' ? 230 : 100, restingTime: 30 }} />}
              {caseIndex === 1 && <GanachePreview sliders={{ temperature: result.verdict === 'confirmed' ? 200 : 155, hydration: 100, mixingTime: 80, restingTime: 2 }} />}
              {caseIndex === 2 && <ChouxPreview sliders={{ temperature: 400, hydration: 40, mixingTime: result.verdict === 'confirmed' ? 60 : 200, restingTime: 35 }} />}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-[#3D2A24] border border-[#E8DFD1]/15 rounded-xl p-6 mb-6 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <VerdictBadge verdict={result.verdict} />
            <div className="text-[9px] tracking-widest text-[#D4C5B3]" style={{ fontFamily: 'var(--font-mono)' }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div>
            <div className="text-[9px] tracking-widest text-[#FFC2D1] mb-2 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Observable Clue
            </div>
            <p className="text-sm text-[#E8DFD1] leading-relaxed max-w-[60ch]" style={{ fontFamily: 'var(--font-mono)' }}>
              {result.clue}
            </p>
          </div>

          <div>
            <div className="text-[9px] tracking-widest text-[#FFC2D1] mb-2 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Interpretation
            </div>
            <p className="text-sm text-[#D4C5B3] leading-relaxed max-w-[60ch]">
              {result.observation}
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button onClick={onContinue}
            className="bg-[#FF91A8] text-[#2E1E17] rounded-full px-8 py-3 text-sm font-bold tracking-wide hover:bg-[#F2678A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#553B32]"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Read the Debrief →
          </button>
          <button onClick={onTestAgain}
            className="border border-[#E8DFD1]/25 text-[#D4C5B3] rounded-full px-6 py-3 text-sm hover:border-[#FF91A8]/60 hover:text-[#E8DFD1] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Test Again ↺
          </button>
        </div>
      </div>
    </div>
  )
}
