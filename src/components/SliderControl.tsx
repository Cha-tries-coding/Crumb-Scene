import { useId } from 'react'
import type { CSSProperties } from 'react'
import type { SliderConfig } from '../types/game'

export function SliderControl({ config, value, onChange }: {
  config: SliderConfig
  value: number
  onChange: (v: number) => void
}) {
  const id = useId()
  const pct = ((value - config.min) / (config.max - config.min)) * 100
  const displayValue = config.formatValue ? config.formatValue(value) : `${value}${config.unit}`

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-sm font-medium text-[#E8DFD1]">{config.label}</label>
        <span className="text-sm font-bold text-[#FFC2D1]" aria-live="polite" style={{ fontFamily: 'var(--font-mono)' }}>
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <input
          id={id}
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ '--pct': `${pct}%` } as CSSProperties}
          aria-valuemin={config.min}
          aria-valuemax={config.max}
          aria-valuenow={value}
          aria-valuetext={displayValue}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#D4C5B3] select-none" style={{ fontFamily: 'var(--font-mono)' }}>
        {config.rangeLabel.split(', ').map((label, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? 'text-right' : i === 0 ? 'text-left' : 'text-center'}>{label}</span>
        ))}
      </div>
    </div>
  )
}
