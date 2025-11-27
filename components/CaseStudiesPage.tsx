
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';

// --- CSS-Based Abstract Visuals for Narrative Anchors ---

const AbstractInterface: React.FC<{ type: 'dashboard' | 'mobile' | 'system'; active?: boolean }> = ({ type, active = true }) => {
    if (type === 'dashboard') {
        return (
            <div className="w-full aspect-[16/9] bg-[#0A0A0A] border border-white/10 rounded-sm relative overflow-hidden group">
                {/* Header */}
                <div className="h-4 border-b border-white/10 flex items-center px-2 gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                </div>
                {/* Sidebar */}
                <div className="absolute left-0 top-4 bottom-0 w-12 border-r border-white/10"></div>
                {/* Main Content */}
                <div className="absolute left-12 top-4 right-0 bottom-0 p-4">
                    <div className="grid grid-cols-3 gap-4 h-full">
                        <div className="col-span-2 space-y-4">
                            <div className="h-32 border border-white/10 relative overflow-hidden">
                                {/* Graph Simulation */}
                                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end px-2 pb-2 gap-1">
                                    {[30, 50, 40, 70, 50, 80, 60, 90, 40].map((h, i) => (
                                        <div key={i} className="flex-1 bg-white/20" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-20 bg-white/5"></div>
                                <div className="h-20 bg-white/5"></div>
                            </div>
                        </div>
                        <div className="col-span-1 border border-white/10 p-2 space-y-2">
                             {[1,2,3,4,5].map(i => (
                                 <div key={i} className="h-2 bg-white/10 w-full rounded-sm"></div>
                             ))}
                        </div>
                    </div>
                </div>
                {/* Highlight Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        )
    }
    
    if (type === 'mobile') {
        return (
            <div className="w-full aspect-[16/9] bg-[#0A0A0A] flex items-center justify-center border border-white/10 relative overflow-hidden">
                <div className="w-32 h-56 border border-white/20 rounded-xl relative overflow-hidden flex flex-col bg-black">
                    <div className="h-32 bg-white/5 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 rounded-lg rotate-12"></div>
                    </div>
                    <div className="p-2 space-y-2">
                         <div className="h-2 w-16 bg-white/20 rounded"></div>
                         <div className="h-2 w-full bg-white/10 rounded"></div>
                         <div className="mt-4 h-8 bg-white/20 rounded w-full"></div>
                    </div>
                </div>
                 {/* Particles */}
                 <div className="absolute inset-0">
                     {[1,2,3].map(i => (
                         <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: `${20 * i}%`, left: `${30 * i}%`, animationDuration: `${i + 1}s` }}></div>
                     ))}
                 </div>
            </div>
        )
    }

    return (
        <div className="w-full aspect-[16/9] bg-[#0A0A0A] border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
             <div className="grid grid-cols-2 gap-8 w-full">
                 <div className="border border-white/20 p-4 relative">
                     <div className="absolute -top-2 left-2 text-[8px] bg-black px-1 text-white/50">INPUT</div>
                     <div className="space-y-2">
                         <div className="h-1 w-full bg-white/10"></div>
                         <div className="h-1 w-3/4 bg-white/10"></div>
                         <div className="h-1 w-1/2 bg-red-500/50"></div>
                     </div>
                 </div>
                 <div className="border border-white/20 p-4 relative">
                     <div className="absolute -top-2 left-2 text-[8px] bg-black px-1 text-white/50">OUTPUT</div>
                     <div className="space-y-2">
                         <div className="h-1 w-full bg-white/10"></div>
                         <div className="h-1 w-full bg-green-500/50"></div>
                     </div>
                 </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-white/20 rounded-full flex items-center justify-center z-10">
                 <ArrowRight size={12} className="text-white/50" />
             </div>
        </div>
    )
}

const CaseStudiesPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Auto-select first case if none (or handle navigation logic)
  // For now, let's allow user to see the list first
  
  const handleNextProject = () => {
      if (!selectedCase) return;
      const currentIndex = CASE_STUDIES.findIndex(c => c.id === selectedCase.id);
      const nextIndex = (currentIndex + 1) % CASE_STUDIES.length;
      setSelectedCase(CASE_STUDIES[nextIndex]);
      window.scrollTo(0,0);
  }

  if (selectedCase) {
      return (
          <div className="min-h-screen bg-black text-white pt-24 pb-20 font-mono">
              {/* HERO SECTION */}
              <div className="px-6 md:px-12 lg:px-20 mb-20 md:mb-32">
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-12"
                  >
                    <ArrowLeft size={14} /> Back to Archive
                  </button>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] max-w-5xl mb-8"
                  >
                    {selectedCase.heroMetric}
                  </motion.h1>
                  
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="flex items-center gap-4 text-sm text-gray-400"
                  >
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>{selectedCase.client}</span>
                      <span className="text-gray-700">/</span>
                      <span>{selectedCase.title}</span>
                  </motion.div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className="px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  
                  {/* LEFT: STICKY CONTEXT */}
                  <div className="lg:col-span-4 relative">
                      <div className="sticky top-32 space-y-12 border-t border-white/20 pt-8">
                          <div>
                              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Role</div>
                              <div className="text-lg">{selectedCase.context.role}</div>
                          </div>
                          <div>
                              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Timeline</div>
                              <div className="text-lg">{selectedCase.context.timeline}</div>
                          </div>
                          <div>
                              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Team</div>
                              <div className="text-lg">{selectedCase.context.team}</div>
                          </div>
                          <div>
                              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Tech Stack</div>
                              <div className="flex flex-wrap gap-2">
                                  {selectedCase.context.stack.map(tech => (
                                      <span key={tech} className="px-2 py-1 border border-white/20 rounded text-xs text-gray-400">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          
                          {/* KEY STATS */}
                          <div className="pt-8 border-t border-white/20">
                              <div className="grid grid-cols-1 gap-6">
                                  {selectedCase.stats.map(stat => (
                                      <div key={stat.label}>
                                          <div className="text-3xl font-light mb-1">{stat.value}</div>
                                          <div className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT: NARRATIVE */}
                  <div className="lg:col-span-8 space-y-24">
                      
                      {/* 01. THE PROBLEM */}
                      <section>
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="text-gray-500">01</span> THE PROBLEM
                          </div>
                          <h3 className="text-2xl md:text-3xl leading-tight mb-6 font-light">
                             {selectedCase.narrative.problem}
                          </h3>
                          {/* Visual Anchor */}
                          <div className="mt-12">
                               <div className="text-xs text-center text-gray-500 mb-4 uppercase tracking-widest">Legacy State (Before)</div>
                               <div className="w-full grayscale opacity-50 border border-white/10">
                                    <AbstractInterface type={selectedCase.visualType} active={false} />
                               </div>
                          </div>
                      </section>

                      {/* 02. RESEARCH & PROCESS */}
                      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <span className="text-gray-500">02</span> RESEARCH
                              </div>
                              <p className="text-gray-400 leading-relaxed">
                                  {selectedCase.narrative.research}
                              </p>
                          </div>
                          <div>
                               <div className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <span className="text-gray-500">03</span> PROCESS
                              </div>
                              <p className="text-gray-400 leading-relaxed">
                                  {selectedCase.narrative.process}
                              </p>
                          </div>
                      </section>

                      {/* 04. THE SOLUTION */}
                      <section>
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="text-gray-500">04</span> THE SOLUTION
                          </div>
                          <p className="text-xl leading-relaxed mb-12 max-w-2xl">
                              {selectedCase.narrative.solution}
                          </p>
                          
                          {/* Main Visual */}
                          <div className="w-full border border-white/20 p-2 bg-white/5">
                               <AbstractInterface type={selectedCase.visualType} active={true} />
                          </div>
                          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest text-gray-500">
                              <span>Final Implementation</span>
                              <span>v2.4.0 Live Build</span>
                          </div>
                      </section>

                       {/* 05. IMPACT */}
                       <section>
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="text-gray-500">05</span> IMPACT
                          </div>
                           <p className="text-gray-400 leading-relaxed max-w-2xl mb-12">
                              {selectedCase.narrative.impact}
                          </p>
                       </section>

                       {/* NEXT PROJECT NAV */}
                       <div 
                          onClick={handleNextProject}
                          className="border-t border-white/20 pt-12 cursor-pointer group"
                       >
                           <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 group-hover:text-white transition-colors">Next Case Study</div>
                           <div className="text-4xl md:text-6xl font-light group-hover:pl-4 transition-all duration-300 flex items-center gap-4">
                               {CASE_STUDIES.find(c => c.id !== selectedCase.id)?.title || "PROJECT SIGNAL"}
                               <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      )
  }

  // --- ARCHIVE LIST VIEW ---
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-20 font-mono">
        <div className="max-w-[1600px] mx-auto">
             <div className="mb-20 border-b border-white/20 pb-8 flex items-end justify-between">
                 <h1 className="text-5xl md:text-8xl tracking-tighter font-bold text-transparent stroke-text" style={{ WebkitTextStroke: '1px #fff' }}>
                    CASE_LOGS
                 </h1>
                 <div className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">
                     // ARCHIVE_ACCESS_GRANTED
                 </div>
             </div>

             <div className="grid grid-cols-1 gap-px bg-white/20 border border-white/20">
                 {CASE_STUDIES.map((study) => (
                     <motion.div 
                        key={study.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        onClick={() => {
                            setSelectedCase(study);
                            window.scrollTo(0,0);
                        }}
                        className="bg-black p-8 md:p-12 cursor-pointer group relative overflow-hidden"
                     >
                         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                             <div className="md:col-span-2 text-xs text-gray-500 font-mono">
                                 {study.id}
                             </div>
                             <div className="md:col-span-6">
                                 <h2 className="text-3xl md:text-5xl font-light mb-2 group-hover:pl-4 transition-all duration-300">
                                     {study.title}
                                 </h2>
                                 <div className="text-xs text-gray-500 uppercase tracking-widest">
                                     {study.client} — {study.year}
                                 </div>
                             </div>
                             <div className="md:col-span-3">
                                 <div className="flex flex-wrap gap-2">
                                     {study.tags.map(t => (
                                         <span key={t} className="px-2 py-1 border border-white/10 rounded-full text-[10px] uppercase text-gray-400">
                                             {t}
                                         </span>
                                     ))}
                                 </div>
                             </div>
                             <div className="md:col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                 <ArrowRight />
                             </div>
                         </div>
                     </motion.div>
                 ))}
             </div>
        </div>
    </div>
  );
};

export default CaseStudiesPage;
