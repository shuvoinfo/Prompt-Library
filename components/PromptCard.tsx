
import React, { useState } from 'react';
import { PromptItem } from '../types';

interface PromptCardProps {
  prompt: PromptItem;
  onRun: (prompt: PromptItem) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onRun }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Video': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Script': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Graphics': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'SEO': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="glass rounded-2xl p-6 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10 group flex flex-col h-full border border-slate-700/50">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getCategoryColor(prompt.category)}`}>
          {prompt.category}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Copy Prompt"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{prompt.title}</h3>
      <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">{prompt.description}</p>
      
      <div className="mt-auto pt-4 border-t border-slate-700/50 flex gap-3">
        <button 
          onClick={() => onRun(prompt)}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Run Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
