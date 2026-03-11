import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Footer() {
  const footerRef = useRef(null)
  const containerRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.children || [], { y: 35, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } })
      gsap.from(bottomRef.current, { y: 20, opacity: 0, duration: 0.5, delay: 0.3, scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef}>
      <div className="footer">
        <div className="footer-container" ref={containerRef}>
          <div className="footer-section footer-brand">
            <h3>Kobayashi's Developer Portfolio</h3>
            <p>Turning ideas into reality, one line of code at a time.</p>
            <div className="footer-social">
              <ul>
                <li><a href="https://github.com/MightWarriorNo1" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a></li>
                <li>
                  <a href="https://discord.com/channels/1431384357930532926/1431384358735970488" target="_blank" rel="noreferrer"><i className="fa-brands fa-discord"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
              <li><Link to="/services"><i className="fa fa-cogs"></i> Services</Link></li>
              <li><Link to="/projects"><i className="fa fa-briefcase"></i> Projects</Link></li>
              <li><Link to="/contact"><i className="fa fa-envelope"></i> Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section footer-contact">
            <h4>Contact</h4>
            <p><i className="fa fa-envelope"></i>issakobayashi411@gmail.com</p>
            <p><i className="fa fa-map-marker"></i> Yokohama, Japan</p>
          </div>
        </div>
        <div className="footer-bottom" ref={bottomRef}>
          <p>Copyright &copy; 2026 Kobayashi's Portfolio | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
