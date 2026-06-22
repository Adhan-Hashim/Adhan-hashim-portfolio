import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const posters = [
  { id: 1, url: '/assets/posters/A4 - 4ERD.png' },
  { id: 2, url: '/assets/posters/cr.png' },
  { id: 3, url: '/assets/posters/messi.png' },
  { id: 4, url: '/assets/posters/messii.png' },
  { id: 5, url: '/assets/posters/messiii.png' },
  { id: 6, url: '/assets/posters/njr.png' },
  { id: 7, url: '/assets/posters/poster 4.png' },
  { id: 8, url: '/assets/posters/poster11.png' },
  { id: 9, url: '/assets/posters/poster12.png' },
  { id: 10, url: '/assets/posters/poster2.png' },
  { id: 11, url: '/assets/posters/poster3.png' },
  { id: 12, url: '/assets/posters/poster5.png' },
  { id: 13, url: '/assets/posters/poster6.png' },
  { id: 14, url: '/assets/posters/poster7.png' },
  { id: 15, url: '/assets/posters/poster8.png' },
  { id: 16, url: '/assets/posters/poster9.png' },
];

// Build each column's poster list by repeating for seamless loop
const makeColumn = (indices) =>
  [...indices, ...indices, ...indices, ...indices].map((i, idx) => ({
    ...posters[i],
    uid: `${i}-${idx}`,
  }));

// Left side: 2 columns | Right side: 2 columns
const columns = [
  { items: makeColumn([0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15]), direction: -1, speed: 28 }, // left-outer — up
  { items: makeColumn([15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0]), direction: 1,  speed: 22 }, // left-inner — down
  { items: makeColumn([2, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15]), direction: -1, speed: 25 }, // right-inner — up
  { items: makeColumn([12, 9, 6, 3, 0, 15, 14, 13, 10, 7, 4, 1, 11, 8, 5, 2]), direction: 1,  speed: 30 }, // right-outer — down
];

// Helper to duplicate and build row items for horizontal loop
const makeRow = (indices, prefix) =>
  [...indices, ...indices].map((i, idx) => ({
    ...posters[i],
    uid: `${prefix}-${i}-${idx}`,
  }));

const row1 = makeRow([0, 2, 5, 6, 8, 10, 12, 14], 'r1');
const row2 = makeRow([1, 3, 4, 7, 9, 11, 13, 15], 'r2');

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
              aspectRatio: '1080 / 1350',
              height: 'auto',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            <img loading="lazy"
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

/* ─── Single horizontal infinite-scroll row ─────────────────── */
const ScrollRow = ({ items, direction, speed }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let totalW = track.scrollWidth / 2;
    let pos = direction === -1 ? 0 : -totalW;

    const tick = () => {
      if (totalW === 0) {
        totalW = track.scrollWidth / 2;
        if (totalW > 0 && direction === 1) {
          pos = -totalW;
        }
      }
      pos += direction * (speed / 60);
      if (direction === -1 && pos <= -totalW) pos = 0;
      if (direction === 1  && pos >= 0)       pos = -totalW;
      track.style.transform = `translateX(${pos}px)`;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [direction, speed]);

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        gap: '12px',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '12px',
          willChange: 'transform',
        }}
      >
        {items.map((poster) => (
          <div
            key={poster.uid}
            style={{
              width: '110px',
              aspectRatio: '1080 / 1350',
              height: 'auto',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
          >
            <img loading="lazy"
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
          flexDirection: 'var(--marquee-flex-dir, row)',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'var(--marquee-height, 520px)',
          padding: 'var(--marquee-padding, 0)',
          gap: 'var(--marquee-gap, 0)',
          position: 'relative',
        }}
      >
        {/* ── Left columns ─────────────────────── */}
        <div
          className="hide-mobile"
          style={{
            display: 'var(--marquee-display, flex)',
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
          className="hide-mobile"
          style={{
            display: 'var(--marquee-display, flex)',
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

        {/* ── Mobile Horizontal Marquees (shown only on mobile) ── */}
        <div
          style={{
            display: 'var(--marquee-mobile-display, none)',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <ScrollRow items={row1} direction={-1} speed={20} />
          <ScrollRow items={row2} direction={1} speed={22} />
        </div>
      </div>
    </section>
  );
};

export default CreativeMarquee;
