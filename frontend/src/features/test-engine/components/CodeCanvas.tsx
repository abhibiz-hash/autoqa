import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code2 } from 'lucide-react';
import { GlassCard } from '../../../components/GlassCard';

interface CodeCanvasProps {
  code: string;
}

export const CodeCanvas: React.FC<CodeCanvasProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="w-full max-w-4xl mx-auto overflow-hidden border-core-amber/20 shrink-0">
      
      {/* 🛑 Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Code2 className="w-4 h-4 text-core-amber" />
            <span className="text-xs font-mono tracking-wider">generated_test.spec.ts</span>
          </div>
        </div>

        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors p-1">
          {copied ? <Check className="w-4 h-4 text-core-teal" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* 📝 The Code Editor Area - Removed flex constraints so it grows naturally! */}
      <div className="text-sm font-mono overflow-x-auto">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: '#64748b', textAlign: 'right' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
    </GlassCard>
  );
};