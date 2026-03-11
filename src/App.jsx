import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import StartupFlow from './components/StartupFlow/StartupFlow'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'
import MouseSparkles from './components/MouseSparkles'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App() {
  return (
    <UserProvider>
      <StartupFlow>
        <div className="app-root">
          <div className="app-background" aria-hidden="true" />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <ScrollToTop />
          <Chatbot />
          <MouseSparkles />
        </div>
      </StartupFlow>
    </UserProvider>
  )
}
