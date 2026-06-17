type MetricCardProps = {
  label: string
  value: string
  detail: string
  tone?: 'gold' | 'cyan' | 'green' | 'slate'
}

export function MetricCard({ label, value, detail, tone = 'gold' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card-${tone}`}>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}
