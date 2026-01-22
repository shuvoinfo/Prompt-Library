
import React, { useState } from 'react';
import { PromptItem } from '../types';

interface PromptCardProps {
  prompt: PromptItem;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Story': return 'text-rose-400';
      case 'Video': return 'text-orange-400';
      case 'Script': return 'text-blue-400';
      case 'Graphics': return 'text-purple-400';
      case 'SEO': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="glass rounded-[2.5rem] p-7 flex flex-col h-full border border-slate-800/60 hover:border-blue-500/30 transition-all group relative overflow-hidden bg-slate-900/20">
      {/* Category Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/40 border border-slate-800/50 ${getCategoryColor(prompt.category)}`}>
          {prompt.category}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {prompt.description}
        </p>
      </div>

      <div className="mt-auto space-y-4">
        {/* Visual prompt preview area */}
        <div className="bg-black/40 rounded-2xl p-4 text-[11px] text-slate-600 border border-slate-800/50 max-h-24 overflow-hidden relative font-mono">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
          {prompt.content}
        </div>

        <button 
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 ${
            copied 
            ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/20 border border-white/10'
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Prompt Copied
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy For Use
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
