import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';

const TimeGauge: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Kinetic Counter Logic
  const startValue = 0;
  const endValue = 14238;
  const countMotion = useSpring(startValue, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState(startValue);

  // Live "Ticking" effect variables
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    if (isInView) {
      countMotion.set(endValue);
    }
  }, [isInView, endValue, countMotion]);

  useEffect(() => {
    // Sync spring value to React state for rendering
    const unsubscribe = countMotion.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [countMotion]);

  // Simulated "Live" working time - adds a tiny amount every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
        setTicker(prev => (prev + 1) % 100); // Just a visual ticker
        // Occasionally increment the main number to show "live" work
        if (Math.random() > 0.7) {
            countMotion.set(countMotion.get() + 1); 
        }
    }, 2000);
    return () => clearInterval(interval);
  }, [countMotion]);

  // Mouse Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width - 0.5) * 200; // -100 to 100
        const yPct = (mouseY / height - 0.5) * 200;
        x.set(xPct);
        y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-8 border border-white/10 bg-white/5 backdrop-blur-md w-full h-full flex flex-col justify-between group overflow-hidden perspective-1000"
    >
       {/* Glass highlight effect - moves opposite to mouse */}
       <motion.div 
         style={{ x: useTransform(x, val => -val / 5), y: useTransform(y, val => -val / 5) }}
         className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" 
       />
       
       <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest mb-8 relative z-10">
        <span className="w-2 h-2 rounded-full border border-white/40 relative flex items-center justify-center">
            <motion.span 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-green-500 rounded-full blur-[1px]"
            ></motion.span>
        </span>
        DESIGN TIME SPENT
      </div>
      
      <div className="text-center relative z-10 my-4 transform-style-3d translate-z-10">
        <div className="text-6xl md:text-8xl font-light tracking-tighter text-white tabular-nums flex justify-center items-baseline gap-1">
          <motion.span>{displayValue.toLocaleString()}</motion.span>
          <span className="text-sm text-gray-600 font-mono animate-pulse">:</span>
          <span className="text-sm text-gray-600 font-mono tabular-nums">{ticker.toString().padStart(2, '0')}</span>
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mt-2 flex justify-center items-center gap-2">
            <span>Hours Logged</span>
            <span className="px-1 py-0.5 bg-green-900/30 border border-green-500/30 text-[8px] text-green-400 rounded">ACTIVE</span>
        </div>
      </div>
      
      {/* SVG Arc Gauge */}
      <div className="relative h-24 mt-4 w-full flex items-end justify-center translate-z-20">
        <svg viewBox="0 0 200 100" className="w-full h-full max-w-[240px] overflow-visible">
            {/* Background Arc */}
            <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            
            {/* Ticks */}
            {Array.from({ length: 20 }).map((_, i) => {
                const angle = (Math.PI * i) / 19;
                const x1 = 100 - Math.cos(angle) * 80;
                const y1 = 100 - Math.sin(angle) * 80;
                const x2 = 100 - Math.cos(angle) * 95;
                const y2 = 100 - Math.sin(angle) * 95;
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                );
            })}

            {/* Progress Arc */}
            <motion.path 
                d="M 10 100 A 90 90 0 0 1 190 100" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="4" 
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={isInView ? { strokeDashoffset: 70 } : { strokeDashoffset: 283 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
            </defs>
            
            {/* Indicator Dot - follows the path approximately */}
            <motion.circle 
                r="4" 
                fill="white" 
                className="shadow-[0_0_15px_white]" 
                initial={{ cx: 10, cy: 100 }}
                animate={isInView ? { cx: 155, cy: 45 } : { cx: 10, cy: 100 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
        </svg>
      </div>
      
      <div className="flex justify-between mt-8 text-[10px] text-gray-500 font-mono border-t border-white/10 pt-4 relative z-10">
        <div className="flex flex-col group/loc cursor-crosshair">
            <span className="text-white group-hover/loc:text-green-400 transition-colors">BOSTON</span>
            <span>2020</span>
            <span className="scale-75 origin-left opacity-50 font-mono">42.3601° N 71.0589° W</span>
        </div>
        <div className="flex flex-col text-right group/loc cursor-crosshair">
            <span className="text-white group-hover/loc:text-green-400 transition-colors">SAN FRANCISCO</span>
            <span>2025</span>
            <span className="scale-75 origin-right opacity-50 font-mono">37.7749° N 122.4194° W</span>
        </div>
      </div>
    </motion.div>
  );
};
export default TimeGauge;