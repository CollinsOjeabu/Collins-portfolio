
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Menu } from 'lucide-react';
import Cursor from './components/Cursor';
import Marquee from './components/Marquee';
import SkillMatrix from './components/SkillMatrix';
import TimeGauge from './components/TimeGauge';
import Hero3D from './components/Hero3D';
import MobileMenu from './components/MobileMenu';
import ScrollReveal from './components/ScrollReveal';
import ProjectsPage from './components/ProjectsPage';
import ProfilePage from './components/ProfilePage';
import CaseStudiesPage from './components/CaseStudiesPage';
import { PERSONAL_INFO, GEODATA, PROJECTS, SKILLS } from './constants';
import { MoveRight, Mail } from 'lucide-react';

type ViewState = 'home' | 'projects' | 'about' | 'contact' | 'case-studies';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

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

  // Reset scroll when view changes
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: ViewState) => {
      setCurrentView(view);
      setIsMobileMenuOpen(false);
  };

  // Determine global theme classes based on view
  const isLightTheme = currentView === 'about';
  
  // Update theme bg logic: Case Studies is now BLACK background (brutalist/high contrast)
  let themeBg = 'bg-black';
  if (isLightTheme) themeBg = 'bg-[#F5F5F5]';

  let themeText = 'text-white';
  if (isLightTheme) themeText = 'text-[#1A1A1A]';
  
  const headerText = isLightTheme ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`${themeBg} ${themeText} min-h-screen font-mono selection:bg-white selection:text-black overflow-x-hidden relative transition-colors duration-700`}>
      <Cursor />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={handleNavigate}
      />

      {/* FIXED METADATA HEADER */}
      <header className={`fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start z-50 pointer-events-none text-[10px] md:text-xs uppercase tracking-widest ${headerText} mix-blend-difference`}>
        <div 
            onClick={() => handleNavigate('home')}
            className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto hover:bg-white/20 transition-colors cursor-pointer"
        >
          <span className={`${isLightTheme ? 'text-black' : 'text-white'} font-bold mr-2`}>{PERSONAL_INFO.name}</span>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
             {/* Desktop Nav */}
             <div className={`hidden md:flex bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 ${isLightTheme ? 'text-white/80' : 'text-gray-400'} gap-6`}>
                <span 
                    onClick={() => handleNavigate('projects')}
                    className={`hover:text-white cursor-pointer transition-colors ${currentView === 'projects' ? 'text-white' : ''}`}
                >
                    Projects
                </span>
                <span 
                    onClick={() => handleNavigate('case-studies')}
                    className={`hover:text-white cursor-pointer transition-colors ${currentView === 'case-studies' ? 'text-white' : ''}`}
                >
                    Case Studies
                </span>
                <span 
                    onClick={() => handleNavigate('about')}
                    className={`hover:text-white cursor-pointer transition-colors ${currentView === 'about' ? 'text-white' : ''}`}
                >
                    My Profile
                </span>
             </div>
        </div>

        <div className="flex gap-2 items-center pointer-events-auto">
             
             {/* Mobile Menu Toggle */}
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors"
             >
                <Menu size={16} />
             </button>

             {/* Audio Toggle Button */}
             <button 
                onClick={toggleAudio}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm overflow-hidden relative group cursor-pointer hover:border-white/50 transition-colors"
             >
                 {isPlaying ? (
                    // Equalizer Animation
                    <div className="flex items-end gap-[2px] h-3">
                        <motion.div 
                            animate={{ height: ["20%", "100%", "50%"] }} 
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            className="w-1 bg-green-400 rounded-t-[1px]" 
                        />
                        <motion.div 
                            animate={{ height: ["30%", "80%", "40%"] }} 
                            transition={{ duration: 0.4, delay: 0.1, repeat: Infinity, repeatType: "reverse" }}
                            className="w-1 bg-purple-400 rounded-t-[1px]" 
                        />
                        <motion.div 
                            animate={{ height: ["50%", "100%", "20%"] }} 
                            transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
                            className="w-1 bg-blue-400 rounded-t-[1px]" 
                        />
                    </div>
                 ) : (
                    // 3D-ish Cube Icon simulation
                    <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-purple-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                 )}
             </button>
        </div>
      </header>

      {/* SCROLL PROGRESS BAR (LEFT) */}
      <div className="fixed left-0 top-0 h-full w-[2px] z-40 bg-white/5">
        <div 
          className="bg-white w-full transition-all duration-100 ease-linear shadow-[0_0_10px_white]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* BACKGROUND GRID (Only for Dark Mode views) */}
      {!isLightTheme && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }} 
        />
      )}

      <main className="relative z-10">
        {currentView === 'home' ? (
            <>
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
                    Index: 01 — {PROJECTS.filter(p => p.featured).length.toString().padStart(2, '0')}
                    </span>
                </div>

                <div className="max-w-[1600px] mx-auto space-y-40">
                    {PROJECTS.slice(0, 3).map((project, index) => (
                    <ScrollReveal key={project.id} width="100%" delay={index * 0.1}>
                        <div className="group relative perspective-1000 cursor-hover">
                            
                            {/* Connecting Line */}
                            {index !== 2 && (
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
                    
                    <div className="text-center pt-20">
                        <button 
                            onClick={() => handleNavigate('projects')}
                            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs border-b border-transparent hover:border-white pb-1"
                        >
                            View All Projects <MoveRight size={12} />
                        </button>
                    </div>
                </div>
                </section>
            </>
        ) : currentView === 'projects' ? (
            <ProjectsPage />
        ) : currentView === 'case-studies' ? (
            <CaseStudiesPage />
        ) : currentView === 'about' ? (
            <ProfilePage />
        ) : (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-mono mb-4">Construction In Progress</h1>
                    <p className="text-gray-500 font-mono text-sm">module: {currentView}.tsx not compiled.</p>
                    <button 
                        onClick={() => handleNavigate('home')} 
                        className="mt-8 px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all"
                    >
                        RETURN_HOME
                    </button>
                </div>
            </div>
        )}

        {/* SECTION 5: FOOTER (Shared, adapts to theme) */}
        <footer className={`min-h-[50vh] flex flex-col justify-between px-6 md:px-20 py-20 relative overflow-hidden border-t ${isLightTheme ? 'bg-[#F0F0F0] border-black/5 text-[#1A1A1A]' : 'bg-neutral-950 border-white/10 text-white'}`}>
          <div className="max-w-[1600px] w-full mx-auto relative z-10">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
                <div>
                    <div className={`text-[10px] uppercase tracking-widest mb-2 ${isLightTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        {'>'} Initiate Communication
                    </div>
                    <h2 className="text-[10vw] md:text-[8vw] leading-none tracking-tighter cursor-hover">
                        LET'S TALK
                    </h2>
                </div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className={`mt-10 md:mt-0 w-24 h-24 md:w-32 md:h-32 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 group animate-[spin_10s_linear_infinite] hover:animate-none cursor-hover ${isLightTheme ? 'border-black/10' : 'border-white/20 hover:bg-white hover:text-black'}`}>
                    <Mail size={32} />
                </a>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 text-xs uppercase tracking-widest ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="flex flex-col gap-2">
                    <span className={`${isLightTheme ? 'text-black' : 'text-white'} mb-2`}>Socials</span>
                    <a href="https://x.com/Collins_brown2" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-hover">Twitter (X)</a>
                    <a href="https://www.linkedin.com/in/collins-ojeabu-973477232" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-hover">LinkedIn</a>
                    <a href="https://instagram.com/errick__marshall" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-hover">Instagram</a>
                </div>
                <div className="flex flex-col gap-2">
                    <span className={`${isLightTheme ? 'text-black' : 'text-white'} mb-2`}>Code</span>
                    <a href="https://github.com/CollinsOjeabu" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-hover">GitHub</a>
                    <a href="#" className="hover:opacity-50 transition-opacity cursor-hover">CodePen</a>
                    <a href="#" className="hover:opacity-50 transition-opacity cursor-hover">StackOverflow</a>
                </div>
                <div className="flex flex-col gap-2">
                    <span className={`${isLightTheme ? 'text-black' : 'text-white'} mb-2`}>Coordinates</span>
                    <span>{GEODATA.location}</span>
                    <span>{GEODATA.lat}</span>
                    <span>{GEODATA.lng}</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                    <span className={`${isLightTheme ? 'text-black' : 'text-white'} mb-2`}>Local Time</span>
                    <span className="tabular-nums">{time}</span>
                </div>
                </div>
            </ScrollReveal>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 text-center text-[10px] text-gray-400 uppercase tracking-[1em]">
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
        .transform-style-3d {
            transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default App;
