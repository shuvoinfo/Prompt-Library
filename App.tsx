
import React, { useState } from 'react';
import { USER_PROMPTS, QUICK_LINKS } from './constants';
import { PromptItem } from './types';
import PromptCard from './components/PromptCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);

  const filteredPrompts = USER_PROMPTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 font-sans selection:bg-blue-500/30 pb-20">
      {/* Profile Header */}
      <div className="pt-20 pb-12 px-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="w-28 h-28 mb-8 rounded-full bg-gradient-to-br from-slate-700 via-slate-900 to-black p-[2px] shadow-2xl">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-5xl overflow-hidden border border-white/10">
            🦁
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white mb-3">
          PROMPT LIBRARY
        </h1>
        <p className="text-slate-400 text-sm max-w-xs font-semibold tracking-wide uppercase opacity-70">
          Curated Creator Toolkit
        </p>
      </div>

      <main className="max-w-xl mx-auto px-4 space-y-12">
        
        {/* QUICK LINKS - Bio Style Pills */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(link => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 px-6 py-5 bg-white/[0.03] border border-white/10 rounded-[1.5rem] hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-[0.98] group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
                <span className="text-sm font-bold tracking-tight text-slate-100">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="relative px-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search library..." 
            className="w-full bg-white/[0.02] border border-white/10 rounded-full py-5 pl-14 pr-8 text-sm font-medium focus:ring-2 focus:ring-blue-500/40 focus:bg-white/5 outline-none transition-all placeholder:text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        {/* PROMPT CARDS - Centered Stack */}
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id}
                prompt={prompt}
                onView={() => setSelectedPrompt(prompt)}
              />
            ))
          ) : (
            <div className="py-20 text-center opacity-40">
              <p className="text-sm italic">Nothing found matching your search.</p>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 py-10 text-center opacity-20">
          <p className="text-[10px] font-black tracking-[0.6em] uppercase">Premium Content Systems</p>
      </footer>

      {/* MODAL - VIEW LARGER */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedPrompt(null)} />
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
               <h2 className="text-2xl font-black text-white pr-8 leading-tight">{selectedPrompt.title}</h2>
               <button 
                onClick={() => setSelectedPrompt(null)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
            </div>
            
            <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {selectedPrompt.content}
              </p>
            </div>

            <button 
              onClick={() => {
                navigator.clipboard.writeText(selectedPrompt.content);
                alert('Copied to clipboard!');
              }}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95"
            >
              Copy Full Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
