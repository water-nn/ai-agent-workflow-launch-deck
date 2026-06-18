import { useEffect, useMemo, useState } from 'react'

export type DeckTheme = 'editorial' | 'visual'
export type DeckTone = 'slate' | 'champagne' | 'aurora'

const readPreferences = () => {
  const params = new URLSearchParams(window.location.search)
  const theme = params.get('theme') === 'visual' ? 'visual' : 'editorial'
  const requestedTone = params.get('tone')
  const tone = requestedTone === 'champagne' || requestedTone === 'aurora' ? requestedTone : 'slate'
  return { theme, tone } satisfies { theme: DeckTheme; tone: DeckTone }
}

export function useDeckPreferences() {
  const [preferences, setPreferences] = useState(readPreferences)

  useEffect(() => {
    const onUrlChange = () => setPreferences(readPreferences())
    window.addEventListener('popstate', onUrlChange)
    window.addEventListener('hashchange', onUrlChange)
    return () => {
      window.removeEventListener('popstate', onUrlChange)
      window.removeEventListener('hashchange', onUrlChange)
    }
  }, [])

  return useMemo(() => preferences, [preferences])
}
