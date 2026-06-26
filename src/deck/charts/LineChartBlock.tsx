import { useEffect, useState } from 'react'
import { buildChartTooltip, ChartTooltip, type ChartTooltipState } from './ChartTooltip'

type Point = {
  label: string
  value: number
}

type LineChartBlockProps = {
  title: string
  points: Point[]
  suffix?: string
}

export function LineChartBlock({ title, points, suffix = '%' }: LineChartBlockProps) {
  const [entered, setEntered] = useState(false)
  const [tooltip, setTooltip] = useState<ChartTooltipState>(null)
  const max = Math.max(...points.map((point) => point.value), 100)
  const width = 720
  const height = 280
  const padding = {
    top: 44,
    right: 52,
    bottom: 58,
    left: 84,
  }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const coordinates = points.map((point, index) => {
    const step = points.length > 1 ? chartWidth / (points.length - 1) : 0
    const x = padding.left + step * index
    const y = padding.top + chartHeight - (point.value / max) * chartHeight
    return { ...point, x, y }
  })
  const path = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setEntered(true)
      return
    }

    setEntered(false)
    const timer = window.setTimeout(() => setEntered(true), 80)
    return () => window.clearTimeout(timer)
  }, [points])

  return (
    <article className={`chart-card line-chart-card ${entered ? 'chart-entered' : ''}`}>
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="chart-note">示例数据，用于表达趋势</span>
      </div>
      <svg className="line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = padding.top + chartHeight - (tick / max) * chartHeight
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} className="chart-grid-line" />
              <text x={padding.left - 32} y={y + 5} textAnchor="end" className="chart-axis-label">
                {tick}
                {suffix}
              </text>
            </g>
          )
        })}
        <path d={path} className="line-chart-path" pathLength="1" />
        {coordinates.map((point) => (
          <g
            key={point.label}
            className="line-chart-point"
            onMouseEnter={(event) =>
              setTooltip(
                buildChartTooltip(event, {
                  label: point.label,
                  series: '趋势值',
                  value: `${point.value}${suffix}`,
                  color: 'var(--chart-color-2)',
                }),
              )
            }
            onMouseMove={(event) =>
              setTooltip(
                buildChartTooltip(event, {
                  label: point.label,
                  series: '趋势值',
                  value: `${point.value}${suffix}`,
                  color: 'var(--chart-color-2)',
                }),
              )
            }
            onMouseLeave={() => setTooltip(null)}
          >
            <circle cx={point.x} cy={point.y} r="8" className="line-chart-dot" />
            <text x={point.x} y={Math.max(padding.top + 18, point.y - 16)} textAnchor="middle" className="chart-value-label">
              {point.value}
              {suffix}
            </text>
            <text x={point.x} y={height - 16} textAnchor="middle" className="chart-axis-label">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <ChartTooltip tooltip={tooltip} />
    </article>
  )
}
