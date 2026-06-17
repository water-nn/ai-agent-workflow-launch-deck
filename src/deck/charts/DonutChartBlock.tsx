type DonutDatum = {
  label: string
  value: number
  color: string
}

type DonutChartBlockProps = {
  title: string
  data: DonutDatum[]
}

const circleLength = 100

export function DonutChartBlock({ title, data }: DonutChartBlockProps) {
  let offset = 0

  return (
    <article className="chart-card donut-chart-card">
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="chart-note">覆盖度为演示假设值</span>
      </div>
      <div className="donut-layout">
        <svg className="donut-chart" viewBox="0 0 140 140" role="img" aria-label={title}>
          <circle cx="70" cy="70" r="42" className="donut-base" />
          {data.map((item) => {
            const dash = `${item.value} ${circleLength - item.value}`
            const segment = (
              <circle
                key={item.label}
                cx="70"
                cy="70"
                r="42"
                className="donut-segment"
                stroke={item.color}
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
          {data.map((item) => (
            <div className="donut-legend-item" key={item.label}>
              <span style={{ background: item.color }} />
              <strong>{item.label}</strong>
              <em>{item.value}%</em>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
