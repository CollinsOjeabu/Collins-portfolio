import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Hide until movement
  
  // Use refs for trailing effect to avoid re-renders
  const trailingRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Add touch support detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // If it's a touch device, we might want to disable the custom cursor or change its behavior
    // For this design, we will show it on touch but maybe different style.
    
    const updatePosition = (x: number, y: number) => {
        setPosition({ x, y });
        posRef.current = { x, y };
        if (!isVisible) setIsVisible(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
    };

    const updateHoverState = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-hover') || target.tagName === 'INPUT';
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', (e) => updateHoverState(e));
    
    // Touch events
    window.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    // Animation loop for trailing cursor
    let animationFrameId: number;
    
    const animateTrail = () => {
        if (trailingRef.current) {
            // Get current transform
            const currentTransform = trailingRef.current.style.transform;
            
            // We want the trail to "lerp" towards the current mouse position
            // Since we can't easily get current x/y from transform string in a simple way without parsing,
            // we will rely on CSS transition duration for the trail.
            // But for a true "physics" feel, JS lerp is better.
            
            // Simple approach: Update position directly, let CSS transition handle smoothing
             trailingRef.current.style.transform = `translate(${posRef.current.x - 24}px, ${posRef.current.y - 24}px) scale(${isHovering ? 1.5 : 1}) rotate(${isHovering ? 45 : 0}deg)`;
        }
        animationFrameId = requestAnimationFrame(animateTrail);
    };
    
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', (e) => updateHoverState(e));
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, isVisible]);

  // Don't render on initial load until moved to avoid cursor at 0,0
  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot - Instant follow */}
      <div 
        className={`fixed top-0 left-0 w-3 h-3 bg-white pointer-events-none z-[9999] mix-blend-difference rounded-full transition-transform duration-75 ease-out ${isClicking ? 'scale-50' : ''}`}
        style={{ 
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
      
      {/* Trailing Ring - Laggy follow handled by CSS transition on the ref in useEffect or style below */}
      <div 
        ref={trailingRef}
        className={`fixed top-0 left-0 w-12 h-12 border border-white/40 pointer-events-none z-[9998] transition-all duration-300 ease-out rounded-full`}
        style={{ 
            // Initial render position
            transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
            borderColor: isHovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
            borderRadius: isHovering ? '4px' : '50%', // Square when hovering
            borderWidth: isClicking ? '2px' : '1px',
            backgroundColor: isClicking ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
      />
      
      {/* Crosshair Lines - Only visible on non-touch devices ideally, or fade out */}
      <div 
        className="fixed top-0 left-0 w-full h-[1px] bg-white/5 pointer-events-none z-[0] transition-opacity duration-300"
        style={{ 
            transform: `translateY(${position.y}px)`,
            opacity: isHovering ? 0.1 : 0.05
        }}
      />
      <div 
        className="fixed top-0 left-0 h-full w-[1px] bg-white/5 pointer-events-none z-[0] transition-opacity duration-300"
        style={{ 
            transform: `translateX(${position.x}px)`,
            opacity: isHovering ? 0.1 : 0.05
        }}
      />
    </>
  );
};

export default Cursor;