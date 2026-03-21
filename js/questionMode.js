/**
 * questionMode.js — Factory for managing license-specific question sets (A1, A2, etc.)
 */

// ===== A1/A LICENSE CONFIGURATION =====
const CHAPTERS_A1 = [
  { id: 1, name: 'Quy tắc giao thông đường bộ', originalChapterId: 1, questionIds: Array.from({ length: 100 }, (_, i) => i + 1) },
  { id: 2, name: 'Văn hóa giao thông và đạo đức người lái xe', originalChapterId: 2, questionIds: [181, 187, 188, 192, 193, 194, 195, 199, 203, 205] },
  { id: 3, name: 'Kỹ thuật lái xe', originalChapterId: 3, questionIds: [211, 214, 215, 217, 219, 221, 224, 230, 237, 239, 243, 245, 248, 258, 260] },
  { id: 4, name: 'Hệ thống biển báo hiệu đường bộ', originalChapterId: 5, questionIds: Array.from({ length: 90 }, (_, i) => 301 + i) },
  { id: 5, name: 'Sa hình và xử lý tình huống giao thông', originalChapterId: 6, questionIds: Array.from({ length: 35 }, (_, i) => i + 486) }
];

// ===== CHAPTER METADATA (UI/UX) =====
const CHAPTER_META = {
  1: {
    icon: "📘", color: "#3B82F6", name: "Quy định chung và quy tắc giao thông đường bộ",
    description: "Nắm vững luật và quy tắc cơ bản khi tham gia giao thông."
  },
  2: {
    icon: "🧠", color: "#10B981", name: "Văn hóa giao thông và đạo đức người lái xe",
    description: "Trách nhiệm, ý thức và văn hóa ứng xử văn minh của người lái xe."
  },
  3: {
    icon: "🚗", color: "#F59E0B", name: "Kỹ thuật lái xe",
    description: "Kỹ năng điều khiển phương tiện an toàn và xử lý tình huống."
  },
  4: {
    icon: "⚙️", color: "#EF4444", name: "Cấu tạo và sửa chữa",
    description: "Hiểu cấu tạo xe cơ bản và các kỹ năng sửa chữa bảo dưỡng đơn giản."
  },
  5: {
    icon: "🚦", color: "#8B5CF6", name: "Báo hiệu đường bộ",
    description: "Nhận biết hệ thống biển báo, vạch kẻ đường và hiệu lệnh giao thông."
  },
  6: {
    icon: "🛣️", color: "#06B6D4", name: "Giải thế sa hình và kỹ năng xử lý tình huống giao thông",
    description: "Phân tích tình huống sa hình phức tạp và ra quyết định chính xác."
  }
};

function getRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const CRITICAL_IDS = [19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72];

/**
 * createQuestionManager(mode, questions600, questions600explain)
 * @param {string} mode - 'a1' or 'default' (600)
 */
function createQuestionManager(mode, questions600 = [], questions600explain = [], licenseParam = 'b') {
  const normalizedMode = String(mode || 'default').trim().toLowerCase();
  const normalizedLicense = String(licenseParam || 'b').trim().toLowerCase();
  const isA1 = normalizedMode === 'a1';
  
  // 1. Setup Data Source
  let mapping = [];
  let chapters = [];
  
  if (normalizedMode === 'critical') {
    const isA1Critical = (normalizedLicense === 'a1' || normalizedLicense === 'a');
    const critCount = isA1Critical ? 20 : 60;

    chapters = [{
      id: 1, 
      title: `${critCount} Câu Điểm Liệt`, 
      subtitle: 'Tình huống nghiêm trọng', 
      desc: 'Bắt buộc phải trả lời đúng. Sai 1 câu sẽ bị đánh trượt toàn bộ.', 
      icon: '☢️', 
      color: '#f97316', 
      colorBg: 'rgba(249,115,22,0.1)', 
      count: critCount, 
      range: [1, critCount]
    }];

    let newIdCtr = 1;
    if (isA1Critical) {
      CRITICAL_IDS.forEach(cId => {
        mapping.push({ newId: newIdCtr++, originalId: cId, chapterId: 1 });
      });
    } else {
      questions600.forEach(q => {
        if (q.is_critical === true) {
          mapping.push({ newId: newIdCtr++, originalId: q.id, chapterId: 1 });
        }
      });
    }
  } else if (isA1) {
    let newIdCounter = 1;
    CHAPTERS_A1.forEach(ch => {
      const chapterQuestions = ch.questionIds.map(origId => ({
        newId: newIdCounter++,
        originalId: origId,
        chapterId: ch.id, // Logical ID (1-5)
        originalChapterId: ch.originalChapterId
      }));
      mapping = mapping.concat(chapterQuestions);
      
      const meta = CHAPTER_META[ch.originalChapterId];
      chapters.push({
        id: ch.id,
        title: `Chương ${Romanize(ch.id)}`,
        subtitle: meta ? meta.name : ch.name,
        desc: meta ? meta.description : '',
        icon: meta ? meta.icon : '📚',
        color: meta ? meta.color : '#4f46e5',
        colorBg: meta ? getRgba(meta.color, 0.1) : 'rgba(79,70,229,0.1)',
        count: ch.questionIds.length,
        range: [chapterQuestions[0].newId, chapterQuestions[chapterQuestions.length - 1].newId]
      });
    });
  } else {
    // Default 600 mode
    const default600Chapters = [
      { id: 1, range: [1, 180], count: 180 },
      { id: 2, range: [181, 205], count: 25 },
      { id: 3, range: [206, 263], count: 58 },
      { id: 4, range: [264, 300], count: 37 },
      { id: 5, range: [301, 485], count: 185 },
      { id: 6, range: [486, 600], count: 115 }
    ];

    chapters = default600Chapters.map(ch => {
      const meta = CHAPTER_META[ch.id];
      return {
        id: ch.id,
        title: `Chương ${Romanize(ch.id)}`,
        subtitle: meta.name,
        desc: meta.description,
        icon: meta.icon,
        color: meta.color,
        colorBg: getRgba(meta.color, 0.1),
        range: ch.range,
        count: ch.count
      };
    });

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
  const criticalNewIdSet = new Set();
  
  if (mode === 'critical') {
    mapping.forEach(m => criticalNewIdSet.add(m.newId));
  } else if (isA1) {
    mapping.forEach(m => {
      if (criticalOriginalSet.has(m.originalId)) criticalNewIdSet.add(m.newId);
    });
  } else {
    mapping.forEach(m => {
      const qData = questionsMap.get(m.originalId);
      if (qData && qData.is_critical) criticalNewIdSet.add(m.newId);
    });
  }

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

      // Clone to avoid mutating internal map
      let resultData = { ...qData };
      if ([180, 205, 263, 300, 485].includes(resultData.id)) {
        resultData.options = resultData.options.map(opt => {
          let text = opt.text;
          const match = text.match(/CH(_|ƯƠ)NG\s+[IVX]+\..*/i);
          if (match) {
             text = text.substring(0, match.index).trim();
             if (text.endsWith('.')) text = text.substring(0, text.length - 1);
          }
          return { ...opt, text };
        });
      }

      // Wrap data to include mode-specific metadata
      return {
        ...resultData,
        explanation: explanation || "",
        displayId: m.newId,
        newId: m.newId,
        chapterId: m.chapterId,
        is_critical: criticalNewIdSet.has(m.newId),
        isCritical: criticalNewIdSet.has(m.newId)
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
