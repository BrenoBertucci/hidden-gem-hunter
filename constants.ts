import { TagOption } from './types';

// Dictionary for mapping inputs to Japanese search terms
export const TAG_DICTIONARY: Record<string, string> = {
  "betrayal": "裏切り",
  "zaama": "ざまぁ", // Popular trope: "Serves you right" / Comeuppance
  "harem": "ハーレム",
  "ntr": "NTR", // Often used as is, or Netorare
  "isekai": "異世界",
  "cheat": "チート",
  "revenge": "復讐",
  "school life": "学園",
  "romcom": "ラブコメ",
  "villainess": "悪役令嬢",
  "slow life": "スローライフ",
  "dungeon": "ダンジョン",
  "gender bender": "TS",
  "yandere": "ヤンデレ",
  "hero": "勇者",
  "demon lord": "魔王"
};

export const PRESET_TAGS: TagOption[] = [
  { id: 'zaama', label: 'Zaama (Comeuppance)', jpTerm: 'ざまぁ' },
  { id: 'ntr', label: 'NTR', jpTerm: '寝取られ' },
  { id: 'betrayal', label: 'Betrayal', jpTerm: '裏切り' },
  { id: 'harem', label: 'Harem', jpTerm: 'ハーレム' },
  { id: 'isekai', label: 'Isekai', jpTerm: '異世界' },
  { id: 'cheat', label: 'Cheat', jpTerm: 'チート' },
  { id: 'revenge', label: 'Revenge', jpTerm: '復讐' },
  { id: 'school', label: 'School Life', jpTerm: '学園' },
];
