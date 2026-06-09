import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SongCarousel = ({ songs, currentIndex, onSelect }) => {
  return (
    <div style={{
      position: 'relative',
      height: '320px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1200px',
      overflow: 'visible',
      marginTop: '2vh'
    }}>
      <AnimatePresence mode="popLayout">
        {songs.map((song, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;
          const absOffset = Math.abs(offset);
          
          if (absOffset > 2) return null;

          return (
            <motion.div
              key={song.id}
              onClick={() => onSelect(index)}
              initial={{ opacity: 0, scale: 0.8, x: offset * 200 }}
              animate={{
                opacity: 1 - absOffset * 0.25,
                scale: isActive ? 1 : 0.7 - absOffset * 0.1,
                x: offset * (isActive ? 0 : offset > 0 ? 180 : -180),
                z: isActive ? 50 : -absOffset * 100,
                rotateY: offset * -20,
                zIndex: songs.length - absOffset,
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              style={{
                position: 'absolute',
                width: 'clamp(160px, 12vw, 220px)',
                aspectRatio: '0.8',
                cursor: 'pointer',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: isActive ? '0 15px 35px rgba(0,0,0,0.4)' : '0 8px 15px rgba(0,0,0,0.2)',
                background: '#111',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Cover Image */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={song.cover} 
                  alt={song.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: isActive ? 'none' : 'grayscale(30%)'
                  }} 
                />
                
                {/* Frosted Info Overlay (when active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{song.title}</h3>
                      <p style={{ margin: '5px 0 0', opacity: 0.7, fontSize: '0.9rem', color: '#fff' }}>{song.artist}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SongCarousel;
