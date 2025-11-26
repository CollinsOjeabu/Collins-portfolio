import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  separator?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  direction = 'left', 
  className = '',
  separator = '—'
}) => {
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap py-6 ${className}`}>
      {/* Repeated 4 times to ensure seamless loop on ultrawide screens */}
      {[0, 1, 2, 3].map((i) => (
        <div 
          key={i}
          className={`flex min-w-full shrink-0 items-center justify-around gap-12 ${
            direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
          }`}
        >
          {items.map((item, idx) => (
            <span key={`${i}-${idx}`} className="flex items-center gap-12 text-6xl md:text-8xl font-bold tracking-tighter uppercase text-transparent stroke-text hover:text-white transition-colors duration-300 cursor-default select-none group">
              <span 
                className="transition-colors duration-300"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}
              >
                {item}
              </span>
              <span className="text-xl md:text-3xl text-white/30 font-light tracking-widest group-hover:text-white/50">{separator}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;