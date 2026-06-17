type HorizontalBarDatum = {
  label: string
  value: number
}

type HorizontalBarBlockProps = {
  title: string
  data: HorizontalBarDatum[]
}

export function HorizontalBarBlock({ title, data }: HorizontalBarBlockProps) {
  return (
    <article className="chart-card">
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="chart-note">数值代表典型任务覆盖潜力</span>
      </div>
      <div className="horizontal-bars">
        {data.map((item) => (
          <div className="horizontal-bar-row" key={item.label}>
            <span>{item.label}</span>
            <div className="horizontal-bar-track">
              <strong style={{ width: `${item.value}%` }}>{item.value}%</strong>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
