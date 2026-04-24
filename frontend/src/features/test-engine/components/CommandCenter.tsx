import { Globe, MessageSquare, Zap } from 'lucide-react';
import { GlassCard } from '../../../components/GlassCard';

export const CommandCenter = () => {
  return (
    <GlassCard className="p-2 flex flex-col md:flex-row items-center gap-2 border-white/20">
      
      {/* URL Input */}
      <div className="relative flex-1 w-full md:w-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Globe className="w-4 h-4 text-slate-400" />
        </div>
        <input 
          type="text"
          className="w-full bg-transparent border-none outline-none text-sm text-white pl-11 py-4 placeholder:text-slate-500" 
          placeholder="Target URL (e.g., https://store-demo.io/checkout)..." 
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-8 bg-white/10"></div>

      {/* Intent Input */}
      <div className="relative flex-2 w-full md:w-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <MessageSquare className="w-4 h-4 text-core-amber" />
        </div>
        <input 
          type="text"
          className="w-full bg-transparent border-none outline-none text-sm text-white pl-11 py-4 placeholder:text-slate-500" 
          placeholder="Describe your test intent..." 
        />
      </div>

      {/* Action Button */}
      <button className="w-full md:w-auto bg-core-amber hover:bg-amber-400 text-black px-8 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] group">
        <span>Analyze Intent</span>
        <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
      </button>

    </GlassCard>
  );
};