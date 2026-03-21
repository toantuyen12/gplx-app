/**
 * questionMode.js — Factory for managing license-specific question sets (A1, A2, etc.)
 */

// ===== A1/A LICENSE CONFIGURATION =====
const CHAPTERS_A1 = [
  { id: 1, name: 'Quy tắc giao thông', questionIds: Array.from({ length: 100 }, (_, i) => i + 1) },
  { id: 2, name: 'Văn hóa & Đạo đức', questionIds: [181, 187, 188, 192, 193, 194, 195, 199, 203, 205] },
  { id: 3, name: 'Kỹ thuật lái xe', questionIds: [211, 214, 215, 217, 219, 221, 224, 230, 237, 239, 243, 245, 248, 258, 260] },
  { id: 4, name: 'Biển báo đường bộ', questionIds: Array.from({ length: 90 }, (_, i) => 301 + i) },
  { id: 5, name: 'Sa hình & Xử lý', questionIds: Array.from({ length: 35 }, (_, i) => i + 486) }
];

const CRITICAL_IDS = [19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72];

/**
 * createQuestionManager(mode, questions600, questions600explain)
 * @param {string} mode - 'a1' or 'default' (600)
 */
function createQuestionManager(mode, questions600 = [], questions600explain = []) {
  const isA1 = mode === 'a1';
  
  // 1. Setup Data Source
  let mapping = [];
  let chapters = [];
  
  if (isA1) {
    let newIdCounter = 1;
    CHAPTERS_A1.forEach(ch => {
      const chapterQuestions = ch.questionIds.map(origId => ({
        newId: newIdCounter++,
        originalId: origId,
        chapterId: ch.id
      }));
      mapping = mapping.concat(chapterQuestions);
      
      chapters.push({
...ch,
        title: `Chương ${Romanize(ch.id)}`,
        subtitle: ch.name,
        count: ch.questionIds.length,
        range: [chapterQuestions[0].newId, chapterQuestions[chapterQuestions.length - 1].newId]
      });
    });
  } else {
    // Default 600 mode
    chapters = [
      { id: 1, title: 'Chương I', subtitle: 'Quy định chung và quy tắc giao thông đường bộ', range: [1, 180], count: 180 },
      { id: 2, title: 'Chương II', subtitle: 'Văn hóa giao thông và đạo đức người lái xe', range: [181, 205], count: 25 },
      { id: 3, title: 'Chương III', subtitle: 'Kỹ thuật lái xe', range: [206, 263], count: 58 },
      { id: 4, title: 'Chương IV', subtitle: 'Cấu tạo và sửa chữa', range: [264, 300], count: 37 },
      { id: 5, title: 'Chương V', subtitle: 'Báo hiệu đường bộ', range: [301, 485], count: 185 },
      { id: 6, title: 'Chương VI', subtitle: 'Sa hình và xử lý tình huống', range: [486, 600], count: 115 }
    ];
    // For 600, mapping is 1:1
    for (let i = 1; i <= 600; i++) {
        const ch = chapters.find(c => i >= c.range[0] && i <= c.range[1]);
        mapping.push({ newId: i, originalId: i, chapterId: ch ? ch.id : 1 });
    }
  }

  // 2. Precompute Lookup Maps for O(1) access
  const questionsMap = new Map();
  questions600.forEach(q => questionsMap.set(q.id, q));

  const explainMap = new Map();
  questions600explain.forEach(e => {
    explainMap.set(e.id, e.explanation);
  });

  const mappingMap = new Map();
  mapping.forEach(m => mappingMap.set(m.newId, m));

  const criticalOriginalSet = new Set(CRITICAL_IDS);
  const criticalNewIdSet = new Set(
    mapping.filter(m => criticalOriginalSet.has(m.originalId)).map(m => m.newId)
  );

  // 3. Return Manager API
  return {
    mode,
    total: mapping.length,
    chapters: chapters,
    
    getQuestion(newId) {
      const m = mappingMap.get(newId);
      if (!m) return null;
      
      const qData = questionsMap.get(m.originalId);
      if (!qData) return null;

      const explanation = explainMap.get(m.originalId);
      if (!explanation) {
        console.warn("Missing explanation for question:", m.originalId);
      }

      // Wrap data to include mode-specific metadata
      return {
        ...qData,
        explanation: explanation || "",
        displayId: m.newId,
        newId: m.newId,
        chapterId: m.chapterId,
        is_critical: criticalOriginalSet.has(m.originalId),
        isCritical: criticalOriginalSet.has(m.originalId)
      };
    },

    isCritical(newId) {
      return criticalNewIdSet.has(newId);
    },

    getQuestionsByChapter(chapterId) {
      return mapping.filter(m => m.chapterId === chapterId).map(m => m.newId);
    },

    getMapping(newId) {
        return mappingMap.get(newId) || null;
    }
  };
}

function Romanize(num) {
  const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = '';
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
