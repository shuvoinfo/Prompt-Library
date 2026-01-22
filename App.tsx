
import React, { useState } from 'react';
import { USER_PROMPTS, QUICK_LINKS } from './constants';
import PromptCard from './components/PromptCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrompts = USER_PROMPTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-8 text-center sticky top-0 z-40">
        <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
          PROMPT LIBRARY
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Copy & Use • Special Tools & Prompts</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        
        {/* QUICK LINKS SECTION */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
              QUICK ACCESS LINKS
            </h2>
            <div className="h-px bg-slate-800 w-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_LINKS.map(link => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="glass p-5 rounded-3xl flex flex-col items-center justify-center gap-3 border border-slate-800 hover:border-blue-500/40 hover:bg-blue-500/[0.03] transition-all active:scale-95 group shadow-lg shadow-black/20"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* PROMPT LIBRARY SECTION */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
                PROMPT DIRECTORY
              </h2>
              <div className="h-px bg-slate-800 w-full"></div>
            </div>
            
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search prompts..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map(prompt => (
                <PromptCard 
                  key={prompt.id}
                  prompt={prompt}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass rounded-[2.5rem] border-dashed border-2 border-slate-800">
                <p className="text-slate-500 italic">No prompts match your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Creator Resource Hub</p>
      </footer>
    </div>
  );
};

export default App;
