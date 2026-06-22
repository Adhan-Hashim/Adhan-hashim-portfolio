import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import MagneticButton from './MagneticButton';
import ScribbleButton from './ScribbleButton';

/* ─────────────────────────────────────────────────────────────
   CHAR — each letter handles its own hover state independently.
   Blur only appears on the letter the cursor is physically over.
   Reveal: chars slide up from below with perspective skew.
   ───────────────────────────────────────────────────────────── */
const Char = ({ char, index, total, scrollProgress }) => {
  const hoverBlur = useMotionValue(0);
  const hoverScale = useMotionValue(1);

  // ── scroll reveal timings ──────────────────────────────────
  const step = 0.65 / total;
  const start = index * step * 0.5;
  const end = start + step + 0.2;

  // New reveal: clip-path wipe + skewY + Y translate + opacity
  const revealY = useTransform(scrollProgress, [start, end], [110, 0]);
  const revealSkew = useTransform(scrollProgress, [start, end], [10, 0]);
  const revealOp = useTransform(scrollProgress, [start, end], [0, 1]);

  // hover → local blur + scale only on this character
  const springConfig = { stiffness: 200, damping: 15 };
  const smoothScale = useSpring(hoverScale, springConfig);

  const onEnter = useCallback(() => {
    hoverScale.set(1.22);
  }, [hoverScale]);

  const onLeave = useCallback(() => {
    hoverScale.set(1);
  }, [hoverScale]);

  const isSpace = char === ' ';

  return (
    <motion.span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        fontFamily: "var(--font-accent), cursive",
        fontSize: isSpace ? '4vw' : 'var(--footer-char-size, clamp(4rem, 16vw, 24vw))',
        fontWeight: 400,
        lineHeight: 0.8,
        letterSpacing: '-0.01em',
        color: 'var(--text-color)',
        y: revealY,
        skewY: revealSkew,
        opacity: revealOp,
        scale: smoothScale,
        willChange: 'transform, filter, opacity',
        userSelect: 'none',
        whiteSpace: isSpace ? 'pre' : 'normal',
        cursor: 'default',
        padding: '0 0.2vw',
      }}
    >
      {isSpace ? '\u00A0' : char}
    </motion.span>
  );
};

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
const Footer = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, damping: 25, restDelta: 0.001,
  });

  const name = 'Adhan.';
  const chars = name.split('');

  if (isMobile) {
    return (
      <footer
        ref={containerRef}
        style={{
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
          padding: '20px 4% 10px 4%',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          '--footer-char-size': 'clamp(8rem, 40vw, 12rem)',
        }}
      >
        {/* ── Top row: 3 columns ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}>
          {/* Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 800, opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>Location</span>
            <p style={{ fontSize: '0.65rem', fontWeight: 500, lineHeight: 1.4 }}>
              Kerala, India<br />
              <span style={{ opacity: 0.4, fontSize: '0.55rem' }}>Available Globally</span>
            </p>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, textAlign: 'center' }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 800, opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>Say Hello</span>
            <a
              href="mailto:adhanhashim@gmail.com"
              style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              adhanhashim@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 800, opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Socials</span>
            {[
              { label: 'Telegram', url: 'https://t.me/Adhanhashim' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/adhan-hashim-b23348247' },
              { label: 'Instagram', url: '#' },
            ].map(s => (
              <ScribbleButton
                key={s.label}
                onClick={() => window.open(s.url, '_blank')}
                padding="2px 8px"
                style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.5px', border: '1px solid rgba(128,128,128,0.2)', marginBottom: '2px' }}
                textColor="var(--text-color)"
              >
                {s.label}
              </ScribbleButton>
            ))}
          </div>
        </div>

        {/* ── Back To Top ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <MagneticButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            label="Back to top"
            icon={<span style={{ fontSize: '0.8rem', fontWeight: 900 }}>↑</span>}
            style={{ transform: 'scale(0.6)', transformOrigin: 'right center' }}
          />
        </div>

        {/* ── BIG NAME REVEAL ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          minHeight: 'auto',
          paddingBottom: '10px',
          overflow: 'visible',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            width: '100%',
            perspective: '1200px',
            marginTop: '20px',
          }}>
            {chars.map((char, i) => (
              <Char
                key={i}
                char={char}
                index={i}
                total={chars.length}
                scrollProgress={smoothProgress}
              />
            ))}
          </div>

          {/* Copyright text below the name */}
          <motion.div
            style={{
              marginTop: '90px',
              opacity: 0.2,
              fontSize: '0.55rem',
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              y: useTransform(smoothProgress, [0.8, 1], [15, 0]),
            }}
          >
            <span>© {new Date().getFullYear()} Adhan Hashim</span>
            <span>•</span>
            <span>Crafted with Passion</span>
          </motion.div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        padding: 'var(--footer-padding-top, 100px) 6% 0 6%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* ── Top info row ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'var(--footer-info-flex-dir, row)',
        justifyContent: 'var(--footer-info-justify, space-between)',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 'var(--footer-info-gap, 50px)',
        paddingBottom: '70px',
        borderBottom: '1px solid rgba(128,128,128,0.12)',
      }}>
        {/* Location */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flex: 'var(--footer-loc-flex, 0 1 auto)'
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.4, letterSpacing: '5px', textTransform: 'uppercase' }}>Location</span>
          <p style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
            Kerala, India<br />
            <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>Available Globally</span>
          </p>
        </div>

        {/* Email */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flex: 'var(--footer-email-flex, 0 1 auto)'
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.4, letterSpacing: '5px', textTransform: 'uppercase' }}>Say Hello</span>
          <a
            href="mailto:adhanhashim@gmail.com"
            style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            adhanhashim@gmail.com
          </a>
        </div>

        {/* Socials */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'var(--footer-align-items, flex-end)',
          flex: 'var(--footer-socials-flex, 0 1 auto)'
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.4, letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '8px' }}>Socials</span>
          {[
            { label: 'Telegram', url: 'https://t.me/Adhanhashim' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/adhan-hashim-b23348247' },
            { label: 'Instagram', url: '#' },
          ].map(s => (
            <ScribbleButton
              key={s.label}
              onClick={() => window.open(s.url, '_blank')}
              padding="6px 16px"
              style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}
              textColor="var(--text-color)"
            >
              {s.label}
            </ScribbleButton>
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'var(--footer-align-items, flex-end)',
          justifyContent: 'flex-end',
          flex: 'var(--footer-btn-flex, 0 1 auto)'
        }}>
          <MagneticButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            label="Back to top"
            icon={<span style={{ fontSize: '1.2rem', fontWeight: 900 }}>↑</span>}
            style={{ transform: 'scale(0.8)', transformOrigin: 'var(--footer-btn-origin, right center)' }}
          />
        </div>
      </div>

      {/* ── BIG NAME REVEAL ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: '55vh',
        paddingBottom: '40px',
        overflow: 'visible',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          width: '100%',
          perspective: '1200px',
        }}>
          {chars.map((char, i) => (
            <Char
              key={i}
              char={char}
              index={i}
              total={chars.length}
              scrollProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Copyright text below the name */}
        <motion.div
          style={{
            marginTop: '20px',
            opacity: 0.2,
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'var(--footer-copy-flex-dir, row)',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--footer-copy-gap, 20px)',
            y: useTransform(smoothProgress, [0.8, 1], [20, 0]),
          }}
        >
          <span>© {new Date().getFullYear()} Adhan Hashim</span>
          <span style={{ display: 'var(--footer-bullet-display, inline)' }}>•</span>
          <span>Crafted with Passion</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
