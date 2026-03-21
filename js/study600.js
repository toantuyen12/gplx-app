/**
 * study600.js — Ôn tập GPLX study mode
 * Supports 600 questions (default) and 250 questions (A1/A)
 */

let _manager = null;
let _studyState = null;

// ===== LOCAL STORAGE HELPERS =====
const LS_KEY = (mode, chId) => `gplx_study_${mode}_ch${chId}`;

function loadProgress(mode, chapterId) {
  try {
    const raw = localStorage.getItem(LS_KEY(mode, chapterId));
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { answers: {}, lastQuestion: 1 };
}

function saveProgress(mode, chapterId, progress) {
  try {
    localStorage.setItem(LS_KEY(mode, chapterId), JSON.stringify(progress));
  } catch (e) {}
}

function getChapterStats(chapterId, chapter) {
  const progress = loadProgress(_manager.mode, chapterId);
  const total = chapter.count;
  const answered = Object.keys(progress.answers).length;
  const correct = Object.values(progress.answers).filter(a => a.isCorrect).length;
  return { total, answered, correct, wrong: answered - correct, lastQuestion: progress.lastQuestion || 1 };
}

// ===== IMAGE RESOLUTION & PRELOADING =====
function getImageSrc(imageName) {
  return `images/images600/${imageName}`;
}

function preloadNextQuestion(currentIdx) {
  const nextIdx = currentIdx + 1;
  if (nextIdx < _studyState.questions.length) {
    const nextQ = _manager.getQuestion(_studyState.questions[nextIdx]);
    if (nextQ && nextQ.image) {
      const img = new Image();
      img.src = getImageSrc(nextQ.image);
    }
  }
}

// ===== DATA LOADING =====
let allQuestionsRaw = null;
let allExplanationsRaw = null;

async function loadData() {
  if (allQuestionsRaw && allExplanationsRaw) return true;
  try {
    const [qRes, eRes] = await Promise.all([
      fetch('questions600.json'),
      fetch('questions600explain.json')
    ]);
    allQuestionsRaw = await qRes.json();
    allExplanationsRaw = await eRes.json();
    return true;
  } catch (err) {
    console.error('Failed to load study data:', err);
    return false;
  }
}

// ===== CHAPTER MODAL =====
let modalEl = null;
let modalOverlayEl = null;

function openChapterModal() {
  if (!modalEl) buildModal();
  updateModalProgress();
  modalOverlayEl.classList.add('s600-active');
  document.body.style.overflow = 'hidden';
}

function closeChapterModal() {
  if (modalOverlayEl) {
    modalOverlayEl.classList.remove('s600-active');
    document.body.style.overflow = '';
  }
}

function buildModal() {
  modalOverlayEl = document.createElement('div');
  modalOverlayEl.className = 's600-overlay';
  modalOverlayEl.addEventListener('click', (e) => {
    if (e.target === modalOverlayEl) closeChapterModal();
  });

  modalEl = document.createElement('div');
  modalEl.className = 's600-modal';

  const title = _manager.mode === 'a1' ? '📖 Ôn Tập 250 Câu (A1/A)' : '📖 Ôn Tập 600 Câu';
  modalEl.innerHTML = `
    <div class="s600-modal-header">
      <div>
        <h2 class="s600-modal-title">${title}</h2>
        <p class="s600-modal-subtitle">Chọn chương để bắt đầu học</p>
      </div>
      <button class="s600-close-btn" onclick="closeChapterModal()">✕</button>
    </div>
    <div class="s600-chapters-grid" id="s600ChaptersGrid"></div>
  `;

  modalOverlayEl.appendChild(modalEl);
  document.body.appendChild(modalOverlayEl);
}

function updateModalProgress() {
  const grid = document.getElementById('s600ChaptersGrid');
  if (!grid) return;
  
  grid.innerHTML = _manager.chapters.map(ch => {
    const stats = getChapterStats(ch.id, ch);
    const pct = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;
    
    // Default colors if not provided in config
    const color = ch.color || '#4f46e5';
    const colorBg = ch.colorBg || 'rgba(79,70,229,0.1)';
    const icon = ch.icon || '📚';
    const desc = ch.desc || ch.subtitle;

    return `
      <div class="s600-chapter-card" onclick="startChapter(${ch.id})" style="--ch-color: ${color}; --ch-bg: ${colorBg};">
        <div class="s600-ch-top">
          <span class="s600-ch-icon" style="background:${colorBg}; color:${color};">${icon}</span>
          <div class="s600-ch-info">
            <div class="s600-ch-title">${ch.title}</div>
            <div class="s600-ch-sub">${ch.subtitle}</div>
          </div>
        </div>
        <div class="s600-ch-desc">${desc}</div>
        <div class="s600-ch-meta">
          <span class="s600-ch-range">Câu ${ch.range[0]}–${ch.range[1]}</span>
          <span class="s600-ch-count">${ch.count} câu</span>
        </div>
        <div class="s600-ch-progress-bar">
          <div class="s600-ch-progress-fill" style="width:${pct}%; background:${color};"></div>
        </div>
        <div class="s600-ch-stats">
          ${stats.answered > 0
            ? `<span class="s600-stat-done">✓ ${stats.correct} đúng</span>
               ${stats.wrong > 0 ? `<span class="s600-stat-wrong">✗ ${stats.wrong} sai</span>` : ''}
               <span class="s600-stat-pct" style="color:${color}">${pct}% hoàn thành</span>`
            : `<span class="s600-stat-new">Chưa bắt đầu</span>`
          }
        </div>
        <button class="s600-ch-btn" style="background:${color};">
          ${stats.answered > 0 ? '▶ Tiếp tục học' : '▶ Bắt đầu học'}
        </button>
      </div>
    `;
  }).join('');
}

function startChapter(chapterId) {
  closeChapterModal();
  window.location.href = `study600.html?mode=${_manager.mode}&chapter=${chapterId}`;
}

// ===== STUDY PAGE LOGIC =====

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function updateURL(mode, chapterId, questionId) {
    const url = new URL(window.location);
    url.searchParams.set('mode', mode);
    url.searchParams.set('chapter', chapterId);
    url.searchParams.set('question', questionId);
    window.history.replaceState({}, '', url);
}

function renderStudyLayout(chapter, questions, progress, currentIdx) {
  _studyState = { chapter, questions, progress, currentIdx };

  const root = document.getElementById('s600StudyRoot');
  if (!root) return;

  const modeTitle = _manager.mode === 'a1' ? 'Ôn tập 250 câu' : 'Ôn tập 600 câu';

  root.innerHTML = `
    <div class="s600-study-wrap">
      <!-- TOP BAR -->
      <div class="s600-top-bar">
        <a href="${getReferrerMenu()}" class="s600-back-btn">← Quay lại</a>
        <div class="s600-top-center">
          <span class="s600-label">${modeTitle}</span>
          <span class="s600-chapter-name">${chapter.title}: ${chapter.subtitle}</span>
        </div>
        <div class="s600-top-right">
          <span class="s600-progress-text" id="s600ProgressText"></span>
        </div>
      </div>

      <!-- MAIN LAYOUT -->
      <div class="s600-layout">
        <!-- LEFT: Question Grid -->
        <div class="s600-left-panel">
          <div class="s600-panel-title">Danh sách câu hỏi</div>
          <div class="s600-grid" id="s600Grid"></div>
          <div class="s600-legend">
            <span class="s600-legend-item"><span class="s600-dot dot-current"></span>Hiện tại</span>
            <span class="s600-legend-item"><span class="s600-dot dot-correct"></span>Đúng</span>
            <span class="s600-legend-item"><span class="s600-dot dot-wrong"></span>Sai</span>
            <span class="s600-legend-item"><span class="s600-dot dot-critical"></span>Điểm liệt</span>
          </div>
        </div>

        <!-- RIGHT: Question Content -->
        <div class="s600-right-panel">
          <div id="s600QuestionArea"></div>
        </div>
      </div>
    </div>
  `;

  renderGrid();
  renderQuestion();
}

function getReferrerMenu() {
  const ref = document.referrer;
  const menus = ['class-a1-menu.html','class-a-menu.html','class-b-menu.html','class-c-menu.html','class-c1-menu.html'];
  for (const m of menus) {
    if (ref && ref.includes(m)) return m;
  }
  return _manager.mode === 'a1' ? 'class-a1-menu.html' : 'class-b-menu.html';
}

function renderGrid() {
  const { questions, progress, currentIdx } = _studyState;
  const grid = document.getElementById('s600Grid');
  if (!grid) return;

  grid.innerHTML = questions.map((qId, idx) => {
    const q = _manager.getQuestion(qId);
    const ans = progress.answers[qId];
    let cls = 's600-grid-btn';
    if (idx === currentIdx) cls += ' s600-grid-current';
    else if (ans) cls += ans.isCorrect ? ' s600-grid-correct' : ' s600-grid-wrong';
    
    if (q && q.is_critical) {
      cls += ' s600-grid-critical';
    }

    return `<button class="${cls}" onclick="jumpToQuestion(${idx})" title="Câu ${qId} ${q?.is_critical ? '(Điểm liệt)' : ''}">${qId}</button>`;
  }).join('');

  const currentBtn = grid.querySelector('.s600-grid-current');
  if (currentBtn) {
    currentBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const answered = Object.keys(progress.answers).length;
  const pEl = document.getElementById('s600ProgressText');
  if (pEl) pEl.textContent = `Câu đã làm: ${answered}/${questions.length} câu`;
}

function renderQuestion() {
  const { chapter, questions, progress, currentIdx } = _studyState;
  const qId = questions[currentIdx];
  const q = _manager.getQuestion(qId);
  if (!q) return;

  const ans = progress.answers[qId];
  const area = document.getElementById('s600QuestionArea');
  if (!area) return;

  const imgHtml = q.image
    ? `<div class="s600-q-img-wrap"><img src="${getImageSrc(q.image)}" alt="Hình câu ${q.displayId}" onerror="this.src='images/q${q.id}.webp'; this.onerror=null;" loading="lazy"></div>`
    : '';

  const optionsHtml = q.options.map((opt, i) => {
    let cls = 's600-ans-btn';
    if (ans) {
      if (opt.id === q.correct_answer) cls += ' s600-ans-correct';
      else if (opt.id === ans.selectedId && !ans.isCorrect) cls += ' s600-ans-wrong';
    }
    return `<button class="${cls}" data-opt="${opt.id}" onclick="selectAnswer(${opt.id})">
      <span class="s600-ans-num">${i + 1}.</span>
      <span class="s600-ans-text">${opt.text}</span>
    </button>`;
  }).join('');

  let explHtml = '';
  if (ans) {
    let explClass = ans.isCorrect ? 's600-expl-correct' : 's600-expl-wrong';
    let title = ans.isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng';
    
    if (q.is_critical) {
      if (ans.isCorrect) {
        explClass = 's600-expl-critical-correct';
        title = '✅ Đúng (Câu điểm liệt)';
      } else {
        explClass = 's600-expl-critical-wrong';
        title = '⚠️ Sai câu điểm liệt';
      }
    }

    explHtml = `<div class="s600-explanation ${explClass}" id="s600Explanation">
        <div class="s600-expl-header">${title}</div>
        ${q.is_critical && !ans.isCorrect 
          ? `<div style="font-weight:700; color:#e11d48; margin-bottom:10px; font-size:15px;">Đây là câu điểm liệt. Nếu sai câu này trong bài thi thật, bạn sẽ bị trượt ngay.</div>` 
          : ''
        }
        <div class="s600-expl-body">${q.explanation || 'Không có giải thích.'}</div>
       </div>`;
  }

  const criticalBadge = q.is_critical ? `<span class="s600-critical-badge">⚠️ CÂU ĐIỂM LIỆT</span>` : '';

  area.innerHTML = `
    <div class="s600-q-header">
      <div class="s600-q-header-left">
        <span class="s600-q-index">Câu ${q.displayId} / ${_manager.total}</span>
        ${criticalBadge}
      </div>
    </div>
    <div class="s600-q-text ${q.is_critical ? 's600-q-text-critical' : ''}">
      <span class="s600-q-num">Câu ${q.displayId}:</span> ${q.question}
    </div>
    ${imgHtml}
    <div class="s600-answers">${optionsHtml}</div>
    ${explHtml}
    <div class="s600-nav-btns">
      <button class="s600-nav-btn" onclick="prevQuestion()" ${currentIdx === 0 ? 'disabled' : ''}>
        ← Câu trước
      </button>
      <button class="s600-nav-btn s600-nav-next" onclick="nextQuestion()" ${currentIdx === questions.length - 1 ? 'disabled' : ''}>
        Câu tiếp →
      </button>
    </div>
  `;

  updateURL(_manager.mode, chapter.id, q.displayId);
  preloadNextQuestion(currentIdx);
}

function selectAnswer(optId) {
  const { questions, progress, currentIdx, chapter } = _studyState;
  const qId = questions[currentIdx];
  const q = _manager.getQuestion(qId);
  if (!q) return;

  const isCorrect = optId === q.correct_answer;
  progress.answers[qId] = { selectedId: optId, isCorrect };
  progress.lastQuestion = qId;
  saveProgress(_manager.mode, chapter.id, progress);

  renderQuestion();
  renderGrid();

  setTimeout(() => {
    const expl = document.getElementById('s600Explanation');
    if (expl) expl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
}

function jumpToQuestion(idx) {
  _studyState.currentIdx = idx;
  const qId = _studyState.questions[idx];
  _studyState.progress.lastQuestion = qId;
  saveProgress(_manager.mode, _studyState.chapter.id, _studyState.progress);
  renderQuestion();
  renderGrid();
}

function prevQuestion() {
  if (_studyState.currentIdx > 0) jumpToQuestion(_studyState.currentIdx - 1);
}

function nextQuestion() {
  if (_studyState.currentIdx < _studyState.questions.length - 1) jumpToQuestion(_studyState.currentIdx + 1);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('s600StudyRoot')) {
    const modeParam = getQueryParam('mode') || 'default';
    const chParam = parseInt(getQueryParam('chapter') || '1');
    const qParam = parseInt(getQueryParam('question'));

    (async () => {
      const ok = await loadData();
      if (!ok) {
        document.getElementById('s600StudyRoot').innerHTML = '<p style="text-align:center;padding:40px;color:#ef4444">Không tải được dữ liệu. Vui lòng thử lại.</p>';
        return;
      }

      // Initialize Manager
      _manager = createQuestionManager(modeParam, allQuestionsRaw, allExplanationsRaw);
      
      const chapter = _manager.chapters.find(c => c.id === chParam) || _manager.chapters[0];
      const questions = _manager.getQuestionsByChapter(chapter.id);
      
      const progress = loadProgress(_manager.mode, chapter.id);
      let currentIdx = 0;

      // 1. Check Deep Link Question
      if (qParam && qParam >= 1 && qParam <= _manager.total) {
          const foundIdx = questions.indexOf(qParam);
          if (foundIdx >= 0) {
              currentIdx = foundIdx;
          } else {
              // If question is in another chapter, we could redirect, or just find it.
              // For simplicity, if it's in the current range, use it.
              // If not, we found it by calling getMapping
              const m = _manager.getMapping(qParam);
              if (m && m.chapterId !== chapter.id) {
                  window.location.href = `study600.html?mode=${_manager.mode}&chapter=${m.chapterId}&question=${qParam}`;
                  return;
              }
          }
      } 
      // 2. Fallback to Progress
      else if (progress.lastQuestion) {
        const restoreIdx = questions.indexOf(progress.lastQuestion);
        if (restoreIdx >= 0) currentIdx = restoreIdx;
      }

      document.title = `${chapter.title}: ${chapter.subtitle} | thigplx.site`;
      renderStudyLayout(chapter, questions, progress, currentIdx);
      initHotkeys();
    })();
  }
});

function initHotkeys() {
  document.addEventListener('keydown', (e) => {
    if (modalOverlayEl && modalOverlayEl.classList.contains('s600-active')) return;
    if (!_studyState) return;

    if (e.key === 'ArrowRight') nextQuestion();
    else if (e.key === 'ArrowLeft') prevQuestion();

    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= 4) {
      const qId = _studyState.questions[_studyState.currentIdx];
      const q = _manager.getQuestion(qId);
      if (q && q.options[num - 1]) selectAnswer(q.options[num - 1].id);
    }
  });
}
