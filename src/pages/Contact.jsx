import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Contact() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const heroRef = useRef(null)
  const mapSectionRef = useRef(null)

  useEffect(() => {
    const left = heroRef.current?.querySelector('.leftSection')
    const right = heroRef.current?.querySelector('.rightSection')
    const ctx = gsap.context(() => {
      if (left) gsap.from(left, { x: -50, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 })
      if (right) gsap.from(right, { x: 50, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.35 })
      if (mapSectionRef.current) gsap.from(mapSectionRef.current, { y: 50, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: mapSectionRef.current, start: 'top 88%' } })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!window.mapboxgl || !mapRef.current || mapInstance.current) return
    const token = import.meta.env.MAPBOX_TOKEN
    if (!token) {
      console.error('Mapbox token is not set. Please check your .env file.')
      return
    }
    window.mapboxgl.accessToken = token
    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [139.767306, 35.681236],
      zoom: 7,
    })
    new window.mapboxgl.Marker({ color: 'red' }).setLngLat([87.401445, 22.865637]).addTo(map)
    map.addControl(new window.mapboxgl.ScaleControl())
    map.addControl(new window.mapboxgl.NavigationControl())
    mapInstance.current = map
    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  return (
    <>
      <main ref={heroRef}>
        <div className="firstSection">
          <div className="leftSection">
            <img src="/assests/avatar.png" style={{ height: '320px' }} />
          </div>
          <div className="rightSection" id="rs">
            <form>
              <h1>Contact</h1>
              <h3><i>Kobayashi</i></h3>
              <h3><i className="fa-regular fa-envelope"></i> Email: issakobayashi411@gmail.com</h3>
              <hr id="hr" />
              <h2>Address</h2>
              <h3><i className="fa-regular fa-address-book"></i> Yokohama, Japan</h3>
              <br />
              <h2><i className="fa-regular fa-message"></i> Message Me</h2>
              <h3 className="insta">
                <button type="button">
                  <a href="https://github.com/MightWarriorNo1" target="_blank" rel="noreferrer">@MightWarriorNo1</a>
                </button>
              </h3>
            </form>
          </div>
        </div>
      </main>

      <section ref={mapSectionRef}>
        <h1 style={{ textAlign: 'center' }}>&nbsp;<i className="fa-solid fa-house-flag"></i> My Home Town Map</h1>
        <div style={{ height: '30px' }}></div>
        <div id="map" ref={mapRef}></div>
      </section>

      {/* <section>
        <div className="contact-form">
          <img src="/assests/avatar.png" alt="Affan" />
          <form action="https://formspree.io/f/xpwaywop" method="POST">
            <h2>Contact Me</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="_replyto" placeholder="your@email.com" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </section> */}
    </>
  )
}
