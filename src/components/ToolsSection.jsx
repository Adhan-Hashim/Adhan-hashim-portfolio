import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ToolsSection.css';




const toolsData = [
  { id: "figma", name: "Figma", icon: <img loading="lazy" src="/assets/tools/figma_logo_icon_170157.png" alt="Figma" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Design", color: "#F24E1E", desc: "Interface & Prototype Design" },
  { id: "canva", name: "Canva", icon: <img loading="lazy" src="/assets/tools/canva_icon_220714.png" alt="Canva" className="canva-logo" style={{width: '100%', height: '100%', objectFit: 'contain', clipPath: 'circle(35% at 50% 50%)', transform: 'scale(1.4)'}} />, category: "Design", color: "#00C4CC", desc: "Quick Composition & Graphics" },
  { id: "ae", name: "After Effects", icon: <img loading="lazy" src="/assets/tools/adobe_after_effects_macos_bigsur_icon_190464.png" alt="After Effects" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Motion", color: "#9999FF", desc: "Kinetic Motion & VFX" },
  { id: "vscode", name: "VS Code", icon: <img loading="lazy" src="/assets/tools/file_type_vscode_icon_130084.png" alt="VS Code" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Development", color: "#007ACC", desc: "Primary Code Editor" },
  { id: "premiere", name: "Premiere Pro", icon: <img loading="lazy" src="/assets/tools/adobe_premiere_pro_macos_bigsur_icon_189485.png" alt="Premiere Pro" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Motion", color: "#9999FF", desc: "Video Editing" },
  { id: "photoshop", name: "Photoshop", icon: <img loading="lazy" src="/assets/tools/adobe_photoshop_macos_bigsur_icon_190436.png" alt="Photoshop" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Design", color: "#31A8FF", desc: "Image Editing & Polish" },
  { id: "antigravity", name: "Antigravity", icon: <img loading="lazy" src="/assets/tools/antigravity-icon__full-color.png" alt="Antigravity" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "AI", color: "#00E676", desc: "AI Pair Programmer" },
  { id: "claude", name: "Claude", icon: <img loading="lazy" src="/assets/tools/claude-ai-icon.png" alt="Claude" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "AI", color: "#D97757", desc: "Logic & Text Generation" },
  { id: "capcut", name: "CapCut", icon: <img loading="lazy" src="/assets/tools/vecteezy_capcut-transparent-icon_48759325.png" alt="CapCut" style={{width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.1)'}} />, category: "Motion", color: "#111111", desc: "Rapid Video Assembly" },
  { id: "framer", name: "Framer", icon: <img loading="lazy" src="/assets/tools/ZQ1T1io3_400x400.png" alt="Framer" style={{width: '100%', height: '100%', objectFit: 'contain'}} />, category: "Development", color: "#0055FF", desc: "Interactive Web Publishing" }
];

const ToolsSection = ({ isStudio, isSadMode }) => {
  return (
    <section id="tools" className={`tools-clean-section ${isSadMode ? 'sad-mode' : ''} ${isStudio ? 'dark-mode' : 'light-mode'}`}>
      <div className="tools-container">
        <div className="tools-header">
          <motion.span className="sketch-text" style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>
                    // my weapons
          </motion.span>
          <motion.h2
            className="tools-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Tools & Software
          </motion.h2>
        </div>

        <motion.div className="tools-grid" layout>
          <AnimatePresence mode="popLayout">
            {toolsData.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="tool-card"
              >
                <div className="tool-icon-wrapper">
                  {tool.icon}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
