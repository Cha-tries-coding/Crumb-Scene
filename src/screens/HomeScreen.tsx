import { EvidenceTag } from '../components/EvidenceTag'
import { CASES } from '../data/cases'

export function HomeScreen({ onSelectCase, solvedCases }: { onSelectCase: (i: number) => void; solvedCases: string[] }) {
  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto">

        <header className="mb-12 sm:mb-16 text-center">
          <div className="text-base sm:text-lg tracking-[0.3em] text-[#FFC2D1] mb-3 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Pastry Investigation Division, Field Unit
          </div>
          <h1 className="text-4xl sm:text-6xl text-[#E8DFD1] leading-none mb-4" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Crumb Scene
          </h1>
          <p className="text-[#D4C5B3] text-sm sm:text-base max-w-xl mx-auto">
            <span className="sm:whitespace-nowrap">You are a crumb scene investigator. Three failed bakes. Three open cases.</span><br />
            Find the culprit before the oven cools.
          </p>
        </header>

        {/* How it works */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm sm:text-base tracking-widest text-[#FFC2D1] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Investigator's Briefing</span>
          <div className="flex-1 h-px bg-[#E8DFD1]/15" />
        </div>
        <aside className="border border-[#E8DFD1]/15 bg-[#3D2A24]/50 rounded-2xl p-6 sm:p-8 mb-16">
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              ['01', 'The Scene', 'Review the failed bake and the customer statement.'],
              ['02', 'The Hypothesis', 'Select one of four plausible suspects.'],
              ['03', 'The Test Bench', 'Set four variables and run the bake.'],
              ['04', 'The Result', 'Observe the clue your run produces.'],
              ['05', 'The Debrief', 'Separate the evidence from the conclusion.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="flex flex-col gap-1">
                <div className="text-[#FFC2D1] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{n}</div>
                <div className="text-sm font-semibold text-[#E8DFD1]">{title}</div>
                <div className="text-xs text-[#D4C5B3] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Case board */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm sm:text-base tracking-widest text-[#FFC2D1] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Active Case Files</span>
          <div className="flex-1 h-px bg-[#E8DFD1]/15" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {CASES.map((c, i) => {
            const solved = solvedCases.includes(c.id)
            const rotations = ['-rotate-[0.8deg]', 'rotate-0', 'rotate-[0.6deg]']
            return (
              <article
                key={c.id}
                className={`relative bg-[#3D2A24] border border-[#E8DFD1]/15 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-200 hover:border-[#FF91A8]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF91A8]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF91A8] ${rotations[i]}`}
                tabIndex={0}
                role="button"
                aria-label={`Open ${c.number}: ${c.title}${solved ? ', Solved' : ', Unsolved'}`}
                onClick={() => onSelectCase(i)}
                onKeyDown={e => e.key === 'Enter' || e.key === ' ' ? onSelectCase(i) : undefined}
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#553B32] overflow-hidden relative">
                  <img src={c.imageUrl} alt={c.imageAlt} className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#553B32]/80 via-transparent to-transparent" />
                  {/* Photo corner decoration */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FF91A8]/40 rounded-tl-md" aria-hidden="true" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FF91A8]/40 rounded-tr-md" aria-hidden="true" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FF91A8]/40 rounded-bl-md" aria-hidden="true" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FF91A8]/40 rounded-br-md" aria-hidden="true" />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <EvidenceTag color="caramel">{c.number}</EvidenceTag>
                    <EvidenceTag color={solved ? 'green' : 'red'}>{solved ? 'Solved' : 'Unsolved'}</EvidenceTag>
                  </div>
                  <h2 className="text-lg text-[#E8DFD1] mb-2 leading-tight" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                    {c.title}
                  </h2>
                  <p className="text-xs text-[#D4C5B3] italic leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                    {c.customerStatement}
                  </p>
                </div>

                <div className="px-4 pb-4">
                  <div className="text-xs text-[#FFC2D1] group-hover:gap-2 flex items-center gap-1 transition-all" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span>{solved ? 'Review case' : 'Open file'}</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
