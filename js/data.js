/**
 * 48 音标大挑战 - 数据配置
 * 7 节课：辅音(1-3) → 元音(4-7)
 */

const PHONEMES = {
  // ── 第1课 · 18个辅音 ──
  p:  { symbol: '/p/',  word: 'pen',    speakWord: 'pen',    hint: '清辅音，双唇爆破', pair: 'b',  voiceless: true,  category: 'consonant', group: '清辅音' },
  t:  { symbol: '/t/',  word: 'ten',    speakWord: 'ten',    hint: '清辅音，舌尖爆破', pair: 'd',  voiceless: true,  category: 'consonant', group: '清辅音' },
  k:  { symbol: '/k/',  word: 'cat',    speakWord: 'cat',    hint: '清辅音，软腭爆破', pair: 'g',  voiceless: true,  category: 'consonant', group: '清辅音' },
  f:  { symbol: '/f/',  word: 'fish',   speakWord: 'fish',   hint: '清辅音，唇齿摩擦', pair: 'v',  voiceless: true,  category: 'consonant', group: '清辅音' },
  s:  { symbol: '/s/',  word: 'see',    speakWord: 'see',    hint: '清辅音，齿龈摩擦', pair: 'z',  voiceless: true,  category: 'consonant', group: '清辅音' },
  h:  { symbol: '/h/',  word: 'hat',    speakWord: 'hat',    hint: '清辅音，只清不浊', voiceless: true,  category: 'consonant', group: '清辅音' },
  b:  { symbol: '/b/',  word: 'book',   speakWord: 'book',   hint: '浊辅音，声带振动', pair: 'p',  voiceless: false, category: 'consonant', group: '浊辅音' },
  d:  { symbol: '/d/',  word: 'dog',    speakWord: 'dog',    hint: '浊辅音',           pair: 't',  voiceless: false, category: 'consonant', group: '浊辅音' },
  g:  { symbol: '/g/',  word: 'get',    speakWord: 'get',    hint: '浊辅音',           pair: 'k',  voiceless: false, category: 'consonant', group: '浊辅音' },
  v:  { symbol: '/v/',  word: 'very',   speakWord: 'very',   hint: '浊辅音',           pair: 'f',  voiceless: false, category: 'consonant', group: '浊辅音' },
  z:  { symbol: '/z/',  word: 'zoo',    speakWord: 'zoo',    hint: '浊辅音',           pair: 's',  voiceless: false, category: 'consonant', group: '浊辅音' },
  r:  { symbol: '/r/',  word: 'red',    speakWord: 'red',    hint: '卷舌近音',         voiceless: false, category: 'consonant', group: '浊辅音' },
  m:  { symbol: '/m/',  word: 'man',    speakWord: 'man',    hint: '鼻音，双唇',       voiceless: false, category: 'consonant', subType: 'nasal', group: '鼻音' },
  n:  { symbol: '/n/',  word: 'no',     speakWord: 'no',     hint: '鼻音，舌尖',       voiceless: false, category: 'consonant', subType: 'nasal', group: '鼻音' },
  'ŋ': { symbol: '/ŋ/', word: 'sing',  speakWord: 'sing',  hint: '鼻音，词尾',       voiceless: false, category: 'consonant', subType: 'nasal', group: '鼻音' },
  w:  { symbol: '/w/',  word: 'we',     speakWord: 'we',     hint: '半元音',           voiceless: false, category: 'consonant', group: '半元音' },
  j:  { symbol: '/j/',  word: 'yes',    speakWord: 'yes',    hint: '半元音',           voiceless: false, category: 'consonant', group: '半元音' },
  l:  { symbol: '/l/',  word: 'leg',    speakWord: 'leg',    hint: '舌边音',           voiceless: false, category: 'consonant', group: '边音' },

  // ── 第2课 · 10个辅音 ──
  'θ': { symbol: '/θ/', word: 'think',  speakWord: 'think',  hint: '清辅音，咬舌',     pair: 'ð', voiceless: true,  category: 'consonant' },
  'ð': { symbol: '/ð/', word: 'this',   speakWord: 'this',   hint: '浊辅音，咬舌',     pair: 'θ', voiceless: false, category: 'consonant' },
  'ʃ': { symbol: '/ʃ/', word: 'ship',  speakWord: 'ship',  hint: '清辅音，舌面摩擦', pair: 'ʒ', voiceless: true,  category: 'consonant' },
  'ʒ': { symbol: '/ʒ/', word: 'vision', speakWord: 'vision', hint: '浊辅音',           pair: 'ʃ', voiceless: false, category: 'consonant' },
  'tʃ': { symbol: '/tʃ/', word: 'chair', speakWord: 'chair', hint: '清辅音，破擦音', pair: 'dʒ', voiceless: true, category: 'consonant' },
  'dʒ': { symbol: '/dʒ/', word: 'jump',  speakWord: 'jump',  hint: '浊辅音',         pair: 'tʃ', voiceless: false, category: 'consonant' },
  tr: { symbol: '/tr/', word: 'tree',   speakWord: 'tree',   hint: '清辅音',           pair: 'dr', voiceless: true,  category: 'consonant' },
  dr: { symbol: '/dr/', word: 'dress',  speakWord: 'dress',  hint: '浊辅音',           pair: 'tr', voiceless: false, category: 'consonant' },
  ts: { symbol: '/ts/', word: 'cats',   speakWord: 'cats',   hint: '清辅音，词尾常见', voiceless: true,  category: 'consonant' },
  dz: { symbol: '/dz/', word: 'beds',   speakWord: 'beds',   hint: '浊辅音',           pair: 'ts', voiceless: false, category: 'consonant' },

  // ── 第4课 · 12个单元音（短7 + 长5）──
  'ɒ':  { symbol: '/ɒ/',  word: 'dog',   speakWord: 'dog',   hint: '短元音，口圆',     type: 'short', category: 'vowel', subType: 'monophthong' },
  'ɑː': { symbol: '/ɑː/', word: 'car',   speakWord: 'car',   hint: '长元音，口张大',   type: 'long', pair: 'æ', category: 'vowel', subType: 'monophthong' },
  'ə':  { symbol: '/ə/',  word: 'about', speakWord: 'about', hint: '短元音，最轻',     type: 'short', category: 'vowel', subType: 'monophthong' },
  'ɜː': { symbol: '/ɜː/', word: 'bird',  speakWord: 'bird',  hint: '长元音，口中等',   type: 'long', category: 'vowel', subType: 'monophthong' },
  'ɪ':  { symbol: '/ɪ/',  word: 'sit',   speakWord: 'sit',   hint: '短元音，短而松',   type: 'short', pair: 'iː', category: 'vowel', subType: 'monophthong' },
  'uː': { symbol: '/uː/', word: 'too',   speakWord: 'too',   hint: '长元音，圆唇拉长', type: 'long', pair: 'ʊ', category: 'vowel', subType: 'monophthong' },
  e:   { symbol: '/e/',   word: 'bed',   speakWord: 'bed',   hint: '短元音，口半开',   type: 'short', category: 'vowel', subType: 'monophthong' },
  'ɔː': { symbol: '/ɔː/', word: 'door',  speakWord: 'door',  hint: '长元音，口圆',     type: 'long', category: 'vowel', subType: 'monophthong' },
  'ʌ':  { symbol: '/ʌ/',  word: 'cup',   speakWord: 'cup',   hint: '短元音，短啊',     type: 'short', category: 'vowel', subType: 'monophthong' },
  'iː': { symbol: '/iː/', word: 'see',   speakWord: 'see',   hint: '长元音，拉长发',   type: 'long', pair: 'ɪ', category: 'vowel', subType: 'monophthong' },
  'ʊ':  { symbol: '/ʊ/',  word: 'book',  speakWord: 'book',  hint: '短元音，短圆唇',   type: 'short', pair: 'uː', category: 'vowel', subType: 'monophthong' },
  'æ':  { symbol: '/æ/',  word: 'cat',   speakWord: 'cat',   hint: '短元音，嘴张大',   type: 'short', pair: 'ɑː', category: 'vowel', subType: 'monophthong' },

  // ── 第6课 · 4个双元音 ──
  'eɪ': { symbol: '/eɪ/', word: 'day',  speakWord: 'day',  hint: '开合双元音', glide: 'e → ɪ', category: 'vowel', subType: 'diphthong' },
  'aɪ': { symbol: '/aɪ/', word: 'my',   speakWord: 'my',   hint: '开合双元音', glide: 'a → ɪ', category: 'vowel', subType: 'diphthong' },
  'əʊ': { symbol: '/əʊ/', word: 'go',   speakWord: 'go',   hint: '开合双元音', glide: 'ə → ʊ', category: 'vowel', subType: 'diphthong' },
  'aʊ': { symbol: '/aʊ/', word: 'now',  speakWord: 'now',  hint: '开合双元音', glide: 'a → ʊ', category: 'vowel', subType: 'diphthong' },

  // ── 第7课 · 4个双元音 ──
  'ɔɪ': { symbol: '/ɔɪ/', word: 'boy',  speakWord: 'boy',  hint: '开合双元音', glide: 'ɔ → ɪ', category: 'vowel', subType: 'diphthong' },
  'ɪə': { symbol: '/ɪə/', word: 'ear',  speakWord: 'ear',  hint: '集中双元音', glide: 'ɪ → ə', category: 'vowel', subType: 'diphthong' },
  'eə': { symbol: '/eə/', word: 'air',  speakWord: 'air',  hint: '集中双元音', glide: 'e → ə', category: 'vowel', subType: 'diphthong' },
  'ʊə': { symbol: '/ʊə/', word: 'poor', speakWord: 'poor', hint: '集中双元音', glide: 'ʊ → ə', category: 'vowel', subType: 'diphthong' }
};

/** 每个音标多个例词，练习时轮换 */
const WORD_BANK = {
  p: ['pen', 'pig', 'park', 'put'],
  t: ['ten', 'tea', 'top', 'toy'],
  k: ['cat', 'cup', 'kite', 'kid'],
  f: ['fish', 'face', 'fun', 'four'],
  s: ['see', 'sun', 'sit', 'say'],
  h: ['hat', 'hi', 'hen', 'home'],
  b: ['book', 'bag', 'big', 'ball'],
  d: ['dog', 'day', 'door', 'duck'],
  g: ['go', 'girl', 'game', 'get'],
  v: ['very', 'van', 'voice', 'five'],
  z: ['zoo', 'zero', 'zip', 'buzz'],
  r: ['red', 'run', 'rain', 'ring'],
  m: ['man', 'map', 'moon', 'milk'],
  n: ['no', 'net', 'nine', 'nose'],
  'ŋ': ['sing', 'song', 'long', 'king'],
  w: ['we', 'wet', 'win', 'web'],
  j: ['yes', 'you', 'yellow', 'yard'],
  l: ['leg', 'lamp', 'like', 'log'],
  'θ': ['think', 'three', 'math', 'thank'],
  'ð': ['this', 'that', 'mother', 'with'],
  'ʃ': ['ship', 'shop', 'shoe', 'wash'],
  'ʒ': ['vision', 'pleasure', 'measure', 'garage'],
  'tʃ': ['chair', 'cheese', 'church', 'watch'],
  'dʒ': ['jump', 'joy', 'juice', 'bridge'],
  tr: ['tree', 'train', 'try', 'trip'],
  dr: ['dress', 'drink', 'draw', 'drive'],
  ts: ['cats', 'hats', 'sits', 'lots'],
  dz: ['beds', 'cards', 'rides', 'hands'],
  'ɒ': ['dog', 'hot', 'box', 'stop'],
  'ɑː': ['car', 'star', 'far', 'park'],
  'ə': ['about', 'away', 'again', 'ago'],
  'ɜː': ['bird', 'girl', 'word', 'learn'],
  'ɪ': ['sit', 'big', 'fish', 'ship'],
  'uː': ['too', 'food', 'moon', 'blue'],
  e: ['bed', 'red', 'met', 'head'],
  'ɔː': ['door', 'four', 'more', 'walk'],
  'ʌ': ['cup', 'bus', 'sun', 'love'],
  'iː': ['see', 'tea', 'tree', 'meet'],
  'ʊ': ['book', 'good', 'look', 'foot'],
  'æ': ['cat', 'bag', 'map', 'hat'],
  'eɪ': ['day', 'play', 'make', 'name'],
  'aɪ': ['my', 'like', 'time', 'fly'],
  'əʊ': ['go', 'no', 'home', 'boat'],
  'aʊ': ['now', 'how', 'out', 'house'],
  'ɔɪ': ['boy', 'toy', 'join', 'coin'],
  'ɪə': ['ear', 'here', 'near', 'dear'],
  'eə': ['air', 'hair', 'care', 'share'],
  'ʊə': ['poor', 'tour', 'sure', 'cure']
};

/** 描述猜音标专用：简单单词 + 中文描述提示（一词一音标，避免多个已学音标混淆） */
const DESCRIBE_WORDS = {
  p:  { word: 'pen',   hint: '用来写字的文具' },
  t:  { word: 'ten',   hint: '比九大一的数字' },
  k:  { word: 'kite',  hint: '大风天可以在天上放的' },
  f:  { word: 'fish',  hint: '生活在水里的动物' },
  s:  { word: 'sun',   hint: '白天在天空发光的' },
  h:  { word: 'hat',   hint: '戴在头上遮阳的' },
  b:  { word: 'bag',   hint: '用来装书和文具的' },
  d:  { word: 'dog',   hint: '会汪汪叫的宠物' },
  g:  { word: 'go',    hint: '走路、出发的意思' },
  v:  { word: 'van',   hint: '比轿车更大的车' },
  z:  { word: 'zip',   hint: '衣服上用的一长条扣子' },
  r:  { word: 'red',   hint: '苹果和草莓的颜色' },
  m:  { word: 'map',   hint: '用来找路的图' },
  n:  { word: 'net',   hint: '打球或捕鱼用的网' },
  'ŋ': { word: 'king', hint: '戴着王冠的人' },
  w:  { word: 'web',   hint: '蜘蛛会结的东西' },
  j:  { word: 'jam',   hint: '涂面包上的甜酱' },
  l:  { word: 'leg',   hint: '用来走路的身体部位' },
  'θ': { word: 'thin', hint: '意思是不胖、很瘦' },
  'ð': { word: 'this', hint: '表示"这个"的词' },
  'ʃ': { word: 'ship', hint: '在海上航行的大船' },
  'ʒ': { word: 'Asia', hint: '中国所在的大洲' },
  'tʃ': { word: 'chip', hint: '一种脆脆的条状零食' },
  'dʒ': { word: 'jump', hint: '双脚离地的动作' },
  tr: { word: 'tree',  hint: '很高、有叶子的植物' },
  dr: { word: 'drum',  hint: '用手或棒敲的乐器' },
  ts: { word: 'hats',  hint: '很多人戴在头上的东西（复数）' },
  dz: { word: 'beds',  hint: '用来睡觉的家具（复数）' },
  'ɒ': { word: 'hot',  hint: '夏天太阳底下感觉很…' },
  'ɑː': { word: 'star', hint: '夜晚天空里一闪一闪的' },
  'ə': { word: 'sofa', hint: '客厅里坐人的家具' },
  'ɜː': { word: 'bird', hint: '有翅膀会飞的动物' },
  'ɪ': { word: 'pig',  hint: '粉红色、会哼哼的动物' },
  'uː': { word: 'moon', hint: '晚上天空中的弯弯的' },
  e:  { word: 'bed',  hint: '用来睡觉的家具' },
  'ɔː': { word: 'ball', hint: '圆的、可以踢或扔的' },
  'ʌ': { word: 'cup',  hint: '用来喝水的小容器' },
  'iː': { word: 'sea',  hint: '很大很大的一片水' },
  'ʊ': { word: 'book', hint: '用来阅读的东西' },
  'æ': { word: 'cap',  hint: '戴在头上的，有帽檐' },
  'eɪ': { word: 'cake', hint: '生日时会吃的甜点' },
  'aɪ': { word: 'ice',  hint: '很冷、会化的东西' },
  'əʊ': { word: 'boat', hint: '在水上航行的小船' },
  'aʊ': { word: 'cow',  hint: '农场里会哞哞叫的' },
  'ɔɪ': { word: 'toy',  hint: '小朋友喜欢玩的' },
  'ɪə': { word: 'ear',  hint: '用来听声音的身体部位' },
  'eə': { word: 'pear', hint: '一种甜甜的水果' },
  'ʊə': { word: 'tour', hint: '去很多地方看看叫做…' }
};

const CONSONANT_KEYS = Object.keys(PHONEMES).filter(k => PHONEMES[k].category === 'consonant');
const VOWEL_KEYS = Object.keys(PHONEMES).filter(k => PHONEMES[k].category === 'vowel');
const ALL_KEYS = Object.keys(PHONEMES);

const GAME_TYPES = {
  listen:     { name: '听音选标', icon: '🎧', desc: '听发音，选出正确音标' },
  catch:      { name: '捕捉音标', icon: '⭐', desc: '在飘浮的音标中点中目标' },
  match:      { name: '词音配对', icon: '🔗', desc: '看单词，找到对应音标' },
  pair:       { name: '清浊对决', icon: '⚔️', desc: '判断清辅音还是浊辅音' },
  'short-long': { name: '长短对决', icon: '📏', desc: '听单词判断短元音或长元音' },
  glide:      { name: '滑音追击', icon: '🌠', desc: '跟着滑音轨迹选出双元音' },
  speed:      { name: '极速听辨', icon: '⚡', desc: '限时快速选出正确音标' },
  whack:      { name: '音标打地鼠', icon: '🎯', desc: '听发音，锤冒出来的地鼠' },
  describe:   { name: '描述猜音标', icon: '🎭', desc: '背对屏幕猜音标，同学描述单词' }
};

const LESSONS = [
  {
    id: 1,
    title: '基础辅音',
    subtitle: '18个辅音',
    desc: '清浊·鼻音·半元音·边音',
    region: 'consonant',
    symbols: ['p','t','k','f','s','h','b','d','g','v','z','r','m','n','ŋ','w','j','l'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'pair', count: 2 },
      { type: 'catch', count: 3 },
      { type: 'listen', count: 3 },
      { type: 'match', count: 2 }
    ],
    milestone: null
  },
  {
    id: 2,
    title: '特殊辅音',
    subtitle: '10个辅音',
    desc: '咬舌·破擦·复合音',
    region: 'consonant',
    symbols: ['θ','ð','ʃ','ʒ','tʃ','dʒ','tr','dr','ts','dz'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'pair', count: 2 },
      { type: 'catch', count: 2 },
      { type: 'listen', count: 2 },
      { type: 'match', count: 2 }
    ],
    milestone: null
  },
  {
    id: 3,
    title: '辅音复习',
    subtitle: '28个辅音',
    desc: '全部辅音综合闯关',
    region: 'consonant',
    symbols: 'all-consonants',
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'catch', count: 3 },
      { type: 'match', count: 3 },
      { type: 'listen', count: 3 },
      { type: 'speed', count: 3 }
    ],
    milestone: '🟠 辅音通关'
  },
  {
    id: 4,
    title: '单元音',
    subtitle: '短7 + 长5',
    desc: '12个长短元音',
    region: 'vowel',
    symbols: ['ɒ','ɑː','ə','ɜː','ɪ','uː','e','ɔː','ʌ','iː','ʊ','æ'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'listen', count: 3 },
      { type: 'match', count: 3 },
      { type: 'catch', count: 3 }
    ],
    milestone: null
  },
  {
    id: 5,
    title: '单元音复习',
    subtitle: '12个元音',
    desc: '长短元音对比巩固',
    region: 'vowel',
    symbols: ['ɒ','ɑː','ə','ɜː','ɪ','uː','e','ɔː','ʌ','iː','ʊ','æ'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'short-long', count: 4 },
      { type: 'listen', count: 3 },
      { type: 'speed', count: 2 }
    ],
    milestone: '🟡 元音达人'
  },
  {
    id: 6,
    title: '双元音 ①',
    subtitle: '4个双元音',
    desc: '/eɪ/ /aɪ/ /əʊ/ /aʊ/',
    region: 'vowel',
    symbols: ['eɪ','aɪ','əʊ','aʊ'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'glide', count: 2 },
      { type: 'catch', count: 2 },
      { type: 'listen', count: 2 }
    ],
    milestone: null
  },
  {
    id: 7,
    title: '双元音 ②',
    subtitle: '4个双元音',
    desc: '/ɔɪ/ /ɪə/ /eə/ /ʊə/',
    region: 'vowel',
    symbols: ['ɔɪ','ɪə','eə','ʊə'],
    gameMix: [
      { type: 'whack', count: 3 },
      { type: 'describe', count: 3 },
      { type: 'glide', count: 2 },
      { type: 'catch', count: 2 },
      { type: 'listen', count: 2 }
    ],
    milestone: '🏆 48音标毕业'
  }
];

function getLessonSymbols(lesson) {
  if (lesson.symbols === 'all-consonants') return CONSONANT_KEYS;
  if (lesson.symbols === 'all-phonemes') return ALL_KEYS;
  return lesson.symbols;
}

function getPhoneme(key) {
  return PHONEMES[key];
}

function getCumulativeCount(lessonId) {
  if (lessonId <= 2) {
    return LESSONS.slice(0, lessonId).reduce((sum, l) => {
      if (l.symbols === 'all-consonants') return sum;
      return sum + l.symbols.length;
    }, 0);
  }
  if (lessonId === 3) return 28;
  if (lessonId === 4) return 40;
  if (lessonId === 5) return 40;
  if (lessonId === 6) return 44;
  return 48;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, count, exclude = []) {
  const pool = arr.filter(x => !exclude.includes(x));
  return shuffle(pool).slice(0, count);
}

function getWordList(key) {
  return WORD_BANK[key] || [PHONEMES[key]?.word].filter(Boolean);
}

function pickExampleWord(key, exclude = []) {
  const pool = getWordList(key).filter(w => !exclude.includes(w));
  const src = pool.length ? pool : getWordList(key);
  return src[Math.floor(Math.random() * src.length)];
}

/** 尽量先覆盖全部音标，再循环，减少同一音标连续出现 */
function pickSymbolKeys(symbols, count) {
  const keys = [];
  let bag = shuffle([...symbols]);
  while (keys.length < count) {
    if (!bag.length) bag = shuffle([...symbols]);
    keys.push(bag.pop());
  }
  return keys;
}

function assignRoundWord(targetKey, wordUsed) {
  const used = wordUsed.get(targetKey) || [];
  const word = pickExampleWord(targetKey, used);
  used.push(word);
  wordUsed.set(targetKey, used);
  return word;
}

/** 单词 → 所含 48 音标 key（按出现顺序） */
const WORD_PHONEMES = {
  pen: ['p', 'e', 'n'], pig: ['p', 'ɪ', 'g'], park: ['p', 'ɑː', 'k'], put: ['p', 'ʊ', 't'],
  ten: ['t', 'e', 'n'], tea: ['t', 'iː'], top: ['t', 'ɒ', 'p'], toy: ['t', 'ɔɪ'],
  cat: ['k', 'æ', 't'], cup: ['k', 'ʌ', 'p'], kite: ['k', 'aɪ', 't'], kid: ['k', 'ɪ', 'd'],
  fish: ['f', 'ɪ', 'ʃ'], face: ['f', 'eɪ', 's'], fun: ['f', 'ʌ', 'n'], four: ['f', 'ɔː'],
  see: ['s', 'iː'], sun: ['s', 'ʌ', 'n'], sit: ['s', 'ɪ', 't'], say: ['s', 'eɪ'],
  hat: ['h', 'æ', 't'], hi: ['h', 'aɪ'], hen: ['h', 'e', 'n'], home: ['h', 'əʊ', 'm'],
  book: ['b', 'ʊ', 'k'], bag: ['b', 'æ', 'g'], big: ['b', 'ɪ', 'g'], ball: ['b', 'ɔː', 'l'],
  dog: ['d', 'ɒ', 'g'], day: ['d', 'eɪ'], door: ['d', 'ɔː'], duck: ['d', 'ʌ', 'k'],
  go: ['g', 'əʊ'], girl: ['g', 'ɜː', 'l'], game: ['g', 'eɪ', 'm'], get: ['g', 'e', 't'],
  very: ['v', 'e', 'r', 'i'], van: ['v', 'æ', 'n'], voice: ['v', 'ɔɪ', 's'], five: ['f', 'aɪ', 'v'],
  zoo: ['z', 'uː'], zero: ['z', 'ɪ', 'r', 'əʊ'], zip: ['z', 'ɪ', 'p'], buzz: ['b', 'ʌ', 'z'],
  red: ['r', 'e', 'd'], run: ['r', 'ʌ', 'n'], rain: ['r', 'eɪ', 'n'], ring: ['r', 'ɪ', 'ŋ'],
  man: ['m', 'æ', 'n'], map: ['m', 'æ', 'p'], moon: ['m', 'uː', 'n'], milk: ['m', 'ɪ', 'l', 'k'],
  no: ['n', 'əʊ'], net: ['n', 'e', 't'], nine: ['n', 'aɪ', 'n'], nose: ['n', 'əʊ', 'z'],
  sing: ['s', 'ɪ', 'ŋ'], song: ['s', 'ɒ', 'ŋ'], long: ['l', 'ɒ', 'ŋ'], king: ['k', 'ɪ', 'ŋ'],
  we: ['w', 'iː'], wet: ['w', 'e', 't'], win: ['w', 'ɪ', 'n'], web: ['w', 'e', 'b'],
  yes: ['j', 'e', 's'], you: ['j', 'uː'], yellow: ['j', 'e', 'l', 'əʊ'], yard: ['j', 'ɑː', 'd'],
  leg: ['l', 'e', 'g'], lamp: ['l', 'æ', 'm', 'p'], like: ['l', 'aɪ', 'k'], log: ['l', 'ɒ', 'g'],
  think: ['θ', 'ɪ', 'ŋ', 'k'], three: ['θ', 'r', 'iː'], math: ['m', 'æ', 'θ'], thank: ['θ', 'æ', 'ŋ', 'k'],
  this: ['ð', 'ɪ', 's'], that: ['ð', 'æ', 't'], mother: ['m', 'ʌ', 'ð', 'ə'], with: ['w', 'ɪ', 'ð'],
  ship: ['ʃ', 'ɪ', 'p'], shop: ['ʃ', 'ɒ', 'p'], shoe: ['ʃ', 'uː'], wash: ['w', 'ɒ', 'ʃ'],
  vision: ['v', 'ɪ', 'ʒ', 'ə', 'n'], pleasure: ['p', 'l', 'e', 'ʒ', 'ə'], measure: ['m', 'e', 'ʒ', 'ə'],
  garage: ['g', 'æ', 'r', 'ɑː', 'ʒ'],
  chair: ['tʃ', 'eə'], cheese: ['tʃ', 'iː', 'z'], church: ['tʃ', 'ɜː', 'tʃ'], watch: ['w', 'ɒ', 'tʃ'],
  jump: ['dʒ', 'ʌ', 'm', 'p'], joy: ['dʒ', 'ɔɪ'], juice: ['dʒ', 'uː', 's'], bridge: ['b', 'r', 'ɪ', 'dʒ'],
  tree: ['tr', 'iː'], train: ['tr', 'eɪ', 'n'], try: ['tr', 'aɪ'], trip: ['tr', 'ɪ', 'p'],
  dress: ['dr', 'e', 's'], drink: ['dr', 'ɪ', 'ŋ', 'k'], draw: ['dr', 'ɔː'], drive: ['dr', 'aɪ', 'v'],
  cats: ['k', 'æ', 'ts'], hats: ['h', 'æ', 'ts'], sits: ['s', 'ɪ', 'ts'], lots: ['l', 'ɒ', 'ts'],
  beds: ['b', 'e', 'dz'], cards: ['k', 'ɑː', 'dz'], rides: ['r', 'aɪ', 'dz'], hands: ['h', 'æ', 'n', 'dz'],
  hot: ['h', 'ɒ', 't'], box: ['b', 'ɒ', 'k', 's'], stop: ['s', 't', 'ɒ', 'p'],
  car: ['k', 'ɑː'], star: ['s', 't', 'ɑː'], far: ['f', 'ɑː'],
  about: ['ə', 'b', 'aʊ', 't'], away: ['ə', 'w', 'eɪ'], again: ['ə', 'g', 'e', 'n'], ago: ['ə', 'g', 'əʊ'],
  bird: ['b', 'ɜː', 'd'], word: ['w', 'ɜː', 'd'], learn: ['l', 'ɜː', 'n'],
  too: ['t', 'uː'], food: ['f', 'uː', 'd'], blue: ['b', 'l', 'uː'],
  bed: ['b', 'e', 'd'], met: ['m', 'e', 't'], head: ['h', 'e', 'd'],
  more: ['m', 'ɔː'], walk: ['w', 'ɔː', 'k'], bus: ['b', 'ʌ', 's'], love: ['l', 'ʌ', 'v'],
  meet: ['m', 'iː', 't'], good: ['g', 'ʊ', 'd'], look: ['l', 'ʊ', 'k'], foot: ['f', 'ʊ', 't'],
  make: ['m', 'eɪ', 'k'], name: ['n', 'eɪ', 'm'], play: ['p', 'l', 'eɪ'],
  time: ['t', 'aɪ', 'm'], fly: ['f', 'l', 'aɪ'],
  boat: ['b', 'əʊ', 't'], now: ['n', 'aʊ'], how: ['h', 'aʊ'], out: ['aʊ', 't'], house: ['h', 'aʊ', 's'],
  join: ['dʒ', 'ɔɪ', 'n'], coin: ['k', 'ɔɪ', 'n'],
  ear: ['ɪə'], here: ['h', 'ɪə'], near: ['n', 'ɪə'], dear: ['d', 'ɪə'],
  air: ['eə'], hair: ['h', 'eə'], care: ['k', 'eə'], share: ['ʃ', 'eə'],
  poor: ['p', 'ʊə'], tour: ['t', 'ʊə'], sure: ['ʃ', 'ʊə'], cure: ['k', 'j', 'ʊə'],
  jam: ['dʒ', 'æ', 'm'], drum: ['dr', 'ʌ', 'm'], thin: ['θ', 'ɪ', 'n'], asia: ['eɪ', 'ʒ', 'ə'],
  sofa: ['s', 'əʊ', 'f', 'ə'], cap: ['k', 'æ', 'p'], cake: ['k', 'eɪ', 'k'],
  ice: ['aɪ', 's'], cow: ['k', 'aʊ'], pear: ['p', 'eə'], chip: ['tʃ', 'ɪ', 'p']
};

function getWordPhonemeKeys(word) {
  const w = (word || '').toLowerCase().trim();
  return WORD_PHONEMES[w] ? [...WORD_PHONEMES[w]] : null;
}

/** 根据单词在本课范围内应选的全部音标 */
function resolveLessonAnswerKeys(word, primaryKey, lessonSymbols) {
  const all = getWordPhonemeKeys(word);
  if (all) {
    const seen = new Set();
    const inLesson = all.filter(k => {
      if (!lessonSymbols.includes(k) || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (inLesson.length >= 2) {
      return { answerKeys: inLesson, multiSelect: true };
    }
  }
  return { answerKeys: [primaryKey], multiSelect: false };
}

/** 为选音标题目补充多选答案与选项 */
function enrichSymbolRound(round, symbols) {
  const { answerKeys, multiSelect } = resolveLessonAnswerKeys(
    round.roundWord, round.targetKey, symbols
  );
  round.answerKeys = answerKeys;
  round.multiSelect = multiSelect;

  if (multiSelect) {
    round.answer = answerKeys.slice().sort().join('|');
    const minOpts = Math.max(6, answerKeys.length + 2);
    const optCount = Math.min(Math.max(minOpts, 6), symbols.length);
    const decoys = pickRandom(symbols, optCount - answerKeys.length, answerKeys);
    round.options = shuffle([...new Set([...answerKeys, ...decoys])]);
  } else {
    round.answer = answerKeys[0];
    if (round.options && !round.options.includes(answerKeys[0])) {
      round.options = shuffle([
        ...pickRandom(symbols, Math.min(3, symbols.length - 1), [answerKeys[0]]),
        answerKeys[0]
      ]);
    }
  }
  return round;
}

function getDescribeEntry(key) {
  return DESCRIBE_WORDS[key] || { word: PHONEMES[key].word, hint: PHONEMES[key].hint };
}

/* ── 发音引擎：每次点击必播，兼容 Chrome / Edge ── */

let _cachedVoice = null;
let _voiceInitDone = false;
let _voiceInitPromise = null;

const SPEECH_DEFAULTS = {
  lang: 'en-GB',
  rate: 0.68,
  pitch: 1.0,
  volume: 1.0
};

function pickBestVoice(voices) {
  if (!voices?.length) return null;
  const rules = [
    v => v.name.includes('Google UK English Female'),
    v => v.name.includes('Google UK English Male'),
    v => v.name.includes('Microsoft Sonia'),
    v => v.name.includes('Microsoft Ryan'),
    v => v.lang === 'en-GB' && /Natural|Neural|Sonia|Ryan|Libby/i.test(v.name),
    v => v.lang === 'en-GB',
    v => v.lang.startsWith('en') && /Female|Samantha|Zira|Jenny/i.test(v.name),
    v => v.lang.startsWith('en-US'),
    v => v.lang.startsWith('en')
  ];
  for (const rule of rules) {
    const v = voices.find(rule);
    if (v) return v;
  }
  return voices[0];
}

function refreshVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    _cachedVoice = pickBestVoice(voices);
    _voiceInitDone = true;
  }
  return _cachedVoice;
}

function initVoice() {
  if (!('speechSynthesis' in window)) return Promise.resolve(null);
  if (_voiceInitPromise) return _voiceInitPromise;

  _voiceInitPromise = new Promise(resolve => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(refreshVoice());
    };

    refreshVoice();
    if (_voiceInitDone) {
      finish();
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      refreshVoice();
      finish();
    };
    setTimeout(finish, 600);
  });

  return _voiceInitPromise;
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function speakWord(word, options = {}) {
  if (!('speechSynthesis' in window) || !word) return;

  refreshVoice();
  const synth = window.speechSynthesis;
  synth.cancel();

  // cancel 后立即 speak 在 Chrome/Edge 会静默失败，需短暂延迟
  setTimeout(() => {
    synth.resume();

    const opts = { ...SPEECH_DEFAULTS, ...options };
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = opts.lang;
    utter.rate = opts.rate;
    utter.pitch = opts.pitch;
    utter.volume = opts.volume;

    const voice = _cachedVoice || pickBestVoice(synth.getVoices());
    if (voice) utter.voice = voice;

    synth.speak(utter);

    // 防止 Chrome 语音引擎卡住
    const resumeId = setInterval(() => {
      if (synth.speaking || synth.pending) synth.resume();
      else clearInterval(resumeId);
    }, 250);

    const cleanup = () => clearInterval(resumeId);
    utter.onend = cleanup;
    utter.onerror = cleanup;
    setTimeout(cleanup, 15000);
  }, 100);
}

function speakPhoneme(key, word) {
  const p = PHONEMES[key];
  if (!p) return;
  const text = word || p.speakWord || p.word;
  speakWord(text, { rate: p.speakRate || SPEECH_DEFAULTS.rate });
}

document.addEventListener('DOMContentLoaded', () => {
  initVoice();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => refreshVoice();
  }
});

const PROGRESS_KEY = 'phonetic-planet-progress';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { completed: [], scores: {} };
  } catch {
    return { completed: [], scores: {} };
  }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function markLessonComplete(lessonId, score) {
  const p = loadProgress();
  if (!p.completed.includes(lessonId)) p.completed.push(lessonId);
  p.scores[lessonId] = score;
  saveProgress(p);
}
