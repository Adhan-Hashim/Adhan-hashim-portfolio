import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import experienceImg from '../assets/experience adhan.png';
import './ExperiencePage.css';

const timelineData = [
  {
    year: "Aug 2025 - Mar 2026",
    title: "Technical Coordinator",
    company: "IEEE SB CEV",
    desc: "Collaborating with teams to understand requirements, support execution, and ensure smooth user experiences across events and initiatives."
  },
  {
    year: "Sep 2025 - Feb 2026",
    title: "UI/UX Designer Intern",
    company: "Lofritex",
    desc: "Designing user-centered interfaces, collaborating with developers, and improving product usability through research and iterative design."
  },
  {
    year: "Mar 2025 - Mar 2026",
    title: "Designer",
    company: "IEEE EdSoc Kerala Chapter",
    desc: "Creating posters and promotional materials for events and initiatives, utilizing Figma to craft professional and visually consistent designs."
  },
  {
    year: "May 2024 - Feb 2025",
    title: "Media Lead",
    company: "IEEE SB CEV",
    desc: "Handled design and video content for events, promotions, and social media. Enhanced digital presence and audience engagement."
  },
  {
    year: "Mar 2025 - Mar 2026",
    title: "Video Editor",
    company: "IEEE EdSoc Kerala Chapter",
    desc: "Created engaging and informative video content highlighting events, initiatives, and educational projects across the state."
  },
  {
    year: "Sep 2024 - Present",
    title: "Video Editor",
    company: "Made Webs",
    desc: "Created promotional and branding content showcasing products, services, and client success stories for social media, websites, and campaigns."
  }
];

const ExperiencePage = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Winding path for 6 items
  // Starts at top center, loops right, left, right, left, right, left
  const pathD = "M 50 0 C 120 10, 120 190, 50 200 C -20 210, -20 390, 50 400 C 120 410, 120 590, 50 600 C -20 610, -20 790, 50 800 C 120 810, 120 990, 50 1000 C -20 1010, -20 1190, 50 1200";

  return (
    <div className={`experience-page ${isStudio ? 'dark-theme' : 'light-theme'} ${isSadMode ? 'sad-mode' : ''}`}>
      <Navbar isStudio={isStudio} toggleStudio={toggleStudio} isSadMode={isSadMode} isPlaying={isPlaying} />

      <main className="roadmap-main">
        <div className="roadmap-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img
              src={experienceImg}

              style={{ width: '320px', height: 'auto', marginBottom: '-384px', transform: 'translate(328px, 10px)', zIndex: 2, position: 'relative' }}
            />
            <h1 className="roadmap-title" style={{ position: 'relative', zIndex: 1 }}>PROFESSIONAL EXPERIENCE</h1>
            <p className="roadmap-subtitle sketch-text">My journey so far.</p>
          </motion.div>
        </div>

        <div className="roadmap-container" ref={containerRef}>
          {/* Animated SVG Path */}
          <div className="roadmap-svg-wrapper">
            <svg className="roadmap-svg" viewBox="0 0 100 1200" preserveAspectRatio="none">
              <path
                d={pathD}
                fill="none"
                stroke="var(--text-color)"
                strokeWidth="0.5"
                strokeOpacity="0.1"
                strokeDasharray="2 2"
              />
              <motion.path
                d={pathD}
                fill="none"
                stroke="var(--accent-color)"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="roadmap-nodes-container">
            {timelineData.map((item, index) => (
              <RoadmapNode key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const RoadmapNode = ({ data, index }) => {
  // If curve goes right, node text should be on the LEFT
  const isRightCurve = index % 2 === 0;

  return (
    <div className={`roadmap-node-wrapper ${isRightCurve ? 'align-left' : 'align-right'}`}>
      <motion.div
        className="roadmap-card"
        initial={{ opacity: 0, x: isRightCurve ? -50 : 50, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <span className="roadmap-year sketch-text">{data.year}</span>
        <h3 className="roadmap-role">{data.title}</h3>
        <h4 className="roadmap-company">{data.company}</h4>
        <p className="roadmap-desc">{data.desc}</p>
      </motion.div>

      {/* The dot on the path */}
      <motion.div
        className="roadmap-dot"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
      >
        <div className="dot-inner" />
      </motion.div>
    </div>
  );
};

export default ExperiencePage;
