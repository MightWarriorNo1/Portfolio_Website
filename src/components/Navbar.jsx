import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <header>
      <nav className="navbar">
        <div className="namelogo">
          <img src="/assests/avatar.png" />
          <a href="/">
          <div className="left">&nbsp;Kobayashi's Portfolio</div>
          </a>
        </div>
        <div className="right">
          <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
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
