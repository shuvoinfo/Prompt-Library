
import React from 'react';
import { LinkItem } from '../types';

interface LinkCardProps {
  link: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-700/50 transition-all hover:-translate-y-1 active:scale-95 group"
    >
      <div className="text-2xl w-12 h-12 flex items-center justify-center bg-slate-800 rounded-lg group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
        {link.icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-200 group-hover:text-white">{link.name}</h4>
        <p className="text-xs text-slate-500 truncate max-w-[150px]">{link.url.replace('https://', '')}</p>
      </div>
      <div className="ml-auto text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;
