import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import './WorksPage.css'; // Reuse some general styles

const WorksSectionPage = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  const { sectionId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectionId]);

  // Content for each section
  const sectionContent = {
    design: {
      title: "Creative Conference",
      subtitle: "UI & Design",
      color: "#f2982d", // Orange
      desc: "Exploring the depths of visual aesthetics and user interfaces."
    },
    dev: {
      title: "Creativity at Work",
      subtitle: "Dev & Projects",
      color: "#3bc6c3", // Cyan
      desc: "Building functional and impactful digital experiences."
    },
    video: {
      title: "Creative Progress",
      subtitle: "Video Production",
      color: "#4e7ab5", // Blue
      desc: "Telling stories through motion and cinematic visuals."
    },
    others: {
      title: "Creativity in Ideas",
      subtitle: "Other Explorations",
      color: "#e64390", // Pink
      desc: "A collection of miscellaneous creative experiments."
    }
  };

  const content = sectionContent[sectionId] || { title: "Not Found", subtitle: "", color: "#555", desc: "" };

  const sectionProjects = {
    video: [
      {
        title: "Execom introduction",
        desc: "Shot and edited the IEEE SB CEV New Execom Introduction video, combining dynamic visuals, smooth transitions, and engaging storytelling to highlight the fresh faces of leadership."
      },
      {
        title: "Skill Kerala Global Summit",
        desc: "Produced a video representing the college at the Skill Kerala Global Summit, highlighting the college's initiatives and accomplishments."
      },
      {
        title: "Uplift",
        desc: "Volunteered as the video editor for Uplift, a flagship initiative by IEEE EdSoc Kerala Chapter aimed at empowering pre-university girls through inspirational talks and hands-on STEM workshops."
      },
      {
        title: "AGM 2024, IEEE EDSOC KERALA CHAPTER",
        desc: "Captured and edited the highlights of the IEEE Education Society Kerala Chapter Annual General Meeting 2024 — a memorable event celebrating achievements and setting the tone for a year of innovation and impact."
      }
    ],
    design: [
      {
        title: "DISHA Series, IEEE EdSoc Kerala Chapter",
        desc: "Designed posters and visual assets for DISHA, an initiative for Kudumbashree members aimed at empowering women, building confidence, and bridging the digital divide."
      }
    ],
    others: [
      {
        title: "ENABLE",
        desc: "Empowering New Abilities and Broadening Learning Experiences is a heartwarming and hands-on initiative spearheaded by IEEE SB CEV's WIE AG in collaboration with the IEEE EdSoc Kerala Chapter."
      },
      {
        title: "e-kites 3.0",
        desc: "Played a key role in organizing e-KITES 3.0 at Ahalia School of Engineering and Technology, Palakkad. Assisted in event coordination and ensuring successful execution under IEEE Education Society Kerala Chapter."
      },
      {
        title: "Magnathon 3.0",
        desc: "Actively involved in organizing Magnathon 2.0, coordinating with teams and managing media coverage to support seamless execution of the hackathon."
      }
    ]
  };

  const projects = sectionProjects[sectionId] || [];

  return (
    <div className={`works-section-page ${isStudio ? 'dark-theme' : 'light-theme'} ${isSadMode ? 'sad-mode' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar isStudio={isStudio} toggleStudio={toggleStudio} isSadMode={isSadMode} isPlaying={isPlaying} />
      
      <main style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px', paddingLeft: '5%', paddingRight: '5%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <Link to="/works" style={{ 
            display: 'inline-block', 
            marginBottom: '30px', 
            padding: '10px 20px', 
            border: `2px solid ${content.color}`, 
            color: 'var(--text-color)', 
            textDecoration: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = content.color;
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--text-color)';
          }}
          >
            ← Back to Works
          </Link>
          
          <h4 style={{ color: content.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
            {content.subtitle}
          </h4>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '20px', fontWeight: 900 }}>
            {content.title}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px auto' }}>
            {content.desc}
          </p>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left'
          }}>
            {projects.length > 0 ? projects.map((p, i) => (
              <div key={i} style={{
                padding: '30px',
                backgroundColor: isStudio ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderRadius: '15px',
                border: `1px solid ${content.color}30`
              }}>
                <h3 style={{ marginBottom: '15px', color: content.color, fontSize: '1.5rem' }}>{p.title}</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '1.1rem' }}>{p.desc}</p>
              </div>
            )) : (
              <div style={{ 
                height: '20vh', 
                backgroundColor: isStudio ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px dashed ${content.color}50`
              }}>
                <p style={{ opacity: 0.5, fontStyle: 'italic' }}>Projects for this section will be updated soon.</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default WorksSectionPage;
