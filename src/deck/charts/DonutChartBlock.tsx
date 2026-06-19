import { useEffect, useState } from 'react'

type DonutDatum = {
  label: string
  value: number
  color?: string
}

type DonutChartBlockProps = {
  title: string
  data: DonutDatum[]
}

const circleLength = 100
const defaultPalette = [
  'var(--chart-color-1)',
  'var(--chart-color-2)',
  'var(--chart-color-3)',
  'var(--chart-color-4)',
  'var(--chart-color-5)',
  'var(--chart-color-6)',
]

export function DonutChartBlock({ title, data }: DonutChartBlockProps) {
  let offset = 0
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setEntered(true)
      return
    }

    setEntered(false)
    const timer = window.setTimeout(() => setEntered(true), 80)
    return () => window.clearTimeout(timer)
  }, [data])

  return (
    <article className={`chart-card donut-chart-card ${entered ? 'chart-entered' : ''}`}>
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="chart-note">覆盖度为演示假设值</span>
      </div>
      <div className="donut-layout">
        <svg className="donut-chart" viewBox="0 0 140 140" role="img" aria-label={title}>
          <circle cx="70" cy="70" r="42" className="donut-base" />
          {data.map((item, index) => {
            const dash = entered ? `${item.value} ${circleLength - item.value}` : `0 ${circleLength}`
            const color = item.color ?? defaultPalette[index % defaultPalette.length]
            const segment = (
              <circle
                key={item.label}
                cx="70"
                cy="70"
                r="42"
                className="donut-segment"
                stroke={color}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
              />
            )
            offset += item.value
            return segment
          })}
          <text x="70" y="64" textAnchor="middle" className="donut-center-value">
            8
          </text>
          <text x="70" y="86" textAnchor="middle" className="donut-center-label">
            能力域
          </text>
        </svg>
        <div className="donut-legend">
          {data.map((item, index) => (
            <div className="donut-legend-item" key={item.label}>
              <span style={{ background: item.color ?? defaultPalette[index % defaultPalette.length] }} />
              <strong>{item.label}</strong>
              <em>{item.value}%</em>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
