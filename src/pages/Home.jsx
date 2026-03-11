import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useUser } from '../context/UserContext'

const SKILLS = {
  'Programming Language': [
    { img: '/assests/c.png', title: 'C Language' },
    { img: '/assests/c++.png', title: 'C++'},
    { img: '/assests/python.png', title: 'PYTHON' },
    { img: '/assests/java.png', title: 'JAVA' },
  ],
  'Frontend Development': [
    { img: '/assests/html.png', title: 'HTML' },
    { img: '/assests/css.png', title: 'CSS' },
    { img: '/assests/javascript.png', title: 'JAVASCRIPT' },
    { img: '/assests/react.png', title: 'React JS', href: '#' },
  ],
  'Backend Development': [
    { img: '/assests/nodejs.png', title: 'NODE JS', href: '#' },
    { img: '/assests/express2.png', title: 'EXPRESS JS', href: '' },
    { img: '/assests/php.png', title: 'PHP', href: '' },
    { img: '/assests/django.png', title: 'DJANGO', href: '#' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', title: 'FASTAPI', href: '#' },
  ],
  'AI & ML': [
    { img: 'https://cdn.simpleicons.org/huggingface/FFD21E', title: 'NLP', href: '#' },
    { img: '/assests/openai.png', title: 'OpenAI API', href: '#' },
    { img: 'https://cdn.simpleicons.org/langchain/1C3C3C', title: 'LLM', href: '#' },
  ],
  'Cloud': [
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', title: 'AWS', href: '#' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', title: 'AZURE', href: '#' },
  ],
  'Hardware & IoT': [
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', title: 'RASPBERRY PI', href: '#' },
    { img: 'https://cdn.simpleicons.org/arduino/00979D', title: 'IoT', href: '#' },
  ],
  'DataBase': [
    { img: '/assests/sql.png', title: 'MYSQL' },
    { img: '/assests/mongodb.png', title: 'MONGODB' },
    { img: '/assests/firebase.png', title: 'FIREBASE' },
  ],
  'Frontend Framework': [
    { img: '/assests/bootstrap.png', title: 'BOOTSTRAP' },
    { img: '/assests/laravel.png', title: 'LARAVEL' },
    { img: '/assests/tailwindcss.png', title: 'TAILWINDCSS' },
  ],
}

const ICONS = { 'Programming Language': '🖥️', 'Frontend Development': '🎨', 'Backend Development': '⚙️', 'AI & ML': '🤖', 'Cloud': '☁️', 'Hardware & IoT': '📡', 'DataBase': '🛢️', 'Frontend Framework': 'Frontend Framework' }

export default function Home() {
  const { userName } = useUser()
  const typedRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('loaded')
  }, [])

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: ['Full Stack Web Developer', 'Software Engineer', 'Responsive Web Designer', 'UI/UX Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  const heroLeftRef = useRef(null)
  const heroRightRef = useRef(null)
  const heroButtonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.welcome-banner', { y: -20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 })
      gsap.from(heroLeftRef.current, { x: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
      gsap.from(heroRightRef.current, { x: 80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 })
      gsap.from(heroButtonsRef.current?.children || [], { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.8 })
      gsap.from('#element', { opacity: 0, duration: 0.8, delay: 0.6 })

      ScrollTrigger.batch('.skills > div', {
        onEnter: (batch) => gsap.from(batch, { y: 50, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' }),
        start: 'top 88%',
      })
      ScrollTrigger.batch('.web-skills .card', {
        onEnter: (batch) => gsap.from(batch, { scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.2)' }),
        start: 'top 92%',
      })
      // Parallax sections: one animation per content block so text always ends visible
      // Hero: slide in from left (trigger when section enters viewport)
      gsap.fromTo('.parallax-hero-content',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.parallax.hero',
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Contributions: slide in from right
      gsap.fromTo('.parallax-contribution-content',
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.parallax.contribution',
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Appreciations: slide in from left
      gsap.fromTo('.parallax-appreciation-content',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.parallax.appreciation',
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Achievements: reveal inside expanding shape (circle clip-path)
      gsap.fromTo('.parallax-achievement-shape',
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.parallax.achievement',
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      ScrollTrigger.batch('.strength > div', {
        onEnter: (batch) => gsap.from(batch, { y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }),
        start: 'top 85%',
      })
      ScrollTrigger.batch('.portfolio-section', {
        onEnter: (batch) => {
          const section = batch[0]
          const videoWrap = section?.querySelector('.portfolio-video-container')
          const contentWrap = section?.querySelector('.portfolio-content-container')
          gsap.from(videoWrap, { x: -60, opacity: 0, duration: 0.8, ease: 'power2.out' })
          gsap.from(contentWrap, { x: 60, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 })
        },
        start: 'top 82%',
      })
      gsap.from('.visitor-panel', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.visitor-panel', start: 'top 90%' } })
      gsap.from('.he .firstSection > div', { y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.he', start: 'top 85%' } })
      gsap.from('.skills .h1', { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: '.skills', start: 'top 88%' } })
      gsap.from('.he .h1', { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: '.he', start: 'top 88%' } })
      gsap.from('.thirdSection .h1', { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: '.thirdSection', start: 'top 88%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main>
      {userName && (
        <section className="welcome-banner">
          <h1>Welcome, <span className="purple">{userName}</span></h1>
        </section>
      )}
      <section className="firstSection">
        <div className="leftSection" ref={heroLeftRef}>
          Hi, my name is <span className="purple">Kobayashi</span>
          <div>and I am a Passionate</div>
          <span id="element" ref={typedRef}></span>
          <div className="buttons" ref={heroButtonsRef}>
            <button className="btn1">
              <a href="/assests/Resume.pdf" target="_blank" rel="noreferrer"><i className="fas fa-file-alt"></i> Resume</a>
            </button>
            <button className="btn2">
              <a href="https://github.com/MightWarriorNo1" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> Github</a>
            </button>
          </div>
        </div>
        <div className="rightSection" ref={heroRightRef}>
          <img src="/assests/bg.png" alt="Developer" />
        </div>
      </section>
      <hr />

      <section>
        <div className="skills">
          <h1 className="h1"><i className="ri-stack-fill"></i> Skills</h1>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h2>{ICONS[category] || ''} {category}</h2>
              <hr id="skills-hr" />
              <div className="web-skills">
                {items.map((item, i) => (
                  <div className="card" key={i}>
                      <img src={item.img} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p></p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr />

      

      <section className="parallax-sections">
        <section className="parallax hero">
          <div className="parallax-content parallax-hero-content">
            <h1>Hi, I'm Kobayashi Issa</h1>
            <p>I'm a passionate Software Engineer and Full Stack Web Developer, skilled in building responsive, modern, and scalable web applications. I focus on clean code and smooth, user-friendly experiences, and keep up with the latest tech to deliver high-quality solutions.</p>
          </div>
        </section>
        <section className="parallax section contribution">
          <div className="parallax-content parallax-contribution-content">
            <h2>My Contributions</h2>
            <p>I've contributed to impactful projects including: <strong>International Volunteer Management System (IVMS)</strong>—smooth UI, dynamic dashboards, PHP & MySQL backend; <strong>Simtrak Solution</strong>—responsive React components and GSAP animations; <strong>WanderLust</strong>—full-stack MERN holiday rental app with authentication and booking flows.</p>
          </div>
        </section>
        <section className="parallax section appreciation">
          <div className="parallax-content parallax-appreciation-content">
            <h2>Appreciations</h2>
            <p><strong>Simtrak Solution Pvt Ltd</strong>—acknowledged for professional dashboard UI and clean code. <strong>IVMS Team</strong>—praised for front-end styling and GSAP work. <strong>College Faculty & Peers</strong>—commended for self-driven full-stack learning.</p>
          </div>
        </section>
        <section className="parallax section achievement">
          <div className="parallax-content parallax-achievement-content parallax-achievement-shape">
            <h2>Achievements</h2>
            <p>Web Developer Internship at Simtrak Solution. Deployed 5+ full-stack projects (React, Node.js, MongoDB, Express, PHP, MySQL). Built weather app and portfolio with EmailJS/Formspree. Contributed to real-time volunteer platforms used by international teams.</p>
          </div>
        </section>
      </section>

      

      
      <hr />

      <section className="he">
        <h1 className="h1"><i className="fa-solid fa-graduation-cap"></i> Higher Education</h1>
        <div className="firstSection">
          <div className="leftSection">
            <img src="/assests/aspect.jpg" alt="NIT" />
          </div>
          <div className="rightSection">
            <form className="colbox">
              <h1><i className="fa-solid fa-graduation-cap"></i> University</h1>
              <br />
              <h2>Kanto Institute of Technology, Yokohama</h2>
              <br />
              <h3>B.Tech - Computer Science & Engineering</h3>
              <h5>2013-2017</h5>
            </form>
          </div>
        </div>
      </section>
      <hr />

      <section className="thirdSection">
        <h1 className="h1"><i className="fa-brands fa-superpowers"></i> Strengths</h1>
        <div className="strength">
          <div><img src="/assests/webdev.png" alt="" /><p>Development Enthusiast</p></div>
          <div><img src="/assests/Fast.png" alt="" /><p>Fast Project Delivery</p></div>
          <div><img src="/assests/learner.png" alt="" /><p>Quick Learner</p></div>
          <div><img src="/assests/loyal.png" alt="" /><p>Loyal & Trustworthy</p></div>
          <div><img src="/assests/comm.png" alt="" /><p>Excellent Communication</p></div>
          <div><img src="/assests/colllll.png" alt="" /><p>Collaborative</p></div>
        </div>
      </section>
      <hr />

      <section className="portfolio-section">
        <div className="portfolio-video-container">
          <div className="portfolio-floating-shapes">
            <div className="portfolio-shape"></div>
            <div className="portfolio-shape"></div>
            <div className="portfolio-shape"></div>
            <div className="portfolio-shape"></div>
          </div>
          <div className="portfolio-video-wrapper">
            <video className="portfolio-video" autoPlay muted loop>
              <source src="/assests/ProVideo/appreciation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="portfolio-content-container">
          <div className="portfolio-message-container">
            <h2 className="portfolio-heading">Why Choose <span className="portfolio-highlight">Me</span>?</h2>
            <p className="portfolio-paragraph">I'm a Software Engineer who delivers <span className="portfolio-highlight">innovative solutions</span>, a <strong>dedicated work ethic</strong>, <strong>collaborative spirit</strong>, and <strong>adaptability</strong> to meet project needs. I'm seeking to create meaningful impact and value for your team.</p>
            <p className="portfolio-signature">— Kobayashi Issa</p>
          </div>
        </div>
      </section>
      <hr />

      <section>
        <div className="visitor-panel">
          <div className="visitor">
            <h1>Total Visitor</h1>
            <a href="https://www.freecounterstat.com" title="website counter">
              <img src="https://counter4.optistats.ovh/private/freecounterstat.php?c=ncfgpt8dm1e2hadq14wrysdmd3g1sa9l" border="0" title="website counter" alt="website counter" />
            </a>
          </div>
        </div>
        <br /><br />
      </section>
    </main>
  )
}
