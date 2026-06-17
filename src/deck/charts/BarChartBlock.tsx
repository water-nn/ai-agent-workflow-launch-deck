import { useEffect, useState } from 'react'

type BarDatum = {
  label: string
  traditional: number
  agent: number
  unit?: string
}

type BarChartBlockProps = {
  title: string
  data: BarDatum[]
}

export function BarChartBlock({ title, data }: BarChartBlockProps) {
  const max = Math.max(...data.flatMap((item) => [item.traditional, item.agent]))
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
    <article className={`chart-card ${entered ? 'chart-entered' : ''}`}>
      <div className="chart-head">
        <h3>{title}</h3>
        <div className="chart-legend">
          <span className="legend-dot legend-traditional" />传统流程
          <span className="legend-dot legend-agent" />Agent 工作流
        </div>
      </div>
      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-row" key={item.label}>
            <div className="bar-label">{item.label}</div>
            <div className="bar-track" aria-label={`${item.label} 传统 ${item.traditional} Agent ${item.agent}`}>
              <span
                className="bar bar-traditional"
                style={{ width: entered ? `${(item.traditional / max) * 100}%` : '0%' }}
              >
                {item.traditional}
                {item.unit}
              </span>
              <span className="bar bar-agent" style={{ width: entered ? `${(item.agent / max) * 100}%` : '0%' }}>
                {item.agent}
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
