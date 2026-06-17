type TopControlsProps = {
  currentIndex: number
  total: number
  canGoPrevious: boolean
  canGoNext: boolean
  isFullscreen: boolean
  onPrevious: () => void
  onNext: () => void
  onToggleFullscreen: () => void
}

export function TopControls({
  currentIndex,
  total,
  canGoPrevious,
  canGoNext,
  isFullscreen,
  onPrevious,
  onNext,
  onToggleFullscreen,
}: TopControlsProps) {
  return (
    <header className="top-controls" aria-label="演示控制">
      <div className="deck-brand">
        <span className="brand-mark" />
        <span>AI Agent Workflow Launch</span>
      </div>
      <div className="control-group">
        <button className="control-button" type="button" onClick={onPrevious} disabled={!canGoPrevious}>
          上一页
        </button>
        <span className="slide-counter">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button className="control-button" type="button" onClick={onNext} disabled={!canGoNext}>
          下一页
        </button>
        <button className="control-button control-button-accent" type="button" onClick={onToggleFullscreen}>
          {isFullscreen ? '退出全屏' : '全屏'}
        </button>
      </div>
    </header>
  )
}
