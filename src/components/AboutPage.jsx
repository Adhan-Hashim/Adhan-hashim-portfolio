import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPenNib, FaDesktop, FaCube, FaGithub, FaBehance, FaArrowRight, FaInstagram, FaGoogle } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutPage.css';
import { GitHubCalendar } from 'react-github-calendar';

// Assets
import about1 from '../assets/about/about 1.mp4';
import meImg from '../assets/about_adhan.png';
import socialImage from '../assets/social_adhan.png';

const InteractiveConnect = ({ isStudio }) => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socials = [
    {
      id: 'github', name: 'GitHub', icon: <FaGithub />,
      labelTop: '42%', labelLeft: '18%',
      url: 'https://github.com/Adhan-Hashim'
    },
    {
      id: 'google', name: 'Google', icon: <SiGmail />,
      labelTop: '44%', labelLeft: '51%',
      url: 'mailto:adhanhashim@gmail.com'
    },
    {
      id: 'behance', name: 'Behance', icon: <FaBehance />,
      labelTop: '43%', labelLeft: '82%',
      url: 'https://www.behance.net/adhanhashim'
    },
    {
      id: 'instagram', name: 'Instagram', icon: <FaInstagram />,
      labelTop: '73%', labelLeft: '36%',
      url: 'https://instagram.com/adhan_hashim'
    },
    {
      id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin />,
      labelTop: '73%', labelLeft: '72%',
      url: 'https://linkedin.com/in/adhan-hashim'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '100px', marginBottom: '60px' }}>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-heading, sans-serif)',
          fontWeight: 800,
          marginBottom: '50px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          backgroundImage: isStudio ? 'linear-gradient(to right, #fff, #aaa)' : 'linear-gradient(to right, #111, #666)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}
      >
        Let's Connect
      </motion.h3>

      <div className="connect-image-container" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        overflow: 'hidden',
        boxShadow: isStudio ? '0 -10px 40px rgba(0,0,0,0.3)' : '0 -10px 40px rgba(0,0,0,0.05)',
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
      }}>
        <img src={socialImage} alt="Socials" style={{ width: '100%', height: 'auto', display: 'block' }} />

        {socials.map((social) => (
          <div
            key={social.id}
            style={{
              position: 'absolute',
              top: social.labelTop,
              left: social.labelLeft,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
          >
            <motion.a
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredSocial(social.id)}
              onMouseLeave={() => setHoveredSocial(null)}
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              {/* The Glassy Square Button */}
              <motion.div
                style={{
                  width: 'clamp(40px, 5vw, 65px)',
                  height: 'clamp(40px, 5vw, 65px)',
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '25%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                }}
                animate={{
                  background: hoveredSocial === social.id ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: hoveredSocial === social.id ? '0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.2)' : '0 15px 35px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)'
                }}
              >
                {social.icon}
              </motion.div>
            </motion.a>
          </div>
        ))}
      </div>
    </div>
  );
};

const IDCard = () => {
  const cardRef = useRef(null);
  const [langIndex, setLangIndex] = useState(0);
  const languages = ["ഞാൻ", "I'm", "Yo", "Je", "Ich", "私", "मैं", "أنا", "Я", "我"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  const x = useSpring(xRaw, { stiffness: 100, damping: 20 });
  const y = useSpring(yRaw, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    xRaw.set(e.clientX - centerX);
    yRaw.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    xRaw.set(0);
    yRaw.set(0);
  };

  return (
    <div className="id-card-wrapper-v4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="ribbon-lanyard">
        <div className="ribbon-left">
          <div className="ribbon-text">ADHAN HASHIM • CREATIVE • ADHAN HASHIM • </div>
        </div>
        <div className="ribbon-right">
          <div className="ribbon-text">CREATIVE • ADHAN HASHIM • CREATIVE • </div>
        </div>
        <div className="ribbon-clip"></div>
      </div>

      <motion.div
        ref={cardRef}
        className="id-card-v4"
        style={{
          rotateX,
          rotateY,
          rotateZ: scrollRotate,
          y: scrollYOffset,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="card-gloss-v4"></div>
        <div className="id-card-inner-v4">
          <div className="card-top-v4">
            <motion.div
              key={langIndex}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="card-logo-v4"
            >
              {languages[langIndex]}
            </motion.div>
            <div className="card-notch-v4"></div>
          </div>
          <div className="card-photo-v4">
            <video autoPlay muted loop playsInline className="id-video-v4">
              <source src={about1} type="video/mp4" />
            </video>
          </div>
          <div className="card-details-v4">
            <h3 className="card-name-v4">ADHAN HASHIM</h3>
            <p className="card-role-v4">Designer / Video editor</p>
            <div className="card-divider-v4"></div>
            <div className="card-meta-v4">
              <div className="meta-item">
                <span>Birth</span>
                <strong>Jan 12 2004</strong>
              </div>
              <div className="meta-item">
                <span>Age</span>
                <strong>22</strong>
              </div>
            </div>
          </div>
          <div className="card-footer-v4">
            <div className="card-qr-v4">
              <svg viewBox="0 0 100 100">
                <path d="M10 10h20v20h-20zM15 15h10v10h-10zM70 10h20v20h-20zM75 15h10v10h-10zM10 70h20v20h-20zM15 75h10v10h-10zM40 10h20v10h-20zM40 30h10v10h-10zM60 40h30v10h-30zM10 40h20v20h-20zM40 70h30v20h-30zM80 70h10v20h-10z" fill="currentColor" />
              </svg>
            </div>
            <div className="card-barcode-v4">
              <div className="barcode-bars">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`barcode-bar w-${(i % 3) + 1}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AboutPage = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Creative Parallax: Letters spreading horizontally
  const spreadX = isMobile ? 35 : 120;
  const xA = useTransform(scrollYProgress, [0, 1], [0, -spreadX]);
  const xB = useTransform(scrollYProgress, [0, 1], [0, -spreadX / 2]);
  const xO = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const xU = useTransform(scrollYProgress, [0, 1], [0, spreadX / 2]);
  const xT = useTransform(scrollYProgress, [0, 1], [0, spreadX]);

  // Vertical Parallax for the whole typography group and image
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className={`about-page-v2 ${isSadMode ? 'sad-mode-active' : ''} ${isStudio ? 'studio-mode' : ''}`}>
      <Navbar isStudio={isStudio} toggleStudio={toggleStudio} isSadMode={isSadMode} isPlaying={isPlaying} />

      <main className="about-v2-main">
        {/* HERO SECTION */}
        <section className="about-v2-hero" ref={heroRef}>
          <div className="hero-content-wrapper">
            <div className="hero-typography">
              {/* BACK LAYER: All letters filled */}
              <motion.div className="hero-text-container back" style={{ y: yText }}>
                <motion.span style={{ x: xA }} className="letter-fill">A</motion.span>
                <motion.span style={{ x: xB }} className="letter-fill">B</motion.span>
                <motion.span style={{ x: xO }} className="letter-fill">O</motion.span>
                <motion.span style={{ x: xU }} className="letter-fill">U</motion.span>
                <motion.span style={{ x: xT }} className="letter-fill">T</motion.span>
              </motion.div>

              <motion.div
                className="hero-illustration-container"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ y: yImg, rotate: rotateImg, position: 'relative', marginTop: '-90px' }}
              >
                <img
                  src={meImg}
                  alt="Adhan"
                  className="hero-illustration"
                  style={isStudio ? {
                    maskImage: 'radial-gradient(circle at top right, transparent 5%, black 40%)',
                    WebkitMaskImage: 'radial-gradient(circle at top right, transparent 5%, black 40%)'
                  } : {}}
                />
              </motion.div>

              {/* FRONT LAYER: Outline letters (A, B, U, T) aligned with back layer */}
              <motion.div className="hero-text-container front" style={{ y: yText }}>
                <motion.span style={{ x: xA }} className="letter-stroke">A</motion.span>
                <motion.span style={{ x: xB }} className="letter-stroke">B</motion.span>
                <span className="letter-placeholder">O</span>
                <motion.span style={{ x: xU }} className="letter-stroke">U</motion.span>
                <motion.span style={{ x: xT }} className="letter-stroke">T</motion.span>
              </motion.div>
            </div>

            <div className="hero-meta">
              <div className="hero-name-label"></div>
            </div>
          </div>
        </section>

        {/* NEW DESIGN: SPLIT LAYOUT */}
        <section className="about-new-layout">
          {/* BIO TEXT - Visible on mobile at top, hidden on desktop */}
          <div className="about-text-block mobile-only">
            <h2 className="new-bio-heading">HI, I'M ADHAN.</h2>
            <p className="new-bio-paragraph">
              Computer Science student at the College of Engineering Vadakara (CEV) with a passion for design and video editing. Currently serving as Media Lead at IEEE SB CEV, and working as both Video Editor and Design Team Member at IEEE EdSoc Kerala Chapter, along with Made Web's. Skilled in Figma and Canva for UI/UX design, prototyping, and creating visually compelling content. Experienced in Adobe Premiere Pro and CapCut Pro for video editing, delivering impactful media that merges storytelling with clean, user-centered design.
            </p>
          </div>

          <div className="about-columns-container">
            {/* LEFT: STICKY VIDEO / ID CARD */}
            <div className="about-left-col">
              <IDCard />
            </div>

            {/* RIGHT: CONTENT */}
            <div className="about-right-col">
              {/* BIO TEXT - Visible on desktop, hidden on mobile */}
              <div className="about-text-block desktop-only">
                <h2 className="new-bio-heading">HI, I'm Adhan.</h2>
                <p className="new-bio-paragraph">
                  Computer Science student at the College of Engineering Vadakara (CEV) with a passion for design and video editing. Currently serving as Media Lead at IEEE SB CEV, and working as both Video Editor and Design Team Member at IEEE EdSoc Kerala Chapter, along with Made Web's. Skilled in Figma and Canva for UI/UX design, prototyping, and creating visually compelling content. Experienced in Adobe Premiere Pro and CapCut Pro for video editing, delivering impactful media that merges storytelling with clean, user-centered design.
                </p>
              </div>

              <div className="about-bento-grid">
                {/* EDUCATION */}
                <div className="bento-card education-bento">
                  <h3 className="bento-title">EDUCATION</h3>
                  <div className="education-list-wrapper">
                    <div className="education-item">
                      <div className="education-icon-circle">
                        <span>🎓</span>
                      </div>
                      <h4 className="edu-title">B.Tech Computer Science</h4>
                      <p className="edu-sub">College of Engineering Vadakara</p>
                      <span className="edu-status ongoing sketch-text">ONGOING</span>
                    </div>

                    <div className="education-divider"></div>

                    <div className="education-item">
                      <h4 className="edu-title">Higher Secondary</h4>
                      <p className="edu-sub">NHSS Nochad • Biology Science</p>
                      <span className="edu-status completed sketch-text">COMPLETED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GITHUB SECTION - REDESIGNED */}
        <section className="about-github-new">
          <div className="github-glass-container">
            <div className="github-header">
              <FaGithub className="github-logo-icon" />
              <h3 className="github-title-new">Open Source Contributions</h3>
            </div>
            <div className="github-calendar-wrapper">
              <GitHubCalendar
                username="Adhan-Hashim"
                colorScheme={isStudio ? "dark" : "light"}
                blockSize={14}
                blockMargin={5}
                fontSize={14}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>
        </section>

        {/* INTERACTIVE CONNECT SECTION */}
        <InteractiveConnect isStudio={isStudio} />

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
