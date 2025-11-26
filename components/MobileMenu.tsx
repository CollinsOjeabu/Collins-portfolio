import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Dashboard', id: '01' },
    { label: 'Projects', id: '02' },
    { label: 'Case Studies', id: '03' },
    { label: 'About', id: '04' },
    { label: 'Contact', id: '05' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-6 md:hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-white">
                <Terminal size={16} />
                <span className="text-xs font-mono uppercase tracking-widest">System_Nav</span>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
                <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-6">
            {menuItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group"
                >
                    <div className="text-[10px] text-gray-500 font-mono mb-1 group-hover:text-green-400 transition-colors">
                        //{item.id}
                    </div>
                    <a 
                        href="#" 
                        onClick={onClose}
                        className="text-4xl font-light tracking-tighter text-white hover:pl-4 transition-all duration-300 block"
                    >
                        {item.label}
                    </a>
                </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-auto border-t border-white/10 pt-6"
          >
             <div className="flex justify-between items-end text-xs text-gray-500 font-mono">
                <div className="flex flex-col gap-1">
                    <span className="uppercase text-white">{PERSONAL_INFO.name}</span>
                    <span>{PERSONAL_INFO.role}</span>
                    <span className="text-green-500">{PERSONAL_INFO.availability}</span>
                </div>
                <div>
                   v2.4.0
                </div>
             </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;