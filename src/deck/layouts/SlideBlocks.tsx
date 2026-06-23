import type { ReactNode } from 'react'

type BlockProps = {
  eyebrow?: string
  title: string
  children?: ReactNode
  className?: string
}

export function SlideHeader({ eyebrow, title, children, className = '' }: BlockProps) {
  return (
    <div className={`slide-header ${className}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </div>
  )
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`glass-card ${className}`}>{children}</article>
}

export function ScrollableCard({
  children,
  className = '',
  label,
  title,
}: {
  children: ReactNode
  className?: string
  label?: ReactNode
  title?: ReactNode
}) {
  const regionLabel = typeof title === 'string' ? `${title} 详情` : '卡片详情'

  return (
    <article className={`glass-card scrollable-card ${className}`}>
      {label ? <span>{label}</span> : null}
      {title ? <strong>{title}</strong> : null}
      <div className="scrollable-card-body" role="region" aria-label={regionLabel} tabIndex={0}>
        {children}
      </div>
    </article>
  )
}

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`pill ${className}`}>{children}</span>
}

export function FlowNode({ index, title, detail }: { index: string; title: string; detail: string }) {
  return (
    <div className="flow-node">
      <span>{index}</span>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  )
}

export function StageLine({ children }: { children: ReactNode }) {
  return <div className="stage-line">{children}</div>
}
