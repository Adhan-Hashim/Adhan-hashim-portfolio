import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EyeO = ({ size = 120 }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth springs for highly responsive, organic movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map normalized [-1, 1] to pixel bounds. 
  const maxTravel = 18; 
  const irisX = useTransform(smoothX, [-1, 1], [-maxTravel, maxTravel]);
  const irisY = useTransform(smoothY, [-1, 1], [-maxTravel, maxTravel]);

  useEffect(() => {
    // Mouse tracking logic
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Blinking logic
    let blinkTimeout;
    let closeTimeout;

    const blinkLoop = () => {
      const nextBlink = Math.random() * 4000 + 2000;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        closeTimeout = setTimeout(() => {
          setIsBlinking(false);
          blinkLoop();
        }, 150);
      }, nextBlink);
    };

    blinkLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(blinkTimeout);
      clearTimeout(closeTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <div style={{ display: 'inline-block', position: 'relative', width: size, height: size, verticalAlign: 'middle' }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        style={{ overflow: 'visible' }}
      >
        <defs>
          <clipPath id="eyeClip">
            <circle cx="50" cy="50" r="45" />
          </clipPath>
          <clipPath id="irisClip">
            <circle cx="50" cy="50" r="23" />
          </clipPath>

          {/* Noise Filter for Texture */}
          <filter id="eyeNoise">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>

          {/* 3D Sphere Gradient for the Base */}
          <radialGradient id="sphereShadow" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </radialGradient>

          {/* 3D Gradient for the Iris */}
          <radialGradient id="irisGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>

        {/* Base Circle (The "O") */}
        <circle cx="50" cy="50" r="45" fill="var(--text-color)" />
        
        {/* Grain/Noise texture on the base */}
        <circle cx="50" cy="50" r="45" fill="#888" filter="url(#eyeNoise)" opacity="0.2" style={{ mixBlendMode: 'overlay' }} clipPath="url(#eyeClip)" />

        {/* 3D Inner Shadow overlay on the base */}
        <circle cx="50" cy="50" r="45" fill="url(#sphereShadow)" />

        {/* Moving Group (Iris + Pupil + Reflection) */}
        <motion.g 
          style={{ x: irisX, y: irisY, originX: '50px', originY: '50px' }}
          animate={{ scaleY: isBlinking ? 0.05 : 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
          {/* Blue Iris with 3D gradient */}
          <circle cx="50" cy="50" r="23" fill="url(#irisGrad)" />
          
          {/* Iris Grain/Noise Texture */}
          <circle cx="50" cy="50" r="23" fill="#888" filter="url(#eyeNoise)" opacity="0.3" style={{ mixBlendMode: 'overlay' }} clipPath="url(#irisClip)" />
          
          {/* Inner shadow for iris edge depth */}
          <circle cx="50" cy="50" r="23" fill="none" stroke="#000" strokeWidth="1" strokeOpacity="0.4" />

          {/* Black Pupil */}
          <circle cx="50" cy="50" r="11" fill="#000000" />
          
          {/* Star-shaped Highlight/Reflection (like the screenshot) */}
          <path 
            d="M 42 38 Q 42 42 38 42 Q 42 42 42 46 Q 42 42 46 42 Q 42 42 42 38 Z" 
            fill="#ffffff" 
          />
        </motion.g>

        {/* Glossy top reflection for the whole eye (adds extra realism) */}
        <path d="M 15 35 A 35 35 0 0 1 85 35 A 40 20 0 0 0 15 35 Z" fill="#ffffff" opacity="0.15" />
      </svg>
    </div>
  );
};

export default EyeO;
