import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import GuitarBackground from './components/GuitarBackground'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import ToolsSection from './components/ToolsSection'
import Cursor from './components/Cursor'
import CreativeMarquee from './components/CreativeMarquee'
import WorksPage from './components/WorksPage'
import WorksSectionPage from './components/WorksSectionPage'
import ExperiencePage from './components/ExperiencePage'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import { SONGS } from './data/songs'
import SongCarousel from './components/SongCarousel'
import GlassPlayerBar from './components/GlassPlayerBar'


const HomePage = ({ isStudio, setIsStudio, isSadMode, setIsSadMode, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex, audioTime, setAudioTime, hasSeenIntro, setHasSeenIntro }) => {
  const labRef = useRef(null);
  const [isLabInView, setIsLabInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsLabInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (labRef.current) observer.observe(labRef.current);
    return () => observer.disconnect();
  }, []);

  const showControls = isSadMode && (hasSeenIntro || audioTime > 22);
  const showFloatingPlayer = isSadMode && !isLabInView && isSadMode; 

  const textVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: i => ({
      y: 0, opacity: 1,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    })
  };

  return (
    <main>
      <Hero isStudio={isStudio} isSadMode={isSadMode} />
      <Work />
      <ToolsSection isStudio={isStudio} isSadMode={isSadMode} />
      <Experience />
      <CreativeMarquee />

      {/* FOOTER GUITAR SECTION (THE LAB) */}
      <section id="lab" ref={labRef} style={{ position: 'relative', width: '100%', height: '100vh', pointerEvents: 'auto', overflow: 'visible', background: 'transparent' }}>
        <GuitarBackground 
          isStudio={isStudio} 
          isSadMode={isSadMode} 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsSadMode={setIsSadMode} 
          currentSong={SONGS[currentSongIndex]}
          currentTime={audioTime}
          onTimeUpdate={setAudioTime}
          hasSeenIntro={hasSeenIntro}
        />

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          animate={{ opacity: isSadMode ? 0 : 1, y: isSadMode ? -20 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'absolute', top: '12vh', left: '10vw', zIndex: 15, pointerEvents: 'none' }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.div custom={0} variants={textVariants} style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 5vw, 3rem)', letterSpacing: '0.2em', lineHeight: 1.2, color: isSadMode ? '#fff' : 'var(--text-color)', transition: '0.8s' }}>THE</motion.div>
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <motion.div custom={1} variants={textVariants} style={{ fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 12rem)', letterSpacing: '-0.07em', lineHeight: 0.7, color: isSadMode ? '#fff' : 'var(--text-color)', transition: '0.8s' }}>GUITAR</motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              style={{ height: '3px', backgroundColor: 'var(--accent-color)', marginTop: '15px' }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          animate={{ opacity: isSadMode ? 0 : 1, y: isSadMode ? 20 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'absolute', bottom: '15vh', right: '10vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none', zIndex: 15 }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.div custom={2} variants={textVariants} style={{ fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.06em', lineHeight: 0.8, color: isSadMode ? '#fff' : 'var(--text-color)', transition: '0.8s' }}>MUSIC</motion.div>
          </div>
          <div style={{ overflow: 'hidden', marginTop: '5px' }}>
            <motion.div custom={3} variants={textVariants} style={{ fontFamily: 'var(--font-sketch)', color: isSadMode ? '#fff' : 'var(--accent-color)', fontSize: 'clamp(1rem, 3vw, 2.5rem)', letterSpacing: '0.15em', transition: '0.8s', fontWeight: 300 }}>is the answer.</motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          animate={{ opacity: isSadMode ? 0 : 0.5 }}
          transition={{ duration: 0.8 }}
          onClick={() => {
            setIsSadMode(true);
            setIsPlaying(true);
          }}
          style={{ 
            position: 'absolute', 
            top: '0.5vh', 
            right: '5vw', 
            zIndex: 25, 
            cursor: 'pointer',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span className="sketch-text" style={{ color: 'var(--accent-color)', fontSize: '0.8rem', marginBottom: '5px' }}>
            Play me
          </span>
          <svg width="50" height="40" viewBox="0 0 100 80">
            <motion.path 
              d="M80,10 C60,10 40,30 20,60" 
              fill="none" 
              stroke="var(--accent-color)" 
              strokeWidth="1.5" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              viewport={{ once: true }}
            />
            <motion.path 
              d="M35,55 L20,60 L25,45" 
              fill="none" 
              stroke="var(--accent-color)" 
              strokeWidth="1.5" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: 2.3, duration: 0.5 }}
              viewport={{ once: true }}
            />
          </svg>
        </motion.div>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <div style={{ pointerEvents: 'auto', width: '100%' }}>
                <SongCarousel 
                  songs={SONGS} 
                  currentIndex={currentSongIndex} 
                  onSelect={(idx) => setCurrentSongIndex(idx)} 
                />
              </div>

              <div style={{ position: 'absolute', bottom: '10vh', pointerEvents: 'auto' }}>
                <GlassPlayerBar 
                  currentSong={SONGS[currentSongIndex]}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onNext={() => setCurrentSongIndex((currentSongIndex + 1) % SONGS.length)}
                  onPrev={() => setCurrentSongIndex((currentSongIndex - 1 + SONGS.length) % SONGS.length)}
                  onExit={() => {
                    setIsSadMode(false);
                    setIsPlaying(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isSadMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'absolute',
                bottom: '10vh',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20
              }}
            >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsSadMode(true);
                setIsPlaying(true);
              }}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--accent-color)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255, 60, 60, 0.4)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />

      <AnimatePresence>
        {showFloatingPlayer && (
          <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10001,
            pointerEvents: 'auto'
          }}>
             <GlassPlayerBar 
                currentSong={SONGS[currentSongIndex]}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onNext={() => setCurrentSongIndex((currentSongIndex + 1) % SONGS.length)}
                onPrev={() => setCurrentSongIndex((currentSongIndex - 1 + SONGS.length) % SONGS.length)}
                isMini={true}
                onExit={() => {
                  setIsSadMode(false);
                  setIsPlaying(false);
                }}
              />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

function App() {
  const [isStudio, setIsStudio] = useState(false);
  const [isSadMode, setIsSadMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    if (isStudio) {
      document.body.classList.add('studio-mode');
    } else {
      document.body.classList.remove('studio-mode');
    }
  }, [isStudio]);

  useEffect(() => {
    if (audioTime > 22 && isSadMode) {
      setHasSeenIntro(true);
    }
  }, [audioTime, isSadMode]);

  return (
    <Router>
      <Cursor isSadMode={isSadMode} />

      <motion.div
        animate={{ opacity: isSadMode ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(120,0,0,0.35) 0%, rgba(40,0,0,0.55) 100%)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      <SmoothScroll>
        <div className={`app-container ${isStudio ? 'studio-mode' : ''} ${isSadMode ? 'sad-mode-active' : ''}`} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'var(--transition-color), filter 1.5s ease' }}>
          <Navbar isStudio={isStudio} toggleStudio={() => setIsStudio(!isStudio)} isSadMode={isSadMode} isPlaying={isPlaying} />
          
          <Routes>
            <Route path="/" element={
              <HomePage 
                isStudio={isStudio} setIsStudio={setIsStudio}
                isSadMode={isSadMode} setIsSadMode={setIsSadMode}
                isPlaying={isPlaying} setIsPlaying={setIsPlaying}
                currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex}
                audioTime={audioTime} setAudioTime={setAudioTime}
                hasSeenIntro={hasSeenIntro} setHasSeenIntro={setHasSeenIntro}
              />
            } />
            <Route path="/works" element={<WorksPage isStudio={isStudio} toggleStudio={() => setIsStudio(!isStudio)} isSadMode={isSadMode} isPlaying={isPlaying} />} />
            <Route path="/works/:sectionId" element={<WorksSectionPage isStudio={isStudio} toggleStudio={() => setIsStudio(!isStudio)} isSadMode={isSadMode} isPlaying={isPlaying} />} />
            <Route path="/experience" element={<ExperiencePage isStudio={isStudio} toggleStudio={() => setIsStudio(!isStudio)} isSadMode={isSadMode} isPlaying={isPlaying} />} />
            <Route path="/about" element={<AboutPage isStudio={isStudio} toggleStudio={() => setIsStudio(!isStudio)} isSadMode={isSadMode} isPlaying={isPlaying} />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  )
}

export default App
