import type { ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

type MediaImageProps = {
  title: string
  caption: string
  alt: string
  children: ReactNode
  fit?: 'contain' | 'cover'
}

type MediaVideoProps = {
  title: string
  caption: string
}

function useMediaModal(open: boolean, onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('media-modal-open')
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('media-modal-open')
    }
  }, [onClose, open])

  return closeRef
}

export function MediaImage({ title, caption, alt, children, fit = 'contain' }: MediaImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalTitleId = useId()
  const closeRef = useMediaModal(isOpen, () => setIsOpen(false))

  return (
    <article className="media-card">
      <button className={`media-frame media-frame-${fit}`} type="button" onClick={() => setIsOpen(true)} aria-label={`${title}，点击放大`}>
        <div className="media-preview-art" role="img" aria-label={alt}>
          {children}
        </div>
      </button>
      <div className="media-copy">
        <strong>{title}</strong>
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <div className="media-modal" role="dialog" aria-modal="true" aria-labelledby={modalTitleId} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}>
          <div className="media-modal-panel media-modal-panel-image">
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
              <button ref={closeRef} className="media-modal-close" type="button" aria-label="关闭放大图片" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
            <div className={`media-modal-media media-frame-${fit}`}>
              <div className="media-preview-art" role="img" aria-label={alt}>
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export function MediaVideo({ title, caption }: MediaVideoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(36)
  const [volume, setVolume] = useState(72)
  const modalTitleId = useId()
  const closeRef = useMediaModal(isOpen, () => {
    setIsOpen(false)
    setIsPlaying(false)
  })

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 98) {
          setIsPlaying(false)
          return 100
        }
        return current + 2
      })
    }, 360)
    return () => window.clearInterval(timer)
  }, [isPlaying])

  const controls = (scope: 'preview' | 'modal') => (
    <div className="media-controls" aria-label={`${title} 播放控制`}>
      <button type="button" onClick={() => setIsPlaying((current) => !current)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <label>
        <span>Progress</span>
        <input
          aria-label="视频进度"
          min="0"
          max="100"
          type="range"
          value={progress}
          onChange={(event) => setProgress(Number(event.target.value))}
        />
      </label>
      <label className="media-volume">
        <span>Volume</span>
        <input
          aria-label="视频音量"
          min="0"
          max="100"
          type="range"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
      {scope === 'preview' ? (
        <button type="button" onClick={() => setIsOpen(true)} aria-label={`${title}，放大视频`}>
          Enlarge
        </button>
      ) : null}
    </div>
  )

  const videoSurface = (
    <div className={`media-video-surface ${isPlaying ? 'media-video-playing' : ''}`} aria-label={`${title} 视频占位预览`}>
      <div className="media-video-orbit" />
      <div className="media-video-grid">
        <span />
        <span />
        <span />
      </div>
      <div className="media-video-badge">{isPlaying ? 'Playing workflow preview' : 'Paused deck preview'}</div>
    </div>
  )

  return (
    <article className="media-card">
      <div className="media-frame media-frame-contain">{videoSurface}</div>
      {controls('preview')}
      <div className="media-copy">
        <strong>{title}</strong>
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <div className="media-modal" role="dialog" aria-modal="true" aria-labelledby={modalTitleId} onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false)
            setIsPlaying(false)
          }
        }}>
          <div className="media-modal-panel media-modal-panel-video">
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
              <button
                ref={closeRef}
                className="media-modal-close"
                type="button"
                aria-label="关闭放大视频"
                onClick={() => {
                  setIsOpen(false)
                  setIsPlaying(false)
                }}
              >
                Close
              </button>
            </div>
            <div className="media-modal-media">{videoSurface}</div>
            {controls('modal')}
          </div>
        </div>
      ) : null}
    </article>
  )
}
