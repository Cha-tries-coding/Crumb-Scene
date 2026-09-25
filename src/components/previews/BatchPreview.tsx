import type { SliderValues } from '../../types/game'

export function MacaronPreview({ sliders }: { sliders: SliderValues }) {
  const mixNorm = (sliders.mixingTime - 30) / (300 - 30)
  const tempNorm = (sliders.temperature - 275) / (375 - 275)
  const restNorm = sliders.restingTime / 60
  const spread = 42 + mixNorm * 14
  const dome = Math.max(8, 24 - mixNorm * 16)
  const feetH = Math.max(0, 10 * tempNorm * (restNorm > 0.25 ? 1 : 0.3) * (1 - mixNorm * 0.9))
  const hasCracks = restNorm < 0.2 && mixNorm < 0.5

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="mg1" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#FFFBF2" />
          <stop offset="100%" stopColor="#DDD0C2" />
        </radialGradient>
        <filter id="ms"><feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" /></filter>
      </defs>

      <ellipse cx={100} cy={172} rx={spread + 6} ry={6} fill="#000" opacity={0.18} />

      <ellipse cx={100} cy={136} rx={spread} ry={dome * 0.55} fill="url(#mg1)" filter="url(#ms)" />
      {feetH > 1 && <ellipse cx={100} cy={136 + dome * 0.5} rx={spread + 6} ry={feetH} fill="#FF91A8" opacity={0.6} />}

      <rect x={100 - spread + 2} y={101} width={(spread - 2) * 2} height={6} fill="#553B32" rx={2} />

      <ellipse cx={100} cy={100} rx={spread} ry={dome * 0.55} fill="url(#mg1)" filter="url(#ms)" />
      <ellipse cx={100} cy={100 - dome * 0.25} rx={spread * 0.55} ry={dome * 0.18} fill="#fff" opacity={0.18} />

      {hasCracks && (
        <g stroke="#553B32" strokeWidth={1.2} fill="none" opacity={0.65}>
          <path d="M 85 88 l 4 5 l -2 4" />
          <path d="M 112 90 l -3 4 l 3 3" />
        </g>
      )}
    </svg>
  )
}

export function GanachePreview({ sliders }: { sliders: SliderValues }) {
  const tempNorm = (sliders.temperature - 90) / (220 - 90)
  const broken = tempNorm > 0.68
  const mixed = sliders.mixingTime > 55
  const liquidOk = sliders.hydration >= 80

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D2E1E" />
          <stop offset="100%" stopColor="#251A10" />
        </linearGradient>
      </defs>

      <path d="M 55 75 Q 45 155 100 168 Q 155 155 145 75 Z" fill="url(#bowl)" stroke="#553B32" strokeWidth={1.5} />

      {broken ? (
        <>
          <ellipse cx={100} cy={102} rx={36} ry={14} fill="#2A1600" />
          <ellipse cx={78} cy={98} rx={11} ry={5} fill="#8B4513" opacity={0.55} />
          <ellipse cx={124} cy={100} rx={8} ry={4} fill="#8B4513" opacity={0.45} />
          <ellipse cx={103} cy={106} rx={5} ry={3} fill="#8B4513" opacity={0.35} />
        </>
      ) : (
        <>
          <ellipse cx={100} cy={100} rx={38} ry={16} fill="#1E0F00" />
          {mixed && liquidOk && (
            <ellipse cx={88} cy={94} rx={22} ry={5} fill="#E8DFD1" opacity={0.08} />
          )}
        </>
      )}
    </svg>
  )
}

export function ChouxPreview({ sliders }: { sliders: SliderValues }) {
  const panadeNorm = (sliders.mixingTime - 30) / (300 - 30)
  const hollowR = panadeNorm > 0.53 ? 20 : 5
  const bakeNorm = (sliders.restingTime - 20) / (45 - 20)
  const crustL = bakeNorm > 0.48 ? '#C4862A' : '#E8C080'
  const crustD = bakeNorm > 0.48 ? '#A06020' : '#C8A060'

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="cp" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={crustL} />
          <stop offset="100%" stopColor={crustD} />
        </radialGradient>
      </defs>

      <ellipse cx={100} cy={105} rx={58} ry={38} fill="url(#cp)" />
      <ellipse cx={100} cy={105} rx={50} ry={30} fill="#D4A870" opacity={0.5} />
      {hollowR > 8 ? (
        <ellipse cx={100} cy={105} rx={hollowR} ry={hollowR * 0.65} fill="#2E1E17" opacity={0.85} />
      ) : (
        <ellipse cx={100} cy={105} rx={42} ry={25} fill="#C49050" opacity={0.4} />
      )}
      <ellipse cx={86} cy={93} rx={18} ry={6} fill="#fff" opacity={0.08} />
    </svg>
  )
}
