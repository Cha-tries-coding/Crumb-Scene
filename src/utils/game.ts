import type { CaseData, SliderValues } from '../types/game'

export function getDefaultSliders(caseData: CaseData): SliderValues {
  const result: SliderValues = { temperature: 325, hydration: 40, mixingTime: 150, restingTime: 30 }
  caseData.sliders.forEach(s => { result[s.key] = s.default })
  return result
}
