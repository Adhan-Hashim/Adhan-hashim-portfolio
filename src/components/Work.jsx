import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import MagneticButton from './MagneticButton'

const Work = () => {
  const container = useRef(null)
  const selectedProjects = projects.filter(p => p.selected)

  return (
    <section id="work" ref={container} style={{ position: 'relative', padding: '100px 0 0 0' }}>
      <div style={{ padding: '0 10%', marginBottom: '60px' }}>
        <motion.span className="sketch-text" style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>
          // Project Archive
        </motion.span>
        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, fontWeight: 900 }}>
          SELECTED<br />WORKS<span style={{ color: 'var(--accent-color)' }}>.</span>
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        {selectedProjects.map((project, i) => (
          <StickyCard
            key={project.id}
            project={project}
            range={[i * 0.2, 1]}
            targetScale={1 - (selectedProjects.length - i) * 0.05}
            index={i}
          />
        ))}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '60px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 100
      }}>
        <MagneticButton to="/works" label="More Works" />
      </div>
    </section>
  )
}


const StickyCard = ({ project, index, range, targetScale }) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  // Stacking effect: Underlying cards scale down and fade
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={container}
      style={{
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: '10vh',
        zIndex: index + 1
      }}
    >
      <motion.div
        style={{
          scale,
          width: '85%',
          height: 'var(--work-card-height, 70vh)',
          backgroundColor: project.color,
          borderRadius: '4px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'var(--work-card-flex-dir, row)',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Grid Background Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(var(--text-color) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none'
        }} />

        {/* Content Half */}
        <div style={{ flex: 'var(--work-card-content-flex, 1)', padding: 'var(--work-card-padding, 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
          <div>
            <span className="sketch-text" style={{ fontSize: '1.5rem', color: 'var(--accent-color)', display: 'block', marginBottom: '10px' }}>
              /{project.year}
            </span>
            <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '20px' }}>
              {project.title.toUpperCase()}
            </h3>
            <p style={{ color: 'var(--muted-text)', fontSize: '1.1rem', maxWidth: '350px', lineHeight: 1.6 }}>
              {project.desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', padding: '5px 15px', border: '1px solid var(--text-color)', borderRadius: '30px', opacity: 0.5 }}>
              {project.category}
            </span>
            <Link to={project.link || "/works"} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 10 }}
                style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                VIEW CASE <svg width="15" height="10" viewBox="0 0 15 10"><path d="M0,5 L12,5 M8,0 L12,5 L8,10" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Image Half */}
        <div style={{ flex: 'var(--work-card-image-flex, 1.2)', position: 'relative', overflow: 'hidden', height: 'var(--work-card-image-height, auto)' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.4)' }}
          />

          {/* Masking Tape Visual */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '-30px',
            width: '120px',
            height: '35px',
            backgroundColor: 'rgba(230, 225, 200, 0.8)',
            transform: 'rotate(45deg)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 10
          }} />
        </div>

        {/* Project Number */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '8rem',
          fontWeight: 900,
          opacity: 0.05,
          lineHeight: 0.8,
          pointerEvents: 'none'
        }}>
          {project.id}
        </div>
      </motion.div>
    </div>
  )
}

export default Work
