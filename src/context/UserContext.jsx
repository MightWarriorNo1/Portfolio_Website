import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'portfolio_user_name'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [userName, setUserNameState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })

  const setUserName = (name) => {
    const trimmed = (name || '').trim()
    setUserNameState(trimmed)
    try {
      if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed)
      else localStorage.removeItem(STORAGE_KEY)
    } catch (_) {}
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUserNameState(stored)
    } catch (_) {}
  }, [])

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
