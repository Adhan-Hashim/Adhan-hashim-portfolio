import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Cursor = ({ isSadMode }) => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the hand-drawn elements
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      const isLink = e.target.closest('a, button, input');
      
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor'));
      } else if (isLink) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(styleEl);
    };
  }, []);

  // UI States
  const mainSize = isHovered ? (cursorText ? 120 : 60) : 25;
  const dotSize = 4;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999999 }}>
      
      {/* Hand-Drawn Sketchy Circle */}
      <motion.div
        style={{
          position: 'fixed',
          x: smoothX,
          y: smoothY,
          width: mainSize,
          height: mainSize,
          left: -mainSize / 2,
          top: -mainSize / 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'visible',
            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))' 
          }}
        >
          {/* Rough, hand-drawn circle path */}
          <motion.path
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
            fill="none"
            stroke={isSadMode ? "#fff" : "var(--accent-color)"}
            strokeWidth={isHovered ? "1.5" : "3"}
            strokeLinecap="round"
            style={{ 
              pathLength: 1,
              mixBlendMode: isSadMode ? 'normal' : 'normal'
            }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: isClicked ? 0.8 : 1,
              d: isHovered 
                ? "M 50, 50 m -48, 0 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0"
                : "M 50, 50 m -45, 0 a 45,47 0 1,0 90,0 a 45,47 0 1,0 -90,0"
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 0.2, ease: "linear" },
              duration: 0.3 
            }}
          />
          
          {/* Inner scribbled cross when hovered */}
          <AnimatePresence>
            {isHovered && !cursorText && (
              <motion.path
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.5, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                d="M 35,35 L 65,65 M 65,35 L 35,65"
                stroke={isSadMode ? "#fff" : "var(--accent-color)"}
                strokeWidth="2"
              />
            )}
          </AnimatePresence>
        </svg>

        {/* Labels - positioned like a handwritten note */}
        <AnimatePresence>
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: isSadMode ? '#fff' : 'var(--accent-color)',
                fontFamily: 'var(--font-accent)',
                fontSize: '1.4rem',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                textShadow: '1px 1px 0px rgba(0,0,0,0.05)'
              }}
            >
              {cursorText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pencil Lead Point (Immediate Follow) */}
      <motion.div
        style={{
          position: 'fixed',
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          left: -dotSize / 2,
          top: -dotSize / 2,
          backgroundColor: isSadMode ? '#fff' : 'var(--text-color)',
          borderRadius: '50%',
          zIndex: 2,
          opacity: isHovered ? 0.3 : 1,
        }}
      />

    </div>
  );
};

export default Cursor;
