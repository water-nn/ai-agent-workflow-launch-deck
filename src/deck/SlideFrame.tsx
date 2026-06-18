import type { Slide } from './types'

type SlideFrameProps = {
  slide: Slide
  index: number
  total: number
}

export function SlideFrame({ slide, index, total }: SlideFrameProps) {
  return (
    <section className={`slide-frame slide-${slide.kind}`} aria-label={`${index + 1}. ${slide.title}`}>
      <div className="slide-inner">
        {slide.content}
        <div className="slide-signature">
          <span>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
