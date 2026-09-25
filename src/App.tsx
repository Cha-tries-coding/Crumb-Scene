import { useState } from 'react'
import { CaseLogPanel } from './components/CaseLogPanel'
import { ProgressRail } from './components/ProgressRail'
import { CASES } from './data/cases'
import { CaseIntroScreen } from './screens/CaseIntroScreen'
import { DebriefScreen } from './screens/DebriefScreen'
import { HomeScreen } from './screens/HomeScreen'
import { HypothesisScreen } from './screens/HypothesisScreen'
import { ResultScreen } from './screens/ResultScreen'
import { TestBenchScreen } from './screens/TestBenchScreen'
import type { RunRecord, RunResult, Screen, SliderValues } from './types/game'
import { getDefaultSliders } from './utils/game'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [caseIndex, setCaseIndex] = useState(0)
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null)
  const [sliders, setSliders] = useState<SliderValues>(getDefaultSliders(CASES[0]))
  const [currentResult, setCurrentResult] = useState<RunResult | null>(null)
  const [runs, setRuns] = useState<RunRecord[]>([])
  const [solvedCases, setSolvedCases] = useState<string[]>([])
  const [showLog, setShowLog] = useState(false)
  const [runCount, setRunCount] = useState(0)

  const caseData = CASES[caseIndex]

  const startCase = (i: number) => {
    setCaseIndex(i)
    setSliders(getDefaultSliders(CASES[i]))
    setSelectedHypothesis(null)
    setCurrentResult(null)
    setRuns([])
    setRunCount(0)
    setScreen('intro')
  }

  const runBake = () => {
    if (!selectedHypothesis) return
    const result = caseData.computeResult(selectedHypothesis, sliders)
    const newRunCount = runCount + 1
    setRunCount(newRunCount)
    const record: RunRecord = {
      id: `${Date.now()}`,
      hypothesisId: selectedHypothesis,
      sliders: { ...sliders },
      result,
      runNumber: newRunCount,
    }
    setRuns(prev => [...prev, record])
    setCurrentResult(result)
    if (result.verdict === 'confirmed' && !solvedCases.includes(caseData.id)) {
      setSolvedCases(prev => [...prev, caseData.id])
    }
    setScreen('result')
  }

  const testAgain = () => {
    setSelectedHypothesis(null)
    setScreen('hypothesis')
  }

  return (
    <div className="min-h-screen bg-[#553B32] text-[#E8DFD1]">
      <ProgressRail screen={screen} />

      {screen === 'home' && (
        <HomeScreen onSelectCase={startCase} solvedCases={solvedCases} />
      )}

      {screen === 'intro' && (
        <CaseIntroScreen
          caseData={caseData}
          onStart={() => setScreen('hypothesis')}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'hypothesis' && (
        <HypothesisScreen
          caseData={caseData}
          selected={selectedHypothesis}
          onSelect={setSelectedHypothesis}
          onNext={() => setScreen('bench')}
          onBack={() => setScreen('intro')}
        />
      )}

      {screen === 'bench' && (
        <TestBenchScreen
          caseData={caseData}
          hypothesis={selectedHypothesis!}
          sliders={sliders}
          onSliderChange={(key, v) => setSliders(prev => ({ ...prev, [key]: v }))}
          onRun={runBake}
          onBack={() => setScreen('hypothesis')}
        />
      )}

      {screen === 'result' && currentResult && (
        <ResultScreen
          caseData={caseData}
          caseIndex={caseIndex}
          hypothesis={selectedHypothesis!}
          result={currentResult}
          runCount={runCount}
          onContinue={() => setScreen('debrief')}
          onTestAgain={testAgain}
        />
      )}

      {screen === 'debrief' && currentResult && (
        <DebriefScreen
          caseData={caseData}
          result={currentResult}
          runs={runs}
          onTestAgain={testAgain}
          onCaseBoard={() => setScreen('home')}
          onShowLog={() => setShowLog(true)}
        />
      )}

      {showLog && (
        <CaseLogPanel
          caseData={caseData}
          runs={runs}
          onClose={() => setShowLog(false)}
        />
      )}

      <footer className="px-4 py-6 text-center text-xs text-[#D4C5B3]" style={{ fontFamily: 'var(--font-mono)' }}>
        Charlotte Capel, Learning Designer, 2026
      </footer>
    </div>
  )
}
