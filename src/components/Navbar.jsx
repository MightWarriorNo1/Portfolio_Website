import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false)
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' })
    gsap.fromTo(linksRef.current?.children || [], { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.35, ease: 'power2.out' })

    const st = ScrollTrigger.create({
      trigger: 'main',
      start: 'top -80',
      onEnter: () => nav.classList.add('navbar-scrolled'),
      onLeaveBack: () => nav.classList.remove('navbar-scrolled'),
    })
    return () => st.kill()
  }, [])

  return (
    <header>
      <nav className="navbar" ref={navRef}>
        <div className="namelogo" ref={logoRef}>
          <img src="/assests/avatar.png" alt="Avatar" />
          <a href="/">
          <div className="left">&nbsp;Kobayashi's Portfolio</div>
          </a>
        </div>
        <div className="right">
          <ul ref={linksRef} className={`navbar-menu ${menuActive ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setMenuActive(false)}>Home</Link></li>
            <li><Link to="/services" onClick={() => setMenuActive(false)}>Services</Link></li>
            <li><Link to="/projects" onClick={() => setMenuActive(false)}>Projects</Link></li>
            <li><Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-toggle">
          <button id="menu-toggle" onClick={() => setMenuActive(!menuActive)} aria-label="Toggle menu">
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      </nav>
    </header>
  )
}
