import React, { useRef, useState, useMemo, useId } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * MagneticWrapper - Wraps any element to give it the magnetic pull effect.
 * Used for icons, buttons, etc.
 */
export const MagneticWrapper = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

/**
 * MagneticButton - A premium "split-pill" button with magnetic interaction
 * and the signature scribble hover effect.
 */
const MagneticButton = ({ 
  to, 
  onClick, 
  label, 
  icon, 
  className = '', 
  style = {},
  color = 'var(--accent-color)'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useId().replace(/:/g, "");

  const scribblePath = useMemo(() => {
    const width = 200;
    const height = 60;
    const steps = 15;
    const padding = 5;
    let path = `M ${padding} ${padding}`;
    
    for (let i = 0; i <= steps; i++) {
      const x = padding + (i / steps) * (width - 2 * padding);
      const y1 = padding + Math.random() * 5;
      const y2 = height - padding - Math.random() * 5;
      
      if (i % 2 === 0) {
        path += ` L ${x} ${y1} L ${x} ${y2}`;
      } else {
        path += ` L ${x} ${y2} L ${x} ${y1}`;
      }
    }
    return path;
  }, []);

  const content = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 30px',
      borderRadius: '40px',
      border: '1px solid var(--text-color)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'color 0.3s ease',
      color: isHovered ? '#fff' : 'var(--text-color)',
      fontWeight: 600,
      fontSize: '0.9rem',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }}>
      {/* Scribble Fill Background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <motion.path
          d={scribblePath}
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{ filter: `url(#roughness-${filterId})` }}
        />
        <defs>
          <filter id={`roughness-${filterId}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>

      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      {icon && <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}>{icon}</span>}
    </div>
  );

  return (
    <MagneticWrapper strength={0.2}>
      <div 
        className={`magnetic-button-wrap ${className}`}
        style={{ cursor: 'pointer', ...style }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {to ? (
          <Link to={to} style={{ textDecoration: 'none' }}>
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </MagneticWrapper>
  );
};

export default MagneticButton;
