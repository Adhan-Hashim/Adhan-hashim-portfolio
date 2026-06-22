import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

// Custom Generated Assets
import expVehicleBody from '../assets/exp_vehicle_body.webp'
import expVehicleBodyDark from '../assets/exp_vehicle_body_dark.webp'
import expWheel from '../assets/exp_wheel.webp'
import milestone0 from '../assets/exp_milestone_0.webp'
import milestone0Night from '../assets/exp_milestone_0(night).webp'
import milestone1 from '../assets/exp_milestone_1.webp'
import milestone1Night from '../assets/exp_milestone_1(night).webp'
import milestone2 from '../assets/exp_milestone_2.webp'
import milestone2Night from '../assets/exp_milestone_2(night).webp'
import milestone3 from '../assets/exp_milestone_3.webp'
import milestone3Night from '../assets/exp_milestone_3(night).webp'
import milestone4 from '../assets/exp_milestone_4.webp'
import milestone4Night from '../assets/exp_milestone_4(night).webp'
import milestone5 from '../assets/exp_milestone_5.webp'
import milestone5Night from '../assets/exp_milestone_5(night).webp'
import expHills from '../assets/exp_hills.webp'
import expVillageScenery from '../assets/exp_village_scenery.webp'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2025–26',
    role: 'Technical Coordinator',
    company: 'IEEE SB CEV',
    desc: 'Collaborating with teams to understand requirements, support execution, and ensure smooth user experiences across events and initiatives.',
    icon: '⚡'
  },
  {
    year: '2025–26',
    role: 'UI/UX Designer Intern',
    company: 'Lofritex',
    desc: 'Designing user-centered interfaces, collaborating with developers, and improving product usability through research and iterative design.',
    icon: '🎨'
  },
  {
    year: '2025–26',
    role: 'Design Contributor',
    company: 'IEEE EdSoc Kerala Chapter',
    desc: 'While officially a Video Editor by role, I frequently step outside my formal role to provide extensive design support, creating posters and promotional materials using Figma.',
    icon: '✏️'
  },
  {
    year: '2024–25',
    role: 'Media Lead',
    company: 'IEEE SB CEV',
    desc: 'Handled design and video content for events, promotions, and social media. Enhanced digital presence and audience engagement.',
    icon: '📸'
  },
  {
    year: '2025–26',
    role: 'Video Editor',
    company: 'IEEE EdSoc Kerala Chapter',
    desc: 'Created engaging and informative video content highlighting events, initiatives, and educational projects across the state.',
    icon: '🎬'
  },
  {
    year: '2024–Pres',
    role: 'Media Lead',
    company: 'Made Webs',
    desc: 'Specialized in client video works, creating promotional and branding content showcasing products, services, and client success stories for social media, websites, and campaigns.',
    icon: '🌐'
  }
]

const Experience = ({ isStudio, isSadMode }) => {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const skyRef = useRef(null)
  const hillsRef = useRef(null)
  const villageRef = useRef(null)
  const roadRef = useRef(null)
  const streetlightsRef = useRef(null)
  const carRef = useRef(null)
  const wheelFrontRef = useRef(null)
  const wheelBackRef = useRef(null)
  const dustContainerRef = useRef(null)
  const [showDust, setShowDust] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop layout Scroll Animations
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: pinRef.current,
            pinSpacing: true,
          }
        })

        // Step 1: Drive to Stop 0 (IEEE SB CEV)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-100vw', ease: 'none', duration: 1.2 }, 0)
          .to(villageRef.current, { x: '-50vw', ease: 'none', duration: 1.2 }, 0)
          .to(hillsRef.current, { x: '-25vw', ease: 'none', duration: 1.2 }, 0)
          .to(skyRef.current, { x: '-12.5vw', ease: 'none', duration: 1.2 }, 0)
          .to(carRef.current, { y: '-=6', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 0)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 0)

        // Stop 0: Display Card 0
        tl.to('.billboard-0', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-0')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-0')?.classList.remove('card-active')
        }, 1.2)
          .to('.billboard-0', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-0')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-0')?.classList.add('card-active')
          }, 2.0)

        // Step 2: Drive to Stop 1 (Lofritex)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-180vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(villageRef.current, { x: '-90vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(hillsRef.current, { x: '-45vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(skyRef.current, { x: '-22.5vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(carRef.current, { y: '+=4', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 2.3)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 2.3)

        // Stop 1: Display Card 1
        tl.to('.billboard-1', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-1')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-1')?.classList.remove('card-active')
        }, 3.5)
          .to('.billboard-1', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-1')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-1')?.classList.add('card-active')
          }, 4.3)

        // Step 3: Drive to Stop 2 (IEEE EdSoc Designer)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-260vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(villageRef.current, { x: '-130vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(hillsRef.current, { x: '-65vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(skyRef.current, { x: '-32.5vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(carRef.current, { y: '-=5', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 4.6)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 4.6)

        // Stop 2: Display Card 2
        tl.to('.billboard-2', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-2')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-2')?.classList.remove('card-active')
        }, 5.8)
          .to('.billboard-2', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-2')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-2')?.classList.add('card-active')
          }, 6.6)

        // Step 4: Drive to Stop 3 (IEEE Media Lead)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-340vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(villageRef.current, { x: '-170vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(hillsRef.current, { x: '-85vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(skyRef.current, { x: '-42.5vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(carRef.current, { y: '+=4', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 6.9)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 6.9)

        // Stop 3: Display Card 3
        tl.to('.billboard-3', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-3')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-3')?.classList.remove('card-active')
        }, 8.1)
          .to('.billboard-3', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-3')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-3')?.classList.add('card-active')
          }, 8.9)

        // Step 5: Drive to Stop 4 (IEEE EdSoc Video Editor)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-420vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(villageRef.current, { x: '-210vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(hillsRef.current, { x: '-105vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(skyRef.current, { x: '-52.5vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(carRef.current, { y: '-=5', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 9.2)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 9.2)

        // Stop 4: Display Card 4
        tl.to('.billboard-4', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-4')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-4')?.classList.remove('card-active')
        }, 10.4)
          .to('.billboard-4', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-4')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-4')?.classList.add('card-active')
          }, 11.2)

        // Step 6: Drive to Stop 5 (Made Webs Video Editor)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-500vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(villageRef.current, { x: '-250vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(hillsRef.current, { x: '-125vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(skyRef.current, { x: '-62.5vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(carRef.current, { y: '+=3', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 11.5)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 11.5)

        // Stop 5: Display Card 5 (Keep open at the end)
        tl.to('.billboard-5', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-5')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-5')?.classList.remove('card-active')
        }, 12.7)

        // Outro Drive — car approaches the cliff edge
        tl.to([roadRef.current, streetlightsRef.current], { x: '-550vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(villageRef.current, { x: '-275vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(hillsRef.current, { x: '-137.5vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(skyRef.current, { x: '-68.75vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(carRef.current, { y: '-=2', repeat: 1, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 13.8)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=360', ease: 'none', duration: 1.2 }, 13.8)

          // ═══════════════════════════════════════════════════════════
          //  REALISTIC PHYSICS FALL — DESKTOP
          //  Modelled after real cliff-edge vehicle dynamics:
          //  Weight transfer → suspension sag → tipping point →
          //  angular acceleration → free-fall → tumble
          // ═══════════════════════════════════════════════════════════

          // ── Phase 1: Deceleration & edge approach (0.3s) ──
          // Car coasts forward, engine rumble dies, wheels decelerate via friction
          .to(carRef.current, { x: '+=18', ease: 'power2.out', duration: 0.3 }, 15.0)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=45', ease: 'power3.out', duration: 0.3 }, 15.0)
          // Front suspension compresses as weight shifts forward (subtle Y dip)
          .to(carRef.current, { y: '+=3', ease: 'power1.inOut', duration: 0.15 }, 15.1)
          // Shadow elongates forward as car noses over
          .to('.car-shadow', { scaleX: 1.3, x: '+=10', opacity: 0.5, duration: 0.2, ease: 'power1.inOut' }, 15.0)

          // ── Phase 2: Tipping point — center of gravity crosses the edge (0.15s) ──
          // Car pivots around the rear axle contact point — accelerating
          .to(carRef.current, {
            rotate: 20,
            transformOrigin: '80% 95%',
            ease: 'power1.in',
            duration: 0.15
          }, 15.3)
          // Front wheel begins to spin freely (no road contact — angular momentum)
          .to(wheelFrontRef.current, { rotate: '+=30', ease: 'power1.out', duration: 0.15 }, 15.3)
          // Rear wheel still has friction, barely turning
          .to(wheelBackRef.current, { rotate: '+=8', ease: 'power2.out', duration: 0.15 }, 15.3)
          // Shadow rapidly shortens and fades
          .to('.car-shadow', { scaleX: 0.3, opacity: 0.15, duration: 0.1, ease: 'power2.in' }, 15.35)
          // Headlights flicker once (electrical jolt) then die
          .to('.car-headlight-beam', { opacity: 0.6, duration: 0.05 }, 15.3)
          .to('.car-headlight-beam', { opacity: 0, duration: 0.05, ease: 'power1.in' }, 15.35)
          // Kick up dust at the edge — show dust particles
          .call(() => setShowDust(true), [], 15.35)

          // ── Phase 3: Angular acceleration — past the point of no return (0.15s) ──
          // Body pitches rapidly nose-down, pivoting shifts from rear axle to body center
          .to(carRef.current, {
            rotate: 55,
            x: '+=25',
            y: '+=45',
            transformOrigin: '65% 80%',
            ease: 'power2.in',
            duration: 0.15
          }, 15.45)
          // Rear wheel spins backward slightly as it leaves the edge
          .to(wheelBackRef.current, {
            rotate: '-=25',
            ease: 'power1.out',
            duration: 0.1
          }, 15.45)
          // Shadow vanishes completely
          .to('.car-shadow', { opacity: 0, scaleX: 0, duration: 0.05, ease: 'power2.in' }, 15.5)

          // ── Phase 4: Free-fall with gravitational acceleration (0.4s) ──
          // v = g*t — distance increases quadratically
          // Body tumbles nose-first
          .to(carRef.current, {
            y: '+=900',
            x: '+=65',
            rotate: 135,
            transformOrigin: '50% 50%',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)
          // Wheels continue spinning in mid-air
          .to(wheelFrontRef.current, {
            rotate: '+=540',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)
          .to(wheelBackRef.current, {
            rotate: '-=420',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)

          // ── Phase 5: Fade out as objects fall out of frame (0.1s) ──
          // Staggered opacity — body first, then front wheel, then rear wheel
          .to(carRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          .to(wheelFrontRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          .to(wheelBackRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          // Clean up dust
          .call(() => setShowDust(false), [], 16.0)
      })

      // Mobile layout Scroll Animations
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: pinRef.current,
            pinSpacing: true,
          }
        })

        // Step 1
        tl.to([roadRef.current, streetlightsRef.current], { x: '-140vw', ease: 'none', duration: 1.2 }, 0)
          .to(villageRef.current, { x: '-70vw', ease: 'none', duration: 1.2 }, 0)
          .to(hillsRef.current, { x: '-35vw', ease: 'none', duration: 1.2 }, 0)
          .to(skyRef.current, { x: '-17.5vw', ease: 'none', duration: 1.2 }, 0)
          .to(carRef.current, { y: '-=4', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 0)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 0)

        tl.to('.billboard-0', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-0')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-0')?.classList.remove('card-active')
        }, 1.2)
          .to('.billboard-0', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-0')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-0')?.classList.add('card-active')
          }, 2.0)

        // Step 2
        tl.to([roadRef.current, streetlightsRef.current], { x: '-260vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(villageRef.current, { x: '-130vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(hillsRef.current, { x: '-65vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(skyRef.current, { x: '-32.5vw', ease: 'none', duration: 1.2 }, 2.3)
          .to(carRef.current, { y: '+=3', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 2.3)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 2.3)

        tl.to('.billboard-1', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-1')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-1')?.classList.remove('card-active')
        }, 3.5)
          .to('.billboard-1', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-1')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-1')?.classList.add('card-active')
          }, 4.3)

        // Step 3
        tl.to([roadRef.current, streetlightsRef.current], { x: '-380vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(villageRef.current, { x: '-190vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(hillsRef.current, { x: '-95vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(skyRef.current, { x: '-47.5vw', ease: 'none', duration: 1.2 }, 4.6)
          .to(carRef.current, { y: '-=4', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 4.6)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 4.6)

        tl.to('.billboard-2', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-2')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-2')?.classList.remove('card-active')
        }, 5.8)
          .to('.billboard-2', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-2')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-2')?.classList.add('card-active')
          }, 6.6)

        // Step 4
        tl.to([roadRef.current, streetlightsRef.current], { x: '-500vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(villageRef.current, { x: '-250vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(hillsRef.current, { x: '-125vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(skyRef.current, { x: '-62.5vw', ease: 'none', duration: 1.2 }, 6.9)
          .to(carRef.current, { y: '+=3', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 6.9)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 6.9)

        tl.to('.billboard-3', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-3')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-3')?.classList.remove('card-active')
        }, 8.1)
          .to('.billboard-3', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-3')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-3')?.classList.add('card-active')
          }, 8.9)

        // Step 5
        tl.to([roadRef.current, streetlightsRef.current], { x: '-620vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(villageRef.current, { x: '-310vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(hillsRef.current, { x: '-155vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(skyRef.current, { x: '-77.5vw', ease: 'none', duration: 1.2 }, 9.2)
          .to(carRef.current, { y: '-=4', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 9.2)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 9.2)

        tl.to('.billboard-4', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-4')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-4')?.classList.remove('card-active')
        }, 10.4)
          .to('.billboard-4', {
            scale: 0,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.3,
            onStart: () => document.querySelector('.billboard-4')?.classList.remove('card-active'),
            onReverseComplete: () => document.querySelector('.billboard-4')?.classList.add('card-active')
          }, 11.2)

        // Step 6
        tl.to([roadRef.current, streetlightsRef.current], { x: '-740vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(villageRef.current, { x: '-370vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(hillsRef.current, { x: '-185vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(skyRef.current, { x: '-92.5vw', ease: 'none', duration: 1.2 }, 11.5)
          .to(carRef.current, { y: '+=3', repeat: 3, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 11.5)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=720', ease: 'none', duration: 1.2 }, 11.5)

        tl.to('.billboard-5', {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.5)',
          duration: 0.4,
          onStart: () => document.querySelector('.billboard-5')?.classList.add('card-active'),
          onReverseComplete: () => document.querySelector('.billboard-5')?.classList.remove('card-active')
        }, 12.7)

        // Outro — car approaches the cliff edge (Mobile)
        tl.to([roadRef.current, streetlightsRef.current], { x: '-800vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(villageRef.current, { x: '-400vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(hillsRef.current, { x: '-200vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(skyRef.current, { x: '-100vw', ease: 'none', duration: 1.2 }, 13.8)
          .to(carRef.current, { y: '-=2', repeat: 1, yoyo: true, duration: 0.3, ease: 'sine.inOut' }, 13.8)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=360', ease: 'none', duration: 1.2 }, 13.8)

          // ═══════════════════════════════════════════════════════════
          //  REALISTIC PHYSICS FALL — MOBILE
          //  Same physics model, scaled for smaller viewport
          // ═══════════════════════════════════════════════════════════

          // ── Phase 1: Deceleration & edge approach ──
          .to(carRef.current, { x: '+=12', ease: 'power2.out', duration: 0.3 }, 15.0)
          .to([wheelFrontRef.current, wheelBackRef.current], { rotate: '+=45', ease: 'power3.out', duration: 0.3 }, 15.0)
          .to(carRef.current, { y: '+=2', ease: 'power1.inOut', duration: 0.15 }, 15.1)
          .to('.car-shadow', { scaleX: 1.3, x: '+=6', opacity: 0.5, duration: 0.2, ease: 'power1.inOut' }, 15.0)

          // ── Phase 2: Tipping point ──
          .to(carRef.current, {
            rotate: 20,
            transformOrigin: '80% 95%',
            ease: 'power1.in',
            duration: 0.15
          }, 15.3)
          .to(wheelFrontRef.current, { rotate: '+=30', ease: 'power1.out', duration: 0.15 }, 15.3)
          .to(wheelBackRef.current, { rotate: '+=8', ease: 'power2.out', duration: 0.15 }, 15.3)
          .to('.car-shadow', { scaleX: 0.3, opacity: 0.15, duration: 0.1, ease: 'power2.in' }, 15.35)
          .to('.car-headlight-beam', { opacity: 0.6, duration: 0.05 }, 15.3)
          .to('.car-headlight-beam', { opacity: 0, duration: 0.05, ease: 'power1.in' }, 15.35)
          .call(() => setShowDust(true), [], 15.35)

          // ── Phase 3: Angular acceleration ──
          .to(carRef.current, {
            rotate: 55,
            x: '+=18',
            y: '+=30',
            transformOrigin: '65% 80%',
            ease: 'power2.in',
            duration: 0.15
          }, 15.45)
          .to(wheelBackRef.current, {
            rotate: '-=25',
            ease: 'power1.out',
            duration: 0.1
          }, 15.45)
          .to('.car-shadow', { opacity: 0, scaleX: 0, duration: 0.05, ease: 'power2.in' }, 15.5)

          // ── Phase 4: Free-fall with gravitational acceleration ──
          .to(carRef.current, {
            y: '+=650',
            x: '+=45',
            rotate: 135,
            transformOrigin: '50% 50%',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)
          .to(wheelFrontRef.current, {
            rotate: '+=540',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)
          .to(wheelBackRef.current, {
            rotate: '-=420',
            ease: 'power3.in',
            duration: 0.4
          }, 15.6)

          // ── Phase 5: Fade out ──
          .to(carRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          .to(wheelFrontRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          .to(wheelBackRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 15.9)
          .call(() => setShowDust(false), [], 16.0)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Helper to render stars in the night sky
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 35}%`,
    left: `${Math.random() * 580}vw`,
    scale: Math.random() * 0.8 + 0.4,
  }))

  const renderMilestoneStructure = (index) => {
    const images = [milestone0, milestone1, milestone2, milestone3, milestone4, milestone5]
    const isDark = isStudio || isSadMode
    const isMilestone0Night = index === 0 && isDark
    const isMilestone1Night = index === 1 && isDark
    const isMilestone2Night = index === 2 && isDark
    const isMilestone3Night = index === 3 && isDark
    const isMilestone4Night = index === 4 && isDark
    const isMilestone5Night = index === 5 && isDark

    let imgSrc = images[index]
    if (isMilestone0Night) {
      imgSrc = milestone0Night
    } else if (isMilestone1Night) {
      imgSrc = milestone1Night
    } else if (isMilestone2Night) {
      imgSrc = milestone2Night
    } else if (isMilestone3Night) {
      imgSrc = milestone3Night
    } else if (isMilestone4Night) {
      imgSrc = milestone4Night
    } else if (isMilestone5Night) {
      imgSrc = milestone5Night
    }

    const isNightVersion = isMilestone0Night || isMilestone1Night || isMilestone2Night || isMilestone3Night || isMilestone4Night || isMilestone5Night

    return (
      <img loading="lazy"
        src={imgSrc}
        alt={`Milestone ${index}`}
        className={`milestone-building-img ${isNightVersion ? 'milestone-night-version' : ''}`}
      />
    )
  }

  return (
    <section id="experience" ref={sectionRef} className="road-exp-section">
      {/* ── Global Hidden SVG definitions for Gradients ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="car-headlight-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffd54f" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffd54f" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={pinRef} className="road-exp-pin">
        {/* ── Floating Header ── */}
        <div className="road-exp-header">
          <span className="road-exp-subtitle sketch-text">Where I've been</span>
          <h2>EXPERIENCE<span>.</span></h2>
        </div>

        {/* ── Landscape Track ── */}
        <div className="road-landscape-track" ref={trackRef}>
          {/* Layer 1: Sky & Stars */}
          <div className="road-parallax-layer layer-sky" ref={skyRef}>
            {/* Stars Container (visible in Dark / Sad Mode) */}
            <div className="village-stars-container">
              {/* Moon SVG */}
              <div className="sky-moon">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <path d="M50 10 A40 40 0 1 0 90 50 A30 30 0 1 1 50 10 Z" fill="#fff9d6" />
                </svg>
              </div>
              {stars.map((star) => (
                <div
                  key={star.id}
                  className="sky-star"
                  style={{
                    top: star.top,
                    left: star.left,
                    transform: `scale(${star.scale})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Layer 2: Hills & Clouds */}
          <div
            className="road-parallax-layer layer-hills"
            ref={hillsRef}
            style={{
              backgroundImage: `url(${expHills})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              opacity: 0.12,
              width: '600vw'
            }}
          >
            {/* Drifting Clouds */}
            <div className="village-clouds-container">
              <svg viewBox="0 0 120 40" className="sky-cloud" style={{ width: 120, height: 40, top: '5%', left: '8vw' }}>
                <path d="M10,30 Q25,10 40,20 Q60,5 75,20 Q95,10 110,30 Z" fill="currentColor" />
              </svg>
              <svg viewBox="0 0 120 40" className="sky-cloud" style={{ width: 120, height: 40, top: '15%', left: '160vw' }}>
                <path d="M10,30 Q25,10 40,20 Q60,5 75,20 Q95,10 110,30 Z" fill="currentColor" />
              </svg>
              <svg viewBox="0 0 120 40" className="sky-cloud" style={{ width: 120, height: 40, top: '8%', left: '300vw' }}>
                <path d="M10,30 Q25,10 40,20 Q60,5 75,20 Q95,10 110,30 Z" fill="currentColor" />
              </svg>
              <svg viewBox="0 0 120 40" className="sky-cloud" style={{ width: 120, height: 40, top: '20%', left: '460vw' }}>
                <path d="M10,30 Q25,10 40,20 Q60,5 75,20 Q95,10 110,30 Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Layer 3: Village Midground */}
          <div
            className="road-parallax-layer layer-village"
            ref={villageRef}
            style={{
              backgroundImage: `url(${expVillageScenery})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 80%',
              backgroundPosition: 'bottom',
              opacity: 0.2,
              width: '600vw'
            }}
          />

          {/* Layer 4: Foreground Road and Milestones */}
          <div className="road-parallax-layer layer-road" ref={roadRef}>

            {/* Road Path Container */}
            <div className="village-road-container">
              <div className="village-road-curb" />
              <div className="village-road-main">
                <div className="village-road-dashes" />
              </div>
              <div className="village-road-under" />
            </div>

            {/* Experience Milestones Structures & Signposts */}
            <div className="milestones-wrapper">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`milestone-stop stop-${idx}`}>
                  {/* Job Details Billboard/Card */}
                  <div className={`milestone-billboard-wrap billboard-${idx}`}>
                    <div className="milestone-billboard-card">
                      <span className="billboard-year sketch-text">{exp.year}</span>
                      <h3 className="billboard-role">{exp.role}</h3>
                      <h4 className="billboard-company">{exp.company}</h4>
                      <p className="billboard-desc">{exp.desc}</p>
                    </div>
                  </div>

                  {/* Custom Vector Structure */}
                  <div className="milestone-structure">
                    {renderMilestoneStructure(idx)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 5: Foreground Streetlights */}
          <div className="road-parallax-layer layer-streetlights" ref={streetlightsRef}>
            {/* Streetlights */}
            {[60, 160, 260, 360, 460, 560].map((left, idx) => (
              <div key={idx} className="road-streetlight" style={{ left: `${left}vw` }}>
                <svg viewBox="0 0 40 160" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20,160 L20,30 C20,15 35,15 35,25" />
                  <path d="M30,25 C30,20 40,20 40,25 L38,32 L32,32 Z" fill="var(--surface-color)" />
                  <circle cx="35" cy="32" r="3" fill="#fff" className="streetlight-bulb" />
                </svg>
                {/* Warm bulb halo */}
                <div className="streetlight-bulb-halo" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Fixed Viewport Car ── */}
        <div className="car-viewport-pin" ref={carRef}>
          <div className="car-container-internal">
            {/* The Whimsical Hand-Drawn Vehicle Body */}
            <img loading="lazy" src={expVehicleBodyDark} alt="Creative vehicle" className="car-body-image" />

            {/* Headlight beam */}
            <svg viewBox="0 0 400 80" className="car-headlight-beam">
              <polygon points="0,20 400,0 400,80" fill="url(#car-headlight-grad)" />
            </svg>

            {/* Rotating Wheels */}
            <div className="car-wheel wheel-back" ref={wheelBackRef}>
              <img loading="lazy" src={expWheel} alt="Back Wheel" className="car-wheel-img" />
            </div>

            <div className="car-wheel wheel-front" ref={wheelFrontRef}>
              <img loading="lazy" src={expWheel} alt="Front Wheel" className="car-wheel-img" />
            </div>

            {/* Ground Shadow */}
            <div className="car-shadow" />
          </div>

          {/* ── Cliff-edge dust / debris particles ── */}
          {showDust && (
            <div className="cliff-dust-container" ref={dustContainerRef}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="cliff-dust-particle"
                  style={{
                    '--dust-x': `${-10 + Math.random() * 50}px`,
                    '--dust-y': `${-20 - Math.random() * 40}px`,
                    '--dust-size': `${2 + Math.random() * 5}px`,
                    '--dust-delay': `${Math.random() * 0.3}s`,
                    '--dust-duration': `${0.6 + Math.random() * 0.8}s`,
                    '--dust-opacity': `${0.3 + Math.random() * 0.5}`,
                  }}
                />
              ))}
              {/* Small rock chunks */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`rock-${i}`}
                  className="cliff-rock-chunk"
                  style={{
                    '--rock-x': `${10 + Math.random() * 30}px`,
                    '--rock-y': `${50 + Math.random() * 100}px`,
                    '--rock-size': `${3 + Math.random() * 4}px`,
                    '--rock-delay': `${Math.random() * 0.2}s`,
                    '--rock-duration': `${0.8 + Math.random() * 0.6}s`,
                    '--rock-rotate': `${Math.random() * 360}deg`,
                  }}
                />
              ))}
            </div>
          )}
        </div>


      </div>
    </section>
  )
}

export default Experience
