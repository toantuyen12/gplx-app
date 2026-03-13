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
     * @returns {boolean} - True if it's a new high score (top 1).
     */
    function saveScore(gameId, score) {
        const key = STORAGE_PREFIX + gameId;
        let scores = getScores(gameId);
        
        scores.push(score);
        // Sort descending
        scores.sort((a, b) => b - a);
        // Keep only top 5
        const top5 = scores.slice(0, 5);
        
        localStorage.setItem(key, JSON.stringify(top5));
        
        return score === top5[0];
    }

    /**
     * Get Top 5 scores for a specific game.
     * @param {string} gameId
     * @returns {number[]}
     */
    function getScores(gameId) {
        const key = STORAGE_PREFIX + gameId;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
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

        const scores = getScores(gameId);
        const icons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

        let html = `
            <div class="leaderboard-card">
                <div class="leaderboard-header">
                    <span class="leaderboard-icon">🏆</span>
                    <h3 class="leaderboard-title">Điểm cao nhất của bạn</h3>
                </div>
                <div class="leaderboard-list">
        `;

        if (scores.length === 0) {
            html += `<div class="leaderboard-empty">Chưa có điểm cao. Hãy chơi ngay!</div>`;
        } else {
            scores.forEach((s, i) => {
                const isNew = (s === lastScore);
                html += `
                    <div class="leaderboard-item ${isNew ? 'new-record-anim' : ''}">
                        <span class="rank-icon">${icons[i]}</span>
                        <span class="score-value">${s} điểm</span>
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
