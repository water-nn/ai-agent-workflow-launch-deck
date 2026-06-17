import type { ReactNode } from 'react'

export type SlideKind =
  | 'cover'
  | 'agenda'
  | 'statement'
  | 'split'
  | 'architecture'
  | 'timeline'
  | 'matrix'
  | 'data'
  | 'roadmap'
  | 'decision'
  | 'closing'

export type Slide = {
  id: string
  title: string
  navTitle?: string
  section: string
  kind: SlideKind
  content: ReactNode
}
