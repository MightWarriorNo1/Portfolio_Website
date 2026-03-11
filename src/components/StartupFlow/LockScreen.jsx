export default function LockScreen({ onUnlock }) {
  return (
    <div className="windows-lock-screen" onClick={onUnlock} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onUnlock()}>
      <div className="windows-bg-layer" aria-hidden="true" />
      <div className="windows-lock-content">
        <div className="windows-lock-icon">
          <div className="windows-logo">
            <span className="w-square w-tl" />
            <span className="w-square w-tr" />
            <span className="w-square w-bl" />
            <span className="w-square w-br" />
          </div>
        </div>
        <p className="windows-lock-hint">Click anywhere to continue</p>
      </div>
    </div>
  )
}
