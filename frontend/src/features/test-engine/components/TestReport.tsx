import React from 'react';
import { CheckCircle2, XCircle, Timer, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../../../components/GlassCard';

// We will map this to the actual JSON report from your backend later
export interface TestResultData {
  success: boolean;
  duration: string;
  assertions: { title: string; status: 'passed' | 'failed' }[];
}

interface TestReportProps {
  report: TestResultData;
}

export const TestReport: React.FC<TestReportProps> = ({ report }) => {
  return (
    <GlassCard className="w-full max-w-4xl mx-auto overflow-hidden border-core-teal/20 shrink-0">
      
      {/* 🏆 Top Banner: Status & Duration */}
      <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        report.success ? 'bg-core-teal/10 border-core-teal/20' : 'bg-red-500/10 border-red-500/20'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            report.success ? 'bg-core-teal/10 border-core-teal/40 text-core-teal' : 'bg-red-500/10 border-red-500/40 text-red-500'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xl">
              {report.success ? 'Test Validated Successfully' : 'Test Execution Failed'}
            </h3>
            <p className={`text-xs font-mono mt-1 ${report.success ? 'text-core-teal/70' : 'text-red-400/70'}`}>
              STATUS: {report.success ? 'PASSED' : 'FAILED'}
            </p>
          </div>
        </div>
        
        <div className="text-left sm:text-right flex sm:block items-center gap-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1 sm:justify-end mb-1">
            <Timer className="w-3 h-3" />
            Execution Time
          </span>
          <span className="text-2xl font-light text-white font-mono">
            {report.duration}
          </span>
        </div>
      </div>

      {/* 📝 Step-by-Step Assertions */}
      <div className="p-6 space-y-4">
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Execution Log</h4>
        
        {report.assertions.map((assertion, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="shrink-0 mt-0.5">
              {assertion.status === 'passed' ? (
                <CheckCircle2 className="w-4 h-4 text-core-teal group-hover:scale-110 transition-transform" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <span className={`text-sm leading-relaxed ${
              assertion.status === 'passed' ? 'text-slate-300' : 'text-red-200'
            }`}>
              {assertion.title}
            </span>
          </div>
        ))}
      </div>
      
    </GlassCard>
  );
};