import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './WorksPage.css';

// Assets
import designImg from '../assets/works/design.png';
import webImg from '../assets/works/web.png';
import videoImg from '../assets/works/video.png';
import othersImg from '../assets/works/others.png';

const sections = [
  {
    id: 'design',
    number: '#1',
    title: 'UI and Design',
    subtitle: 'Creative conference',
    desc: 'Exploring the depths of visual aesthetics, user interfaces, and brand identities.',
    img: designImg,
    shapeClass: 'shape-square-orange'
  },
  {
    id: 'dev',
    number: '#2',
    title: 'Dev or Projects',
    subtitle: 'Creativity at work',
    desc: 'Building functional, scalable, and impactful digital experiences with modern web tech.',
    img: webImg,
    shapeClass: 'shape-circle-cyan'
  },
  {
    id: 'video',
    number: '#3',
    title: 'Video',
    subtitle: 'Creative progress',
    desc: 'Telling compelling stories through motion graphics and cinematic visuals.',
    img: videoImg,
    shapeClass: 'shape-triangle-blue'
  },
  {
    id: 'others',
    number: '#4',
    title: 'Others',
    subtitle: 'Creativity in ideas',
    desc: 'A collection of miscellaneous creative experiments and unique ideas.',
    img: othersImg,
    shapeClass: 'shape-triangle-pink'
  }
];

const WorksPage = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`works-portfolio-page ${isStudio ? 'dark-theme' : 'light-theme'} ${isSadMode ? 'sad-mode' : ''}`}>
      <Navbar isStudio={isStudio} toggleStudio={toggleStudio} isSadMode={isSadMode} isPlaying={isPlaying} />
      
      <main className="works-portfolio-container">
        <div className="works-grid">
          {sections.map((section, index) => (
            <motion.div 
              key={section.id}
              className={`works-card card-${index + 1}`}
              onClick={() => navigate(`/works/${section.id}`)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 0.98 }}
            >
              <div className="card-bg">
                <img src={section.img} alt={section.title} className="card-img grayscale" />
                <div className={`card-shape ${section.shapeClass}`}></div>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <span className="card-small-text">Works model</span>
                  <div className="card-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>

                <div className="card-main">
                  <span className="card-number">{section.number}</span>
                  <h2 className="card-title">{section.title}</h2>
                  <h3 className="card-subtitle">{section.subtitle}</h3>
                  <p className="card-desc">{section.desc}</p>
                </div>

                <div className="card-footer">
                  <span className="card-small-text">Works model</span>
                </div>
                
                {/* Vertical decorative text */}
                <div className="card-vertical-text">Creative</div>
                {/* Horizontal hollow text */}
                <div className="card-hollow-text">Creative</div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorksPage;
