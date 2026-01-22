
import React, { useState } from 'react';
import { PromptItem } from '../types';

interface PromptCardProps {
  prompt: PromptItem;
  onView: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onView }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Story': return 'text-rose-400 border-rose-400/20';
      case 'Video': return 'text-orange-400 border-orange-400/20';
      case 'Script': return 'text-blue-400 border-blue-400/20';
      case 'Graphics': return 'text-purple-400 border-purple-400/20';
      case 'SEO': return 'text-emerald-400 border-emerald-400/20';
      default: return 'text-slate-400 border-slate-400/20';
    }
  };

  return (
    <div 
      onClick={onView}
      className="bg-[#0c0c0c] rounded-[2rem] p-7 border border-white/5 hover:border-white/10 transition-all cursor-pointer group relative overflow-hidden active:scale-[0.99] shadow-lg"
    >
      <div className="flex items-center justify-between mb-5">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border bg-black/40 ${getCategoryColor(prompt.category)}`}>
          {prompt.category}
        </span>
        <div className="flex gap-2">
          <button 
             onClick={handleCopy}
             className={`p-3 rounded-2xl transition-all ${
               copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'
             }`}
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
          {prompt.description}
        </p>
      </div>
      
      <div className="mt-4 flex items-center text-[10px] font-black text-slate-600 uppercase tracking-widest gap-2">
        <span>Click to view</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

export default PromptCard;
