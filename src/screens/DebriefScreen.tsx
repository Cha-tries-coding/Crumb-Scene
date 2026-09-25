import { EvidenceTag } from '../components/EvidenceTag'
import { VerdictBadge } from '../components/VerdictBadge'
import type { CaseData, RunRecord, RunResult } from '../types/game'

export function DebriefScreen({ caseData, result, runs, onTestAgain, onCaseBoard, onShowLog }: {
  caseData: CaseData; result: RunResult; runs: RunRecord[]
  onTestAgain: () => void; onCaseBoard: () => void; onShowLog: () => void
}) {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
          <h2 className="mt-3 text-2xl sm:text-3xl text-[#E8DFD1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            Debrief
          </h2>
          <div className="text-[#D4C5B3] text-sm mt-1">Run #{runs.length}, <VerdictBadge verdict={result.verdict} /></div>
        </div>

        {/* 3 Evidence Blocks */}
        <div className="space-y-4 mb-10">
          {[
            { label: 'What This Proves', icon: '✓', content: result.proves, color: 'border-[#7C9A6B]/40 bg-[#7C9A6B]/5' },
            { label: 'What This Does Not Prove', icon: '◎', content: result.doesNotProve, color: 'border-[#E8DFD1]/15 bg-[#3D2A24]' },
            { label: 'Next Test to Run', icon: '→', content: result.nextTest, color: 'border-[#FF91A8]/25 bg-[#FF91A8]/4' },
          ].map(block => (
            <div key={block.label} className={`border rounded-xl p-5 ${block.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#FF91A8] text-sm" aria-hidden="true">{block.icon}</span>
                <div className="text-[10px] tracking-widest text-[#D4C5B3] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                  {block.label}
                </div>
              </div>
              <p className="text-sm text-[#E8DFD1] leading-relaxed max-w-[60ch]">
                {block.content}
              </p>
            </div>
          ))}
        </div>

        {/* Recovery move (Case 02 only) */}
        {caseData.recoveryMove && result.verdict === 'confirmed' && (
          <div className="border border-[#FF91A8]/30 bg-[#FF91A8]/5 rounded-xl p-5 mb-10">
            <div className="text-[10px] tracking-widest text-[#FF91A8] mb-3 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Recovery Move, For Reference
            </div>
            <p className="text-sm text-[#D4C5B3] leading-relaxed max-w-[60ch]">
              {caseData.recoveryMove}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 items-center pt-2">
          <button onClick={onTestAgain}
            className="bg-[#FF91A8] text-[#2E1E17] rounded-full px-8 py-3 text-sm font-bold tracking-wide hover:bg-[#F2678A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#553B32]"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Test Another Hypothesis ↺
          </button>
          <button onClick={onShowLog}
            className="border border-[#E8DFD1]/25 text-[#D4C5B3] rounded-full px-5 py-3 text-sm hover:border-[#FF91A8]/50 hover:text-[#E8DFD1] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Case Log ({runs.length} run{runs.length !== 1 ? 's' : ''})
          </button>
          <button onClick={onCaseBoard}
            className="text-[#D4C5B3] text-sm hover:text-[#E8DFD1] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            ← Case Board
          </button>
        </div>
      </div>
    </div>
  )
}
