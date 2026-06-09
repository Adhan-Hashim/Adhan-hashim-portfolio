import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const experiences = [
  {
    year: "2025-26",
    role: "Technical Coordinator",
    company: "IEEE SB CEV",
    desc: "Collaborating with teams to understand requirements, support execution, and ensure smooth user experiences across events and initiatives."
  },
  {
    year: "2025-26",
    role: "UI/UX Designer Intern",
    company: "Lofritex",
    desc: "Designing user-centered interfaces, collaborating with developers, and improving product usability through research and iterative design."
  },
  {
    year: "2025-26",
    role: "Designer",
    company: "IEEE EdSoc Kerala Chapter",
    desc: "Creating posters and promotional materials for events and initiatives, utilizing Figma to craft professional and visually consistent designs."
  },
  {
    year: "2024-25",
    role: "Media Lead",
    company: "IEEE SB CEV",
    desc: "Handled design and video content for events, promotions, and social media. Enhanced digital presence and audience engagement."
  },
  {
    year: "2025-26",
    role: "Video Editor",
    company: "IEEE EdSoc Kerala Chapter",
    desc: "Created engaging and informative video content highlighting events, initiatives, and educational projects across the state."
  },
  {
    year: "2024-Pres",
    role: "Video Editor",
    company: "Made Webs",
    desc: "Created promotional and branding content showcasing products, services, and client success stories for social media, websites, and campaigns."
  }
];

const Experience = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section 
      id="experience" 
      ref={containerRef}
      style={{ padding: '150px 10%', backgroundColor: 'var(--bg-color)', position: 'relative' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '3.5rem', marginBottom: '100px', textAlign: 'center' }}
        >
          EXPERIENCE<span style={{ color: 'var(--accent-color)' }}>.</span>
        </motion.h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical Timeline Line - Animated on Scroll */}
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: '2px', 
            height: '100%', 
            backgroundColor: 'var(--text-color)', 
            opacity: 0.1,
            zIndex: 1
          }} />
          
          <motion.div 
            style={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '2px', 
              backgroundColor: 'var(--accent-color)', 
              scaleY,
              originY: 0,
              zIndex: 2,
              height: '100%'
            }} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TimelineItem = ({ exp, i }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ 
        width: '42%', 
        padding: '40px', 
        backgroundColor: 'var(--card-bg)', 
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '2px',
        boxShadow: '15px 15px 0px rgba(0,0,0,0.02)',
        position: 'relative'
      }}>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="sketch-text" 
          style={{ color: 'var(--accent-color)', fontSize: '1.4rem', marginBottom: '10px', display: 'block' }}
        >
          {exp.year}
        </motion.span>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{exp.role}</h3>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '25px' }}>
          {exp.company}
        </h4>
        <p style={{ color: 'var(--muted-text)', lineHeight: '1.8', fontSize: '1rem' }}>{exp.desc}</p>
        
        {/* Timeline Node - Animated */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          style={{ 
            position: 'absolute', 
            top: '45px', 
            [i % 2 === 0 ? 'right' : 'left']: '-10.5%', 
            width: '20px', 
            height: '20px', 
            backgroundColor: 'var(--bg-color)',
            border: '4px solid var(--accent-color)',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15
          }} 
        />
        
        {/* Hand drawn accent */}
        {i === 0 && (
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', opacity: 0.5 }}>
            <span className="sketch-text" style={{ fontSize: '1rem', color: 'var(--accent-color)' }}>Recent</span>
            <svg width="40" height="40" style={{ display: 'block' }}>
               <path d="M10,30 Q30,30 30,10" fill="none" stroke="var(--accent-color)" strokeWidth="1" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Experience
