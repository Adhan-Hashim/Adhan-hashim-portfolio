import React from 'react'
import { motion } from 'framer-motion'
import mePortrait from '../assets/me_ranga.png'
import littlePortrait from '../assets/little_ranga.png'
import EyeO from './EyeO'
import './Hero.css'

const Hero = ({ isStudio, isSadMode }) => {
  return (
    <section className="hero" style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 10%',
      position: 'relative'
    }}>
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <motion.h1
            className="hero-title"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            HELL<EyeO size={Math.min(window.innerWidth * 0.12, 120)} /><span style={{ color: 'var(--accent-color)' }}>.</span>
          </motion.h1>

          <motion.div
            className="hero-subtitle-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              zIndex: isSadMode ? 10000 : 1
            }}
          >
            <span className="sketch-text" style={{
              fontSize: isSadMode ? '1.7rem' : '1.5rem',
              transform: 'rotate(-10deg)',
              display: 'block',
              color: isSadMode ? '#ffffff' : 'var(--text-color)',
              fontWeight: isSadMode ? '900' : 'normal',
              textShadow: isSadMode ? '0 0 10px rgba(255,255,255,0.8), 2px 2px 5px rgba(0,0,0,0.5)' : 'none',
              filter: isSadMode ? 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' : 'none',
              transition: 'all 1s ease'
            }}>
              I am Adhan Hashim
            </span>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: 'rotate(45deg)' }}>
              <path
                d="M5 5 L35 35 M35 35 L25 35 M35 35 L35 25"
                fill="none"
                stroke={isSadMode ? "#ffffff" : "var(--accent-color)"}
                strokeWidth={isSadMode ? "3" : "2"}
                strokeLinecap="round"
                style={{ transition: 'stroke 1s ease, stroke-width 1s ease' }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Designing visuals, shaping stories, and building digital experiences. Currently pursuing Computer Science while exploring the space where creativity meets technology.

        </motion.p>
      </div>

      {/* Sketch Portrait */}
      <motion.div
        className="hero-portrait"
        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={isSadMode ? littlePortrait : mePortrait}
            alt="Adhan Hashim"
            style={{
              width: '100%',
              height: 'auto',
              filter: isSadMode
                ? 'grayscale(0) contrast(1.1) brightness(0.9)'
                : 'grayscale(1) contrast(1.2) brightness(1.1)',
              opacity: isSadMode ? 0.9 : 0.9,
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              transition: 'filter 1.2s ease, opacity 1.2s ease'
            }}
          />
          {/* Hand drawn circle background */}
          <svg style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', zIndex: -1, opacity: 0.3 }}>
            <motion.ellipse
              cx="50%" cy="50%" rx="45%" ry="45%"
              fill="none"
              stroke="var(--text-color)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
            />
          </svg>
        </div>
      </motion.div>

      <div className="hero-footer">
        <div className="scroll-indicator" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="mouse" style={{ width: '20px', height: '35px', border: '2px solid var(--muted-text)', borderRadius: '15px' }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: '4px', height: '8px', background: 'var(--accent-color)', margin: '5px auto', borderRadius: '2px' }}
            />
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--muted-text)' }}>DIVE DOWN</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
