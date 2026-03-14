/**
 * LeaderboardManager - A lightweight, localStorage-based leaderboard system
 * for traffic sign mini-games.
 */
const LeaderboardManager = (function() {
    'use strict';

    const STORAGE_PREFIX = 'gplx_leaderboard_';

    /**
     * Save a new score for a specific game.
     * @param {string} gameId - Unique identifier for the game.
     * @param {number} score - The score to save.
     * @param {number} timestamp - Optional. Custom timestamp (useful for session start time).
     * @returns {boolean} - True if it's a new high score (top 1).
     */
    function saveScore(gameId, score, timestamp = null) {
        const key = STORAGE_PREFIX + gameId;
        const time = timestamp || Date.now();
        let records = getScoresRaw(gameId);
        
        records.push({ score: score, timestamp: time });
        
        // Sort descending by score, then newest first
        records.sort((a, b) => b.score - a.score || b.timestamp - a.timestamp);
        
        // Keep only top 5
        const top5 = records.slice(0, 5);
        
        localStorage.setItem(key, JSON.stringify(top5));
        
        return top5.length > 0 && score === top5[0].score;
    }

    /**
     * Get Top 5 scores for a specific game (normalized format).
     * @param {string} gameId
     * @returns {Object[]}
     */
    function getScores(gameId) {
        return getScoresRaw(gameId);
    }

    function getScoresRaw(gameId) {
        const key = STORAGE_PREFIX + gameId;
        const stored = localStorage.getItem(key);
        if (!stored) return [];
        
        try {
            const data = JSON.parse(stored);
            return data.map(item => {
                if (typeof item === 'number') {
                    return { score: item, timestamp: Date.now() };
                }
                return item;
            });
        } catch (e) {
            return [];
        }
    }

    function formatDate(ts) {
        const d = new Date(ts);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        const hours = d.getHours().toString().padStart(2, '0');
        const mins = d.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${mins}`;
    }

    /**
     * Render the leaderboard UI into a container.
     * @param {string} containerId - DOM ID of the container.
     * @param {string} gameId - Unique identifier for the game.
     * @param {number} lastScore - Optional. The most recent score to highlight.
     */
    function render(containerId, gameId, lastScore = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const records = getScores(gameId);
        const icons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

        let html = `
            <div class="leaderboard-card">
                <div class="leaderboard-header">
                    <span class="leaderboard-icon">🏆</span>
                    <h3 class="leaderboard-title">BẢNG XẾP HẠNG</h3>
                </div>
                <div class="leaderboard-list">
        `;

        if (records.length === 0) {
            html += `<div class="leaderboard-empty">Chưa có kỷ lục nào. Hãy bắt đầu ngay!</div>`;
        } else {
            records.forEach((r, i) => {
                const isNew = (r.score === lastScore);
                html += `
                    <div class="leaderboard-item ${isNew ? 'new-record-anim' : ''}">
                        <div class="leaderboard-left">
                            <span class="rank-icon">${icons[i] || (i + 1)}</span>
                            <div class="rank-info">
                                <span class="score-value">${r.score} điểm</span>
                                <span class="score-date">${formatDate(r.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    return {
        saveScore: saveScore,
        getScores: getScores,
        render: render
    };
})();
