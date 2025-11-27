import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Code, MousePointer2, Plus, ArrowRight, RotateCw } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const ProfilePage: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  const getIcon = (name: string) => {
    switch(name) {
      case 'monitor': return <Monitor size={24} />;
      case 'code': return <Code size={24} />;
      case 'cursor': return <MousePointer2 size={24} />;
      case 'plus': return <Plus size={24} />;
      default: return <Monitor size={24} />;
    }
  };

  const getShape = (shape: string) => {
    switch(shape) {
      case 'triangle': return <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black"></div>;
      case 'square': return <div className="w-3 h-3 bg-black"></div>;
      case 'circle': return <div className="w-3 h-3 bg-black rounded-full"></div>;
      case 'diamond': return <div className="w-3 h-3 bg-black transform rotate-45"></div>;
      default: return <div className="w-3 h-3 bg-black rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A] pt-28 px-4 md:px-12 pb-20 relative font-sans transition-colors duration-700">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">My Profile</h1>
          <div className="h-[1px] w-full bg-black/10"></div>
        </motion.div>

        {/* Top Row: 4 Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PROFILE_DATA.pillars.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
              className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between h-[340px] group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-black/80 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  {getIcon(card.icon)}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {card.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <span key={tag} className="bg-[#F0F0F0] px-3 py-1 rounded-full text-[10px] uppercase font-medium tracking-wide text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-light mt-4">{card.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Middle Section: Persona & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* USER PERSONA (Radar Chart) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.6 }}
             className="lg:col-span-4 bg-[#111] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col"
          >
             <div className="flex justify-between items-start mb-6 z-10">
               <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">USER PERSONA</h3>
               <button 
                  onClick={() => setFlipped(!flipped)}
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase tracking-widest"
               >
                 <RotateCw size={12} /> Flip Me
               </button>
             </div>

             <div className="relative flex-1 flex items-center justify-center min-h-[300px] perspective-1000">
                <AnimatePresence mode="wait">
                  {!flipped ? (
                    <motion.div 
                      key="front"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {/* Radar Chart SVG */}
                      <svg viewBox="0 0 200 200" className="w-full max-w-[280px]">
                        {/* Grid */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                          <circle key={i} cx="100" cy="100" r={80 * r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        ))}
                        {/* Axes */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                           <line 
                              key={i} 
                              x1="100" y1="100" 
                              x2={100 + Math.cos((deg - 90) * Math.PI / 180) * 80} 
                              y2={100 + Math.sin((deg - 90) * Math.PI / 180) * 80} 
                              stroke="rgba(255,255,255,0.1)" 
                              strokeWidth="0.5" 
                           />
                        ))}
                        {/* Data Polygon */}
                        <motion.polygon 
                           points={PROFILE_DATA.persona.traits.map((t, i) => {
                             const angle = (i * 360 / PROFILE_DATA.persona.traits.length - 90) * Math.PI / 180;
                             const val = t.value / 100 * 80;
                             return `${100 + Math.cos(angle) * val},${100 + Math.sin(angle) * val}`;
                           }).join(' ')}
                           fill="url(#radarGradient)"
                           stroke="rgba(255,255,255,0.8)"
                           strokeWidth="1.5"
                           initial={{ opacity: 0, scale: 0 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 1, delay: 0.8 }}
                        />
                        <defs>
                          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="rgba(255, 20, 147, 0.6)" />
                            <stop offset="100%" stopColor="rgba(0, 206, 209, 0.1)" />
                          </radialGradient>
                        </defs>
                        {/* Labels */}
                        {PROFILE_DATA.persona.traits.map((t, i) => {
                           const angle = (i * 360 / PROFILE_DATA.persona.traits.length - 90) * Math.PI / 180;
                           const x = 100 + Math.cos(angle) * 95;
                           const y = 100 + Math.sin(angle) * 95;
                           return (
                             <text 
                                key={i} x={x} y={y} 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                fill="rgba(255,255,255,0.6)" 
                                fontSize="6"
                                fontFamily="monospace"
                             >
                               {t.label}
                             </text>
                           )
                        })}
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                       key="back"
                       initial={{ rotateY: 90, opacity: 0 }}
                       animate={{ rotateY: 0, opacity: 1 }}
                       exit={{ rotateY: -90, opacity: 0 }}
                       transition={{ duration: 0.4 }}
                       className="w-full h-full flex flex-col justify-center items-center text-center p-4"
                    >
                       <h4 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-4">Core Objectives</h4>
                       <ul className="space-y-4">
                         {PROFILE_DATA.persona.goals.map((goal, i) => (
                           <li key={i} className="text-sm text-gray-300 border-b border-white/10 pb-2 w-full">
                             {goal}
                           </li>
                         ))}
                       </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             
             <div className="mt-6 pt-6 border-t border-white/10">
               <h4 className="text-xs font-bold uppercase mb-2">GOAL</h4>
               <p className="text-sm text-gray-400 leading-relaxed">
                 To harmonize complex data structures with intuitive, emotive user interfaces.
               </p>
             </div>
          </motion.div>

          {/* MY EXPERIENCE (Map) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.7 }}
             className="lg:col-span-6 bg-[#111] rounded-2xl p-8 text-white relative overflow-hidden"
          >
             <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-6 relative z-10">MY EXPERIENCE</h3>
             
             {/* Abstract Dot Map */}
             <div className="absolute inset-0 opacity-20 z-0">
               <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
             </div>

             <div className="relative z-10 h-[300px] flex flex-col justify-center gap-6">
                {PROFILE_DATA.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-16 text-right text-xs text-gray-500 font-mono pt-1">{exp.years}</div>
                    
                    <div className="relative">
                       <div className="w-3 h-3 rounded-full bg-white group-hover:bg-green-400 transition-colors z-10 relative"></div>
                       {i !== PROFILE_DATA.experience.length - 1 && (
                         <div className="absolute top-3 left-1.5 w-[1px] h-12 bg-white/20"></div>
                       )}
                    </div>
                    
                    <div>
                      <div className="text-lg font-light">{exp.city}</div>
                      <div className="text-[10px] text-green-400 font-mono opacity-60 tracking-wider group-hover:opacity-100 transition-opacity">
                        {exp.coords}
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
             
             {/* Decorative Journey Curve (SVG) */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
                <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
                   <path d="M150,50 C100,100 200,150 50,250" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
                </svg>
             </div>
          </motion.div>

          {/* Testimonials Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
             {PROFILE_DATA.testimonials.map((t, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-black/5 shadow-sm"
               >
                  <div className="mb-3 text-black/40">
                    {getShape(t.shape)}
                  </div>
                  <p className="text-sm italic text-gray-600 mb-4 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <div className="text-xs font-bold text-black">{t.role}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t.company}</div>
                  </div>
               </motion.div>
             ))}
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default ProfilePage;