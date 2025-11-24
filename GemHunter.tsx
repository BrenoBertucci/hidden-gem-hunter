import React, { useState, useRef } from 'react';
import { TagSelector } from './components/TagSelector';
import { ResultCard } from './components/ResultCard';
import { StatusConsole } from './components/StatusConsole';
import { searchNovels } from './services/hunterEngine';
import { Novel } from './types';
import { PRESET_TAGS, TAG_DICTIONARY } from './constants';
import { Search, Sparkles, Info, Wand2 } from 'lucide-react';

export const GemHunter: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [excludedTags, setExcludedTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  
  const [results, setResults] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Handlers for Included Tags (With Conflict Resolution) ---
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(prev => prev.filter(t => t !== tagId));
    } else {
      setSelectedTags(prev => [...prev, tagId]);
      // Conflict Resolution: Remove from excluded if present
      setExcludedTags(prev => prev.filter(t => t !== tagId));
    }
  };

  const addCustomTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
      // Conflict Resolution
      setExcludedTags(prev => prev.filter(t => t !== tag));
    }
  };

  // --- Handlers for Excluded Tags (With Conflict Resolution) ---
  const toggleExcludedTag = (tagId: string) => {
    if (excludedTags.includes(tagId)) {
      setExcludedTags(prev => prev.filter(t => t !== tagId));
    } else {
      setExcludedTags(prev => [...prev, tagId]);
      // Conflict Resolution: Remove from selected if present
      setSelectedTags(prev => prev.filter(t => t !== tagId));
    }
  };

  const addCustomExcludedTag = (tag: string) => {
    if (!excludedTags.includes(tag)) {
      setExcludedTags(prev => [...prev, tag]);
      // Conflict Resolution
      setSelectedTags(prev => prev.filter(t => t !== tag));
    }
  };

  // --- Natural Language Analysis ---
  const handleAnalyzeDescription = () => {
    if (!description.trim()) return;

    const lowerDesc = description.toLowerCase();
    const nextIncluded = new Set(selectedTags);
    const nextExcluded = new Set(excludedTags);

    // Combine preset IDs and dictionary keys to get all known keywords
    const allKnownTags = Array.from(new Set([
      ...PRESET_TAGS.map(t => t.id),
      ...Object.keys(TAG_DICTIONARY)
    ]));

    allKnownTags.forEach(tag => {
      // Regex checks for "no [tag]", "not [tag]", "without [tag]", "avoid [tag]"
      const negativePattern = new RegExp(`\\b(no|not|without|hate|anti|avoid|stop)\\s+${tag}\\b`, 'i');
      // Regex checks for just the word "[tag]"
      const positivePattern = new RegExp(`\\b${tag}\\b`, 'i');

      if (negativePattern.test(lowerDesc)) {
        // Found negative context -> Add to Excluded, Remove from Included
        nextExcluded.add(tag);
        nextIncluded.delete(tag);
      } else if (positivePattern.test(lowerDesc)) {
        // Found positive context -> Add to Included, Remove from Excluded
        nextIncluded.add(tag);
        nextExcluded.delete(tag);
      }
    });

    setSelectedTags(Array.from(nextIncluded));
    setExcludedTags(Array.from(nextExcluded));
  };

  const handleSearch = async () => {
    if (selectedTags.length === 0) return;

    setLoading(true);
    setSearched(true);
    setResults([]);
    setLogs([]);
    setFilteredCount(0);

    // Add initial logs
    const newLogs = [`Initializing search sequence...`];
    if (excludedTags.length > 0) {
      newLogs.push(`Applying exclusion filters: ${excludedTags.join(', ')}`);
    }
    newLogs.push(`Converting tags to Japanese Kanji...`);
    setLogs(newLogs);

    try {
      // Execute simulated search
      const response = await searchNovels(selectedTags, excludedTags);
      
      // Simulate granular updates for effect
      setTimeout(() => setLogs(prev => [...prev, `Accessing syosetu.com (N-code)...`]), 300);
      setTimeout(() => setLogs(prev => [...prev, `Accessing kakuyomu.jp...`]), 600);
      setTimeout(() => setLogs(prev => [...prev, `Found ${response.totalFound} potential matches.`]), 900);
      setTimeout(() => setLogs(prev => [...prev, `Cross-referencing with NovelUpdates.com database...`]), 1200);
      
      setTimeout(() => {
        if (response.filteredCount > 0) {
          setLogs(prev => [...prev, `⚠️ FILTERED OUT ${response.filteredCount} titles (Already Translated/Licensed).`]);
        }
        setLogs(prev => [...prev, `✅ SEARCH COMPLETE. Found ${response.results.length} Hidden Gems.`]);
        
        setResults(response.results);
        setFilteredCount(response.filteredCount);
        setLoading(false);
        
        // Smooth scroll to results
        if (resultsRef.current) {
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }, 1500);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setLogs(prev => [...prev, `ERROR: Connection timed out.`]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-4 ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-500/20">
          <Sparkles className="text-indigo-400 w-8 h-8 mr-2" />
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-purple-200 tracking-tight">
            Hidden Gem Hunter
          </h1>
        </div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Find untranslated Japanese web novels ("Raws") that <span className="text-indigo-400 font-bold">do not exist</span> on NovelUpdates.
          <br/>
          <span className="text-sm text-slate-500 mt-2 block opacity-80">(Simulates filtering out popular/licensed series to find the deep cuts)</span>
        </p>
      </div>

      {/* Search Interface */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-6 text-indigo-300 font-semibold border-b border-slate-800 pb-4">
          <Search size={18} />
          <h2>Search Configuration</h2>
        </div>
        
        {/* Magic Description Box */}
        <div className="mb-8 bg-slate-950/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Wand2 size={14} className="text-purple-400" />
              Describe what you want (Auto-Tag)
            </label>
            <span className="text-xs text-slate-600 font-mono">{description.length}/300</span>
          </div>
          <div className="relative">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              placeholder="e.g. I want an Isekai with Revenge but no Harem and without Cheat skills..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-20 placeholder-slate-600"
            />
            <button 
              onClick={handleAnalyzeDescription}
              disabled={!description.trim()}
              className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={12} />
              Generate Tags
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 1: Include */}
          <div>
            <TagSelector 
              title="Must Include (Tags)"
              variant="include"
              selectedTags={selectedTags} 
              onToggleTag={toggleTag} 
              onAddCustomTag={addCustomTag}
            />
          </div>
          
          {/* Section 2: Exclude */}
          <div className="md:border-l border-slate-800 md:pl-8">
            <TagSelector 
              title="Must Exclude (Not allowed)"
              variant="exclude"
              selectedTags={excludedTags} 
              onToggleTag={toggleExcludedTag} 
              onAddCustomTag={addCustomExcludedTag}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end pt-6 border-t border-slate-800">
          <button
            onClick={handleSearch}
            disabled={loading || selectedTags.length === 0}
            className={`
              relative overflow-hidden group px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200
              ${loading || selectedTags.length === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? 'Hunting...' : 'Find Untranslated Novels'}
              {!loading && <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />}
            </span>
          </button>
        </div>
      </div>

      {/* Logs / Status */}
      {(searched || loading) && (
        <StatusConsole status={loading ? 'searching' : 'complete'} logs={logs} />
      )}

      {/* Results Area */}
      <div ref={resultsRef}>
        {searched && !loading && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Search Results
                <span className="text-sm font-normal text-slate-500 ml-2 bg-slate-900 px-2 py-1 rounded-full border border-slate-800">
                  {results.length} Found
                </span>
              </h2>
              {filteredCount > 0 && (
                <div className="flex items-center gap-2 text-amber-400/80 text-sm bg-amber-900/20 px-3 py-1 rounded-full border border-amber-900/30">
                   <Info size={14} />
                   <span>{filteredCount} Popular titles hidden</span>
                </div>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(novel => (
                  <ResultCard key={novel.id} novel={novel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                <p className="text-slate-400 text-lg mb-2">No hidden gems found for this specific combination.</p>
                <p className="text-slate-600">Try removing some exclusion tags or broadening your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};