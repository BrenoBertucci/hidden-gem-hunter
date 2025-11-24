export enum SourceSite {
  KAKUYOMU = 'Kakuyomu',
  SYOSETU = 'Syosetsu'
}

export interface Novel {
  id: string;
  titleJP: string;
  titleEN_Adapted: string; // Generated English Title
  synopsis: string;
  tags: string[]; // English tags for internal matching
  tagsJP: string[]; // Display JP tags
  source: SourceSite;
  author: string;
  url: string;
  isOnNovelUpdates: boolean; // The critical filter flag
  popularityScore: number; // To simulate sorting
}

export interface TagOption {
  id: string;
  label: string; // Display Name (English)
  jpTerm: string; // Search Term (Japanese)
}
