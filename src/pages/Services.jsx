export default function Services() {
  const services = [
    {
      img: '/assests/webdev.png',
      title: 'Web Development',
      text: 'Full-Stack Web Development with responsive design and strong front-end skills for building clean, user-friendly interfaces.',
    },
    {
      img: '/assests/dm.png',
      title: 'Database Management',
      text: 'Designing and managing databases using MongoDB, MySQL, and others. CRUD operations, data integrity, and security.',
    },
    {
      img: '/assests/deploy.png',
      title: 'Deployment Service',
      text: 'Fast, secure, and scalable hosting. Whether a personal blog, e-commerce site, or full-scale web application.',
    },
  ]

  return (
    <main id="ServiceBody">
      <section>
        <h4 className="service-heading" style={{ color: '#a6a1a1' }}>What I can do for you</h4>
        <h1 className="service-heading">Services</h1>
        <div className="service-container">
          {services.map((s, i) => (
            <div id="service-card" key={i}>
              <img src={s.img} alt={s.title} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
