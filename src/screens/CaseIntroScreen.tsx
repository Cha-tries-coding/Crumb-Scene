import { EvidenceTag } from '../components/EvidenceTag'
import type { CaseData } from '../types/game'

export function CaseIntroScreen({ caseData, onStart, onBack }: { caseData: CaseData; onStart: () => void; onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero image */}
      <div className="relative h-64 sm:h-96 bg-[#553B32] overflow-hidden rounded-b-3xl">
        <img src={caseData.imageUrl} alt={caseData.imageAlt} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#553B32] via-[#553B32]/40 to-transparent" />
        <div className="absolute bottom-6 left-6 sm:left-10">
          <EvidenceTag color="caramel">{caseData.number}</EvidenceTag>
          <h2 className="mt-3 text-3xl sm:text-5xl text-[#E8DFD1] leading-none" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            {caseData.title}
          </h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 flex-1 flex flex-col gap-8">
        {/* Customer statement as a "note" */}
        <div className="relative bg-[#FFFBF2] text-[#553B32] p-6 sm:p-8 border-l-4 border-[#FF91A8] rounded-2xl shadow-lg shadow-[#000]/20">
          <div className="text-xs sm:text-sm tracking-widest text-[#B5185A] mb-3 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            - Customer Statement -
          </div>
          <blockquote className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-mono)', fontStyle: 'italic', color: '#553B32', maxWidth: '60ch' }}>
            {caseData.customerStatement}
          </blockquote>
          {/* Corner fold */}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF91A8]/20 border-t border-l border-[#FF91A8]/30 rounded-tl-lg" aria-hidden="true" />
        </div>

        {/* Case briefing */}
        <div className="space-y-3 text-[#D4C5B3] text-sm sm:text-base leading-relaxed max-w-[65ch]">
          <p>Your job is to diagnose the failure, not just name it. You'll form a hypothesis, control four variables on the test bench, and run the bake. Every run produces an observable clue, even wrong hypotheses teach something.</p>
          <p>The debrief will help you separate what your evidence actually proves from what it only suggests.</p>
        </div>

        <div className="flex gap-4 items-center pt-2">
          <button
            onClick={onStart}
            className="bg-[#FF91A8] text-[#2E1E17] rounded-full px-8 py-3 text-sm font-semibold tracking-wide hover:bg-[#F2678A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#553B32]"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            Open the Case →
          </button>
        </div>

        <button
          onClick={onBack}
          className="self-start mt-auto text-[#D4C5B3] text-sm hover:text-[#E8DFD1] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}>
          ← Go back to the cases
        </button>
      </div>
    </div>
  )
}
