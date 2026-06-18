import { useState } from 'react'
import type { Slide } from '../types'

type HoverAgendaProps = {
  slides: Slide[]
  currentIndex: number
  isPinned: boolean
  onPinnedChange: (isPinned: boolean) => void
  onGoTo: (index: number) => void
}

export function HoverAgenda({ slides, currentIndex, isPinned, onPinnedChange, onGoTo }: HoverAgendaProps) {
  const [isPointerOpen, setIsPointerOpen] = useState(false)

  return (
    <nav
      className={`hover-agenda ${isPinned ? 'hover-agenda-pinned' : ''} ${isPointerOpen ? 'hover-agenda-open' : ''}`}
      aria-label="幻灯片目录"
      onPointerEnter={() => setIsPointerOpen(true)}
      onPointerLeave={() => setIsPointerOpen(false)}
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
          {slides.map((slide, index) => (
            <button
              className={`agenda-item ${index === currentIndex ? 'agenda-item-active' : ''}`}
              type="button"
              key={slide.id}
              onClick={() => onGoTo(index)}
            >
              <span className="agenda-item-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="agenda-item-title">{slide.navTitle ?? slide.title}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
