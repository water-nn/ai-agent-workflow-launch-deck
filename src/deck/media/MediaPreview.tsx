import type { SyntheticEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

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
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  canOpen?: boolean
  onTogglePlay: () => void
  onSeek: (value: number) => void
  onVolume: (value: number) => void
  onOpen?: () => void
}

function useMediaModal(open: boolean, onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('media-modal-open')
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation()
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

function VideoControls({
  title,
  isPlaying,
  currentTime,
  duration,
  volume,
  canOpen,
  onTogglePlay,
  onSeek,
  onVolume,
  onOpen,
}: VideoControlsProps) {
  const safeDuration = duration > 0 ? duration : 0

  return (
    <div className="media-controls" aria-label={`${title} 播放控制`}>
      <button type="button" onClick={onTogglePlay} aria-label={isPlaying ? '暂停视频' : '播放视频'}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <label>
        <span>
          Progress <em>{formatTime(currentTime)} / {formatTime(safeDuration)}</em>
        </span>
        <input
          aria-label="视频进度"
          min="0"
          max={safeDuration || 1}
          step="0.01"
          type="range"
          value={Math.min(currentTime, safeDuration || 1)}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </label>
      <label className="media-volume">
        <span>Volume <em>{Math.round(volume * 100)}%</em></span>
        <input
          aria-label="视频音量"
          min="0"
          max="1"
          step="0.01"
          type="range"
          value={volume}
          onChange={(event) => onVolume(Number(event.target.value))}
        />
      </label>
      {canOpen ? (
        <button type="button" onClick={onOpen} aria-label={`${title}，放大视频`}>
          Enlarge
        </button>
      ) : null}
    </div>
  )
}

export function MediaImage({ title, caption, alt, src, fit = 'contain' }: MediaImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalTitleId = useId()
  const close = useCallback(() => setIsOpen(false), [])
  const closeRef = useMediaModal(isOpen, close)

  return (
    <article className="media-card media-image-card">
      <button className={`media-frame media-frame-${fit}`} type="button" onClick={() => setIsOpen(true)} aria-label={`${title}，点击放大`}>
        <img className="media-image" src={src} alt={alt} loading="lazy" />
        <span className="media-open-badge">Click to inspect</span>
      </button>
      <div className="media-copy">
        <strong>{title}</strong>
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <div
          className="media-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="media-modal-panel media-modal-panel-image" onMouseDown={(event) => event.stopPropagation()}>
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
              <button ref={closeRef} className="media-modal-close" type="button" aria-label="关闭放大图片" onClick={close}>
                Close
              </button>
            </div>
            <figure className={`media-modal-media media-frame-${fit}`}>
              <img className="media-modal-image" src={src} alt={alt} />
            </figure>
          </div>
        </div>
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
  const getActiveVideo = () => (isOpen ? modalRef.current : previewRef.current)

  useEffect(() => pauseAll, [pauseAll])

  useEffect(() => {
    currentTimeRef.current = currentTime
  }, [currentTime])

  useEffect(() => {
    const video = getActiveVideo()
    if (!video) return
    video.volume = volume
  }, [isOpen, volume])

  useEffect(() => {
    const modalVideo = modalRef.current
    if (!isOpen || !modalVideo) return
    previewRef.current?.pause()
    modalVideo.currentTime = currentTimeRef.current
    modalVideo.volume = volume
    setIsPlaying(false)
  }, [isOpen, volume])

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
    if (video) {
      video.currentTime = value
    }
  }

  const changeVolume = (value: number) => {
    setVolume(value)
    if (previewRef.current) previewRef.current.volume = value
    if (modalRef.current) modalRef.current.volume = value
  }

  const openModal = () => {
    previewRef.current?.pause()
    setIsPlaying(false)
    setIsOpen(true)
  }

  const videoEvents = {
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onPause: (event: SyntheticEvent<HTMLVideoElement>) => syncFromVideo(event.currentTarget),
    onEnded: () => setIsPlaying(false),
  }

  return (
    <article className="media-card media-video-card">
      <div className="media-frame media-frame-contain">
        <video
          ref={previewRef}
          className="media-video"
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          {...videoEvents}
        />
        <span className="media-video-badge">{isPlaying ? 'Playing workflow preview' : 'Paused deck preview'}</span>
      </div>
      <VideoControls
        title={title}
        isPlaying={!isOpen && isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        canOpen
        onTogglePlay={togglePlay}
        onSeek={seek}
        onVolume={changeVolume}
        onOpen={openModal}
      />
      <div className="media-copy">
        <strong>{title}</strong>
        <p>{caption}</p>
      </div>
      {isOpen ? (
        <div
          className="media-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="media-modal-panel media-modal-panel-video" onMouseDown={(event) => event.stopPropagation()}>
            <div className="media-modal-head">
              <h2 id={modalTitleId}>{title}</h2>
              <button ref={closeRef} className="media-modal-close" type="button" aria-label="关闭放大视频" onClick={close}>
                Close
              </button>
            </div>
            <div className="media-modal-media">
              <video
                ref={modalRef}
                className="media-video media-video-modal"
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                {...videoEvents}
              />
              <span className="media-video-badge">{isPlaying ? 'Playing enlarged preview' : 'Paused enlarged preview'}</span>
            </div>
            <VideoControls
              title={title}
              isPlaying={isOpen && isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              onTogglePlay={togglePlay}
              onSeek={seek}
              onVolume={changeVolume}
            />
          </div>
        </div>
      ) : null}
    </article>
  )
}
