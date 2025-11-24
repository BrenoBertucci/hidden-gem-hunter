import React, { useState } from 'react';
import { PRESET_TAGS, TAG_DICTIONARY } from '../constants';
import { Plus, X, Check, Ban } from 'lucide-react';

interface TagSelectorProps {
  title: string;
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
  onAddCustomTag: (tag: string) => void;
  variant?: 'include' | 'exclude';
}

export const TagSelector: React.FC<TagSelectorProps> = ({ 
  title, 
  selectedTags, 
  onToggleTag, 
  onAddCustomTag, 
  variant = 'include' 
}) => {
  const [customInput, setCustomInput] = useState('');
  
  const isInclude = variant === 'include';

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddCustomTag(customInput.trim().toLowerCase());
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isInclude ? 'text-indigo-400' : 'text-rose-400'}`}>
        {isInclude ? <Check size={16}/> : <Ban size={16}/>}
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {PRESET_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          let buttonClass = "relative group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ";

          if (isSelected) {
            if (isInclude) {
              buttonClass += "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]";
            } else {
              buttonClass += "bg-rose-600 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]";
            }
          } else {
             buttonClass += "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200";
          }

          return (
            <button
              key={tag.id}
              onClick={() => onToggleTag(tag.id)}
              className={buttonClass}
            >
              <span>{tag.label}</span>
              {isSelected && (
                <span className={`text-xs px-1.5 rounded ${isInclude ? 'text-indigo-200 bg-indigo-800/50' : 'text-rose-200 bg-rose-800/50'}`}>
                  {tag.jpTerm}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Input Area */}
      <form onSubmit={handleCustomSubmit} className="relative group">
        <div className={`flex items-center bg-slate-900/50 border rounded-lg p-1 transition-all ${
           isInclude 
           ? 'border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' 
           : 'border-slate-700 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500'
        }`}>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={isInclude ? "Add required tag..." : "Add tag to exclude..."}
            className="bg-transparent border-none text-slate-200 px-4 py-2 w-full focus:ring-0 placeholder-slate-500 outline-none"
          />
          <button 
            type="submit"
            disabled={!customInput.trim()}
            className={`p-2 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-slate-800 ${
              isInclude 
              ? 'bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white' 
              : 'bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white'
            }`}
          >
            <Plus size={20} />
          </button>
        </div>
        {customInput && TAG_DICTIONARY[customInput.toLowerCase()] && (
           <div className={`absolute top-full mt-2 left-0 text-xs px-2 py-1 rounded border z-10 ${
             isInclude 
             ? 'text-indigo-400 bg-indigo-950/90 border-indigo-500/30' 
             : 'text-rose-400 bg-rose-950/90 border-rose-500/30'
           }`}>
             Mapped: <span className="jp-font font-bold">{TAG_DICTIONARY[customInput.toLowerCase()]}</span>
           </div>
        )}
      </form>
      
      {/* Display Active Custom Tags */}
      <div className="flex flex-wrap gap-2">
         {selectedTags.filter(t => !PRESET_TAGS.find(p => p.id === t)).map(tag => (
           <div key={tag} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${
             isInclude 
             ? 'bg-indigo-900/40 border-indigo-500/50 text-indigo-200' 
             : 'bg-rose-900/40 border-rose-500/50 text-rose-200'
           }`}>
             <span>{tag}</span>
             {TAG_DICTIONARY[tag] && <span className={`text-xs ${isInclude ? 'text-indigo-400' : 'text-rose-400'}`}>{TAG_DICTIONARY[tag]}</span>}
             <button onClick={() => onToggleTag(tag)} className="hover:text-white"><X size={14} /></button>
           </div>
         ))}
      </div>
    </div>
  );
};