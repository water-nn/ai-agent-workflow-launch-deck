import { useEffect, useState } from 'react'
import { buildChartTooltip, ChartTooltip, type ChartTooltipState } from './ChartTooltip'

type HorizontalBarDatum = {
  label: string
  value: number
}

type HorizontalBarBlockProps = {
  title: string
  data: HorizontalBarDatum[]
}

export function HorizontalBarBlock({ title, data }: HorizontalBarBlockProps) {
  const [entered, setEntered] = useState(false)
  const [tooltip, setTooltip] = useState<ChartTooltipState>(null)

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
        <span className="chart-note">数值代表典型任务覆盖潜力</span>
      </div>
      <div className="horizontal-bars">
        {data.map((item) => (
          <div className="horizontal-bar-row" key={item.label}>
            <span>{item.label}</span>
            <div className="horizontal-bar-track">
              <strong
                style={{ width: entered ? `${item.value}%` : '0%' }}
                onMouseEnter={(event) =>
                  setTooltip(
                    buildChartTooltip(event, {
                      label: item.label,
                      series: '覆盖潜力',
                      value: `${item.value}%`,
                      color: 'var(--chart-color-1)',
                    }),
                  )
                }
                onMouseMove={(event) =>
                  setTooltip(
                    buildChartTooltip(event, {
                      label: item.label,
                      series: '覆盖潜力',
                      value: `${item.value}%`,
                      color: 'var(--chart-color-1)',
                    }),
                  )
                }
                onMouseLeave={() => setTooltip(null)}
              >
                {item.value}%
              </strong>
            </div>
          </div>
        ))}
      </div>
      <ChartTooltip tooltip={tooltip} />
    </article>
  )
}
