import React, { useRef, useEffect, useState } from 'react';
import LyricsPathOverlay from './LyricsPathOverlay';

const STRING_COUNT = 6;
const DAMPING = 0.85;
const TENSION = 0.2;

// Frequencies for Standard Guitar Tuning (E2, A2, D3, G3, B3, E4)
const FREQUENCIES = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41];

// Singleton Audio Context created on first interaction
let audioCtx = null;
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playTwang = (freq, intensity) => {
  if (!audioCtx) return;
  
  const sr = audioCtx.sampleRate;
  const duration = 2.5; // seconds
  const length = Math.floor(sr * duration);
  const N = Math.round(sr / freq); 
  
  const buffer = audioCtx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);
  
  // 1. Initial burst of white noise (Simulating the 'Pick')
  for (let i = 0; i < N; i++) {
    data[i] = (Math.random() * 2 - 1) * 1.5;
  }
  
  // 2. Feedback loop (Simulating string tension & physical resonance)
  const dampening = 0.995; // Controls how long the string rings out
  for (let i = N; i < length; i++) {
    const prevSample = i - N - 1 >= 0 ? data[i - N - 1] : 0;
    // Average the current and previous sample for Low-Pass filter, then dampen
    data[i] = dampening * 0.5 * (data[i - N] + prevSample);
  }
  
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  
  const gain = audioCtx.createGain();
  const vol = Math.min(Math.abs(intensity) / 120, 1) * 0.6;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  // Add slight exponential decay so the tail fades naturally
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  source.connect(gain);
  gain.connect(audioCtx.destination);
  
  source.start();
};

class GuitarString {
  constructor(yOffset, frequency) {
    this.yOffset = yOffset;
    this.controlY = 0;
    this.velocity = 0;
    this.isHovered = false;
    this.mouseX = window.innerWidth / 2;
    this.frequency = frequency;
  }

  update() {
    if (!this.isHovered) {
      const force = -TENSION * this.controlY;
      this.velocity += force;
      this.velocity *= DAMPING;
      this.controlY += this.velocity;
    }
  }

  pull(amount, x) {
    this.controlY = amount;
    this.mouseX = x;
    this.isHovered = true;
    this.velocity = 0;
  }

  release() {
    this.isHovered = false;
    this.velocity = this.controlY * 0.7; // Twang factor
    // Play sound if snapped hard enough
    if (Math.abs(this.controlY) > 5) {
      playTwang(this.frequency, this.controlY);
    }
  }
}

const GuitarBackground = ({ isStudio, isSadMode, isPlaying, setIsPlaying, setIsSadMode, currentSong, onTimeUpdate, currentTime, hasSeenIntro, audioRef }) => {
  const canvasRef = useRef(null);
  const stringsRef = useRef([]);

  const toggleVibe = () => {
    initAudio();
    setIsSadMode(!isSadMode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const startY = canvas.height / 2 - 120;
      const spacing = 48;
      // Initialize strings
      stringsRef.current = Array.from({ length: STRING_COUNT }).map((_, i) => 
        new GuitarString(startY + i * spacing, FREQUENCIES[i])
      );
    };
    
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId;
    let particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 2 + 1,
      o: Math.random() * 0.5 + 0.1
    }));

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      
      const leftY = canvas.height * 0.02;
      const rightY = canvas.height * 0.04;
      
      const bottomLeftY = canvas.height * 0.98;
      const bottomRightY = canvas.height * 0.96;

      ctx.beginPath();
      ctx.moveTo(0, leftY);
      ctx.bezierCurveTo(canvas.width*0.3, 0, canvas.width*0.6, canvas.height*0.1, canvas.width, rightY);
      ctx.lineTo(canvas.width, bottomRightY);
      ctx.bezierCurveTo(canvas.width*0.6, canvas.height*0.9, canvas.width*0.3, canvas.height, 0, bottomLeftY);
      ctx.closePath();

      // Body Gradient Change - RICH BURGUNDY
      const gradX = canvas.width / 2;
      const gradY = canvas.height * 0.65;
      const bodyGrad = ctx.createRadialGradient(gradX, gradY, 100, gradX, gradY, canvas.width * 0.9);
      
      if (isSadMode) {
        bodyGrad.addColorStop(0, currentSong.color || '#5a1111'); 
        bodyGrad.addColorStop(0.5, '#0a0a0a'); 
        bodyGrad.addColorStop(1, '#000000'); 
      } else {
        bodyGrad.addColorStop(0, '#8e563a');
        bodyGrad.addColorStop(0.4, '#4a2c1d');
        bodyGrad.addColorStop(1, '#1a0f0a');
      }
      
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Distinct Wood Grain
      ctx.strokeStyle = isSadMode ? 'rgba(255,100,100,0.05)' : 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      for(let i=0; i<100; i++) {
        ctx.beginPath();
        const gy = (i * 15) + (canvas.height * 0.1);
        ctx.moveTo(0, gy);
        ctx.bezierCurveTo(canvas.width*0.3, gy + 20, canvas.width*0.7, gy - 20, canvas.width, gy);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.5; // Perfectly centered for symmetric bounds
      const holeRadius = Math.min(canvas.width, canvas.height) * 0.18; // Further reduced for more clearance

      // Rosette
      [60, 52, 45, 20, 10].forEach((rOffset, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, holeRadius + rOffset, 0, Math.PI * 2);
        ctx.strokeStyle = isSadMode ? (i % 2 === 0 ? '#ff3c3c' : '#ffffff') : (i % 2 === 0 ? '#333' : '#d4af37');
        ctx.lineWidth = i === 3 ? 10 : 2;
        ctx.stroke();
      });

      // Sound Hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = isSadMode ? '#050000' : '#0a0a0a';
      ctx.fill();

      // Illustrations (Sad Vibe)
      if (isSadMode) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        particles.forEach(p => {
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
           ctx.fill();
           p.y += p.s * 0.3;
           if (p.y > canvas.height) p.y = -10;
        });
      }

      // Strings
      stringsRef.current.forEach((str, idx) => {
        if (isSadMode && !str.isHovered) {
          str.controlY = Math.sin(time * 0.002 + idx) * (10 + idx * 2);
        }

        str.update();
        
        ctx.beginPath();
        const stringY = (centerY - 100) + idx * 42; // Tighter spacing
        ctx.moveTo(0, stringY);
        
        if (str.isHovered || Math.abs(str.controlY) > 0.5) {
          ctx.quadraticCurveTo(str.mouseX, stringY + str.controlY * 1.8, canvas.width, stringY);
        } else {
          ctx.lineTo(canvas.width, stringY);
        }

        ctx.shadowColor = isSadMode ? 'rgba(255,100,100,0.6)' : 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = isSadMode ? 12 : 3;

        // NEW COLORS for first 3 strings (Bronze/Gold theme)
        if (idx < 3) {
          ctx.strokeStyle = '#d4af37'; // Bronze
        } else {
          ctx.strokeStyle = '#e0e0e0'; // Silver/Steel
        }
        
        ctx.lineWidth = (isSadMode ? 1.2 : 2.5) + (idx * 0.4);
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        
        // String Pins
        ctx.beginPath();
        ctx.arc(canvas.width * 0.08, stringY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.stroke();

        str.yOffset = stringY; 
      });

      ctx.restore();

      // Rim Binding (Distinct outline) - TOP
      ctx.beginPath();
      ctx.moveTo(0, leftY);
      ctx.bezierCurveTo(canvas.width*0.3, 0, canvas.width*0.6, canvas.height*0.1, canvas.width, rightY);
      ctx.lineWidth = 12;
      ctx.strokeStyle = isSadMode ? '#1e0000' : '#0a0a0a';
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.strokeStyle = isSadMode ? '#ffffff' : '#f5f5dc';
      ctx.stroke();

      // Rim Binding (Distinct outline) - BOTTOM
      ctx.beginPath();
      ctx.moveTo(0, bottomLeftY);
      ctx.bezierCurveTo(canvas.width*0.3, canvas.height, canvas.width*0.6, canvas.height*0.9, canvas.width, bottomRightY);
      ctx.lineWidth = 12;
      ctx.strokeStyle = isSadMode ? '#1e0000' : '#0a0a0a';
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.strokeStyle = isSadMode ? '#ffffff' : '#f5f5dc';
      ctx.stroke();


      animationFrameId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSadMode, isPlaying, currentSong]);

  const handlePointerMove = (e) => {
    initAudio(); 
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const mouseX = e.clientX - rect.left;

    stringsRef.current.forEach(str => {
      const distY = mouseY - str.yOffset;
      if (Math.abs(distY) < 40) {
        str.pull(distY, mouseX);
      } else if (str.isHovered) {
        str.release();
      }
    });
  };

  const handlePointerLeave = () => {
    stringsRef.current.forEach(str => {
      if (str.isHovered) str.release();
    });
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'auto' }}>
      <canvas 
        ref={canvasRef} 
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerOut={handlePointerLeave}
        onPointerDown={initAudio} 
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
      />
      <LyricsPathOverlay 
        isSadMode={isSadMode} 
        audioRef={audioRef} 
        lyrics={currentSong.lyrics} 
        currentTime={currentTime}
        hasSeenIntro={hasSeenIntro}
      />
    </div>
  );
};

export default GuitarBackground;
