/**
 * 48 音标大挑战 - 游戏引擎
 */

const GameEngine = {
  lesson: null,
  rounds: [],
  currentIndex: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  correctCount: 0,
  answeredCount: 0,
  locked: false,
  speedTimer: null,

  init(lessonId) {
    this.lesson = LESSONS.find(l => l.id === lessonId);
    if (!this.lesson) return false;
    this.currentIndex = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.answeredCount = 0;
    this.locked = false;
    this.rounds = this.buildRounds();
    return true;
  },

  getSymbols() {
    return getLessonSymbols(this.lesson);
  },

  buildRounds() {
    const symbols = this.getSymbols();
    const wordUsed = new Map();
    const rounds = [];

    this.lesson.gameMix.forEach(mix => {
      const generated = this.generateByType(mix.type, symbols, mix.count, wordUsed);
      rounds.push(...generated);
    });

    return shuffle(rounds);
  },

  createRound(type, targetKey, wordUsed, extra = {}) {
    const roundWord = assignRoundWord(targetKey, wordUsed);
    return {
      type,
      targetKey,
      target: PHONEMES[targetKey],
      roundWord,
      answer: targetKey,
      ...extra
    };
  },

  generateByType(type, symbols, count, wordUsed) {
    switch (type) {
      case 'whack': return this.genWhack(symbols, count, wordUsed);
      case 'describe': return this.genDescribe(symbols, count, wordUsed);
      case 'pair': return this.genPair(symbols, count, wordUsed);
      case 'catch': return this.genCatch(symbols, count, wordUsed);
      case 'match': return this.genMatch(symbols, count, wordUsed);
      case 'short-long': return this.genShortLong(symbols, count, wordUsed);
      case 'glide': return this.genGlide(symbols, count, wordUsed);
      case 'speed': return this.genSpeed(symbols, count, wordUsed);
      default: return this.genListen(symbols, count, wordUsed);
    }
  },

  genWhack(symbols, count, wordUsed) {
    return pickSymbolKeys(symbols, count).map(targetKey => {
      const moleCount = Math.min(6, symbols.length);
      const decoys = pickRandom(symbols, moleCount - 1, [targetKey]);
      const moles = shuffle([targetKey, ...decoys]);
      return this.createRound('whack', targetKey, wordUsed, { moles });
    });
  },

  genDescribe(symbols, count, wordUsed) {
    const keys = pickSymbolKeys(symbols, Math.min(count, 3));
    const usedKeys = new Set();
    return keys.map(targetKey => {
      usedKeys.add(targetKey);
      const entry = getDescribeEntry(targetKey);
      const optionCount = Math.min(4, symbols.length);
      const options = pickRandom(symbols, optionCount - 1, [targetKey]);
      options.push(targetKey);
      return {
        type: 'describe',
        targetKey,
        target: PHONEMES[targetKey],
        roundWord: entry.word,
        options: shuffle(options),
        answer: targetKey
      };
    });
  },

  genListen(symbols, count, wordUsed) {
    return pickSymbolKeys(symbols, count).map(targetKey => {
      const options = pickRandom(symbols, 4, [targetKey]);
      options.push(targetKey);
      return this.createRound('listen', targetKey, wordUsed, {
        options: shuffle(options)
      });
    });
  },

  genPair(symbols, count, wordUsed) {
    const pairs = [];
    const seen = new Set();
    symbols.forEach(key => {
      const p = PHONEMES[key];
      if (p.pair && symbols.includes(p.pair) && !seen.has(key) && !seen.has(p.pair)) {
        pairs.push([key, p.pair]);
        seen.add(key);
        seen.add(p.pair);
      }
    });
    if (pairs.length === 0) return this.genListen(symbols, count, wordUsed);

    const qs = [];
    const shuffledPairs = shuffle(pairs);
    for (let i = 0; i < count; i++) {
      const pair = shuffledPairs[i % shuffledPairs.length];
      const targetKey = pair[Math.floor(Math.random() * 2)];
      const target = PHONEMES[targetKey];
      const roundWord = assignRoundWord(targetKey, wordUsed);
      qs.push({
        type: 'pair',
        targetKey,
        target,
        roundWord,
        answer: target.voiceless ? 'voiceless' : 'voiced'
      });
    }
    return qs;
  },

  genCatch(symbols, count, wordUsed) {
    return pickSymbolKeys(symbols, count).map(targetKey => {
      const bubbleCount = Math.min(7, symbols.length);
      const decoys = pickRandom(symbols, bubbleCount - 1, [targetKey]);
      const bubbles = shuffle([targetKey, ...decoys]);
      return this.createRound('catch', targetKey, wordUsed, { bubbles });
    });
  },

  genMatch(symbols, count, wordUsed) {
    return pickSymbolKeys(symbols, count).map(targetKey => {
      const options = pickRandom(symbols, 4, [targetKey]);
      options.push(targetKey);
      return this.createRound('match', targetKey, wordUsed, {
        options: shuffle(options)
      });
    });
  },

  genShortLong(symbols, count, wordUsed) {
    const shortKeys = symbols.filter(k => PHONEMES[k].type === 'short');
    const longKeys = symbols.filter(k => PHONEMES[k].type === 'long');
    const pool = shortKeys.length && longKeys.length
      ? pickSymbolKeys([...shortKeys, ...longKeys], count)
      : pickSymbolKeys(symbols, count);

    return pool.map(targetKey => {
      const target = PHONEMES[targetKey];
      const roundWord = assignRoundWord(targetKey, wordUsed);
      return {
        type: 'short-long',
        targetKey,
        target,
        roundWord,
        answer: target.type || 'short'
      };
    });
  },

  genGlide(symbols, count, wordUsed) {
    const allDiphthongs = VOWEL_KEYS.filter(k => PHONEMES[k].subType === 'diphthong');
    const optionPool = symbols.length <= 6 ? symbols : allDiphthongs;

    return pickSymbolKeys(symbols, count).map(targetKey => {
      const options = pickRandom(optionPool, 4, [targetKey]);
      options.push(targetKey);
      return this.createRound('glide', targetKey, wordUsed, {
        options: shuffle(options)
      });
    });
  },

  genSpeed(symbols, count, wordUsed) {
    return this.genListen(symbols, count, wordUsed).map(q => ({
      ...q,
      type: 'speed',
      timeLimit: 9
    }));
  },

  getCurrentRound() {
    return this.rounds[this.currentIndex] || null;
  },

  getTotalRounds() {
    return this.rounds.length;
  },

  checkAnswer(userAnswer) {
    const r = this.getCurrentRound();
    return r ? userAnswer === r.answer : false;
  },

  recordResult(isCorrect) {
    this.answeredCount++;
    if (isCorrect) {
      this.correctCount++;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      const base = 100;
      const comboBonus = Math.min(this.combo - 1, 5) * 20;
      const speedBonus = this.getCurrentRound()?.type === 'speed' ? 50 : 0;
      this.score += base + comboBonus + speedBonus;
    } else {
      this.combo = 0;
    }
  },

  nextRound() {
    if (this.currentIndex < this.rounds.length - 1) {
      this.currentIndex++;
      this.locked = false;
      return true;
    }
    return false;
  },

  getAccuracy() {
    if (this.answeredCount === 0) return 0;
    return Math.round((this.correctCount / this.answeredCount) * 100);
  },

  getProgress() {
    return Math.round((this.currentIndex / this.rounds.length) * 100);
  },

  formatAnswer(r) {
    const word = r.roundWord || r.target.word;
    switch (r.type) {
      case 'pair':
        return r.target.voiceless ? `清辅音 ${r.target.symbol}` : `浊辅音 ${r.target.symbol}`;
      case 'short-long':
        return r.target.type === 'short' ? `短元音 ${r.target.symbol}` : `长元音 ${r.target.symbol}`;
      default:
        return `${r.target.symbol} · ${word}`;
    }
  },

  getRoundWord(r) {
    return r?.roundWord || r?.target?.word || '';
  },

  getBubblePositions(count) {
    const positions = [
      { x: 12, y: 18, delay: 0, dur: 4.2 },
      { x: 72, y: 12, delay: 0.6, dur: 3.8 },
      { x: 38, y: 55, delay: 1.1, dur: 4.5 },
      { x: 82, y: 48, delay: 0.3, dur: 3.5 },
      { x: 22, y: 72, delay: 1.5, dur: 4.0 },
      { x: 58, y: 28, delay: 0.8, dur: 3.6 },
      { x: 48, y: 78, delay: 0.2, dur: 4.3 }
    ];
    return positions.slice(0, count);
  },

  renderRound() {
    const r = this.getCurrentRound();
    if (!r) return '';
    const meta = GAME_TYPES[r.type] || GAME_TYPES.listen;

    switch (r.type) {
      case 'whack': return this.renderWhack(r, meta);
      case 'describe': return this.renderDescribe(r, meta);
      case 'catch': return this.renderCatch(r, meta);
      case 'match': return this.renderMatch(r, meta);
      case 'pair': return this.renderPair(r, meta);
      case 'short-long': return this.renderShortLong(r, meta);
      case 'glide': return this.renderGlide(r, meta);
      case 'speed': return this.renderSpeed(r, meta);
      default: return this.renderListen(r, meta);
    }
  },

  renderWhack(r, meta) {
    const holes = r.moles.map((key, i) => {
      const p = PHONEMES[key];
      return `
        <div class="whack-hole" data-hole="${i}">
          <div class="hole-grass"></div>
          <div class="hole-rim"></div>
          <button class="whack-mole" data-answer="${key}" type="button" aria-label="地鼠 ${p.symbol}">
            <div class="mole-head">
              <span class="mole-face">🐹</span>
              <span class="mole-symbol">${p.symbol}</span>
            </div>
          </button>
          <div class="hammer-hit">🔨</div>
        </div>
      `;
    }).join('');

    return `
      <div class="round-view round-whack">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">先听发音，地鼠冒出时锤中正确的那个！</p>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 听发音 · 开始</button>
        <div class="whack-timer-bar" id="whackTimerBar">
          <div class="whack-timer-fill" id="whackTimerFill"></div>
        </div>
        <div class="whack-status" id="whackStatus">点击上方按钮开始，等地鼠探出头再锤！</div>
        <div class="whack-field">${holes}</div>
      </div>
    `;
  },

  renderDescribe(r, meta) {
    return `
      <div class="round-view round-describe" id="describeRound">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
        </div>
        <div class="describe-banner">
          <span class="describe-banner-icon">🙈</span>
          <span>请一位同学<strong>背对黑板</strong>，下面同学描述单词，<strong>不要直接读</strong>！</span>
        </div>
        <div class="describe-ready-panel" id="describeReadyPanel">
          <div class="describe-ready-icon">👋</div>
          <p class="describe-ready-text">请确认猜音标的同学已背对黑板</p>
          <button class="btn btn-primary btn-reveal" id="btnRevealDescribe" type="button">
            准备好了，显示单词
          </button>
        </div>
        <div class="describe-hidden-content" id="describeContent" hidden>
          <div class="describe-class-card">
            <div class="describe-class-label">👥 全班可见</div>
            <div class="describe-word">${r.roundWord}</div>
            <div class="describe-phoneme">目标音标：<span>${r.target.symbol}</span></div>
            <button class="btn-play-small" id="btnPlay" type="button">🔊 听单词（可选）</button>
          </div>
          <div class="describe-guess-section">
            <div class="describe-guess-label">🎯 猜音标的同学，请选出答案：</div>
            <div class="options-grid describe-options">${this.renderSymbolGrid(r)}</div>
          </div>
        </div>
      </div>
    `;
  },

  renderListen(r, meta) {
    return `
      <div class="round-view round-listen">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">听发音，点击正确的音标</p>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 点击播放</button>
        <div class="options-grid">${this.renderSymbolGrid(r)}</div>
      </div>
    `;
  },

  renderMatch(r, meta) {
    return `
      <div class="round-view round-match">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
        </div>
        <div class="match-word-card">
          <div class="match-word-label">这个单词的音标是？</div>
          <div class="match-word">${this.getRoundWord(r)}</div>
          <button class="btn-play-small" id="btnPlay">🔊 听发音</button>
        </div>
        <div class="options-grid">${this.renderSymbolGrid(r)}</div>
      </div>
    `;
  },

  renderCatch(r, meta) {
    const positions = this.getBubblePositions(r.bubbles.length);
    const bubbles = r.bubbles.map((key, i) => {
      const p = PHONEMES[key];
      const pos = positions[i];
      return `
        <button class="catch-bubble" data-answer="${key}"
          style="left:${pos.x}%;top:${pos.y}%;animation-delay:${pos.delay}s;animation-duration:${pos.dur}s">
          <span class="bubble-symbol">${p.symbol}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="round-view round-catch">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">听发音，点中对应的飘浮音标！</p>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 点击播放</button>
        <div class="catch-field">${bubbles}</div>
        <div class="catch-hint">例词：${this.getRoundWord(r)}</div>
      </div>
    `;
  },

  renderPair(r, meta) {
    const pairKey = r.target.pair;
    const pairPhoneme = pairKey ? PHONEMES[pairKey] : null;
    return `
      <div class="round-view round-pair">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">听发音，判断清辅音还是浊辅音</p>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 点击播放</button>
        <div class="pair-arena">
          <button class="option-btn pair-btn voiceless" data-answer="voiceless">
            <span class="pair-emoji">🛡️</span>
            <span class="option-label">清</span>
            <span class="option-symbol">${r.target.voiceless ? r.target.symbol : (pairPhoneme?.symbol || '/?/')}</span>
          </button>
          <div class="pair-vs">VS</div>
          <button class="option-btn pair-btn voiced" data-answer="voiced">
            <span class="pair-emoji">🔥</span>
            <span class="option-label">浊</span>
            <span class="option-symbol">${!r.target.voiceless ? r.target.symbol : (pairPhoneme?.symbol || '/?/')}</span>
          </button>
        </div>
        <div class="catch-hint">例词：${this.getRoundWord(r)}</div>
      </div>
    `;
  },

  renderShortLong(r, meta) {
    return `
      <div class="round-view round-shortlong">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
        </div>
        <div class="match-word-card">
          <div class="match-word">${this.getRoundWord(r)}</div>
          <button class="btn-play-small" id="btnPlay">🔊 听发音</button>
        </div>
        <div class="wave-compare">
          <button class="option-btn wave-btn short-wave" data-answer="short">
            <div class="wave-visual short">～～</div>
            <span class="option-label">短</span>
          </button>
          <button class="option-btn wave-btn long-wave" data-answer="long">
            <div class="wave-visual long">～～～～～</div>
            <span class="option-label">长</span>
          </button>
        </div>
      </div>
    `;
  },

  renderGlide(r, meta) {
    const parts = r.target.glide ? r.target.glide.split('→') : ['?', '?'];
    return `
      <div class="round-view round-glide">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">跟着滑音轨迹，选出正确的双元音</p>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 点击播放</button>
        <div class="glide-comet">
          <span class="glide-node start">${parts[0]?.trim()}</span>
          <span class="comet-trail">✦</span>
          <span class="glide-node end">${parts[1]?.trim()}</span>
        </div>
        <div class="options-grid">${this.renderSymbolGrid(r)}</div>
      </div>
    `;
  },

  renderSpeed(r, meta) {
    return `
      <div class="round-view round-speed">
        <div class="round-header">
          <span class="round-icon">${meta.icon}</span>
          <h2 class="round-title">${meta.name}</h2>
          <p class="round-desc">快速听辨，限时 ${r.timeLimit} 秒！</p>
        </div>
        <div class="speed-timer-bar">
          <div class="speed-timer-fill" id="speedTimerFill"></div>
        </div>
        <button class="btn-play-big" id="btnPlay">🔊 点击播放</button>
        <div class="options-grid">${this.renderSymbolGrid(r)}</div>
      </div>
    `;
  },

  renderSymbolGrid(r) {
    return r.options.map(key => {
      const p = PHONEMES[key];
      return `<button class="option-btn grid-btn" data-answer="${key}">${p.symbol}</button>`;
    }).join('');
  }
};
