type DataTableBlockProps = {
  title: string
  columns: string[]
  rows: string[][]
}

export function DataTableBlock({ title, columns, rows }: DataTableBlockProps) {
  return (
    <article className="chart-card table-card">
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="chart-note">控制点用于降低自动化误差</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
