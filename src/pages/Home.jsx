import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import gsap from 'gsap'

const SKILLS = {
  'Programming Language': [
    { img: '/assests/c.png', title: 'C Language', href: 'https://github.com/affancoder/C_language' },
    { img: '/assests/c++.png', title: 'C++', href: 'https://github.com/affancoder/language.cpp' },
    { img: '/assests/python.png', title: 'PYTHON', href: 'https://github.com/affancoder/Python_Codes' },
    { img: '/assests/java.png', title: 'JAVA', href: 'https://github.com/affancoder/Java_Codes' },
  ],
  'Frontend Development': [
    { img: '/assests/html.png', title: 'HTML', href: 'https://github.com/affancoder/HTML-Practiced' },
    { img: '/assests/css.png', title: 'CSS', href: 'https://github.com/affancoder/CSS_Practiced' },
    { img: '/assests/javascript.png', title: 'JAVASCRIPT', href: 'https://github.com/affancoder/JavaScript' },
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
    { img: '/assests/sql.png', title: 'MYSQL', href: 'https://github.com/affancoder/SQL' },
    { img: '/assests/mongodb.png', title: 'MONGODB', href: 'https://github.com/affancoder/MongoDB' },
    { img: '/assests/firebase.png', title: 'FIREBASE', href: 'https://github.com/affancoder/MongoDB' },
  ],
  'Frontend Framework': [
    { img: '/assests/bootstrap.png', title: 'BOOTSTRAP', href: 'https://github.com/affancoder/Bootstrap_Practiced' },
    { img: '/assests/laravel.png', title: 'LARAVEL', href: 'https://github.com/affancoder/Bootstrap_Practiced' },
    { img: '/assests/tailwindcss.png', title: 'TAILWINDCSS', href: '' },
  ],
}

const ICONS = { 'Programming Language': '🖥️', 'Frontend Development': '🎨', 'Backend Development': '⚙️', 'AI & ML': '🤖', 'Cloud': '☁️', 'Hardware & IoT': '📡', 'DataBase': '🛢️', 'Frontend Framework': 'Frontend Framework' }

export default function Home() {
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

  useEffect(() => {
    gsap.to('.footer-container', { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 })
    gsap.to('.footer-bottom', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
    gsap.from('.container', { duration: 1.5, y: 50, opacity: 0, ease: 'power2.out', stagger: 0.2 })
  }, [])

  return (
    <main>
      <section className="firstSection">
        <div className="leftSection">
          Hi, my name is <span className="purple">Kobayashi</span>
          <div>and I am a Passionate</div>
          <span id="element" ref={typedRef}></span>
          <div className="buttons">
            <button className="btn1">
              <a href="/assests/Resume.pdf" target="_blank" rel="noreferrer"><i className="fas fa-file-alt"></i> Resume</a>
            </button>
            <button className="btn2">
              <a href="https://github.com/MightWarriorNo1" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> Github</a>
            </button>
          </div>
        </div>
        <div className="rightSection">
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

      

      <section>
        <section className="parallax hero">
          <div className="parallax-content">
            <h1>Hi, I'm Kobayashi Issa</h1>
            <p>I'm a passionate Software Engineer and Full Stack Web Developer, skilled in building responsive, modern, and scalable web applications. I focus on clean code and smooth, user-friendly experiences, and keep up with the latest tech to deliver high-quality solutions.</p>
          </div>
        </section>
        <section className="parallax section contribution">
          <div className="parallax-content">
            <h2>My Contributions</h2>
            <p>I've contributed to impactful projects including: <strong>International Volunteer Management System (IVMS)</strong>—smooth UI, dynamic dashboards, PHP & MySQL backend; <strong>Simtrak Solution</strong>—responsive React components and GSAP animations; <strong>WanderLust</strong>—full-stack MERN holiday rental app with authentication and booking flows.</p>
          </div>
        </section>
        <section className="parallax section appreciation">
          <div className="parallax-content">
            <h2>Appreciations</h2>
            <p><strong>Simtrak Solution Pvt Ltd</strong>—acknowledged for professional dashboard UI and clean code. <strong>IVMS Team</strong>—praised for front-end styling and GSAP work. <strong>College Faculty & Peers</strong>—commended for self-driven full-stack learning.</p>
          </div>
        </section>
        <section className="parallax section achievement">
          <div className="parallax-content">
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
            <img src="/assests/assests/aspect.jpg" alt="NIT" />
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
