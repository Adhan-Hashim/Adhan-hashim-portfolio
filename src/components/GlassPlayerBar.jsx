import React from 'react';
import { motion } from 'framer-motion';
import { MagneticWrapper } from './MagneticButton';

const GlassPlayerBar = ({ currentSong, isPlaying, onTogglePlay, onNext, onPrev, onExit, isMini }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, scale: isMini ? 0.85 : 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      style={{
        width: 'clamp(300px, 70vw, 650px)',
        height: '60px',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px 0 20px',
        boxShadow: isMini ? '0 10px 30px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.5)',
        zIndex: 1000,
        position: 'relative'
      }}
    >
      {/* Left: Song Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, overflow: 'hidden' }}>
        <motion.div
          key={currentSong.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}
        >
          <img src={currentSong.cover} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSong.title}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.6, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSong.artist}</span>
        </div>
      </div>

      {/* Middle: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>
        <MagneticWrapper strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrev}
            style={{ 
              width: '36px', height: '36px', 
              borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </motion.button>
        </MagneticWrapper>

        <MagneticWrapper strength={0.3}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTogglePlay}
            style={{ 
              width: '44px', height: '44px', 
              borderRadius: '50%', background: '#fff', 
              border: 'none', color: '#000', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        </MagneticWrapper>

        <MagneticWrapper strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNext}
            style={{ 
              width: '36px', height: '36px', 
              borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </motion.button>
        </MagneticWrapper>
      </div>

      {/* Right: Extra Icons + Exit Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.5 }} className="hide-mobile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
        
        <MagneticWrapper strength={0.4}>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onExit}
            style={{ 
              width: '36px', height: '36px', 
              borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
              border: 'none', color: '#fff', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </MagneticWrapper>
      </div>
    </motion.div>
  );
};

export default GlassPlayerBar;
