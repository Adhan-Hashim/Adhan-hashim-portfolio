import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Cpu, Terminal, Code2, 
  Layout, Layers, 
  Video, Play, Code, 
  GitBranch, Activity,
  Database, Globe, Smartphone,
  Box, Settings, Target,
  MessageSquare, Hash, GitMerge,
  ZapOff, User, Map,
  Mail, Phone, Heart,
  Star, Cloud, Moon,
  Sun, Wind
} from 'lucide-react';

// Import Development & Engineering PNGs
import reactLogo from '../assets/REACT.png';
import nodeLogo from '../assets/NODE.png';
import tsLogo from '../assets/TypeScript.png';
import threeLogo from '../assets/three-js-icon.png';
import nextLogo from '../assets/Next.js.png';
import viteLogo from '../assets/Vite.js.png';
import vscodeLogo from '../assets/VS CODE.png';
import gitLogo from '../assets/Git.png';
import tailwindLogo from '../assets/tailwind.png';

const row1 = [
  { name: "React", level: "Master", icon: reactLogo, color: "#61DAFB" },
  { name: "Node.js", level: "Expert", icon: nodeLogo, color: "#339933", scale: 2 },
  { name: "TypeScript", level: "Expert", icon: tsLogo, color: "#3178C6" },
  { name: "Three.js", level: "Specialist", icon: threeLogo, color: "#FFFFFF", scale: 1.2 },
  { name: "GSAP", level: "Expert", icon: <Activity />, color: "#88CE02" },
  { name: "Next.js", level: "Expert", icon: nextLogo, color: "#FFFFFF", scale: 1.3 },
  { name: "Tailwind", level: "Master", icon: tailwindLogo, color: "#06B6D4", scale: 1.4 },
  { name: "Vite", level: "Master", icon: viteLogo, color: "#646CFF", scale: 1.2 },


  { name: "VS Code", level: "Master", icon: vscodeLogo, color: "#007ACC" },

  { name: "Git", level: "Expert", icon: gitLogo, color: "#F05032" },
];

const row2 = [
  { name: "Figma", level: "Master", icon: <Layout />, color: "#F24E1E" },
  { name: "Photoshop", level: "Expert", icon: <User />, color: "#31A8FF" },
  { name: "Illustrator", level: "Proficient", icon: <Map />, color: "#FF9A00" },
  { name: "Premiere Pro", level: "Expert", icon: <Video />, color: "#EA77FF" },
  { name: "CapCut", level: "Expert", icon: <Play />, color: "#CF96FD" },
  { name: "Canva", level: "Expert", icon: <Box />, color: "#00C4CC" },
  { name: "UI/UX Design", level: "Master", icon: <Layers />, color: "#FF3366" },
  { name: "Graphic Design", level: "Expert", icon: <Star />, color: "#FF3366" },
  { name: "Creative Dir", level: "Expert", icon: <Cloud />, color: "#31A8FF" },
  { name: "Research", level: "Proficient", icon: <Target />, color: "#0000FF" },
];

// Fallback for ShoppingBag if not exported
function ShoppingBag() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

const row3 = [
  { name: "Notion", level: "Advanced", icon: <Code />, color: "#FFFFFF" },
  { name: "Mail", level: "Expert", icon: <Mail />, color: "#4A154B" },
  { name: "Linear", level: "Master", icon: <Target />, color: "#5E6AD2" },
  { name: "Phone", level: "Expert", icon: <Phone />, color: "#0055FF" },
  { name: "Webflow", level: "Expert", icon: <Globe />, color: "#4353FF" },
  { name: "E-Commerce", level: "Specialist", icon: <Smartphone />, color: "#95BF47" },
  { name: "Discord", level: "Master", icon: <MessageSquare />, color: "#5865F2" },
  { name: "GitHub", level: "Expert", icon: <GitMerge />, color: "#FFFFFF" },
  { name: "Docker", level: "Intermediate", icon: <Settings />, color: "#2496ED" },
  { name: "Firebase", level: "Expert", icon: <Database />, color: "#FFCA28" },
];

const ToolsSection = ({ isStudio, isSadMode }) => {
  // Theme-aware styles
  const overlayOpacity = isSadMode ? 0.4 : (isStudio ? 0.05 : 0.02);
  const accentColor = isSadMode ? '#ff0000' : 'var(--accent-color)';

  return (
    <section 
      id="tools" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        padding: '40px 0 100px 0', 
        backgroundColor: 'var(--bg-color)', 
        overflow: 'hidden',
        perspective: '1500px',
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Background Section Header - Mantis Style Gap */}
      <div style={{ padding: '0 10%', marginBottom: '100px', maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sketch-text" 
          style={{ color: accentColor, fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}
        >
          // Capabilities
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}
        >
          WE MASTER THE TOOLS THAT <br />
          <span style={{ color: accentColor }}>DEFY THE ORDINARY.</span>
        </motion.h2>
      </div>

      {/* Marquee Container with 3D Tilt */}
      <motion.div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          transform: 'rotateX(15deg) rotateY(-10deg) rotateZ(-2deg) scale(1.1)',
          transformStyle: 'preserve-3d',
          opacity: isSadMode ? 0.7 : 1
        }}
      >
        <MarqueeRow items={row1} direction={-1} speed={40} isSadMode={isSadMode} />
        <MarqueeRow items={row2} direction={1} speed={50} isSadMode={isSadMode} />
        <MarqueeRow items={row3} direction={-1} speed={45} isSadMode={isSadMode} />
      </motion.div>

      {/* Decorative Blur Overlays (Vignette) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '15%', height: '100%', background: 'linear-gradient(to right, var(--bg-color), transparent)', zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '15%', height: '100%', background: 'linear-gradient(to left, var(--bg-color), transparent)', zIndex: 10, pointerEvents: 'none' }} />
      
      {/* Background Accent Text */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        fontSize: '25vw', 
        fontWeight: 900, 
        opacity: overlayOpacity, 
        pointerEvents: 'none',
        zIndex: 0,
        color: isSadMode ? '#ff0000' : 'var(--text-color)',
        whiteSpace: 'nowrap'
      }}>
        SKILLS
      </div>
    </section>
  );
};

const MarqueeRow = ({ items, direction, speed, isSadMode }) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex' }}>
      <motion.div 
        animate={{ x: direction > 0 ? [0, -2000] : [-2000, 0] }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap' }}
      >
        {repeatedItems.map((item, idx) => (
          <ToolCard key={`${item.name}-${idx}`} item={item} isSadMode={isSadMode} />
        ))}
      </motion.div>
    </div>
  );
};

const ToolCard = ({ item, isSadMode }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.15 }}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '20px',
        padding: '20px 30px',
        color: 'var(--text-color)',
        userSelect: 'none',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ 
        color: isSadMode ? '#ff0000' : 'var(--text-color)', 
        opacity: isSadMode ? 1 : 0.9, // Slightly higher opacity for full color
        filter: isSadMode ? 'drop-shadow(0 0 10px rgba(255,0,0,0.6))' : 'none', // Removed grayscale
        transition: '0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        transform: `scale(${item.scale || 1})`
      }}>
        {typeof item.icon === 'string' ? (
          <img 
            src={item.icon} 
            alt={item.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: isSadMode ? 'brightness(0) invert(1) drop-shadow(0 0 5px #ff0000)' : 'none'
            }} 
          />
        ) : (
          /* We upscale the icons to make them feel like prominent logos */
          React.cloneElement(item.icon, { size: 40, strokeWidth: 1.5 })
        )}
      </div>
      
      {typeof item.icon !== 'string' && (
        <div style={{ display: 'flex', flexDirection: 'column', opacity: 0.8 }}>
          <span style={{ 
            fontWeight: 900, 
            fontSize: '1rem', 
            letterSpacing: '2px', 
            lineHeight: 1,
            marginBottom: '4px'
          }}>
            {item.name.toUpperCase()}
          </span>
          <span className="sketch-text" style={{ 
            fontSize: '0.6rem', 
            color: isSadMode ? '#ff0000' : 'var(--accent-color)', 
            opacity: 0.6,
            letterSpacing: '1px'
          }}>
            {item.level}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ToolsSection;
