import React from 'react';
import { Novel, SourceSite } from '../types';
import { BookOpen, ExternalLink, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  novel: Novel;
}

export const ResultCard: React.FC<ResultCardProps> = ({ novel }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 group flex flex-col h-full">
      
      {/* Header: Source Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
          ${novel.source === SourceSite.SYOSETU ? 'bg-orange-900/30 text-orange-400 border border-orange-800' : 'bg-blue-900/30 text-blue-400 border border-blue-800'}
        `}>
          {novel.source}
        </span>
        {!novel.isOnNovelUpdates && (
          <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-1 rounded">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            HIDDEN GEM
          </span>
        )}
      </div>

      {/* Titles */}
      <h3 className="text-lg font-bold text-slate-100 mb-1 leading-tight group-hover:text-indigo-300 transition-colors">
        {novel.titleEN_Adapted}
      </h3>
      <p className="text-sm text-slate-500 jp-font mb-4 border-b border-slate-800 pb-3">
        {novel.titleJP}
      </p>

      {/* Synopsis */}
      <div className="flex-grow">
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-4">
          {novel.synopsis}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 my-4">
        {novel.tags.slice(0, 4).map(tag => (
          <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Actions */}
      <div className="pt-4 mt-auto border-t border-slate-800 flex justify-between items-center">
        <div className="text-xs text-slate-500">
          Author: <span className="text-slate-400">{novel.author}</span>
        </div>
        <a 
          href={novel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <BookOpen size={16} />
          <span>Read Raw</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};