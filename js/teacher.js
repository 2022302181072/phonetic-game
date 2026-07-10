/**
 * 48 音标大挑战 - 页面交互
 */

const GameUI = {
  stage: null,
  feedbackEl: null,
  overlayEl: null,
  autoAdvanceTimer: null,
  speedInterval: null,
  whackActive: false,
  whackPopTimer: null,
  whackHideTimer: null,
  whackEndTimer: null,
  whackTickTimer: null,
  whackTimeLeft: 0,

  init() {
    this.stage = document.getElementById('gameStage');
    this.feedbackEl = document.getElementById('feedbackBurst');
    this.overlayEl = document.getElementById('resultOverlay');
    this.bindControls();
    initVoice().then(() => this.render());
  },

  bindControls() {
    document.getElementById('btnBack')?.addEventListener('click', () => {
      stopSpeech();
      window.location.href = 'index.html';
    });
    document.getElementById('btnReplay')?.addEventListener('click', () => this.playCurrentSound());
  },

  render() {
    if (!this.stage) return;
    stopSpeech();
    this.stopWhackGame();
    this.clearSpeedTimer();
    this.stage.innerHTML = GameEngine.renderRound();
    this.updateHUD();
    this.bindRoundEvents();
    this.startSpeedTimerIfNeeded();
  },

  updateHUD() {
    const r = GameEngine.getCurrentRound();
    const lesson = GameEngine.lesson;
    const meta = r ? (GAME_TYPES[r.type] || GAME_TYPES.listen) : null;

    document.getElementById('gameLevel').textContent = `第 ${lesson.id} 关 · ${lesson.title}`;
    document.getElementById('gameModeTag').textContent = meta ? `${meta.icon} ${meta.name}` : '';
    document.getElementById('scoreDisplay').textContent = `${GameEngine.score} 分`;
    document.getElementById('comboDisplay').textContent =
      GameEngine.combo >= 2 ? `🔥 ${GameEngine.combo} 连击` : '';
    document.getElementById('gameCounter').textContent =
      `${GameEngine.currentIndex + 1} / ${GameEngine.getTotalRounds()}`;
    document.getElementById('progressFill').style.width = GameEngine.getProgress() + '%';

    const header = document.getElementById('gameHeader');
    if (header) {
      header.classList.remove('consonant', 'vowel');
      header.classList.add(lesson.region);
    }
  },

  bindRoundEvents() {
    const r = GameEngine.getCurrentRound();

    if (r?.type === 'whack') {
      document.getElementById('btnPlay')?.addEventListener('click', () => {
        this.playCurrentSound();
        this.startWhackGame();
      });
      this.stage.querySelectorAll('.whack-mole').forEach(btn => {
        btn.addEventListener('click', () => this.handleWhackClick(btn));
      });
      return;
    }

    if (r?.type === 'describe') {
      document.getElementById('btnRevealDescribe')?.addEventListener('click', () => {
        this.revealDescribeContent();
      });
      return;
    }

    document.getElementById('btnPlay')?.addEventListener('click', () => this.playCurrentSound());

    this.stage.querySelectorAll('[data-answer]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (GameEngine.locked) return;
        this.handleAnswer(btn.dataset.answer, btn);
      });
    });
  },

  startWhackGame() {
    if (this.whackActive || GameEngine.locked) return;
    this.whackActive = true;

    const status = document.getElementById('whackStatus');
    const fill = document.getElementById('whackTimerFill');
    const playBtn = document.getElementById('btnPlay');
    if (playBtn) playBtn.disabled = true;

    this.whackTimeLeft = 10;
    if (status) status.textContent = '锤它！找到正确音标的那只地鼠！';
    if (fill) fill.style.width = '100%';

    this.scheduleWhackPop();
    const start = Date.now();
    const limit = this.whackTimeLeft * 1000;

    this.whackTickTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / limit) * 100);
      if (fill) fill.style.width = pct + '%';
    }, 50);

    this.whackEndTimer = setTimeout(() => {
      if (!GameEngine.locked) this.handleWhackTimeout();
    }, limit);
  },

  scheduleWhackPop() {
    if (!this.whackActive || GameEngine.locked) return;

    const delay = 400 + Math.random() * 500;
    this.whackPopTimer = setTimeout(() => {
      this.popRandomMole();
      this.scheduleWhackPop();
    }, delay);
  },

  popRandomMole() {
    const moles = [...this.stage.querySelectorAll('.whack-mole')];
    if (!moles.length) return;

    moles.forEach(m => m.classList.remove('mole-up', 'whack-smash'));

    const idx = Math.floor(Math.random() * moles.length);
    const mole = moles[idx];
    mole.classList.add('mole-up');

    clearTimeout(this.whackHideTimer);
    this.whackHideTimer = setTimeout(() => {
      mole.classList.remove('mole-up');
    }, 850 + Math.random() * 350);
  },

  handleWhackClick(btn) {
    if (!this.whackActive || GameEngine.locked) return;
    if (!btn.classList.contains('mole-up')) return;

    const r = GameEngine.getCurrentRound();
    const hole = btn.closest('.whack-hole');
    if (hole) hole.classList.add('hammer-strike');

    setTimeout(() => hole?.classList.remove('hammer-strike'), 300);

    if (btn.dataset.answer === r.answer) {
      this.stopWhackGame();
      btn.classList.add('correct', 'whack-smash');
      this.handleAnswer(r.answer, btn);
    } else {
      btn.classList.add('wrong', 'whack-smash');
      setTimeout(() => btn.classList.remove('mole-up', 'wrong', 'whack-smash'), 350);
      const status = document.getElementById('whackStatus');
      if (status) {
        status.textContent = '打错了！继续找～';
        setTimeout(() => {
          if (this.whackActive && status) status.textContent = '锤它！找到正确音标的那只地鼠！';
        }, 600);
      }
    }
  },

  handleWhackTimeout() {
    this.stopWhackGame();
    const r = GameEngine.getCurrentRound();
    const correct = this.stage?.querySelector(`.whack-mole[data-answer="${r?.answer}"]`);
    correct?.classList.add('mole-up', 'correct');
    this.handleAnswer('__timeout__', null);
  },

  stopWhackGame() {
    this.whackActive = false;
    clearTimeout(this.whackPopTimer);
    clearTimeout(this.whackHideTimer);
    clearTimeout(this.whackEndTimer);
    clearInterval(this.whackTickTimer);
    this.whackPopTimer = null;
    this.whackHideTimer = null;
    this.whackEndTimer = null;
    this.whackTickTimer = null;
    this.stage?.querySelectorAll('.whack-mole').forEach(m => {
      m.classList.remove('mole-up', 'whack-smash');
    });
  },

  playCurrentSound() {
    const r = GameEngine.getCurrentRound();
    if (r) speakPhoneme(r.targetKey, r.roundWord);
  },

  revealDescribeContent() {
    const panel = document.getElementById('describeReadyPanel');
    const content = document.getElementById('describeContent');
    if (panel) panel.hidden = true;
    if (content) {
      content.hidden = false;
      content.classList.add('describe-revealed');
    }

    document.getElementById('btnPlay')?.addEventListener('click', () => this.playCurrentSound());
    this.stage.querySelectorAll('[data-answer]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (GameEngine.locked) return;
        this.handleAnswer(btn.dataset.answer, btn);
      });
    });
  },

  handleAnswer(userAnswer, clickedBtn) {
    if (GameEngine.locked) return;
    GameEngine.locked = true;
    stopSpeech();
    this.clearSpeedTimer();
    this.stopWhackGame();

    const r = GameEngine.getCurrentRound();
    const isCorrect = GameEngine.checkAnswer(userAnswer);
    GameEngine.recordResult(isCorrect);

    this.stage.querySelectorAll('[data-answer]').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === r.answer) btn.classList.add('correct');
      else if (clickedBtn && btn === clickedBtn) btn.classList.add('wrong');
    });

    this.showFeedback(isCorrect, r);
    this.updateHUD();

    if (isCorrect) this.fireConfetti();

    this.autoAdvanceTimer = setTimeout(() => {
      if (GameEngine.nextRound()) {
        this.render();
      } else {
        this.showComplete();
      }
    }, isCorrect ? 1400 : 2000);
  },

  showFeedback(isCorrect, round) {
    if (!this.feedbackEl) return;
    const text = isCorrect
      ? (GameEngine.combo >= 3 ? `✓ 正确！ ${GameEngine.combo} 连击！` : '✓ 正确！')
      : `✗ 不对哦`;
    const sub = isCorrect ? '' : `正确答案：${GameEngine.formatAnswer(round)}`;

    this.feedbackEl.innerHTML = `
      <div class="burst-card ${isCorrect ? 'correct' : 'wrong'}">
        <div class="burst-main">${text}</div>
        ${sub ? `<div class="burst-sub">${sub}</div>` : ''}
        ${isCorrect && GameEngine.combo >= 2 ? `<div class="burst-points">+${100 + Math.min(GameEngine.combo - 1, 5) * 20} 分</div>` : ''}
      </div>
    `;
    this.feedbackEl.classList.add('show');
    setTimeout(() => {
      this.feedbackEl.classList.remove('show');
      this.feedbackEl.innerHTML = '';
    }, isCorrect ? 1000 : 1600);
  },

  startSpeedTimerIfNeeded() {
    const r = GameEngine.getCurrentRound();
    if (!r || r.type !== 'speed') return;

    const fill = document.getElementById('speedTimerFill');
    if (!fill) return;

    const limit = r.timeLimit * 1000;
    const start = Date.now();
    fill.style.width = '100%';

    this.speedInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / limit) * 100);
      fill.style.width = pct + '%';

      if (elapsed >= limit && !GameEngine.locked) {
        this.handleAnswer('__timeout__', null);
      }
    }, 50);
  },

  clearSpeedTimer() {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
      this.speedInterval = null;
    }
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  },

  showComplete() {
    stopSpeech();
    const accuracy = GameEngine.getAccuracy();
    const passed = accuracy >= 70;
    if (passed) markLessonComplete(GameEngine.lesson.id, accuracy);

    const milestone = GameEngine.lesson.milestone;
    const card = document.getElementById('resultCard');
    card.innerHTML = `
      <div class="complete-icon">${passed ? '🎉' : '💪'}</div>
      <h2>${passed ? '闯关成功！' : '再试一次！'}</h2>
      <div class="complete-stats">
        <div class="stat-item"><span class="stat-val">${GameEngine.score}</span><span class="stat-lbl">总分</span></div>
        <div class="stat-item"><span class="stat-val">${accuracy}%</span><span class="stat-lbl">正确率</span></div>
        <div class="stat-item"><span class="stat-val">${GameEngine.maxCombo}</span><span class="stat-lbl">最高连击</span></div>
      </div>
      ${milestone && passed ? `<div class="milestone-badge">${milestone}</div>` : ''}
      <div class="complete-actions">
        <button class="btn btn-secondary" id="btnRetry">再玩一次</button>
        <button class="btn btn-primary" id="btnHome">返回首页</button>
        ${GameEngine.lesson.id < 7 ? `<button class="btn btn-accent" id="btnNextLevel">下一关 →</button>` : ''}
      </div>
    `;

    this.overlayEl.hidden = false;
    if (passed) this.fireConfetti(true);

    document.getElementById('btnRetry')?.addEventListener('click', () => {
      this.overlayEl.hidden = true;
      GameEngine.init(GameEngine.lesson.id);
      this.render();
    });
    document.getElementById('btnHome')?.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    document.getElementById('btnNextLevel')?.addEventListener('click', () => {
      window.location.href = `lesson.html?id=${GameEngine.lesson.id + 1}`;
    });
  },

  fireConfetti(big = false) {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#38bdf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c'];
    const count = big ? 120 : 40;
    const particles = Array.from({ length: count }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * (big ? 14 : 10),
      vy: Math.random() * -8 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
      life: 1
    }));

    let frame = 0;
    const maxFrames = big ? 90 : 50;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.life -= 0.015;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1;
      frame++;
      if (frame < maxFrames) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
  }
};

function initLessonPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10) || 1;
  if (!GameEngine.init(id)) {
    document.body.innerHTML = '<p style="text-align:center;padding:3rem;">关卡不存在</p>';
    return;
  }
  document.title = `第${id}关 - 48音标大挑战`;
  GameUI.init();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'lesson') initLessonPage();
});
