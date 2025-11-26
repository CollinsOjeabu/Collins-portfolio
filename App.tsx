import React, { useEffect, useState, useRef } from 'react';
import { ArrowDownRight, Terminal, ExternalLink, Mail, Copy, MoveRight, Menu } from 'lucide-react';
import Cursor from './components/Cursor';
import Marquee from './components/Marquee';
import SkillMatrix from './components/SkillMatrix';
import TimeGauge from './components/TimeGauge';
import Hero3D from './components/Hero3D';
import MobileMenu from './components/MobileMenu';
import ScrollReveal from './components/ScrollReveal';
import { PERSONAL_INFO, GEODATA, PROJECTS, SKILLS } from './constants';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-mono selection:bg-white selection:text-black overflow-x-hidden relative">
      <Cursor />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* FIXED METADATA HEADER */}
      <header className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start z-50 pointer-events-none text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mix-blend-difference">
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto hover:bg-white/20 transition-colors">
          <span className="text-white font-bold mr-2">{PERSONAL_INFO.name}</span>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
             {/* Desktop Nav */}
             <div className="hidden md:flex bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-gray-400 gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                <span className="hover:text-white cursor-pointer transition-colors">Project</span>
                <span className="hover:text-white cursor-pointer transition-colors">Case Study</span>
             </div>
        </div>

        <div className="flex gap-2 items-center pointer-events-auto">
             <div className="hidden md:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center bg-white/5 backdrop-blur-sm">
                 <div className="w-4 h-[1px] bg-white"></div>
             </div>
             
             {/* Mobile Menu Toggle */}
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors"
             >
                <Menu size={16} />
             </button>

             <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm overflow-hidden relative group">
                 {/* 3D-ish Cube Icon simulation */}
                 <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-purple-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
             </div>
        </div>
      </header>

      {/* SCROLL PROGRESS BAR (LEFT) */}
      <div className="fixed left-0 top-0 h-full w-[2px] z-40 bg-white/5">
        <div 
          className="bg-white w-full transition-all duration-100 ease-linear shadow-[0_0_10px_white]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
             backgroundSize: '100px 100px'
           }} 
      />

      <main className="relative z-10">
        
        {/* SECTION 1: HERO - TERMINAL PROMPT & 3D */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20 relative overflow-hidden">
          {/* 3D Element Background */}
          <Hero3D />

          <div className="max-w-[1600px] w-full mx-auto relative z-10">
            
            <ScrollReveal className="w-full">
                <div className="mb-12">
                <div className="inline-flex flex-col gap-1 p-6 bg-black/40 border border-white/10 rounded-sm backdrop-blur-md max-w-2xl w-full">
                    <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-mono">
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">let</span> stranger = user.current();
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-mono">
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">console</span>.log(<span className="text-yellow-300">"The terminal is open."</span>);
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-mono mt-2 animate-pulse">
                        {'>'} The terminal is open.
                    </div>
                    <div className="text-xs text-gray-600 mt-4 pt-2 border-t border-white/5">
                        Type nothing. Just explore._
                    </div>
                </div>
                </div>
            </ScrollReveal>
            
            <h1 className="text-[14vw] leading-[0.8] font-normal tracking-[-0.05em] mix-blend-difference select-none cursor-default">
              <ScrollReveal delay={0.2} width="100%">
                  <span className="block">Hello</span>
              </ScrollReveal>
              <ScrollReveal delay={0.4} width="100%">
                 <span className="block pl-[10vw] text-transparent stroke-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Stranger</span>
              </ScrollReveal>
            </h1>
          </div>

          <div className="absolute bottom-10 right-10 md:right-20 flex gap-4 text-[10px] uppercase tracking-widest text-gray-500 animate-pulse">
             SCROLL TO INITIALIZE <ArrowDownRight size={14} />
          </div>
        </section>

        {/* SECTION 2: MARQUEE SKILLS */}
        <section className="py-20 border-y border-white/10 relative overflow-hidden bg-white/5 backdrop-blur-sm">
          <Marquee items={SKILLS} direction="left" speed={20} />
        </section>

        {/* SECTION 3: METRICS & MATRIX */}
        <section className="py-32 px-6 md:px-20 relative">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
               {/* Time Gauge Card */}
               <ScrollReveal width="100%" delay={0.1}>
                  <div className="w-full h-full">
                      <TimeGauge />
                  </div>
               </ScrollReveal>
               
               {/* Skill Matrix Card */}
               <ScrollReveal width="100%" delay={0.3}>
                  <div className="w-full h-full">
                      <SkillMatrix />
                  </div>
               </ScrollReveal>
            </div>

            <div className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
               <div className="max-w-xl">
                  <ScrollReveal>
                      <h3 className="text-2xl mb-4 font-light">SYSTEM ARCHITECTURE</h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        Constructing digital environments at the intersection of brutalist functionality and kinetic motion.
                        I don't just write code; I compile experiences. My approach blends the precision of engineering with the chaos of art.
                      </p>
                  </ScrollReveal>
               </div>
               <div className="text-right">
                  <ScrollReveal delay={0.2}>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Current Status</div>
                      <div className="text-xl text-green-400 animate-pulse">● {PERSONAL_INFO.availability}</div>
                  </ScrollReveal>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SELECTED WORKS - GLASSMORPHIC CARDS */}
        <section className="py-32 px-6 md:px-20 relative">
          {/* Section Header */}
          <div className="max-w-[1600px] mx-auto mb-20 flex items-end justify-between border-b border-white/10 pb-6">
             <ScrollReveal>
                <h2 className="text-4xl md:text-8xl tracking-tighter font-bold text-transparent stroke-text" style={{ WebkitTextStroke: '1px #fff' }}>
                SELECTED_WORKS
                </h2>
             </ScrollReveal>
             <span className="text-xs font-mono text-gray-500 mb-2 hidden md:block">
               Index: 01 — {PROJECTS.length.toString().padStart(2, '0')}
             </span>
          </div>

          <div className="max-w-[1600px] mx-auto space-y-40">
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.id} width="100%" delay={index * 0.1}>
                  <div className="group relative perspective-1000 cursor-hover">
                    
                    {/* Connecting Line */}
                    {index !== PROJECTS.length - 1 && (
                    <div className="absolute left-1/2 bottom-[-160px] w-[1px] h-[160px] bg-gradient-to-b from-white/20 to-transparent hidden md:block"></div>
                    )}

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 group-hover:transform group-hover:scale-[1.01] overflow-hidden">
                    
                    {/* Decorative corner markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/50"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50"></div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    <div className="lg:col-span-3 flex flex-col justify-between h-full">
                        <div className="text-5xl font-light text-white/20 font-mono">
                        {project.id}
                        </div>
                        <div className="mt-10 lg:mt-0">
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Category</div>
                        <div className="text-white text-sm">{project.category}</div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-300">
                        {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mb-8">
                        {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                        {project.tech.map(t => (
                            <span key={t} className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider rounded-sm text-gray-300">
                            {t}
                            </span>
                        ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex items-end justify-end">
                        <a href={project.link} className="w-full md:w-auto px-8 py-4 border border-white/20 flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-300 group/btn relative overflow-hidden">
                        <span className="relative z-10 text-xs uppercase tracking-widest">Init Case Study</span>
                        <MoveRight size={14} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                        <div className="absolute inset-0 bg-white transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        </a>
                    </div>

                    </div>
                  </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECTION 5: FOOTER */}
        <footer className="min-h-[50vh] flex flex-col justify-between px-6 md:px-20 py-20 bg-neutral-950 relative overflow-hidden border-t border-white/10">
          <div className="max-w-[1600px] w-full mx-auto relative z-10">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                        {'>'} Initiate Communication
                    </div>
                    <h2 className="text-[10vw] md:text-[8vw] leading-none tracking-tighter cursor-hover">
                        LET'S TALK
                    </h2>
                </div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-10 md:mt-0 w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group animate-[spin_10s_linear_infinite] hover:animate-none cursor-hover">
                    <Mail size={32} />
                </a>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-xs uppercase tracking-widest text-gray-400">
                <div className="flex flex-col gap-2">
                    <span className="text-white mb-2">Socials</span>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">Twitter (X)</a>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">Instagram</a>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-white mb-2">Code</span>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">CodePen</a>
                    <a href="#" className="hover:text-white transition-colors cursor-hover">StackOverflow</a>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-white mb-2">Coordinates</span>
                    <span>{GEODATA.location}</span>
                    <span>{GEODATA.lat}</span>
                    <span>{GEODATA.lng}</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                    <span className="text-white mb-2">Local Time</span>
                    <span className="tabular-nums">{time}</span>
                </div>
                </div>
            </ScrollReveal>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 text-center text-[10px] text-gray-800 uppercase tracking-[1em]">
             COLLINS OJEABU © {new Date().getFullYear()}
          </div>
        </footer>

      </main>
      
      {/* Global Style overrides for specific animations */}
      <style>{`
        .stroke-text {
          -webkit-text-fill-color: transparent;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default App;