type ProgressProps = {
  currentIndex: number
  total: number
}

export function Progress({ currentIndex, total }: ProgressProps) {
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="progress-shell" aria-label={`演示进度 ${currentIndex + 1}/${total}`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
