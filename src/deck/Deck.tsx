import { DynamicBackground } from './DynamicBackground'
import { SlideFrame } from './SlideFrame'
import { HoverAgenda } from './controls/HoverAgenda'
import { Progress } from './controls/Progress'
import { TopControls } from './controls/TopControls'
import { useDeckNavigation } from './hooks/useDeckNavigation'
import { useDeckPreferences } from './hooks/useDeckPreferences'
import { useFullscreen } from './hooks/useFullscreen'
import type { Slide } from './types'
import { useState } from 'react'

type DeckProps = {
  slides: Slide[]
}

export function Deck({ slides }: DeckProps) {
  const navigation = useDeckNavigation(slides.length)
  const fullscreen = useFullscreen()
  const preferences = useDeckPreferences()
  const [isAgendaPinned, setIsAgendaPinned] = useState(false)
  const currentSlide = slides[navigation.currentIndex]

  return (
    <main
      className={`deck-app theme-${preferences.theme} tone-${preferences.tone} ${fullscreen.isFullscreen ? 'deck-fullscreen' : ''} ${
        isAgendaPinned ? 'nav-pinned' : ''
      }`}
      data-theme={preferences.theme}
      data-tone={preferences.tone}
      data-active-slide={currentSlide.id}
    >
      <DynamicBackground />
      <TopControls
        currentIndex={navigation.currentIndex}
        total={slides.length}
        canGoPrevious={navigation.canGoPrevious}
        canGoNext={navigation.canGoNext}
        isFullscreen={fullscreen.isFullscreen}
        onPrevious={navigation.previous}
        onNext={navigation.next}
        onToggleFullscreen={fullscreen.toggleFullscreen}
      />
      <HoverAgenda
        slides={slides}
        currentIndex={navigation.currentIndex}
        isPinned={isAgendaPinned}
        onPinnedChange={setIsAgendaPinned}
        onGoTo={navigation.goTo}
      />
      <div className="deck-stage" role="region" aria-live="polite" aria-label="当前幻灯片">
        <SlideFrame key={currentSlide.id} slide={currentSlide} index={navigation.currentIndex} total={slides.length} />
      </div>
      <Progress currentIndex={navigation.currentIndex} total={slides.length} />
    </main>
  )
}
