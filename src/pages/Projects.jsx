import { motion } from 'framer-motion'

const PROJECTS = [
  { video: '/assests/ProVideo/wanderlust.mp4', poster: '/assests/wanderlustpic.jpg', title: '🏠 WanderLust - Holidays Homes', subtitle: 'Web Application Major Project', desc: 'Full-Stack Airbnb clone with user-friendly front-end, dynamic back-end, robust database, and Map API for rental locations (MVC Framework).', visit: 'https://wanderlust-projectaffan.onrender.com/listings', source: 'https://github.com/MightWarriorNo1/WanderLust-Holidays-Rental-Homes' },
  { video: '/assests/ProVideo/Simon.mp4', poster: '/assests/simon_ss.png', title: '🎨 Simon Says Game', subtitle: '', desc: 'Front-end project with HTML, CSS, and JavaScript; responsive for all devices.', visit: 'https://affancoder.github.io/Simon-Says_Game/', source: 'https://github.com/MightWarriorNo1/Simon-Says_Game' },
  { video: '/assests/ProVideo/weather_app.mp4', poster: '/assests/weatherapp.jpg', title: '🌈 WeatherApp', subtitle: '', desc: 'React weather app with a reliable API; accurate forecasts and current conditions with an intuitive UI.', visit: 'https://weatherapp-affan.netlify.app/', source: 'https://github.com/MightWarriorNo1/WeatherApp' },
  { video: '/assests/ProVideo/amzon-clone.mp4', poster: '/assests/amazon.png', title: '🛒 Amazon Clone', subtitle: '', desc: 'Front-end project mirroring the Amazon experience with HTML, CSS, JavaScript, and Bootstrap.', visit: 'https://affancoder.github.io/e-commerce/' },
  { video: '/assests/ProVideo/spotify.mp4', poster: '/assests/newspotfy.png', title: '🎧 Spotify Web Player', subtitle: '', desc: 'Front-end Spotify-style web player with HTML & CSS; responsive design.', visit: 'https://spotify-delta.netlify.app/' },
  { video: '/assests/ProVideo/CineFlex.mp4', poster: '/assests/screenshot.png', title: '🎬 CineFlex', subtitle: '', desc: 'CineFlex-style frontend with HTML and CSS: layout, responsive elements, and styling.', visit: 'https://affancoder.github.io/CineFlex/' },
  { video: '/assests/ProVideo/spotify-harry.mp4', poster: '/assests/spo.jpg', title: '🎵 Music Web Player', subtitle: '', desc: 'Functional music player (HTML, CSS, JS) emulating Spotify-style core features and UI.', visit: 'https://affancoder.github.io/Music_Player/'},
  { video: '/assests/ProVideo/gigstm.mp4', poster: '/assests/gigstm-thumbnail.png', title: 'GigsTm', subtitle: 'Enterprises-Grade Management & Payout', desc: 'Enterprise gig management platform (Node.js, MongoDB): admin workflows, Scope of Work, Payout Terms, secure validation, audit logging, CSV exports.', visit: 'https://gigstm-reactjs.vercel.app/' },
  { video: '/assests/ProVideo/nohate.mp4', poster: '/assests/nohate.png', title: '💬 Nohate – Full Stack Social Awareness Platform', subtitle: '', desc: 'Responsive web app with HTML, CSS, JS, Locomotive JS, GSAP; Firebase auth and real-time DB; H-Panel dashboard for admins.' },
  { video: '/assests/ProVideo/disasater_mangement.mp4', poster: '/assests/NationalPreparedness.png', title: '🌪️ Disaster Management', subtitle: '', desc: 'React and Tailwind CSS project for internal hackathon; front-end focused.', visit: 'https://response-disaster.onrender.com/' },
  { video: '/assests/ProVideo/ExploreAway.mp4', poster: '/assests/thumb.jpg', title: '✈️ ExploreAway : Tourist Website', subtitle: '', desc: 'Tourist website for discovering destinations and travel experiences.', visit: 'https://affancoder.github.io/ExploreAway/'},
]

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18, delay: i * 0.05 }
  })
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -15,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 0.8
    }
  }
}

export default function Projects() {
  const titleWords = 'Latest Projects'.split(' ')

  return (
    <main>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.35em', marginBottom: '0.5rem' }}
      >
        <h1 className="heading" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.2em' }}>
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={titleVariants} custom={i} style={{ display: 'inline-block' }}>
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.section>

      <motion.section
        className="con-video"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        style={{ perspective: 1200 }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div
            className="content"
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -12,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              transformOrigin: 'center bottom',
              willChange: 'transform'
            }}
          >
            <motion.div
              className="firstSec"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <video loop src={p.video} controls poster={p.poster} title={p.title} />
            </motion.div>
            <motion.div
              className="secondSec"
              id="project-details"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h2>{p.title}</h2>
              {p.subtitle && <><br />{p.subtitle}<br /><br /></>}
              <p>{p.desc}</p>
              <div className="buttons">
                <motion.button
                  className="source-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={p.visit} target="_blank" rel="noreferrer">Visit</a>
                </motion.button>
                {p.source && (
                  <motion.button
                    className="source-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={p.source} target="_blank" rel="noreferrer">Source</a>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
        <div style={{ marginBottom: '140px' }}></div>
        <hr />
      </motion.section>
    </main>
  )
}
