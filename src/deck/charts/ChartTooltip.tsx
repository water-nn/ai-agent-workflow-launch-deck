import type { MouseEvent } from 'react'

export type ChartTooltipState = {
  label: string
  value: string
  series?: string
  color?: string
  x: number
  y: number
} | null

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const tooltipWidth = 176
const tooltipHeight = 92

export function buildChartTooltip(
  event: MouseEvent<Element>,
  payload: Omit<NonNullable<ChartTooltipState>, 'x' | 'y'>,
): NonNullable<ChartTooltipState> {
  const card = event.currentTarget.closest('.chart-card') as HTMLElement | null
  const rect = card?.getBoundingClientRect()
  const x = rect ? clamp(event.clientX - rect.left + 16, 14, Math.max(14, rect.width - tooltipWidth - 14)) : 18
  const y = rect ? clamp(event.clientY - rect.top - tooltipHeight - 12, 14, Math.max(14, rect.height - tooltipHeight - 14)) : 18
  return { ...payload, x, y }
}

export function ChartTooltip({ tooltip }: { tooltip: ChartTooltipState }) {
  if (!tooltip) return null

  return (
    <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }} role="tooltip">
      <span className="chart-tooltip-label">
        {tooltip.color ? <i style={{ background: tooltip.color }} /> : null}
        {tooltip.label}
      </span>
      {tooltip.series ? <em>{tooltip.series}</em> : null}
      <strong>{tooltip.value}</strong>
    </div>
  )
}
