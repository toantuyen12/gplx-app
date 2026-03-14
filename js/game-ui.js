/* 
   GAME-UI.JS 
   Shared UI Logic for GPLX Mini-Games
*/

const GameUI = (function() {
    'use strict';

    /**
     * Show the modern result popup modal.
     * @param {Object} config - Configuration object
     * @param {string} config.gameId - Unique identifier for the game
     * @param {number} config.score - Final score achieved
     * @param {string} config.statsText - Stats string (e.g., "Chính xác 3/10 • Trung bình 0.2s/câu")
     * @param {Function} config.onRestart - Callback for "CHƠI LẠI" button
     */
    function showResult(config) {
        const { gameId, score, statsText, onRestart } = config;
        
        // Ensure overlay exists
        let overlay = document.getElementById('gameResultModal');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'gameResultModal';
            overlay.className = 'game-modal-overlay';
            document.body.appendChild(overlay);
        }

        // Render Modal Content
        overlay.innerHTML = `
            <div class="game-modal-card">
                <h2 class="modal-title">KẾT QUẢ CUỐI CÙNG</h2>
                <div class="modal-score">${score}</div>
                <div class="modal-stats">${statsText}</div>
                
                <div class="modal-leaderboard-title">
                    <span>🏆 BẢNG XẾP HẠNG</span>
                </div>
                <div id="modalLeaderboardContent" class="modal-leaderboard-list">
                    <!-- Leaderboard items will be injected here -->
                </div>

                <div class="modal-btn-group">
                    <button class="modal-btn modal-btn-primary" id="modalRestartBtn">
                        <i class="fa-solid fa-rotate-right"></i> CHƠI LẠI
                    </button>
                    <a href="../signs.html" class="modal-btn modal-btn-secondary">
                         THOÁT
                    </a>
                </div>
            </div>
        `;

        // Handle Leaderboard Rendering
        if (typeof LeaderboardManager !== 'undefined') {
            // Save current score first
            LeaderboardManager.saveScore(gameId, score);
            
            // Custom render for modal
            renderModalLeaderboard(gameId, score);
        }

        // Add event listeners
        document.getElementById('modalRestartBtn').onclick = () => {
            hideResult();
            if (onRestart) onRestart();
        };

        // Show with a slight delay for animation
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }

    /**
     * Internal function to render leaderboard specifically for the modern modal.
     */
    function renderModalLeaderboard(gameId, lastScore) {
        const container = document.getElementById('modalLeaderboardContent');
        if (!container) return;

        const records = LeaderboardManager.getScores(gameId);
        const medals = ['🥇', '🥈', '🥉'];
        
        if (records.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: #94a3b8; font-style: italic; font-size: 13px;">Chưa có kỷ lục nào.</div>';
            return;
        }

        let html = '';
        records.forEach((r, i) => {
            const isCurrent = (r.score === lastScore);
            const dateStr = formatDate(r.timestamp);
            
            html += `
                <div class="modal-leaderboard-item ${isCurrent ? 'current' : ''}">
                    <div class="leaderboard-item-left">
                        <span class="leaderboard-medal">${medals[i] || (i + 1)}</span>
                        <div class="leaderboard-info">
                            <span class="leaderboard-score-text">${r.score} điểm</span>
                            <span class="leaderboard-date-text">${dateStr}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    function hideResult() {
        const overlay = document.getElementById('gameResultModal');
        if (overlay) {
            overlay.classList.remove('active');
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

    return {
        showResult: showResult,
        hideResult: hideResult
    };
})();
