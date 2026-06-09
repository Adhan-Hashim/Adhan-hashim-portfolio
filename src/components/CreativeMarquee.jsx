import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const posters = [
  { id: 1, url: '/assets/posters/poster1.png' },
  { id: 2, url: '/assets/posters/poster2.png' },
  { id: 3, url: '/assets/posters/poster3.png' },
  { id: 4, url: '/assets/posters/poster4.png' },
  { id: 5, url: '/assets/posters/poster5.png' },
  { id: 6, url: '/assets/posters/poster6.png' },
];

// Build each column's poster list by repeating for seamless loop
const makeColumn = (indices) =>
  [...indices, ...indices, ...indices, ...indices].map((i, idx) => ({
    ...posters[i],
    uid: `${i}-${idx}`,
  }));

// Left side: 2 columns | Right side: 2 columns
const columns = [
  { items: makeColumn([0, 3, 1, 4]), direction: -1, speed: 28 }, // left-outer — up
  { items: makeColumn([2, 5, 0, 3]), direction: 1,  speed: 22 }, // left-inner — down
  { items: makeColumn([1, 4, 2, 5]), direction: -1, speed: 25 }, // right-inner — up
  { items: makeColumn([3, 0, 5, 2]), direction: 1,  speed: 30 }, // right-outer — down
];

/* ─── Single infinite-scroll column ─────────────────────────── */
const ScrollColumn = ({ items, direction, speed }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalH = track.scrollHeight / 2; // half = one full set
    let pos = direction === -1 ? 0 : -totalH;

    const tick = () => {
      pos += direction * (speed / 60);
      if (direction === -1 && pos <= -totalH) pos = 0;
      if (direction === 1  && pos >= 0)       pos = -totalH;
      track.style.transform = `translateY(${pos}px)`;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [direction, speed]);

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '140px',
        flexShrink: 0,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          willChange: 'transform',
        }}
      >
        {items.map((poster) => (
          <div
            key={poster.uid}
            style={{
              width: '140px',
              height: '190px',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            <img
              src={poster.url}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main section ───────────────────────────────────────────── */
const CreativeMarquee = () => {
  return (
    <section
      id="creative-designs"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(128,128,128,0.1)',
      }}
    >
      {/* Outer layout: columns + center */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '520px',
          position: 'relative',
        }}
      >
        {/* ── Left columns ─────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            height: '100%',
            paddingTop: '20px',
            paddingBottom: '20px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        >
          <ScrollColumn {...columns[0]} />
          <ScrollColumn {...columns[1]} />
        </div>

        {/* ── Center text ──────────────────────── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 40px',
            zIndex: 10,
            minWidth: '280px',
            maxWidth: '460px',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: 'var(--accent-color)',
              textTransform: 'uppercase',
              letterSpacing: '8px',
              fontSize: '0.6rem',
              fontWeight: 800,
              display: 'block',
              marginBottom: '14px',
            }}
          >
            Visual Portfolio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 0.92,
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              marginBottom: '20px',
            }}
          >
            Creative{' '}
            <span style={{ color: 'var(--accent-color)' }}>Designs</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '0.9rem',
              color: 'var(--muted-text)',
              lineHeight: 1.6,
              maxWidth: '320px',
            }}
          >
            A collection of visual explorations — branding, editorial,
            motion, and experimental design work.
          </motion.p>
        </div>

        {/* ── Right columns ────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            height: '100%',
            paddingTop: '20px',
            paddingBottom: '20px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        >
          <ScrollColumn {...columns[2]} />
          <ScrollColumn {...columns[3]} />
        </div>
      </div>
    </section>
  );
};

export default CreativeMarquee;
