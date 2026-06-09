import React, { useState, useId, useMemo } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isStudio, toggleStudio }) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useId().replace(/:/g, "");

  const scribblePath = useMemo(() => {
    const w = 200;
    const h = 100;
    const steps = 6;
    const gap = w / steps;
    let d = `M -10,${h/2} `;
    for (let i = 0; i <= steps; i++) {
      const x = i * gap;
      const y1 = i % 2 === 0 ? -5 : h + 5;
      const y2 = i % 2 === 0 ? h + 5 : -5;
      const cp1x = x - gap/2;
      const cp1y = y1;
      const cp2x = x - gap/2;
      const cp2y = y2;
      d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y2} `;
    }
    return d;
  }, []);

  return (
    <div 
      className="theme-toggle-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleStudio}
      style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
    >
      <div 
        className="theme-toggle-container"
        style={{
          width: '64px',
          height: '32px',
          borderRadius: '32px',
          background: isStudio ? '#0c0c0c' : '#f0f0f0',
          border: `1.5px solid ${isStudio ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '0 3px',
          overflow: 'hidden',
          transition: 'background 0.5s ease',
          zIndex: 1
        }}
      >
        {/* Scribble Layer */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={`scribble-filter-${filterId}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            </filter>
          </defs>
          <motion.path
            d={scribblePath}
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="120"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#scribble-filter-${filterId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          className="toggle-handle"
          animate={{ x: isStudio ? 31 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: isStudio ? '#151515' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            boxShadow: isStudio 
              ? '0 0 15px rgba(255, 60, 60, 0.4)' 
              : '0 4px 8px rgba(0,0,0,0.1)',
            border: isStudio ? '1.5px solid var(--accent-color)' : '1.5px solid #ffcc33'
          }}
        >
          {/* Icons */}
          {isStudio ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffbd2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
            </svg>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggle;

