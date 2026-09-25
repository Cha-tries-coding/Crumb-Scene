import { EvidenceTag } from '../components/EvidenceTag'
import { SliderControl } from '../components/SliderControl'
import type { CaseData, SliderValues } from '../types/game'

export function TestBenchScreen({ caseData, hypothesis, sliders, onSliderChange, onRun, onBack }: {
  caseData: CaseData; hypothesis: string; sliders: SliderValues
  onSliderChange: (key: keyof SliderValues, v: number) => void; onRun: () => void; onBack: () => void
}) {
  const suspect = caseData.suspects.find(s => s.id === hypothesis)!

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
          <h2 className="mt-3 text-2xl sm:text-3xl text-[#E8DFD1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            Test Bench
          </h2>
        </div>

        {/* Active hypothesis reminder */}
        <div className="bg-[#3D2A24] border-l-2 border-[#FF91A8] rounded-xl px-4 py-3 mb-8 flex flex-wrap items-center gap-3">
          <EvidenceTag color="gold">Testing</EvidenceTag>
          <span className="text-sm text-[#E8DFD1]" style={{ fontFamily: 'var(--font-mono)' }}>
            {suspect.label}, <span className="text-[#D4C5B3] italic">{suspect.claim}</span>
          </span>
        </div>

        <div>
          <div className="text-[10px] tracking-widest text-[#FFC2D1] mb-5 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            - Variable Controls -
          </div>
          <div className="space-y-7">
            {caseData.sliders.map(cfg => (
              <SliderControl
                key={cfg.key}
                config={cfg}
                value={sliders[cfg.key]}
                onChange={v => onSliderChange(cfg.key, v)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4 items-center">
          <button
            onClick={onRun}
            className="bg-[#FF91A8] text-[#2E1E17] rounded-full px-10 py-3 text-sm font-bold tracking-wide hover:bg-[#F2678A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#553B32]"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            Run the Bake →
          </button>
          <button onClick={onBack} className="text-[#D4C5B3] text-sm hover:text-[#E8DFD1] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            ← Hypothesis
          </button>
        </div>
      </div>
    </div>
  )
}
