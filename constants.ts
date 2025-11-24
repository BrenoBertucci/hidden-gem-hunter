import { TagOption } from './types';

// Dictionary for mapping inputs to Japanese search terms
export const TAG_DICTIONARY: Record<string, string> = {
  "betrayal": "裏切り",
  "zaama": "ざまぁ", // Popular trope: "Serves you right" / Comeuppance
  "harem": "ハーレム",
  "ntr": "NTR", // Often used as is, or Netorare
  "isekai": "異世界",
  "cheat": "チート",
  "op": "チート", // Synonym for cheat
  "overpowered": "チート", // Synonym for cheat
  "revenge": "復讐",
  "avenge": "復讐", // Synonym for revenge
  "school life": "学園",
  "school": "学園", // Synonym
  "academy": "学園", // Synonym
  "romcom": "ラブコメ",
  "romance": "ラブコメ", // Broad mapping
  "love comedy": "ラブコメ", // Synonym
  "villainess": "悪役令嬢",
  "otome": "悪役令嬢", // Related
  "slow life": "スローライフ",
  "slow": "スローライフ", // Short form
  "slice of life": "スローライフ", // Related
  "dungeon": "ダンジョン",
  "gender bender": "TS",
  "ts": "TS", // Short form
  "yandere": "ヤンデレ",
  "hero": "勇者",
  "demon lord": "魔王",
  "maou": "魔王", // Japanese reading
  "modern": "現代",
  "modern day": "現代",
  "modern fantasy": "現代ファンタジー"
};

export const PRESET_TAGS: TagOption[] = [
  { id: 'modern', label: 'Modern Day', jpTerm: '現代' },
  { id: 'zaama', label: 'Zaama (Comeuppance)', jpTerm: 'ざまぁ' },
  { id: 'ntr', label: 'NTR', jpTerm: '寝取られ' },
  { id: 'betrayal', label: 'Betrayal', jpTerm: '裏切り' },
  { id: 'harem', label: 'Harem', jpTerm: 'ハーレム' },
  { id: 'isekai', label: 'Isekai', jpTerm: '異世界' },
  { id: 'cheat', label: 'Cheat', jpTerm: 'チート' },
  { id: 'revenge', label: 'Revenge', jpTerm: '復讐' },
  { id: 'school', label: 'School Life', jpTerm: '学園' },
];
