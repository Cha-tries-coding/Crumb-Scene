import { EvidenceTag } from '../components/EvidenceTag'
import type { CaseData } from '../types/game'

export function HypothesisScreen({ caseData, selected, onSelect, onNext, onBack }: {
  caseData: CaseData; selected: string | null; onSelect: (id: string) => void; onNext: () => void; onBack: () => void
}) {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
          <h2 className="mt-3 text-2xl sm:text-3xl text-[#E8DFD1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            Select Your Hypothesis
          </h2>
          <p className="mt-2 text-[#D4C5B3] text-sm max-w-[55ch]">
            One of these is the primary cause. The others are plausible but point to different failure signatures. Choose the one you want to test first.
          </p>
        </div>

        <fieldset>
          <legend className="sr-only">Suspects, choose one hypothesis to test</legend>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {caseData.suspects.map((suspect, i) => {
              const isSelected = selected === suspect.id
              return (
                <label
                  key={suspect.id}
                  className={`group relative flex flex-col gap-3 p-5 border rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'border-[#FF91A8] bg-[#FF91A8]/8 shadow-md shadow-[#FF91A8]/10'
                      : 'border-[#E8DFD1]/15 bg-[#3D2A24] hover:border-[#E8DFD1]/35 hover:bg-[#3D2A24]/80'
                  }`}>
                  <input
                    type="radio"
                    name="hypothesis"
                    value={suspect.id}
                    checked={isSelected}
                    onChange={() => onSelect(suspect.id)}
                    className="sr-only"
                  />

                  <div className="flex items-start justify-between">
                    <div className="text-[9px] tracking-widest text-[#FFC2D1]" style={{ fontFamily: 'var(--font-mono)' }}>
                      SUSPECT, {String.fromCharCode(65 + i)}
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'border-[#FF91A8] bg-[#FF91A8]' : 'border-[#E8DFD1]/25'
                    }`} aria-hidden="true">
                      {isSelected && <span className="text-[#2E1E17] text-[10px] leading-none font-bold">✓</span>}
                    </div>
                  </div>

                  <div>
                    <div className="text-base font-semibold text-[#E8DFD1] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                      {suspect.label}
                    </div>
                    <div className="text-sm text-[#D4C5B3] leading-relaxed" style={{ maxWidth: '40ch' }}>
                      {suspect.claim}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="text-[9px] text-[#FFC2D1] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                      SELECTED, proceed to test bench
                    </div>
                  )}
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="flex gap-4 items-center">
          <button
            onClick={onNext}
            disabled={!selected}
            className="bg-[#FF91A8] text-[#2E1E17] rounded-full px-8 py-3 text-sm font-semibold tracking-wide hover:bg-[#F2678A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#553B32]"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-disabled={!selected}>
            Set Up Test Bench →
          </button>
          <button onClick={onBack} className="text-[#D4C5B3] text-sm hover:text-[#E8DFD1] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            ← The Scene
          </button>
        </div>
      </div>
    </div>
  )
}
