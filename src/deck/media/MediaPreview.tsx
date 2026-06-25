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

  return (
    <div className="video-control-bar" aria-label={`${title} 播放控制`}>
      <button className="video-icon-button" type="button" onClick={onTogglePlay} aria-label={isPlaying ? '暂停视频' : '播放视频'}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div className="video-time-block" aria-label="播放时间">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(safeDuration)}</span>
      </div>

      <label className="video-progress-control">
        <span className="sr-only">视频进度</span>
        <input
          aria-label="视频进度"
          min="0"
          max={safeDuration || 1}
          step="0.01"
          type="range"
          value={Math.min(currentTime, safeDuration || 1)}
          style={{ '--video-progress': `${progress}%` } as React.CSSProperties}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </label>

      <div className="video-volume-control">
        <button className="video-icon-button" type="button" aria-label={`音量 ${volumePercent}%`}>
          Vol
        </button>
        <div className="video-volume-popover" aria-label="音量滑杆">
          <input
            aria-label="视频音量"
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

      {canOpen ? (
        <button className="video-icon-button" type="button" onClick={onOpen} aria-label={`${title}，放大视频`}>
          Max
        </button>
      ) : null}

      <div className="video-more-control">
        <button
          className="video-icon-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          More
        </button>
        {isMenuOpen ? (
          <div className="video-more-menu" role="menu">
            <a className="video-menu-item" href={src} download role="menuitem">
              Download video
            </a>
            <div className="video-menu-group" aria-label="播放速度">
              <span>Speed</span>
              <div className="video-speed-list">
                {speeds.map((value) => (
                  <button
                    className={`video-menu-item video-speed-item ${speed === value ? 'video-speed-active' : ''}`}
                    type="button"
                    role="menuitemradio"
                    aria-checked={speed === value}
                    key={value}
                    onClick={() => {
                      onSpeed(value)
                      setIsMenuOpen(false)
                    }}
                  >
                    {value}x
                  </button>
                ))}
              </div>
            </div>
            <button className="video-menu-item" type="button" role="menuitem" onClick={onPiP}>
              Picture in Picture
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
      <button ref={closeRef} className="media-modal-close" type="button" aria-label="关闭媒体预览" onClick={onClose}>
        Close
      </button>
      {children}
    </div>,
    document.body,
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
      <button className={`media-viewport media-frame-${fit}`} type="button" onClick={() => setIsOpen(true)} aria-label={`${title}，点击放大`}>
        <img className="media-image" src={src} alt={alt} loading="lazy" />
        <span className="media-open-badge">Click to inspect</span>
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
      setPipStatus('This browser does not support PiP here.')
      return
    }
    try {
      await video.requestPictureInPicture()
      setPipStatus('PiP opened.')
    } catch {
      setPipStatus('PiP was blocked by the browser.')
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
      togglePlay()
    }
  }

  const controls = (canOpen: boolean) => (
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
  )

  return (
    <article className="media-card media-video-card">
      <div className="media-card-head">
        <strong>{title}</strong>
      </div>
      <div className="media-viewport media-frame-contain" role="button" tabIndex={0} aria-label={`${title}，按回车播放或暂停`} onKeyDown={handleViewportKeyDown}>
        <video ref={previewRef} className="media-video" src={src} poster={poster} preload="metadata" playsInline {...videoEvents} />
        <span className="media-video-badge">{isPlaying && !isOpen ? 'Playing workflow preview' : 'Paused deck preview'}</span>
      </div>
      {controls(true)}
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
              <span className="media-video-badge">{isPlaying && isOpen ? 'Playing enlarged preview' : 'Paused enlarged preview'}</span>
            </div>
            {controls(false)}
          </div>
        </ModalShell>
      ) : null}
    </article>
  )
}


