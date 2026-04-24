import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white/3 
        backdrop-blur-2xl 
        border border-white/10 
        rounded-3xl 
        shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
        transition-all duration-500 
        hover:border-core-amber/30 hover:bg-white/5
        ${className}
      `}
    >
      {children}
    </div>
  );
};