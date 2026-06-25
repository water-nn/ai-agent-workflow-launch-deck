import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Slide } from '../types'

type HoverAgendaProps = {
  slides: Slide[]
  currentIndex: number
  isPinned: boolean
  onPinnedChange: (isPinned: boolean) => void
  onGoTo: (index: number) => void
}

type TooltipState = {
  text: string
  left: number
  top: number
} | null

const getTooltipPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return {
    left: Math.min(rect.right + 14, window.innerWidth - 360),
    top: Math.min(rect.top + rect.height / 2, window.innerHeight - 48),
  }
}

export function HoverAgenda({ slides, currentIndex, isPinned, onPinnedChange, onGoTo }: HoverAgendaProps) {
  const [isPointerOpen, setIsPointerOpen] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipState>(null)

  const showTooltip = (event: React.PointerEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>, text: string) => {
    const { left, top } = getTooltipPosition(event.currentTarget)
    setTooltip({ text, left, top })
  }

  const hideTooltip = () => setTooltip(null)

  return (
    <>
      <nav
        className={`hover-agenda ${isPinned ? 'hover-agenda-pinned' : ''} ${isPointerOpen ? 'hover-agenda-open' : ''}`}
        aria-label="幻灯片目录"
        onPointerEnter={() => setIsPointerOpen(true)}
        onPointerLeave={() => {
          setIsPointerOpen(false)
          hideTooltip()
        }}
      >
        <div className="agenda-rail">
          <span className="rail-label">Agenda</span>
          <button
            className="agenda-pin"
            type="button"
            aria-pressed={isPinned}
            aria-label={isPinned ? '取消固定目录' : '固定目录'}
            title={isPinned ? '取消固定目录' : '固定目录'}
            onClick={() => onPinnedChange(!isPinned)}
          >
            <span className="agenda-pin-icon" aria-hidden="true">
              {isPinned ? '●' : '⌖'}
            </span>
            <span className="agenda-pin-text">{isPinned ? 'ON' : 'PIN'}</span>
          </button>
        </div>
        <div className="agenda-panel">
          <div className="agenda-panel-head">
            <span>目录</span>
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          </div>
          <div className="agenda-items">
            {slides.map((slide, index) => {
              const label = slide.navTitle ?? slide.title
              return (
                <button
                  className={`agenda-item ${index === currentIndex ? 'agenda-item-active' : ''}`}
                  type="button"
                  key={slide.id}
                  title={label}
                  aria-label={`跳转到第 ${index + 1} 页：${label}`}
                  onPointerEnter={(event) => showTooltip(event, label)}
                  onPointerMove={(event) => showTooltip(event, label)}
                  onPointerLeave={hideTooltip}
                  onFocus={(event) => showTooltip(event, label)}
                  onBlur={hideTooltip}
                  onClick={() => onGoTo(index)}
                >
                  <span className="agenda-item-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="agenda-item-title">{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
      {tooltip
        ? createPortal(
            <div className="agenda-tooltip" role="tooltip" style={{ left: tooltip.left, top: tooltip.top }}>
              {tooltip.text}
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
