import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, List, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

// --- ABSTRACT UI MOCKUPS (CSS-BASED) ---
// These components generate "fake" UI screenshots using code to fit the aesthetic

const AbstractDashboard: React.FC<{ complex?: boolean; stats?: Project['stats'] }> = ({ complex, stats }) => (
  <div className="w-full h-full bg-[#0a0a0a] p-4 flex flex-col gap-3 overflow-hidden relative font-mono select-none">
     {/* Fake Header */}
     <div className="flex justify-between items-center opacity-50 mb-2">
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        <div className="h-2 w-20 bg-white/10 rounded"></div>
     </div>

     <div className="grid grid-cols-12 gap-3 h-full">
         {/* Main Stat Card */}
         <div className={`col-span-4 rounded bg-white/5 p-3 flex flex-col justify-between ${complex ? 'row-span-2' : ''} border border-white/5`}>
            <div className="text-[8px] text-gray-500 uppercase tracking-widest">{stats?.[0]?.label || "METRIC A"}</div>
            <div className="text-2xl md:text-4xl text-green-400 font-light tracking-tighter">
                {stats?.[0]?.trend === 'up' && <span className="text-[10px] align-top mr-1">▲</span>}
                {stats?.[0]?.value || "8,249"}
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-green-500/50 w-[70%]"></div>
            </div>
         </div>

         {/* Chart Area */}
         <div className="col-span-8 rounded bg-white/5 p-3 relative border border-white/5 overflow-hidden">
             <div className="absolute inset-0 flex items-end justify-between px-3 pb-3 gap-1 opacity-50">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className="w-full bg-gradient-to-t from-blue-500/50 to-purple-500/50 rounded-sm"
                    />
                ))}
             </div>
             {/* Grid lines */}
             <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
         </div>

         {/* Map or Secondary Stats */}
         {complex && (
             <div className="col-span-8 row-span-2 rounded bg-white/5 p-3 border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-30">
                     {/* Abstract Map Dots */}
                     {Array.from({ length: 20 }).map((_, i) => (
                         <div 
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{ 
                                left: `${Math.random() * 80 + 10}%`, 
                                top: `${Math.random() * 80 + 10}%`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                         />
                     ))}
                     {/* World Map Outline SVG simulation */}
                     <svg viewBox="0 0 100 50" className="w-full h-full opacity-20">
                         <path d="M10,20 Q20,10 30,20 T50,25 T70,15 T90,25" fill="none" stroke="white" strokeWidth="0.5" />
                         <path d="M15,30 Q30,40 45,30 T75,35" fill="none" stroke="white" strokeWidth="0.5" />
                     </svg>
                 </div>
                 <div className="absolute bottom-3 left-3 text-2xl text-white font-light">
                     {stats?.[1]?.value || "GLOBAL"}
                 </div>
                 <div className="absolute bottom-3 right-3 text-[8px] text-gray-500 uppercase">
                     {stats?.[1]?.label || "ACTIVE NODES"}
                 </div>
             </div>
         )}

         {/* Circular Graph */}
         {!complex && (
             <div className="col-span-4 rounded bg-white/5 p-3 flex items-center justify-center border border-white/5 relative">
                 <svg viewBox="0 0 40 40" className="w-full h-full transform -rotate-90">
                     <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                     <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="4" strokeDasharray="100" strokeDashoffset="30" />
                 </svg>
                 <div className="absolute text-[10px] font-bold text-white">324</div>
             </div>
         )}
     </div>
  </div>
);

const AbstractApp: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20"></div>
        {/* Phone Frame */}
        <div className="w-[140px] md:w-[180px] h-[280px] md:h-[340px] border-4 border-gray-800 rounded-3xl bg-black overflow-hidden relative shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-b-lg z-20"></div>
            
            {/* Screen UI */}
            <div className="w-full h-full bg-gray-900 flex flex-col p-3 pt-8 gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 self-center mb-2"></div>
                <div className="h-2 w-24 bg-white/20 rounded self-center"></div>
                <div className="h-2 w-16 bg-white/10 rounded self-center"></div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="aspect-square rounded-lg bg-white/5"></div>
                    <div className="aspect-square rounded-lg bg-white/5"></div>
                    <div className="aspect-square rounded-lg bg-white/5"></div>
                    <div className="aspect-square rounded-lg bg-white/5"></div>
                </div>
                
                <div className="mt-auto h-12 w-full bg-white/10 rounded-lg backdrop-blur flex items-center justify-around px-2">
                    <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                    <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                    <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
);

const AbstractWebsite: React.FC<{ type?: '3d' | 'table' }> = ({ type }) => (
    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
        {/* Browser Window */}
        <div className="w-[90%] h-[80%] bg-[#111] rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
             {/* Toolbar */}
             <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-2 gap-1">
                 <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
                 <div className="ml-4 h-3 w-1/2 bg-black/50 rounded text-[6px] text-gray-600 flex items-center px-1 font-mono">https://secure.bolster.ai</div>
             </div>
             
             {/* Viewport */}
             <div className="flex-1 bg-black relative p-4">
                 {type === '3d' ? (
                     <div className="w-full h-full flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
                         {/* Abstract 3D Character simulation */}
                         <div className="w-24 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 blur-sm animate-pulse"></div>
                         <div className="absolute bottom-4 left-4 h-2 w-20 bg-white/20 rounded"></div>
                         <div className="absolute bottom-8 left-4 h-4 w-32 bg-white/40 rounded"></div>
                         <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full"></div>
                     </div>
                 ) : (
                     <div className="flex flex-col gap-2">
                         <div className="flex justify-between">
                            <div className="h-4 w-1/3 bg-white/10 rounded"></div>
                            <div className="h-4 w-16 bg-blue-500/20 rounded"></div>
                         </div>
                         <div className="h-[1px] w-full bg-white/10 my-1"></div>
                         {/* Table UI */}
                         {[1,2,3,4,5].map(i => (
                             <div key={i} className="flex items-center justify-between h-6 border-b border-white/5">
                                 <div className="flex gap-2 items-center">
                                    <div className="w-3 h-3 rounded bg-white/10"></div>
                                    <div className="w-20 h-2 bg-white/5 rounded"></div>
                                 </div>
                                 <div className="w-10 h-2 bg-red-500/20 rounded"></div>
                             </div>
                         ))}
                     </div>
                 )}
             </div>
        </div>
    </div>
);


const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = [
    { name: 'All', count: 13 },
    { name: 'Dashboard', count: 4 },
    { name: 'App', count: 1 },
    { name: 'Website', count: 4 },
    { name: 'Visual', count: 2 },
    { name: '4 Fun', count: 2 },
  ];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toUpperCase() === filter.toUpperCase() || (filter === 'Dashboard' && p.category === 'DASHBOARD'));

  return (
    <div className="min-h-screen bg-black pt-24 px-4 md:px-12 pb-20 relative">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-6">
           <h1 className="text-4xl md:text-6xl font-light tracking-tight">Project</h1>
           
           <div className="flex flex-wrap gap-2">
               {categories.map(cat => (
                   <button
                      key={cat.name}
                      onClick={() => setFilter(cat.name)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-all duration-300 flex items-center gap-2 ${
                        filter === cat.name 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                   >
                       {cat.name}
                       <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${
                           filter === cat.name ? 'bg-black text-white' : 'bg-white/10'
                       }`}>
                           {cat.count}
                       </span>
                   </button>
               ))}
           </div>

           <div className="hidden md:flex items-center gap-4 text-gray-500 text-xs tracking-widest">
               <span>VIEW BY</span>
               <LayoutGrid size={16} className="text-white" />
               <List size={16} />
           </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[400px]">
           <AnimatePresence>
               {filteredProjects.map((project, index) => (
                   <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      key={project.id}
                      className={`group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-500 ${
                          project.featured ? 'md:col-span-2 xl:col-span-2' : ''
                      }`}
                   >
                       {/* Top Bar */}
                       <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
                           <div className="text-[10px] uppercase tracking-widest font-mono text-gray-400">
                               {project.category}
                               {project.client && <span className="ml-2 text-white/50">// {project.client}</span>}
                           </div>
                           {project.client === 'BOLSTER' && (
                               <div className="flex items-center gap-1 text-[10px] font-bold text-white uppercase">
                                   <div className="w-2 h-2 bg-white rounded-sm"></div> BOLSTER
                               </div>
                           )}
                           {project.client === 'POPMART' && (
                               <div className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded-sm">
                                   POPMART
                               </div>
                           )}
                       </div>

                       {/* Content Area (Visual) */}
                       <div className="absolute inset-0 pt-12 px-4 pb-20 transition-all duration-500 group-hover:scale-[1.02]">
                           {project.imageType === 'chart-complex' && <AbstractDashboard complex stats={project.stats} />}
                           {project.imageType === 'chart-simple' && <AbstractDashboard stats={project.stats} />}
                           {project.imageType === 'mobile-ui' && <AbstractApp />}
                           {project.imageType === '3d-character' && <AbstractWebsite type="3d" />}
                           {project.imageType === 'table-ui' && <AbstractWebsite type="table" />}
                       </div>

                       {/* Bottom Bar (Info & Action) */}
                       <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 flex justify-between items-end z-20">
                           <div>
                               <h3 className="text-xl text-white font-medium mb-1">{project.title}</h3>
                               <div className="flex gap-2">
                                   {project.tech.slice(0,2).map(t => (
                                       <span key={t} className="text-[9px] text-gray-500 border border-white/10 px-1.5 py-0.5 rounded uppercase">{t}</span>
                                   ))}
                               </div>
                           </div>
                           
                           <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-white text-black text-xs font-medium rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                           >
                               Discover
                           </motion.button>
                       </div>
                   </motion.div>
               ))}
           </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;