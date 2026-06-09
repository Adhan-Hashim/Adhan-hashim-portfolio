import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicQuote = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 1.5 } }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.2)',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.2em',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              Where words fail,
            </motion.h2>
          </div>
          
          <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
            <motion.h2
              initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#ff3c3c',
                letterSpacing: '0.2em',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '0 0 30px rgba(255, 60, 60, 0.4)'
              }}
            >
              Music speaks.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)',
              color: '#fff',
              letterSpacing: '0.5em',
              marginTop: '3rem',
              textTransform: 'uppercase',
              fontWeight: 300
            }}
          >
            — Hans Christian Andersen —
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LyricsPathOverlay = ({ isSadMode, audioRef, lyrics = [], currentTime, hasSeenIntro }) => {
  const [dimensions, setDimensions] = React.useState({ width: window.innerWidth, height: window.innerHeight });

  React.useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentLine = useMemo(() => {
    // Only return lyrics if we are at or past the first lyric time
    if (!lyrics || lyrics.length === 0) return null;
    return [...lyrics].reverse().find(l => currentTime >= l.time) || null;
  }, [currentTime, lyrics]);

  const nextLineTime = useMemo(() => {
    if (!currentLine || !lyrics) return 0;
    const nextIndex = lyrics.findIndex(l => l === currentLine) + 1;
    return lyrics[nextIndex]?.time || currentLine.time + 10;
  }, [currentLine, lyrics]);

  // Quote logic: Show only once per session, until 22s
  const showQuote = !hasSeenIntro && currentTime < 22;

  if (!isSadMode) return null;

  const { width, height } = dimensions;
  const leftY = height * 0.02;
  const rightY = height * 0.04;
  const bottomLeftY = height * 0.98;
  const bottomRightY = height * 0.96;

  const pathData = `M 0,${leftY} C ${width * 0.3},0 ${width * 0.6},${height * 0.1} ${width},${rightY}`;
  // Flipped path direction (Right to Left) for the bottom to "throw it outside"
  const bottomPathData = `M ${width},${bottomRightY} C ${width * 0.6},${height * 0.9} ${width * 0.3},${height} 0,${bottomLeftY}`;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 20
    }}>
      {/* CINEMATIC HANS CHRISTIAN ANDERSEN QUOTE */}
      <CinematicQuote isVisible={showQuote} />


      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <path id="guitarCurve" d={pathData} />
          <path id="bottomGuitarCurve" d={bottomPathData} />
        </defs>
        
        <AnimatePresence mode="wait">
          {currentLine && (
            <React.Fragment key={currentLine.time}>
              {/* TOP LYRICS */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  fill: '#ffffff',
                  fontFamily: 'var(--font-main)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.6rem)',
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  filter: 'drop-shadow(0 0 12px rgba(255, 60, 60, 1))',
                  textShadow: '0 0 20px rgba(0,0,0,0.8)'
                }}
              >
                <motion.textPath 
                  href="#guitarCurve" 
                  initial={{ startOffset: "-20%" }}
                  animate={{ startOffset: "120%" }}
                  transition={{ 
                    duration: Math.max(0.1, nextLineTime - currentLine.time), 
                    ease: "linear" 
                  }}
                >
                  {currentLine.text}
                </motion.textPath>
              </motion.text>

              {/* BOTTOM LYRICS (Opposite Direction & Flipped Outside) */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  fill: '#ffffff',
                  fontFamily: 'var(--font-main)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.6rem)',
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  filter: 'drop-shadow(0 0 12px rgba(255, 60, 60, 1))',
                  textShadow: '0 0 20px rgba(0,0,0,0.8)'
                }}
              >
                <motion.textPath 
                  href="#bottomGuitarCurve" 
                  // Since the path is reversed, -20% to 120% moves it Right to Left visually
                  initial={{ startOffset: "-20%" }}
                  animate={{ startOffset: "120%" }}
                  transition={{ 
                    duration: Math.max(0.1, nextLineTime - currentLine.time), 
                    ease: "linear" 
                  }}
                >
                  {currentLine.text}
                </motion.textPath>
              </motion.text>
            </React.Fragment>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );


};

export default LyricsPathOverlay;
