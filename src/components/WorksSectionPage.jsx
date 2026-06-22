import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import './WorksPage.css'; // Reuse some general styles

const posters = [
  { id: 1, url: '/assets/posters/A4 - 4ERD.png' },
  { id: 2, url: '/assets/posters/cr.png' },
  { id: 3, url: '/assets/posters/messi.png' },
  { id: 4, url: '/assets/posters/messii.png' },
  { id: 5, url: '/assets/posters/messiii.png' },
  { id: 6, url: '/assets/posters/njr.png' },
  { id: 7, url: '/assets/posters/poster 4.png' },
  { id: 8, url: '/assets/posters/poster11.png' },
  { id: 9, url: '/assets/posters/poster12.png' },
  { id: 10, url: '/assets/posters/poster2.png' },
  { id: 11, url: '/assets/posters/poster3.png' },
  { id: 12, url: '/assets/posters/poster5.png' },
  { id: 13, url: '/assets/posters/poster6.png' },
  { id: 14, url: '/assets/posters/poster7.png' },
  { id: 15, url: '/assets/posters/poster8.png' },
  { id: 16, url: '/assets/posters/poster9.png' },
];

const WorksSectionPage = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  const { sectionId } = useParams();
  const [activeTab, setActiveTab] = useState('ui');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('ui');
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
    dev: [
      {
        title: "somojo",
        desc: "A JavaScript project focusing on dynamic content and functionality.",
        link: "https://github.com/Adhan-Hashim/somojo",
        linkText: "View on GitHub"
      },
      {
        title: "E-Store",
        desc: "A DBMS project showcasing database management and e-commerce functionalities.",
        link: "https://github.com/Adhan-Hashim/E-Store",
        linkText: "View on GitHub"
      },
      {
        title: "swara",
        desc: "A TypeScript-based application focusing on robust web development patterns.",
        link: "https://github.com/Adhan-Hashim/swara",
        linkText: "View on GitHub",
        liveLink: "https://swara-8fq.pages.dev/",
        liveLinkText: "Live Demo"
      },
      {
        title: "OkaySpace",
        desc: "A JavaScript-based project exploring interactive web applications.",
        link: "https://github.com/Adhan-Hashim/OkaySpace",
        linkText: "View on GitHub"
      },
      {
        title: "jango",
        desc: "An HTML-based project exploring web design and structure.",
        link: "https://github.com/Adhan-Hashim/jango",
        linkText: "View on GitHub"
      },
      {
        title: "ieeedemo",
        desc: "A JavaScript demo project related to IEEE initiatives.",
        link: "https://github.com/Adhan-Hashim/ieeedemo",
        linkText: "View on GitHub"
      }
    ],
    video: [
      {
        title: "Skill Kerala Global Summit",
        desc: "Produced a video representing the college at the Skill Kerala Global Summit, highlighting the college's initiatives and accomplishments."
      },
      {
        title: "INFERNO – The Art of Timeless Style",
        desc: "Fashion Show",
        link: "https://www.instagram.com/reel/DUCo690iF51/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "Onam Celebration Video",
        desc: "An AI generated video capturing the vibrant celebrations, cultural events, and festive spirit of Onam.",
        link: "https://www.behance.net/gallery/250543007/onam",
        linkText: "Watch on Behance"
      },
      {
        title: "Execom introduction",
        desc: "Shot and edited the IEEE SB CEV New Execom Introduction video, combining dynamic visuals, smooth transitions, and engaging storytelling to highlight the fresh faces of leadership.",
        link: "https://www.instagram.com/reel/DBggNipSeE8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "EDGE '24",
        desc: "A highlight video wrapping up EDGE '24, celebrating the success of the Membership Development Programme by IEEE SB CEV.",
        link: "https://www.instagram.com/reel/DADuXRnR-PA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "Magnathon 3.0",
        desc: "Reel for engaging registrations for the Hackathon.",
        link: "https://www.instagram.com/reel/DT2tsUiEmWy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "𝗗𝗜𝗦𝗛𝗔 – 𝗘𝗽𝗶𝘀𝗼𝗱𝗲 𝟭",
        desc: "Empowering women, building confidence, and bridging the digital divide – From Basics to Brilliance!",
        link: "https://www.instagram.com/reel/DN-xMtiDLrW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "AGM 2024, IEEE EDSOC KERALA CHAPTER",
        desc: "Captured and edited the highlights of the IEEE Education Society Kerala Chapter Annual General Meeting 2024 — a memorable event celebrating achievements and setting the tone for a year of innovation and impact.",
        link: "https://www.instagram.com/reel/DHYmP8EAqm4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },
      {
        title: "ENABLE 2024",
        desc: "a hands on LED workshop for Neurodiverse children transforming ideas into glowing realities. ",
        link: "https://www.instagram.com/reel/C9y6pTsPKUL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        linkText: "Watch on Instagram"
      },

      {
        title: "Uplift",
        desc: "Volunteered as the video editor for Uplift, a flagship initiative by IEEE EdSoc Kerala Chapter aimed at empowering pre-university girls through inspirational talks and hands-on STEM workshops."
      },

    ],
    design: [
      {
        title: "Swara Design Project",
        desc: "A creative design project exploring visual identity, aesthetic compositions, and engaging graphics.",
        link: "https://www.behance.net/gallery/250798941/swara",
        linkText: "View on Behance",
        liveLink: "https://swara-8fq.pages.dev/",
        liveLinkText: "Live Project"
      },
      {
        title: "Chitralai UI Redesign",
        desc: "A collection of web user interface designs and concepts, highlighting clean layouts, engaging aesthetics, and responsive design patterns.",
        link: "https://www.behance.net/gallery/250542417/web-ui",
        linkText: "View on Behance"
      },
      {
        title: "Spotify UI Redesign",
        desc: "A concept redesign of the Spotify user interface, focusing on improved usability, cleaner visual hierarchy, and an enhanced listening experience.",
        link: "https://www.behance.net/gallery/250538815/spotify-redesigned-ui",
        linkText: "View on Behance"
      },
      {
        title: "Lofritex ui design",
        desc: "A collection of user interface designs and explorations, focusing on clean aesthetics, user experience, and modern layout principles.",
        link: "https://www.behance.net/gallery/250540105/ui",
        linkText: "View on Behance"
      },

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

          {sectionId === 'design' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
              <button 
                onClick={() => setActiveTab('ui')}
                style={{
                  padding: '10px 30px',
                  borderRadius: '30px',
                  border: `2px solid ${content.color}`,
                  background: activeTab === 'ui' ? content.color : 'transparent',
                  color: activeTab === 'ui' ? '#fff' : 'var(--text-color)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                UI
              </button>
              <button 
                onClick={() => setActiveTab('design')}
                style={{
                  padding: '10px 30px',
                  borderRadius: '30px',
                  border: `2px solid ${content.color}`,
                  background: activeTab === 'design' ? content.color : 'transparent',
                  color: activeTab === 'design' ? '#fff' : 'var(--text-color)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Design
              </button>
            </div>
          )}

          {sectionId === 'design' && activeTab === 'design' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'var(--works-posters-grid, repeat(5, 1fr))',
              gap: '15px',
              textAlign: 'left'
            }}>
              {posters.map(poster => (
                <motion.div key={poster.id} 
                  whileHover={{ scale: 1.8, zIndex: 10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                  position: 'relative',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                  border: `1px solid ${content.color}30`,
                  aspectRatio: '1080 / 1350',
                  cursor: 'crosshair',
                  transformOrigin: 'center center'
                }}>
                  <img loading="lazy" src={poster.url} alt={`Poster ${poster.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'left'
            }}>
              {projects.length > 0 ? projects.map((p, i) => (
                <div key={i} style={{
                  padding: 'var(--project-card-padding, 30px)',
                  backgroundColor: isStudio ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '15px',
                  border: `1px solid ${content.color}30`
                }}>
                  <h3 style={{ marginBottom: '15px', color: content.color, fontSize: '1.5rem' }}>{p.title}</h3>
                  <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '1.1rem', marginBottom: (p.link || p.liveLink) ? '20px' : '0' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: content.color,
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        border: `1px solid ${content.color}`,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease'
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = content.color;
                          e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = content.color;
                        }}
                      >
                        {p.linkText || "View Project"} <span style={{ fontSize: '1.2rem' }}>↗</span>
                      </a>
                    )}
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#fff',
                        backgroundColor: content.color,
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        border: `1px solid ${content.color}`,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease'
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = content.color;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = content.color;
                          e.target.style.color = '#fff';
                        }}
                      >
                        {p.liveLinkText || "Live Demo"} <span style={{ fontSize: '1.2rem' }}>↗</span>
                      </a>
                    )}
                  </div>
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
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default WorksSectionPage;
