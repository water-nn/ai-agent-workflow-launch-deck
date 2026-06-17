import { useEffect, useState } from 'react'

type ProgressProps = {
  currentIndex: number
  total: number
}

export function Progress({ currentIndex, total }: ProgressProps) {
  const targetProgress = ((currentIndex + 1) / total) * 100
  const [progress, setProgress] = useState(targetProgress)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setProgress(targetProgress)
      return
    }

    setProgress(0)
    const frame = window.requestAnimationFrame(() => setProgress(targetProgress))
    return () => window.cancelAnimationFrame(frame)
  }, [targetProgress])

  return (
    <div className="progress-shell" aria-label={`演示进度 ${currentIndex + 1}/${total}`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
