import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Hero Animations
const tlHero = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

tlHero.to('.hero-title', {
    opacity: 1,
    y: 0,
    delay: 0.5
})
.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
}, '-=1.2')
.from('.hero-image', {
    opacity: 0,
    scale: 0.8,
    duration: 2,
    ease: 'expo.out'
}, '-=1.5')
.from('.btn', {
    opacity: 0,
    y: 20,
}, '-=1')

// Navbar Scroll Effect
ScrollTrigger.create({
    start: 'top top',
    end: '+=100',
    onUpdate: (self) => {
        if (self.direction === 1) {
            gsap.to('nav', { y: '-100%', duration: 0.3 })
        } else {
            gsap.to('nav', { y: '0%', duration: 0.3, backgroundColor: 'rgba(12, 8, 6, 0.8)', backdropFilter: 'blur(10px)' })
        }
    },
    onLeaveBack: () => {
        gsap.to('nav', { backgroundColor: 'transparent', backdropFilter: 'blur(0px)' })
    }
})

// Collection Animations
gsap.from('.collection-card', {
    scrollTrigger: {
        trigger: '.collection-grid',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
})

// Experience Section Parallax
gsap.to('.float-1', {
    scrollTrigger: {
        trigger: '.experience',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: -100,
    ease: 'none'
})

gsap.to('.float-2', {
    scrollTrigger: {
        trigger: '.experience',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    ease: 'none'
})

// Section Reveal Animations
const sections = ['#collection', '#experience', '#features', '.testimonial', '#cta']

sections.forEach(section => {
    gsap.from(section + ' .section-tag, ' + section + ' h2', {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
})

// Features Stagger
gsap.from('.feature-item', {
    scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
})

// Quote Animation
gsap.from('.quote', {
    scrollTrigger: {
        trigger: '.testimonial',
        start: 'top 80%',
    },
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: 'expo.out'
})

// Handle anchor links with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            lenis.scrollTo(target)
        }
    })
})
