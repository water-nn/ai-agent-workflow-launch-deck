import { useCallback, useEffect, useState } from 'react'

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    const root = document.getElementById('root')
    if (root?.requestFullscreen) {
      await root.requestFullscreen()
    }
  }, [])

  return { isFullscreen, toggleFullscreen }
}
