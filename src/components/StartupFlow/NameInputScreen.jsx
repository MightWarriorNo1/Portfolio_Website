import { useState, useRef, useEffect } from 'react'

export default function NameInputScreen({ initialName, onSubmit }) {
  const [name, setName] = useState(initialName || '')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div className="windows-name-screen">
      <div className="windows-bg-layer" aria-hidden="true" />
      <div className="windows-name-card" onClick={(e) => e.stopPropagation()}>
        <div className="windows-name-icon">
          <div className="windows-logo small">
            <span className="w-square w-tl" />
            <span className="w-square w-tr" />
            <span className="w-square w-bl" />
            <span className="w-square w-br" />
          </div>
        </div>
        <h2>Sign in</h2>
        <p>Enter your name to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={50}
            autoComplete="name"
          />
          <button type="submit" disabled={!name.trim()}>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
