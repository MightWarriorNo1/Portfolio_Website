import { useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    document.body.classList.add('loaded')
  }, [])
  useEffect(() => {
    const t = setTimeout(() => onComplete(), 1800)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="windows-loading-screen">
      <div className="windows-bg-layer" aria-hidden="true" />
      <div className="windows-loading-inner">
        <div className="windows-loading-icon">
          <div className="windows-logo">
            <span className="w-square w-tl" />
            <span className="w-square w-tr" />
            <span className="w-square w-bl" />
            <span className="w-square w-br" />
          </div>
        </div>
        <div className="windows-loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
