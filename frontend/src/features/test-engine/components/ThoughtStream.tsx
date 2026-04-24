import React, { useState } from 'react';
import { CheckCircle2, Loader2, CircleDashed, ChevronDown, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../../components/GlassCard';

const PHASES = [
  'Extracting DOM Structure',
  'AI Planning Assertions',
  'Synthesizing Playwright Code',
  'Executing Headless Browser'
];

interface ThoughtStreamProps {
  currentStep: number;
}

export const ThoughtStream: React.FC<ThoughtStreamProps> = ({ currentStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isComplete = currentStep >= PHASES.length;
  const summaryText = isComplete ? "Test Execution Complete" : PHASES[currentStep];

  return (
    // Added shrink-0 here so flexbox never squishes it
    <GlassCard className="w-full max-w-4xl mx-auto overflow-hidden border-white/10 transition-all duration-300 shrink-0">
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-core-teal shrink-0" />
          ) : (
            <Loader2 className="w-5 h-5 text-core-amber animate-spin shrink-0" />
          )}
          <span className={`text-sm font-medium text-left ${isComplete ? 'text-core-teal' : 'text-white'}`}>
            {summaryText}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-3 border-t border-white/5 space-y-4 bg-black/20">
          {PHASES.map((phase, index) => {
            const isStepCompleted = currentStep > index;
            const isActive = currentStep === index;
            const isPending = currentStep < index;

            return (
              <div 
                key={phase} 
                className={`flex items-center gap-4 transition-all duration-500 pl-1 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="shrink-0">
                  {isStepCompleted && <CheckCircle2 className="w-4 h-4 text-core-teal" />}
                  {isActive && <Loader2 className="w-4 h-4 text-core-amber animate-spin" />}
                  {isPending && <CircleDashed className="w-4 h-4 text-slate-500" />}
                </div>
                <span className={`text-sm ${
                  isStepCompleted ? 'text-slate-300' : 
                  isActive ? 'text-white font-medium' : 'text-slate-500'
                }`}>
                  {phase}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
    </GlassCard>
  );
};