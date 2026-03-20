/**
 * study600.js — Ôn tập 600 câu study mode
 * Handles: chapter modal, data loading, question rendering, answer logic,
 * explanation display, navigation, and localStorage progress.
 */

// ===== CHAPTER DEFINITIONS =====
const CHAPTERS = [
  {
    id: 1,
    title: 'Chương I',
    subtitle: 'Quy định chung và quy tắc giao thông đường bộ',
    range: [1, 180],
    count: 180,
    icon: '📚',
    color: '#4f46e5',
    colorBg: 'rgba(79,70,229,0.1)',
    desc: 'Luật giao thông, quy tắc đường bộ, quyền và nghĩa vụ người tham gia giao thông'
  },
  {
    id: 2,
    title: 'Chương II',
    subtitle: 'Văn hóa giao thông và đạo đức người lái xe',
    range: [181, 205],
    count: 25,
    icon: '🤝',
    color: '#0891b2',
    colorBg: 'rgba(8,145,178,0.1)',
    desc: 'Văn hóa ứng xử, đạo đức nghề lái xe, trách nhiệm xã hội khi tham gia giao thông'
  },
  {
    id: 3,
    title: 'Chương III',
    subtitle: 'Kỹ thuật lái xe',
    range: [206, 263],
    count: 58,
    icon: '🚗',
    color: '#16a34a',
    colorBg: 'rgba(22,163,74,0.1)',
    desc: 'Kỹ năng điều khiển xe, xử lý tình huống kỹ thuật và các thao tác cơ bản'
  },
  {
    id: 4,
    title: 'Chương IV',
    subtitle: 'Cấu tạo và sửa chữa',
    range: [264, 300],
    count: 37,
    icon: '🔧',
    color: '#ea580c',
    colorBg: 'rgba(234,88,12,0.1)',
    desc: 'Cấu tạo xe, hệ thống cơ khí, nhận biết và xử lý sự cố kỹ thuật cơ bản'
  },
  {
    id: 5,
    title: 'Chương V',
    subtitle: 'Báo hiệu đường bộ',
    range: [301, 485],
    count: 185,
    icon: '🚦',
    color: '#ca8a04',
    colorBg: 'rgba(202,138,4,0.1)',
    desc: 'Hệ thống biển báo, tín hiệu đèn, vạch kẻ đường và các báo hiệu giao thông'
  },
  {
    id: 6,
    title: 'Chương VI',
    subtitle: 'Sa hình và xử lý tình huống',
    range: [486, 600],
    count: 115,
    icon: '🗺️',
    color: '#dc2626',
    colorBg: 'rgba(220,38,38,0.1)',
    desc: 'Các tình huống sa hình thực tế, cách xử lý khi gặp các trường hợp phức tạp trên đường'
  }
];

// ===== LOCAL STORAGE HELPERS =====
const LS_KEY = (chId) => `gplx_study600_ch${chId}`;

function loadProgress(chapterId) {
  try {
    const raw = localStorage.getItem(LS_KEY(chapterId));
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { answers: {}, lastQuestion: 1 };
}

function saveProgress(chapterId, progress) {
  try {
    localStorage.setItem(LS_KEY(chapterId), JSON.stringify(progress));
  } catch (e) {}
}

function getChapterStats(chapterId, chapter) {
  const progress = loadProgress(chapterId);
  const total = chapter.count;
  const answered = Object.keys(progress.answers).length;
  const correct = Object.values(progress.answers).filter(a => a.isCorrect).length;
  return { total, answered, correct, wrong: answered - correct, lastQuestion: progress.lastQuestion || 1 };
}

// ===== IMAGE RESOLUTION =====
function getImageSrc(imageName) {
  // Try images600 first (for questions with 600-set images), then fallback
  return `images/images600/${imageName}`;
}

// ===== DATA LOADING =====
let allQuestions = null;
let allExplanations = null;

async function loadData() {
  if (allQuestions && allExplanations) return true;
  try {
    const [qRes, eRes] = await Promise.all([
      fetch('questions600.json'),
      fetch('questions600explain.json')
    ]);
    allQuestions = await qRes.json();
    allExplanations = await eRes.json();
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
  // Overlay
  modalOverlayEl = document.createElement('div');
  modalOverlayEl.className = 's600-overlay';
  modalOverlayEl.addEventListener('click', (e) => {
    if (e.target === modalOverlayEl) closeChapterModal();
  });

  // Modal box
  modalEl = document.createElement('div');
  modalEl.className = 's600-modal';

  // Header
  modalEl.innerHTML = `
    <div class="s600-modal-header">
      <div>
        <h2 class="s600-modal-title">📖 Ôn Tập 600 Câu</h2>
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
  grid.innerHTML = CHAPTERS.map(ch => {
    const stats = getChapterStats(ch.id, ch);
    const pct = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;
    const correctPct = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
    return `
      <div class="s600-chapter-card" onclick="startChapter(${ch.id})" style="--ch-color: ${ch.color}; --ch-bg: ${ch.colorBg};">
        <div class="s600-ch-top">
          <span class="s600-ch-icon" style="background:${ch.colorBg}; color:${ch.color};">${ch.icon}</span>
          <div class="s600-ch-info">
            <div class="s600-ch-title">${ch.title}</div>
            <div class="s600-ch-sub">${ch.subtitle}</div>
          </div>
        </div>
        <div class="s600-ch-desc">${ch.desc}</div>
        <div class="s600-ch-meta">
          <span class="s600-ch-range">Câu ${ch.range[0]}–${ch.range[1]}</span>
          <span class="s600-ch-count">${ch.count} câu</span>
        </div>
        <div class="s600-ch-progress-bar">
          <div class="s600-ch-progress-fill" style="width:${pct}%; background:${ch.color};"></div>
        </div>
        <div class="s600-ch-stats">
          ${stats.answered > 0
            ? `<span class="s600-stat-done">✓ ${stats.correct} đúng</span>
               ${stats.wrong > 0 ? `<span class="s600-stat-wrong">✗ ${stats.wrong} sai</span>` : ''}
               <span class="s600-stat-pct" style="color:${ch.color}">${pct}% hoàn thành</span>`
            : `<span class="s600-stat-new">Chưa bắt đầu</span>`
          }
        </div>
        <button class="s600-ch-btn" style="background:${ch.color};">
          ${stats.answered > 0 ? '▶ Tiếp tục học' : '▶ Bắt đầu học'}
        </button>
      </div>
    `;
  }).join('');
}

async function startChapter(chapterId) {
  closeChapterModal();
  // Navigate to study page
  window.location.href = `study600.html?chapter=${chapterId}`;
}

// ===== STUDY PAGE LOGIC =====
// These functions run only on study600.html

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

let _studyState = null;

function renderStudyLayout(chapter, questions, explMap, progress, currentIdx) {
  _studyState = { chapter, questions, explMap, progress, currentIdx };

  const root = document.getElementById('s600StudyRoot');
  if (!root) return;

  root.innerHTML = `
    <div class="s600-study-wrap">
      <!-- TOP BAR -->
      <div class="s600-top-bar">
        <a href="${getReferrerMenu()}" class="s600-back-btn">← Quay lại</a>
        <div class="s600-top-center">
          <span class="s600-label">Ôn tập</span>
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
  const menus = ['class-b-menu.html','class-a-menu.html','class-a1-menu.html','class-c-menu.html','class-c1-menu.html'];
  for (const m of menus) {
    if (ref && ref.includes(m)) return m;
  }
  return 'class-b-menu.html';
}

function renderGrid() {
  const { questions, progress, currentIdx } = _studyState;
  const grid = document.getElementById('s600Grid');
  if (!grid) return;

  grid.innerHTML = questions.map((q, idx) => {
    const ans = progress.answers[q.id];
    let cls = 's600-grid-btn';
    if (idx === currentIdx) cls += ' s600-grid-current';
    else if (ans) cls += ans.isCorrect ? ' s600-grid-correct' : ' s600-grid-wrong';
    else if (q.is_critical) cls += ' s600-grid-critical';

    return `<button class="${cls}" onclick="jumpToQuestion(${idx})" title="Câu ${q.id}">${q.id}</button>`;
  }).join('');

  // Scroll current into view
  const currentBtn = grid.querySelector('.s600-grid-current');
  if (currentBtn) {
    currentBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Update progress text
  const answered = Object.keys(progress.answers).length;
  const pEl = document.getElementById('s600ProgressText');
  if (pEl) pEl.textContent = `Câu đã làm: ${answered}/${questions.length} câu`;
}

function renderQuestion() {
  const { chapter, questions, explMap, progress, currentIdx } = _studyState;
  const q = questions[currentIdx];
  if (!q) return;

  const ans = progress.answers[q.id];
  const area = document.getElementById('s600QuestionArea');
  if (!area) return;

  const imgHtml = q.image
    ? `<div class="s600-q-img-wrap"><img src="${getImageSrc(q.image)}" alt="Hình câu ${q.id}" onerror="this.src='images/q${q.id}.webp'; this.onerror=null;" loading="lazy"></div>`
    : '';

  // Numbered answer options: 1. 2. 3. 4.
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

  // Explanation with id for auto-scroll
  const explHtml = ans
    ? `<div class="s600-explanation ${ans.isCorrect ? 's600-expl-correct' : 's600-expl-wrong'}" id="s600Explanation">
        <div class="s600-expl-header">${ans.isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng'}</div>
        <div class="s600-expl-body">${explMap[q.id] || 'Không có giải thích.'}</div>
       </div>`
    : '';

  // Critical badge (separate pill)
  const criticalBadge = q.is_critical
    ? `<span class="s600-critical-badge">⚠️ Điểm liệt</span>`
    : '';

  area.innerHTML = `
    <div class="s600-q-header">
      <div class="s600-q-header-left">
        <span class="s600-q-index">Câu ${currentIdx + 1} / ${questions.length}</span>
        ${criticalBadge}
      </div>
    </div>
    <div class="s600-q-text">
      <span class="s600-q-num">Câu ${currentIdx + 1}:</span> ${q.question}
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
}

function selectAnswer(optId) {
  const { questions, progress, currentIdx, chapter } = _studyState;
  const q = questions[currentIdx];
  if (!q) return;

  const isCorrect = optId === q.correct_answer;
  progress.answers[q.id] = { selectedId: optId, isCorrect };
  progress.lastQuestion = q.id;
  saveProgress(chapter.id, progress);

  renderQuestion();
  renderGrid();

  // Auto-scroll to explanation after a short delay
  setTimeout(() => {
    const expl = document.getElementById('s600Explanation');
    if (expl) {
      expl.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Changed to center for better visibility
    }
  }, 150); // Slightly faster delay
}

function jumpToQuestion(idx) {
  _studyState.currentIdx = idx;
  _studyState.progress.lastQuestion = _studyState.questions[idx]?.id;
  saveProgress(_studyState.chapter.id, _studyState.progress);
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
  // If on study600.html, init study page
  if (document.getElementById('s600StudyRoot')) {
    const chParam = parseInt(getQueryParam('chapter') || '1');
    const chapter = CHAPTERS.find(c => c.id === chParam);
    if (!chapter) return;

    (async () => {
      const ok = await loadData();
      if (!ok) {
        document.getElementById('s600StudyRoot').innerHTML = '<p style="text-align:center;padding:40px;color:#ef4444">Không tải được dữ liệu. Vui lòng thử lại.</p>';
        return;
      }

      const questions = allQuestions.filter(q => q.id >= chapter.range[0] && q.id <= chapter.range[1]);
      const explMap = {};
      allExplanations.forEach(e => { explMap[e.id] = e.explanation; });

      const progress = loadProgress(chParam);
      let currentIdx = 0;

      if (progress.lastQuestion) {
        const restoreIdx = questions.findIndex(q => q.id === progress.lastQuestion);
        if (restoreIdx >= 0) currentIdx = restoreIdx;
      }

      // Update page title
      document.title = `${chapter.title}: ${chapter.subtitle} | thigplx.site`;

      renderStudyLayout(chapter, questions, explMap, progress, currentIdx);
      initHotkeys();
    })();
  }
});

function initHotkeys() {
  document.addEventListener('keydown', (e) => {
    // Only handle if no modal is open
    if (modalOverlayEl && modalOverlayEl.classList.contains('s600-active')) return;
    if (!_studyState) return;

    // Arrow keys for navigation
    if (e.key === 'ArrowRight') {
      nextQuestion();
    } else if (e.key === 'ArrowLeft') {
      prevQuestion();
    }

    // Number keys 1-4 for answer selection
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= 4) {
      const q = _studyState.questions[_studyState.currentIdx];
      if (q && q.options[num - 1]) {
        selectAnswer(q.options[num - 1].id);
      }
    }
  });
}
