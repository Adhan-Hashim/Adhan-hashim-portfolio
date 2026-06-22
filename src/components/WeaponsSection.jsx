import React from 'react';
import { motion } from 'framer-motion';
import './WeaponsSection.css';

const weaponsList = [
  { name: 'Figma', slug: 'figma' },
  { name: 'Canva', slug: 'canva' },
  { name: 'After Effects', slug: 'adobeaftereffects' },
  { name: 'VS Code', slug: 'visualstudiocode' },
  { name: 'Stitch', isGenerated: true, src: '/assets/stitch.png' },
  { name: 'Photoshop', slug: 'adobephotoshop' },
  { name: 'Antigravity', isGenerated: true, src: '/assets/antigravity.png' },
  { name: 'Claude', slug: 'anthropic' },
  { name: 'CapCut', slug: 'capcut' },
  { name: 'Premiere', slug: 'adobepremierepro' },
  { name: 'Illustrator', slug: 'adobeillustrator' },
  { name: 'MongoDB', slug: 'mongodb' },
];

const WeaponsSection = ({ isStudio, isSadMode }) => {
  // Use current text color for logos so they invert automatically in light/dark mode
  const iconColor = isStudio ? '333333' : 'ffffff';
  const colorParam = isSadMode ? 'ff0000' : iconColor;

  return (
    <section className="weapons-section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="weapons-title"
      >
        WEAPONS
      </motion.h2>

      <div className="weapons-grid">
        {weaponsList.map((item, i) => (
          <motion.div 
            className="weapon-item"
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5 }}
          >
            {item.isGenerated ? (
              <img 
                src={item.src} 
                alt={item.name} 
                className={`weapon-icon generated ${isStudio ? 'light' : 'dark'}`} 
              />
            ) : (
              <img 
                src={`https://cdn.simpleicons.org/${item.slug}/${colorParam}`} 
                alt={item.name} 
                className="weapon-icon"
              />
            )}
            <span className="weapon-name">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WeaponsSection;
