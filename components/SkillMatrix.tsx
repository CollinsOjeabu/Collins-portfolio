import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILL_MATRIX } from '../constants';

const SkillMatrix: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  // Calculate points for the radar chart
  const points = SKILL_MATRIX.map((skill, i) => {
    const angle = (Math.PI * 2 * i) / SKILL_MATRIX.length - Math.PI / 2;
    const value = skill.level / 100;
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    return `${x},${y}`;
  }).join(' ');

  // Calculate "max" points for background
  const maxPoints = SKILL_MATRIX.map((_, i) => {
    const angle = (Math.PI * 2 * i) / SKILL_MATRIX.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative p-8 border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between group overflow-hidden">
      {/* Glass highlight effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                <motion.svg 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </motion.svg>
                DESIGN SKILL MATRIX
            </div>
            <div className="text-[10px] text-gray-600 font-mono">
                v2.4.0 <span className="text-green-500 animate-pulse">● LIVE</span>
            </div>
          </div>
          <div className="flex flex-col text-[10px] text-right text-gray-500 uppercase">
             <span>SKILL</span>
             {SKILL_MATRIX.map(s => (
                <span key={s.name} className={`transition-colors duration-300 ${hoveredSkill === s.name ? 'text-white' : 'text-gray-400'}`}>
                    {s.name} <span className="text-white bg-white/10 px-1 rounded ml-1">{s.level}</span>
                </span>
             ))}
          </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg viewBox="0 0 300 300" className="w-[80%] h-[80%] overflow-visible">
            
            {/* Rotating Scanner Effect */}
            <motion.g 
                style={{ transformOrigin: "150px 150px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <line x1="150" y1="150" x2="150" y2="50" stroke="url(#scannerGrad)" strokeWidth="2" />
                <defs>
                    <linearGradient id="scannerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
                    </linearGradient>
                </defs>
                <path d="M 150 150 L 115 50 A 100 100 0 0 1 185 50 Z" fill="url(#scannerFill)" opacity="0.1" />
                 <defs>
                    <radialGradient id="scannerFill">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
            </motion.g>

            {/* Background Circles */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <motion.circle
                initial={{ r: 0, opacity: 0 }}
                animate={isInView ? { r: radius * scale, opacity: 1 } : {}}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                key={i}
                cx={centerX}
                cy={centerY}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 4"
            />
            ))}

            {/* Axes */}
            {SKILL_MATRIX.map((_, i) => {
            const angle = (Math.PI * 2 * i) / SKILL_MATRIX.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            return (
                <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    key={`line-${i}`}
                    x1={centerX} y1={centerY} 
                    x2={x} y2={y} 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="1" 
                />
            );
            })}

            {/* Data Shape - Animated */}
            <motion.polygon
                points={points}
                fill="rgba(255,255,255,0.05)"
                stroke="white"
                strokeWidth="1.5"
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                initial={{ scale: 0, opacity: 0, transformOrigin: "150px 150px" }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: "backOut", delay: 0.8 }}
            />

            {/* Nodes with interactions */}
            {SKILL_MATRIX.map((skill, i) => {
            const angle = (Math.PI * 2 * i) / SKILL_MATRIX.length - Math.PI / 2;
            const value = skill.level / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            return (
                <motion.g 
                    key={i}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="cursor-pointer pointer-events-auto"
                >
                    <circle cx={x} cy={y} r="15" fill="transparent" /> {/* Hit area */}
                    <circle cx={x} cy={y} r="3" fill="white" className="animate-pulse" />
                    <motion.circle 
                        cx={x} cy={y} r="8" stroke="white" strokeWidth="1" fill="transparent" opacity="0.3"
                        whileHover={{ scale: 1.5, opacity: 0.8 }}
                    />
                </motion.g>
            );
            })}
        </svg>
      </div>
      
      <div className="mt-4 relative z-10">
          <div className="text-right text-[9px] text-gray-600 font-mono tracking-wide mb-2">
            // system_health: <span className="text-green-500">OPTIMAL</span><br/>
            // skill_sync: <span className="text-blue-500">COMPLETE</span>
          </div>
          
          {/* Animated "Equalizer" Bars */}
          <div className="flex h-4 gap-1 opacity-80 items-end">
             {Array.from({ length: 30 }).map((_, i) => (
                 <EqualizerBar key={i} index={i} />
             ))}
          </div>
      </div>
    </div>
  );
};

const EqualizerBar: React.FC<{ index: number }> = ({ index }) => {
    // Generate random heights for a "data processing" look
    const randomHeight = () => Math.random() * 100 + "%";
    
    return (
        <motion.div
            className="flex-1 bg-white/20"
            initial={{ height: "10%" }}
            animate={{ 
                height: [randomHeight(), randomHeight(), randomHeight()],
                backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.2)"]
            }}
            transition={{ 
                duration: 0.5 + Math.random() * 0.5, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 0.05 
            }}
            style={{ borderRadius: '1px' }}
        />
    );
}

export default SkillMatrix;