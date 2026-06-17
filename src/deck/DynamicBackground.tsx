export function DynamicBackground() {
  return (
    <div className="deck-background" aria-hidden="true">
      <div className="deck-bg-base" />
      <div className="deck-bg-grid" />
      <div className="deck-bg-aurora deck-bg-aurora-a" />
      <div className="deck-bg-aurora deck-bg-aurora-b" />
      <div className="deck-bg-spotlight" />
      <div className="deck-bg-command-sweep" />
      <div className="deck-bg-particles">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="deck-bg-noise" />
    </div>
  )
}
