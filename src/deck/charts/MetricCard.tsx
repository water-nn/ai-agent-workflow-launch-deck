import { useEffect, useMemo, useState } from 'react'

type MetricCardProps = {
  label: string
  value: string
  detail: string
  tone?: 'gold' | 'cyan' | 'green' | 'slate' | 'warm' | 'risk'
}

const parseMetric = (value: string) => {
  const match = value.match(/^(-?)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  return {
    sign: match[1],
    number: Number(match[2]),
    suffix: match[3],
    decimals: match[2].includes('.') ? match[2].split('.')[1].length : 0,
  }
}

export function MetricCard({ label, value, detail, tone = 'gold' }: MetricCardProps) {
  const metric = useMemo(() => parseMetric(value), [value])
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (!metric) {
      setDisplayValue(value)
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplayValue(value)
      return
    }

    let frame = 0
    const duration = 880
    const start = performance.now()
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const current = metric.number * easeOut(progress)
      setDisplayValue(`${metric.sign}${current.toFixed(metric.decimals)}${metric.suffix}`)
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }

    setDisplayValue(`${metric.sign}${(0).toFixed(metric.decimals)}${metric.suffix}`)
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [metric, value])

  return (
    <article className={`metric-card metric-card-${tone}`}>
      <span className="metric-label">{label}</span>
      <strong>{displayValue}</strong>
      <p>{detail}</p>
    </article>
  )
}
