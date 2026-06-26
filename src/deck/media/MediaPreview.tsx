import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode, SyntheticEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type MediaImageProps = {
  title: string
  caption: string
  alt: string
  src: string
  fit?: 'contain' | 'cover'
}

type MediaVideoProps = {
  title: string
  caption: string
  src: string
  poster?: string
}

type IconName = 'play' | 'pause' | 'volume' | 'muted' | 'expand' | 'more' | 'download' | 'pip' | 'close'

type VideoControlsProps = {
  title: string
  src: string
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  speed: number
  canOpen?: boolean
  pipStatus?: string
  onTogglePlay: () => void
  onSeek: (value: number) => void
  onVolume: (value: number) => void
  onSpeed: (value: number) => void
  onOpen?: () => void
  onPiP: () => void
}

type PiPVideoElement = HTMLVideoElement & {
  requestPictureInPicture?: () => Promise<unknown>
}

const getModalRoot = () => document.getElementById('deck-modal-root') ?? document.querySelector('.deck-app') ?? document.body

function Icon({ name }: { name: IconName }) {
  const common = {
    className: 'video-control-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'play') {
    return (
      <svg {...common}>
        <path d="M8.5 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'pause') {
    return (
      <svg {...common}>
        <path d="M8 6.5v11" />
        <path d="M16 6.5v11" />
      </svg>
    )
  }

  if (name === 'volume' || name === 'muted') {
    return (
      <svg {...common}>
        <path d="M4.5 9.5v5h3.2l4.3 3.4V6.1L7.7 9.5H4.5Z" />
        {name === 'volume' ? (
          <>
            <path d="M15.3 9.2a4.2 4.2 0 0 1 0 5.6" />
            <path d="M17.8 6.7a7.8 7.8 0 0 1 0 10.6" />
          </>
        ) : (
          <>
            <path d="m16 9 4 4" />
            <path d="m20 9-4 4" />
          </>
        )}
      </svg>
    )
  }

  if (name === 'expand') {
    return (
      <svg {...common}>
        <path d="M8.5 4.5H4.5v4" />
        <path d="M15.5 4.5h4v4" />
        <path d="M19.5 15.5v4h-4" />
        <path d="M4.5 15.5v4h4" />
        <path d="M9 4.5 4.5 9" />
        <path d="m15 4.5 4.5 4.5" />
        <path d="m19.5 15-4.5 4.5" />
        <path d="m4.5 15 4.5 4.5" />
      </svg>
    )
  }

  if (name === 'more') {
    return (
      <svg {...common}>
        <circle cx="6" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="18" cy="12" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'download') {
    return (
      <svg {...common}>
        <path d="M12 4.5v9" />
        <path d="m8.2 10.4 3.8 3.8 3.8-3.8" />
        <path d="M5 18.5h14" />
      </svg>
    )
  }

  if (name === 'pip') {
    return (
      <svg {...common}>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <rect x="12.5" y="11" width="5" height="3.8" rx="0.8" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M6.5 6.5 17.5 17.5" />
      <path d="M17.5 6.5 6.5 17.5" />
    </svg>
  )
}

function IconButton({
  label,
  icon,
  onClick,
  expanded,
}: {
  label: string
  icon: IconName
  onClick?: () => void
  expanded?: boolean
}) {
  return (
    <button
      className="video-icon-button video-control-button"
      type="button"
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  )
}

function useMediaModal(open: boolean, onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('media-modal-open')
    closeRef.current?.focus()

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      event.stopPropagation()
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        event.preventDefault()
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      document.body.classList.remove('media-modal-open')
    }
  }, [onClose, open])

  return closeRef
}

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const clampVolume = (value: number) => Math.min(Math.max(value, 0), 1)

const speedLabels = new Map([
  [0.5, '0.5x 慢速'],
  [1, '1x 正常'],
  [1.5, '1.5x 快速'],
  [2, '2x 更快'],
  [3, '3x 极快'],
])

function VideoControls({
  title,
  src,
  isPlaying,
  currentTime,
  duration,
  volume,
  speed,
  canOpen,
  pipStatus,
  onTogglePlay,
  onSeek,
  onVolume,
  onSpeed,
  onOpen,
  onPiP,
}: VideoControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const safeDuration = duration > 0 ? duration : 0
  const progress = safeDuration ? Math.min((currentTime / safeDuration) * 100, 100) : 0
  const volumePercent = Math.round(volume * 100)
  const speeds = [0.5, 1, 1.5, 2, 3]
  const volumeLabel = volume === 0 ? '已静音' : `音量 ${volumePercent}%`

  return (
    <div className="video-control-bar" aria-label={`${title} 播放控制`}>
      <IconButton label={isPlaying ? '暂停' : '播放'} icon={isPlaying ? 'pause' : 'play'} onClick={onTogglePlay} />

      <div className="video-time-block" aria-label="播放时间">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(safeDuration)}</span>
      </div>

      <label className="video-progress-control">
        <span className="sr-only">视频进度</span>
        <input
          aria-label="视频进度"
          title="视频进度"
          min="0"
          max={safeDuration || 1}
          step="0.01"
          type="range"
          value={Math.min(currentTime, safeDuration || 1)}
          style={{ '--video-progress': `${progress}%` } as CSSProperties}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </label>

      <div className="video-volume-control">
        <IconButton label={volumeLabel} icon={volume === 0 ? 'muted' : 'volume'} />
        <div className="video-volume-popover" aria-label="音量调节">
          <input
            className="video-volume-slider"
            aria-label="视频音量"
            title="视频音量"
            min="0"
            max="1"
            step="0.01"
            type="range"
            value={volume}
            onChange={(event) => onVolume(clampVolume(Number(event.target.value)))}
          />
          <span>{volumePercent}%</span>
        </div>
      </div>

      {canOpen ? <IconButton label="放大视频" icon="expand" onClick={onOpen} /> : null}

      <div
        className="video-more-control"
        onPointerEnter={() => setIsMenuOpen(true)}
        onPointerLeave={() => setIsMenuOpen(false)}
        onFocusCapture={() => setIsMenuOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsMenuOpen(false)
        }}
      >
        <button
          className="video-icon-button video-control-button"
          type="button"
          aria-label="更多选项"
          title="更多选项"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Icon name="more" />
        </button>
        {isMenuOpen ? (
          <div className="video-more-menu" role="menu">
            <a className="video-menu-item" href={src} download role="menuitem" title="下载视频">
              <Icon name="download" />
              <span>下载视频</span>
            </a>
            <div className="video-menu-group" aria-label="播放速度">
              <span>播放速度：{speedLabels.get(speed) ?? `${speed}x`}</span>
              <div className="video-speed-list">
                {speeds.map((value) => (
                  <button
                    className={`video-menu-item video-speed-item ${speed === value ? 'video-speed-active' : ''}`}
                    type="button"
                    role="menuitemradio"
                    aria-label={`切换到${speedLabels.get(value)}`}
                    title={speedLabels.get(value)}
                    aria-checked={speed === value}
                    key={value}
                    onClick={() => {
                      onSpeed(value)
                      setIsMenuOpen(false)
                    }}
                  >
                    {speedLabels.get(value)}
                  </button>
                ))}
              </div>
            </div>
            <button className="video-menu-item" type="button" role="menuitem" title="画中画" onClick={onPiP}>
              <Icon name="pip" />
              <span>画中画</span>
            </button>
            {pipStatus ? <p className="video-menu-status">{pipStatus}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ModalShell({
  children,
  closeRef,
  labelledBy,
  onClose,
}: {
  children: ReactNode
  closeRef: React.RefObject<HTMLButtonElement | null>
  labelledBy: string
  onClose: () => void
}) {
  return createPortal(
    <div
      className="media-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} className="media-modal-close" type="button" aria-label="关闭" title="关闭" onClick={onClose}>
        <Icon name="close" />
      </button>
      {children}
    </div>,
    getModalRoot(),
  )
}

export function MediaImage({ title, caption, alt, src, fit = 'contain' }: MediaImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalTitleId = useId()
  const close = useCallback(() => setIsOpen(false), [])
  const closeRef = useMediaModal(isOpen, close)

  return (
    <article className="media-card media-image-card">
      <div className="media-card-head">
        <strong>{title}</strong>
      </div>
      <button className={`media-viewport media-frame-${fit}`} type="button" onClick={() => setIsOpen(true)} aria-label={`${title}，点击放大`} title="点击放大">
        <img className="media-image" src={src} alt={alt} loading="lazy" />
        <span className="media-open-badge">点击放大</span>
      </button>
      <div className="media-copy">
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <ModalShell closeRef={closeRef} labelledBy={modalTitleId} onClose={close}>
          <div className="media-modal-panel media-modal-panel-image" onMouseDown={(event) => event.stopPropagation()}>
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
            </div>
            <figure className={`media-modal-media media-frame-${fit}`}>
              <img className="media-modal-image" src={src} alt={alt} />
            </figure>
          </div>
        </ModalShell>
      ) : null}
    </article>
  )
}

export function MediaVideo({ title, caption, src, poster }: MediaVideoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.72)
  const [speed, setSpeed] = useState(1)
  const [pipStatus, setPipStatus] = useState('')
  const previewRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLVideoElement>(null)
  const currentTimeRef = useRef(0)
  const modalTitleId = useId()

  const pauseAll = useCallback(() => {
    previewRef.current?.pause()
    modalRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const close = useCallback(() => {
    pauseAll()
    setIsOpen(false)
  }, [pauseAll])

  const closeRef = useMediaModal(isOpen, close)
  const getActiveVideo = useCallback(() => (isOpen ? modalRef.current : previewRef.current), [isOpen])

  useEffect(() => pauseAll, [pauseAll])

  useEffect(() => {
    currentTimeRef.current = currentTime
  }, [currentTime])

  useEffect(() => {
    ;[previewRef.current, modalRef.current].forEach((video) => {
      if (!video) return
      video.volume = volume
      video.playbackRate = speed
    })
  }, [speed, volume, isOpen])

  useEffect(() => {
    const modalVideo = modalRef.current
    if (!isOpen || !modalVideo) return
    previewRef.current?.pause()
    modalVideo.currentTime = currentTimeRef.current
    modalVideo.volume = volume
    modalVideo.playbackRate = speed
    setIsPlaying(false)
  }, [isOpen, speed, volume])

  const syncFromVideo = (video: HTMLVideoElement) => {
    setCurrentTime(video.currentTime)
    setDuration(Number.isFinite(video.duration) ? video.duration : 0)
    setIsPlaying(!video.paused)
  }

  const togglePlay = async () => {
    const video = getActiveVideo()
    if (!video) return
    if (video.paused) {
      video.volume = volume
      video.playbackRate = speed
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const seek = (value: number) => {
    const video = getActiveVideo()
    setCurrentTime(value)
    if (video) video.currentTime = value
  }

  const changeVolume = (value: number) => {
    const safeVolume = clampVolume(value)
    setVolume(safeVolume)
    if (previewRef.current) previewRef.current.volume = safeVolume
    if (modalRef.current) modalRef.current.volume = safeVolume
  }

  const changeSpeed = (value: number) => {
    setSpeed(value)
    if (previewRef.current) previewRef.current.playbackRate = value
    if (modalRef.current) modalRef.current.playbackRate = value
  }

  const openModal = () => {
    previewRef.current?.pause()
    setIsPlaying(false)
    setIsOpen(true)
  }

  const requestPiP = async () => {
    const video = getActiveVideo() as PiPVideoElement | null
    if (!video || !video.requestPictureInPicture) {
      setPipStatus('当前浏览器不支持画中画。')
      return
    }
    try {
      await video.requestPictureInPicture()
      setPipStatus('已打开画中画。')
    } catch {
      setPipStatus('画中画被浏览器拦截。')
    }
  }

  const videoEvents = {
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onPause: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onEnded: () => setIsPlaying(false),
  }

  const handleViewportKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openModal()
    }
  }

  const controls = (canOpen: boolean) => (
    <div className="video-controls-overlay" onClick={(event) => event.stopPropagation()} onMouseDown={(event) => event.stopPropagation()}>
      <VideoControls
        title={title}
        src={src}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        speed={speed}
        pipStatus={pipStatus}
        canOpen={canOpen}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onVolume={changeVolume}
        onSpeed={changeSpeed}
        onOpen={openModal}
        onPiP={requestPiP}
      />
    </div>
  )

  return (
    <article className="media-card media-video-card">
      <div className="media-card-head">
        <strong>{title}</strong>
      </div>
      <div
        className="media-viewport media-frame-contain"
        role="button"
        tabIndex={0}
        aria-label={`${title}，点击放大预览`}
        title="点击放大预览"
        onClick={openModal}
        onKeyDown={handleViewportKeyDown}
      >
        <video ref={previewRef} className="media-video" src={src} poster={poster} preload="metadata" playsInline {...videoEvents} />
        {controls(true)}
        <span className="media-video-badge">{isPlaying && !isOpen ? '正在播放预览' : '预览已暂停'}</span>
      </div>
      <div className="media-copy">
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <ModalShell closeRef={closeRef} labelledBy={modalTitleId} onClose={close}>
          <div className="media-modal-panel media-modal-panel-video" onMouseDown={(event) => event.stopPropagation()}>
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
            </div>
            <div className="media-modal-media media-modal-video-shell">
              <video ref={modalRef} className="media-video media-video-modal" src={src} poster={poster} preload="metadata" playsInline {...videoEvents} />
              {controls(false)}
              <span className="media-video-badge">{isPlaying && isOpen ? '正在播放放大预览' : '放大预览已暂停'}</span>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </article>
  )
}
