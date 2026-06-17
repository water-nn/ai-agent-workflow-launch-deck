import { useEffect, useState } from 'react'

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
  const max = Math.max(...points.map((point) => point.value), 100)
  const width = 720
  const height = 280
  const padX = 56
  const padY = 36
  const chartWidth = width - padX * 2
  const chartHeight = height - padY * 2
  const coordinates = points.map((point, index) => {
    const x = padX + (chartWidth / (points.length - 1)) * index
    const y = padY + chartHeight - (point.value / max) * chartHeight
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
          const y = padY + chartHeight - (tick / max) * chartHeight
          return (
            <g key={tick}>
              <line x1={padX} x2={width - padX} y1={y} y2={y} className="chart-grid-line" />
              <text x={18} y={y + 5} className="chart-axis-label">
                {tick}
                {suffix}
              </text>
            </g>
          )
        })}
        <path d={path} className="line-chart-path" pathLength="1" />
        {coordinates.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="8" className="line-chart-dot" />
            <text x={point.x} y={point.y - 16} textAnchor="middle" className="chart-value-label">
              {point.value}
              {suffix}
            </text>
            <text x={point.x} y={height - 8} textAnchor="middle" className="chart-axis-label">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </article>
  )
}
