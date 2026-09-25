import { EvidenceTag } from './EvidenceTag'
import { VerdictBadge } from './VerdictBadge'
import type { CaseData, RunRecord } from '../types/game'

export function CaseLogPanel({ caseData, runs, onClose }: { caseData: CaseData; runs: RunRecord[]; onClose: () => void }) {
  const confirmedRun = runs.findIndex(r => r.result.verdict === 'confirmed')
  const qualityScore = confirmedRun === -1 ? null
    : confirmedRun === 0 ? 100
    : Math.max(30, 100 - confirmedRun * 15)

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-label="Case log"
      aria-modal="true"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-[#553B32]/75" onClick={onClose} />
      <div className="relative bg-[#3D2A24] border-l border-[#E8DFD1]/15 w-full max-w-md h-full overflow-y-auto flex flex-col rounded-l-3xl">
        <div className="p-6 border-b border-[#E8DFD1]/15 flex items-start justify-between">
          <div>
            <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
            <h2 className="mt-2 text-lg text-[#E8DFD1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
              Case Log
            </h2>
          </div>
          <button onClick={onClose}
            className="text-[#D4C5B3] hover:text-[#E8DFD1] transition-colors text-xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8]"
            aria-label="Close case log">✕</button>
        </div>

        {/* Analytics */}
        <div className="p-6 border-b border-[#E8DFD1]/15 grid grid-cols-3 gap-4">
          {[
            { label: 'Hypotheses Tested', value: String(new Set(runs.map(r => r.hypothesisId)).size) },
            { label: 'Total Runs', value: String(runs.length) },
            { label: 'Reasoning Quality', value: qualityScore === null ? '-' : `${qualityScore}%` },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-[#FF91A8]" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
              <div className="text-[9px] text-[#D4C5B3] mt-1 leading-tight" style={{ fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {qualityScore !== null && (
          <div className="px-6 py-4 border-b border-[#E8DFD1]/15">
            <div className="text-[9px] tracking-widest text-[#D4C5B3] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              REASONING QUALITY
            </div>
            <div className="h-2 bg-[#2E1E17] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF91A8] transition-all duration-500"
                style={{ width: `${qualityScore}%` }}
                role="progressbar"
                aria-valuenow={qualityScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Reasoning quality: ${qualityScore}%`}
              />
            </div>
            <div className="text-[9px] text-[#D4C5B3] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {qualityScore >= 85 ? 'Identified culprit efficiently' : qualityScore >= 60 ? 'Systematic elimination approach' : 'Extended investigation, consider narrowing variables'}
            </div>
          </div>
        )}

        {/* Run list */}
        <div className="flex-1 p-6 space-y-4">
          <div className="text-[9px] tracking-widest text-[#D4C5B3] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Run History
          </div>
          {runs.length === 0 && (
            <div className="text-sm text-[#D4C5B3] italic">No runs recorded yet.</div>
          )}
          {[...runs].reverse().map(run => {
            const suspect = caseData.suspects.find(s => s.id === run.hypothesisId)!
            return (
              <div key={run.id} className="bg-[#553B32] border border-[#E8DFD1]/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[9px] text-[#D4C5B3]" style={{ fontFamily: 'var(--font-mono)' }}>
                    Run #{run.runNumber}
                  </div>
                  <VerdictBadge verdict={run.result.verdict} />
                </div>
                <div className="text-sm text-[#E8DFD1] font-medium">{suspect.label}</div>
                <div className="text-xs text-[#D4C5B3] leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {run.result.clue}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
