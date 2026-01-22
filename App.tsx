
import React, { useState, useEffect, useRef } from 'react';
import { USER_PROMPTS, QUICK_LINKS } from './constants';
import { PromptItem, ChatMessage } from './types';
import PromptCard from './components/PromptCard';
import LinkCard from './components/LinkCard';
import { refineWithGemini } from './services/gemini';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<PromptItem | null>(null);
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const filteredPrompts = USER_PROMPTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Video', 'Script', 'Graphics', 'SEO'];

  const handleRunPrompt = (prompt: PromptItem) => {
    setActivePrompt(prompt);
    setIsModalOpen(true);
    setUserInput('');
    setOutput('');
  };

  const handleGenerate = async () => {
    if (!activePrompt || !userInput) return;
    setIsGenerating(true);
    try {
      const result = await refineWithGemini(activePrompt.content, userInput);
      setOutput(result || 'No response generated.');
    } catch (error) {
      console.error(error);
      setOutput('Error connecting to Gemini API. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen pb-12 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Prompt Library
          </h1>
        </div>
        
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search prompts..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">CONTENT CREATOR TOOLKIT</p>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-tighter">Premium Ready</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8 flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Categories</h2>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                    selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Quick Links</h2>
            <div className="flex flex-col gap-3">
              {QUICK_LINKS.map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </div>
        </aside>

        {/* Prompt Grid */}
        <section className="flex-1">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Library</h2>
              <p className="text-slate-400">Manage and execute your high-performance AI prompts.</p>
            </div>
            <div className="md:hidden">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map(prompt => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  onRun={handleRunPrompt}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-2 border-slate-700">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-300">No prompts found</h3>
                <p className="text-slate-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Runner Modal */}
      {isModalOpen && activePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="glass w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">⚡</span>
                <h3 className="text-lg font-bold">{activePrompt.title}</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Base Prompt Context</label>
                  <div className="bg-slate-900/80 p-4 rounded-xl text-slate-400 text-sm border border-slate-800 whitespace-pre-wrap max-h-40 overflow-y-auto italic">
                    {activePrompt.content}
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Add Your Content / Idea</label>
                  <textarea 
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all placeholder:text-slate-600"
                    placeholder="Paste your story idea, transcript, or script here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
               </div>

               {output && (
                 <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Refined Output</label>
                      <button 
                        onClick={() => copyToClipboard(output)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors bg-slate-800 px-3 py-1 rounded-full border border-slate-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy Result
                      </button>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/20 text-slate-200 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {output}
                    </div>
                 </div>
               )}
            </div>

            <div className="p-6 border-t border-slate-700/50 bg-slate-800/50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-slate-300 font-semibold hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button 
                disabled={!userInput || isGenerating}
                onClick={handleGenerate}
                className={`px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                  !userInput || isGenerating 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 active:scale-95 shadow-blue-500/20'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V10h6.105a1 1 0 01.948 1.314l-2.998 9a1 1 0 01-.948.686H4.5a1 1 0 01-1-1V2a1 1 0 011-1h6.8zM4.5 12V2h-2a1 1 0 00-1 1v7a1 1 0 001 1h2z" clipRule="evenodd" />
                    </svg>
                    Process Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="mt-auto py-8 text-center text-slate-600 text-sm">
        <p>© 2024 Content Creator Hub • Powered by Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

export default App;
