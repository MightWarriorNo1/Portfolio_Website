import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Reveal elements when they enter the viewport */
export function reveal(selector, options = {}) {
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
    once = true,
  } = options
  gsap.from(selector, {
    y,
    opacity,
    duration,
    stagger: typeof selector === 'string' && selector.includes(',') ? stagger : undefined,
    ease,
    scrollTrigger: {
      trigger: Array.isArray(selector) ? selector[0] : (typeof selector === 'string' ? selector.split(',')[0].trim() : selector),
      start,
      toggleActions: once ? 'play none none none' : 'play none none reverse',
    },
  })
}

/** Stagger children when parent enters viewport */
export function staggerReveal(parentSelector, childSelector, options = {}) {
  const {
    y = 50,
    opacity = 0,
    duration = 0.6,
    stagger = 0.08,
    ease = 'power2.out',
    start = 'top 88%',
  } = options
  gsap.from(childSelector, {
    y,
    opacity,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: parentSelector,
      start,
      toggleActions: 'play none none none',
    },
  })
}
