import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const CharacterStagger = ({ text, isActive, color }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-flex', overflow: 'hidden', height: '1.2em', position: 'relative' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <motion.div
          animate={{ y: isHovered ? '-100%' : '0%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex' }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          animate={{ y: isHovered ? '-100%' : '0%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', position: 'absolute', top: '100%' }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 0 }}
              animate={{ color: 'var(--accent-color)' }}
              style={{ display: 'inline-block', fontStyle: 'italic', fontFamily: 'var(--font-pieter-serif)' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SoundVisualizer = ({ isPlaying, isSadMode }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '15px', padding: '0 10px' }}>
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            height: isPlaying ? [5, 15, 8, 12, 5] : 4,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            width: '2px',
            backgroundColor: isSadMode ? '#fff' : 'var(--accent-color)',
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
};

const Navbar = ({ isStudio, toggleStudio, isSadMode, isPlaying }) => {
  const links = ['HOME', 'WORK', 'ABOUT', 'EXPERIENCE']
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollY, setScrollY] = React.useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNearBottomMobile, setIsNearBottomMobile] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setIsNearBottomMobile(window.innerWidth <= 768 && window.scrollY >= maxScroll - 250);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initialize
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (link) => {
    if (link === 'HOME') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/')
      }
    } else if (link === 'WORK') {
      navigate('/works')
    } else if (link === 'ABOUT') {
      navigate('/about')
    } else if (link === 'EXPERIENCE') {
      navigate('/experience')
    } else {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        const el = document.getElementById(link.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="navbar" style={{ mixBlendMode: 'normal', zIndex: 1000, padding: '25px 5%' }}>
      <div 
        className="nav-logo"
        style={{ 
          opacity: isNearBottomMobile ? 0 : 1,
          pointerEvents: isNearBottomMobile ? 'none' : 'auto',
          transition: 'opacity 0.3s ease'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: isSadMode ? '#fff' : 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span className="sketch-text" style={{ fontSize: '1.8rem', letterSpacing: '0' }}>Adhan.</span>
          <SoundVisualizer isPlaying={isPlaying} isSadMode={isSadMode} />
        </Link>
      </div>

      <div className="nav-links" style={{ gap: '30px' }}>
        {links.map((link) => {
          const isActive = (link === 'WORK' && location.pathname.includes('/works')) || 
                          (link === 'ABOUT' && location.pathname === '/about') || 
                          (link === 'EXPERIENCE' && location.pathname === '/experience') ||
                          (link === 'HOME' && location.pathname === '/');
          
          const isOverHeroImage = !isStudio && scrollY < 500 && (link === 'WORK' || link === 'ABOUT' || link === 'EXPERIENCE');
          const linkColor = isOverHeroImage ? '#FFFFFF' : (isActive ? 'var(--accent-color)' : 'var(--text-color)');

          return (
            <motion.button
              key={link}
              onClick={() => handleNavClick(link)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: linkColor,
                fontSize: '0.7rem',
                letterSpacing: '3px',
                fontWeight: 600,
                padding: '10px 0',
                transition: 'color 0.3s ease'
              }}
            >
              <CharacterStagger text={link} isActive={isActive} color={linkColor} />
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'var(--accent-color)',
                  }}
                />
              )}
            </motion.button>
          );
        })}

        <ThemeToggle isStudio={isStudio} toggleStudio={toggleStudio} />
      </div>

      {/* Mobile Controls (Theme Toggle + Hamburger) */}
      <div 
        className="mobile-controls"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '15px',
          zIndex: 1001,
        }}
      >
        <ThemeToggle isStudio={isStudio} toggleStudio={toggleStudio} />
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isSadMode ? '#fff' : 'var(--text-color)',
            padding: '5px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: isSadMode ? 'rgba(26, 0, 0, 0.96)' : (isStudio ? 'rgba(12, 12, 12, 0.98)' : 'rgba(248, 247, 242, 0.98)'),
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '35px',
              padding: '20px'
            }}
          >
            {links.map((link) => {
              const isActive = (link === 'WORK' && location.pathname.includes('/works')) || 
                              (link === 'ABOUT' && location.pathname === '/about') || 
                              (link === 'EXPERIENCE' && location.pathname === '/experience') ||
                              (link === 'HOME' && location.pathname === '/');
              return (
                <motion.button
                  key={link}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleNavClick(link);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    letterSpacing: '4px',
                    color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {link}
                </motion.button>
              );
            })}
            
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
