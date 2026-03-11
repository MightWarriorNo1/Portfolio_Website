import { useState, useCallback, useEffect, useRef } from 'react'

const SPARKLE_LIFETIME_MS = 800
const THROTTLE_MS = 40
const MAX_SPARKLES = 60
const SPREAD = 24

function Sparkle({ id, x, y, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), SPARKLE_LIFETIME_MS)
    return () => clearTimeout(t)
  }, [id, onDone])

  return (
    <span
      className="mouse-sparkle"
      style={{
        left: x,
        top: y,
      }}
      aria-hidden="true"
    />
  )
}

export default function MouseSparkles() {
  const [sparkles, setSparkles] = useState([])
  const nextIdRef = useRef(0)
  const lastTimeRef = useRef(0)

  const removeSparkle = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id))
  }, [])

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastTimeRef.current < THROTTLE_MS) return
      lastTimeRef.current = now

      const id = nextIdRef.current++
      setSparkles((prev) => [
        ...prev.slice(-(MAX_SPARKLES - 1)),
        {
          id,
          x: e.clientX + (Math.random() - 0.5) * SPREAD,
          y: e.clientY + (Math.random() - 0.5) * SPREAD,
        },
      ])
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="mouse-sparkles-container" aria-hidden="true">
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          onDone={removeSparkle}
        />
      ))}
    </div>
  )
}
