import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import LoadingScreen from './LoadingScreen'
import LockScreen from './LockScreen'
import NameInputScreen from './NameInputScreen'

const PHASE = { LOADING: 'loading', LOCK: 'lock', NAME: 'name', DONE: 'done' }

export default function StartupFlow({ children }) {
  const { userName, setUserName } = useUser()
  const [phase, setPhase] = useState(PHASE.LOADING)

  const handleLoadingComplete = () => setPhase(PHASE.LOCK)
  const handleUnlock = () => setPhase(PHASE.NAME)
  const handleNameSubmit = (name) => {
    setUserName(name)
    setPhase(PHASE.DONE)
  }

  if (phase === PHASE.DONE) {
    return children
  }

  if (phase === PHASE.LOADING) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (phase === PHASE.LOCK) {
    return <LockScreen onUnlock={handleUnlock} />
  }

  return <NameInputScreen initialName={userName} onSubmit={handleNameSubmit} />
}
