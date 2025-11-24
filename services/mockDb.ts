import { Novel, SourceSite } from '../types';

/**
 * This database simulates the results of a "Scrape".
 * It contains:
 * 1. Famous novels (isOnNovelUpdates: true) - These should be FILTERED OUT.
 * 2. Hidden novels (isOnNovelUpdates: false) - These should be SHOWN.
 */
export const MOCK_NOVEL_DATABASE: Novel[] = [
  // --- FAMOUS / EXISTING (Should be hidden by the filter) ---
  {
    id: 'famous-1',
    titleJP: '無職転生　- 異世界行ったら本気だす -',
    titleEN_Adapted: 'Mushoku Tensei: Jobless Reincarnation',
    synopsis: 'A 34-year-old NEET gets run over by a truck and reincarnates in a fantasy world, deciding to live this new life to the fullest.',
    tags: ['isekai', 'harem', 'cheat', 'magic'],
    tagsJP: ['異世界', 'ハーレム', 'チート'],
    source: SourceSite.SYOSETU,
    author: 'Rifujin na Magonote',
    url: '#',
    isOnNovelUpdates: true, // FILTER ME OUT
    popularityScore: 99999
  },
  {
    id: 'famous-2',
    titleJP: '陰の実力者になりたくて！',
    titleEN_Adapted: 'The Eminence in Shadow',
    synopsis: 'A boy who wants to be a mastermind in the shadows gets reincarnated and actually becomes one while thinking he is roleplaying.',
    tags: ['isekai', 'school life', 'comedy', 'harem'],
    tagsJP: ['異世界', '学園', 'ハーレム'],
    source: SourceSite.SYOSETU,
    author: 'Daisuke Aizawa',
    url: '#',
    isOnNovelUpdates: true, // FILTER ME OUT
    popularityScore: 88888
  },

  // --- HIDDEN GEMS (Should be shown) ---
  // Scenario: Zaama / Betrayal / Revenge
  {
    id: 'hidden-1',
    titleJP: '勇者パーティーを追放されたので、王都で気ままに錬金術カフェを開きます 〜今さら戻ってこいと言われてももう遅い〜',
    titleEN_Adapted: 'I Was Banished from the Hero\'s Party, So I Opened an Alchemy Cafe in the Capital ~It\'s Too Late to Ask Me to Come Back Now~',
    synopsis: 'The classic tale of a supporter kicked out for being "useless". Turns out, his potions were the only reason the Hero survived. Now the Hero is struggling in a dungeon while our protagonist makes bank selling coffee and high-grade elixirs to the Hero\'s rivals.',
    tags: ['zaama', 'betrayal', 'slow life', 'cheat'],
    tagsJP: ['ざまぁ', '裏切り', 'スローライフ'],
    source: SourceSite.SYOSETU,
    author: 'Kitsune Udon',
    url: 'https://ncode.syosetu.com/mock1',
    isOnNovelUpdates: false,
    popularityScore: 5000
  },
  {
    id: 'hidden-2',
    titleJP: '婚約破棄された瞬間に前世の記憶を取り戻しましたが、相手が豚侯爵だったのでむしろ感謝します',
    titleEN_Adapted: 'I Regained Memories of My Past Life the Moment My Engagement Was Annulled, But My Fiance was the "Pig Duke" So I\'m Actually Grateful',
    synopsis: 'The protagonist realizes she is the villainess in an otome game at the exact moment of her public condemnation. However, instead of being sad, she is thrilled to be free of her disgusting, arrogant fiancé. She uses her modern knowledge to build a trading empire.',
    tags: ['villainess', 'zaama', 'romcom', 'school life'],
    tagsJP: ['悪役令嬢', 'ざまぁ', '学園'],
    source: SourceSite.KAKUYOMU,
    author: 'Earl Grey Tea',
    url: 'https://kakuyomu.jp/mock2',
    isOnNovelUpdates: false,
    popularityScore: 4500
  },
  // Scenario: NTR / Dark / Revenge
  {
    id: 'hidden-3',
    titleJP: '幼馴染が勇者に寝取られたので、魔王軍の参謀として人類を滅ぼすことにした',
    titleEN_Adapted: 'My Childhood Friend Was Taken by the Hero, So I Became the Demon Lord\'s Strategist to Destroy Humanity',
    synopsis: 'A dark fantasy where the protagonist supports his childhood friend to become a Saintess, only for the Hero to steal her away using a charm skill. Broken and betrayed, the protagonist defects to the Demon Lord, using advanced tactics to dismantle the human armies one by one.',
    tags: ['ntr', 'betrayal', 'revenge', 'dark'],
    tagsJP: ['寝取られ', '裏切り', '復讐', 'ダーク'],
    source: SourceSite.KAKUYOMU,
    author: 'Black Coffee',
    url: 'https://kakuyomu.jp/mock3',
    isOnNovelUpdates: false,
    popularityScore: 6200
  },
  // Scenario: Harem / School / Cheat
  {
    id: 'hidden-4',
    titleJP: 'ステータスが見えるようになった俺は、学園の美少女たちが全員「攻略対象」だと気づいた',
    titleEN_Adapted: 'I Can See Status Screens, and I Realized All the Beautiful Girls at School are "Capture Targets"',
    synopsis: 'An ordinary high school student wakes up with a "Dating Sim" interface. He can see affection meters and dialogue flags. He realizes the student council president, the delinquent girl, and the idol are all conquerable. A lighthearted harem romcom.',
    tags: ['harem', 'school life', 'cheat', 'romcom'],
    tagsJP: ['ハーレム', '学園', 'チート', 'ラブコメ'],
    source: SourceSite.KAKUYOMU,
    author: 'Sakura Mochi',
    url: 'https://kakuyomu.jp/mock4',
    isOnNovelUpdates: false,
    popularityScore: 3000
  },
  // Scenario: Isekai / Cheat
  {
    id: 'hidden-5',
    titleJP: 'レベル1だけどユニークスキル【即死】を持っているので、異世界最強です',
    titleEN_Adapted: 'I\'m Level 1 But I Have the Unique Skill [Instant Death], So I\'m the Strongest in the Other World',
    synopsis: 'Summoned to another world and immediately discarded for having low stats. However, his skill allows him to kill anything—gods, dragons, concepts—with a single thought. He just wants to find a way home, but people keep attacking him.',
    tags: ['isekai', 'cheat', 'zaama'],
    tagsJP: ['異世界', 'チート', 'ざまぁ'],
    source: SourceSite.SYOSETU,
    author: 'Tsuyoshi',
    url: 'https://ncode.syosetu.com/mock5',
    isOnNovelUpdates: false,
    popularityScore: 7000
  },
  // Scenario: NTR / School (Specific niche)
  {
    id: 'hidden-6',
    titleJP: '僕の彼女は先輩の言いなり',
    titleEN_Adapted: 'My Girlfriend Obeys the Senior',
    synopsis: 'A psychological drama set in a university circle. The protagonist notices his girlfriend acting strange after joining a specific seminar group led by a charismatic senior. A tale of manipulation and despair.',
    tags: ['ntr', 'school life', 'drama'],
    tagsJP: ['寝取られ', '学園', 'ドラマ'],
    source: SourceSite.KAKUYOMU,
    author: 'Midnight Blue',
    url: 'https://kakuyomu.jp/mock6',
    isOnNovelUpdates: false,
    popularityScore: 2100
  }
];
