import { Novel, SourceSite } from '../types';
import { MOCK_NOVEL_DATABASE } from './mockDb';
import { TAG_DICTIONARY } from '../constants';

interface SearchResponse {
  results: Novel[];
  totalFound: number;
  filteredCount: number; // How many were removed because they exist on NovelUpdates
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to sanitize and map raw backend data to the frontend Novel interface
const mapToNovel = (rawItem: any): Novel => {
  return {
    id: rawItem.id || crypto.randomUUID(),
    titleJP: rawItem.titleJP || "Unknown Title",
    titleEN_Adapted: rawItem.titleJP || "Untitled", // Fallback to JP title if no EN adaptation
    synopsis: rawItem.synopsis || "No synopsis available.",
    tags: rawItem.tags || [], // Ensure array
    tagsJP: rawItem.tagsJP || [],
    source: rawItem.source as SourceSite || SourceSite.SYOSETU, // Default to Syosetu if missing
    author: rawItem.author || "Unknown Author",
    url: rawItem.url || "#",
    isOnNovelUpdates: rawItem.isOnNovelUpdates || false,
    popularityScore: Math.floor(Math.random() * 100) // Mock score for now
  };
};

export const searchNovels = async (activeTags: string[], excludedTags: string[]): Promise<SearchResponse> => {
  const API_URL = 'http://localhost:3001/api/search';

  // Translate tags to Japanese
  const translatedTags = activeTags.map(tag => TAG_DICTIONARY[tag] || tag);
  const translatedExcluded = excludedTags.map(tag => TAG_DICTIONARY[tag] || tag);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: translatedTags,
        excludedTags: translatedExcluded
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Map and sanitize results
    const sanitizedResults = (data.results || []).map(mapToNovel);

    return {
      results: sanitizedResults,
      totalFound: sanitizedResults.length,
      filteredCount: 0 // Backend doesn't currently return filtered count
    };

  } catch (error) {
    console.error("Erro de conexão:", error);
    return { results: [], totalFound: 0, filteredCount: 0 };
  }
};