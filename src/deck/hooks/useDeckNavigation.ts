import { useCallback, useEffect, useMemo, useState } from 'react'

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  const tagName = target.tagName.toLowerCase()
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    tagName === 'button' ||
    tagName === 'a' ||
    target.isContentEditable
  )
}

const getInitialSlide = (slideCount: number) => {
  const rawHash = window.location.hash.replace('#slide-', '')
  const parsed = Number(rawHash)
  if (Number.isFinite(parsed) && parsed >= 1 && parsed <= slideCount) {
    return parsed - 1
  }
  return 0
}

export function useDeckNavigation(slideCount: number) {
  const [currentIndex, setCurrentIndex] = useState(() => getInitialSlide(slideCount))

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(Math.max(index, 0), slideCount - 1))
    },
    [slideCount],
  )

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const previous = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  useEffect(() => {
    const hash = `#slide-${currentIndex + 1}`
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash)
    }
  }, [currentIndex])

  useEffect(() => {
    const onHashChange = () => goTo(getInitialSlide(slideCount))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [goTo, slideCount])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return
      const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
      const previousKeys = ['ArrowLeft', 'ArrowUp', 'PageUp']
      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        goTo(currentIndex + 1)
      }
      if (previousKeys.includes(event.key)) {
        event.preventDefault()
        goTo(currentIndex - 1)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      }
      if (event.key === 'End') {
        event.preventDefault()
        goTo(slideCount - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, goTo, slideCount])

  return useMemo(
    () => ({
      currentIndex,
      goTo,
      next,
      previous,
      canGoNext: currentIndex < slideCount - 1,
      canGoPrevious: currentIndex > 0,
    }),
    [currentIndex, goTo, next, previous, slideCount],
  )
}
