import React, { useState, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScribbleButton - A high-end button with a "crayon coloring" hover effect.
 * Inspired by huts.com
 */
const ScribbleButton = ({ 
  children, 
  onClick, 
  className = '', 
  style = {}, 
  color = 'var(--accent-color)', 
  textColor = 'var(--text-color)',
  hoverTextColor = '#fff',
  padding = '12px 28px',
  isPill = false,
  isCircle = false,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const id = useId().replace(/:/g, "");

  // Generate a unique, organic "scribble" path that covers the button area
  // We'll use a dense winding path that mimics someone coloring in a shape
  const scribblePath = useMemo(() => {
    const width = isCircle ? 100 : 200;
    const height = isCircle ? 100 : 60;
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
  }, [isCircle]);

  // Hand-drawn border path
  const borderPath = useMemo(() => {
    const w = isCircle ? 100 : 200;
    const h = isCircle ? 100 : 60;
    const r = isCircle ? 50 : (isPill ? 30 : 2);
    
    // A slightly "shaky" rectangle/circle path
    if (isCircle) {
        return `M 50,5 A 45,45 0 1,1 49.9,5 Z`;
    }
    
    return `M ${r},2 
            L ${w-r},2 
            Q ${w-2},2 ${w-2},${r} 
            L ${w-2},${h-r} 
            Q ${w-2},${h-2} ${w-r},${h-2} 
            L ${r},${h-2} 
            Q 2,${h-2} 2,${h-r} 
            L 2,${r} 
            Q 2,2 ${r},2`;
  }, [isCircle, isPill]);

  return (
    <motion.button
      className={`scribble-button ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={{
        position: 'relative',
        padding: padding,
        background: 'transparent',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s ease',
        color: isHovered ? hoverTextColor : textColor,
        fontWeight: 600,
        ...style
      }}
    >
      {/* Background SVG Layers */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible'
        }}
        viewBox={isCircle ? "0 0 100 100" : "0 0 200 60"}
        preserveAspectRatio="none"
      >
        {/* The Scribble Fill */}
        <motion.path
          d={scribblePath}
          fill="none"
          stroke={color}
          strokeWidth={isCircle ? 12 : 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
          }}
          style={{
             filter: 'url(#roughness)',
          }}
        />

        {/* Hand-drawn Border */}
        <path
          d={borderPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.15"
        />

        {/* Roughness Filter for that crayon/pencil look */}
        <defs>
          <filter id="roughness">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>

      <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
        {typeof children === 'string' ? (
          <div style={{ display: 'inline-flex', overflow: 'hidden' }}>
            {children.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{ 
                  y: isHovered ? [0, -3, 0] : 0,
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        ) : children}
      </span>
    </motion.button>
  );
};

export default ScribbleButton;
