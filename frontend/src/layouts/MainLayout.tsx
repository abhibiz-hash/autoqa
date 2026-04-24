import React, { useEffect, useRef } from 'react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const coreRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the AI core
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!coreRef.current) return;
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      coreRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-bg-charcoal text-white selection:bg-core-amber/30 overflow-hidden">
      
      {/* AI Core Background */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div 
          ref={coreRef} 
          className="w-125 h-125 rounded-full blur-3xl opacity-60 mix-blend-screen transition-transform duration-75"
          style={{ background: 'radial-gradient(circle, var(--color-core-amber) 0%, var(--color-core-amber) 40%, transparent 70%)' }}
        >
          {/* Plasma Blobs */}
          <div className="absolute bg-core-amber rounded-full blur-2xl opacity-40 w-75 h-75 -top-20 -left-10 animate-organic-drift"></div>
          
          <div className="absolute bg-core-coral rounded-full blur-2xl opacity-40 w-62.5 h-62.5 -bottom-10 -right-20 animate-organic-drift" style={{ animationDuration: '20s' }}></div>
          
          <div className="absolute bg-core-teal rounded-full blur-2xl opacity-40 w-50 h-50 top-1/2 left-1/4 animate-organic-drift" style={{ animationDuration: '12s' }}></div>
        </div>
      </div>

      {/* App Content Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto h-screen flex flex-col pt-8 pb-8 px-6">
        {children}
      </main>
    </div>
  );
};