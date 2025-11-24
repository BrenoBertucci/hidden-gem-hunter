import { Novel } from '../types';
import { MOCK_NOVEL_DATABASE } from './mockDb';
import { TAG_DICTIONARY } from '../constants';

interface SearchResponse {
  results: Novel[];
  totalFound: number;
  filteredCount: number; // How many were removed because they exist on NovelUpdates
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchNovels = async (activeTags: string[], excludedTags: string[]): Promise<SearchResponse> => {
  // 1. Simulate Network Latency (Scraping time)
  await delay(1500);

  if (activeTags.length === 0) {
    return { results: [], totalFound: 0, filteredCount: 0 };
  }

  // 2. "Search" the database
  const rawMatches = MOCK_NOVEL_DATABASE.filter(novel => {
    
    // STEP A: Check Exclusions (Negative Filter)
    // If the novel contains ANY of the excluded tags, remove it immediately.
    const hasExcludedTag = excludedTags.some(exTag => {
      const lowerEx = exTag.toLowerCase();
      
      // Check direct English match
      if (novel.tags.includes(lowerEx)) return true;

      // Check Mapped JP match
      const jpEx = TAG_DICTIONARY[lowerEx];
      if (jpEx && novel.tagsJP.some(t => t.includes(jpEx))) return true;

      return false;
    });

    if (hasExcludedTag) return false;


    // STEP B: Check Inclusions (Positive Filter)
    // Check if the novel has ANY of the requested tags (OR logic)
    return activeTags.some(term => {
      const lowerTerm = term.toLowerCase();
      
      // Direct match in English tags
      if (novel.tags.includes(lowerTerm)) return true;
      
      // Mapped match (User types 'revenge' -> maps to '復讐' -> checks JP tags)
      const jpTerm = TAG_DICTIONARY[lowerTerm];
      if (jpTerm && novel.tagsJP.some(t => t.includes(jpTerm))) return true;
      
      return false;
    });
  });

  // 3. THE CORE FEATURE: Filter against "NovelUpdates"
  const finalResults = rawMatches.filter(novel => !novel.isOnNovelUpdates);
  
  const filteredCount = rawMatches.length - finalResults.length;

  // 4. Sort by "Popularity" (Mock)
  finalResults.sort((a, b) => b.popularityScore - a.popularityScore);

  return {
    results: finalResults,
    totalFound: rawMatches.length,
    filteredCount
  };
};