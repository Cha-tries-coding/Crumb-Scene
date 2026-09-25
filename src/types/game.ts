export type Screen = 'home' | 'intro' | 'hypothesis' | 'bench' | 'result' | 'debrief'
export type Verdict = 'confirmed' | 'ruled_out' | 'inconclusive'

export interface SliderValues {
  temperature: number
  hydration: number
  mixingTime: number
  restingTime: number
}

export interface SliderConfig {
  key: keyof SliderValues
  label: string
  unit: string
  min: number
  max: number
  step: number
  default: number
  rangeLabel: string
  formatValue?: (v: number) => string
}

export interface Suspect {
  id: string
  label: string
  claim: string
  isCulprit: boolean
}

export interface RunResult {
  verdict: Verdict
  clue: string
  observation: string
  proves: string
  doesNotProve: string
  nextTest: string
}

export interface RunRecord {
  id: string
  hypothesisId: string
  sliders: SliderValues
  result: RunResult
  runNumber: number
}

export interface CaseData {
  id: string
  number: string
  title: string
  customerStatement: string
  imageUrl: string
  imageAlt: string
  suspects: Suspect[]
  sliders: SliderConfig[]
  computeResult: (hypothesisId: string, sliders: SliderValues) => RunResult
  recoveryMove?: string
}
