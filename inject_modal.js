const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const modalHtml = `
<!-- Class Selection Modal -->
<div id="navPopupOverlay" class="nav-popup-overlay">
    <div class="nav-popup-modal modern-popup">
        <div class="nav-popup-header">
            <div class="header-texts">
                <h3>Chọn hạng xe</h3>
                <p>Chọn hạng để bắt đầu học hoặc thi</p>
            </div>
            <button id="navPopupClose" class="nav-popup-close" aria-label="Đóng popup"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-popup-body">
            <div class="nav-group-title">Hạng Phổ Thông</div>
            <div class="nav-class-card" data-class="a1">
                <div class="card-icon"><i class="fa-solid fa-bicycle"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng A1</strong>
                        <span class="badge badge-popular">Phổ biến</span>
                    </div>
                    <span class="desc">Xe máy có dung tích xi-lanh đến 125cc</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="a">
                <div class="card-icon"><i class="fa-solid fa-motorcycle"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng A (A2 cũ)</strong>
                    </div>
                    <span class="desc">Xe máy có dung tích xi-lanh trên 125cc (gồm cả A1)</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="b">
                <div class="card-icon"><i class="fa-solid fa-car"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng B (B1, B2)</strong>
                        <span class="badge badge-hot">Khuyên dùng</span>
                    </div>
                    <span class="desc">Ô tô đến 9 chỗ, tải dưới 3.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="c1">
                <div class="card-icon"><i class="fa-solid fa-truck"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng C1</strong>
                    </div>
                    <span class="desc">Xe tải từ 3.5 tấn đến 7.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="c">
                <div class="card-icon"><i class="fa-solid fa-truck-moving"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng C</strong>
                    </div>
                    <span class="desc">Xe tải trọng trên 7.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            
            <div class="nav-group-title" style="margin-top: 8px;">Hạng CAND</div>
            <div class="nav-class-card" data-class="bcand" style="border-color: #fee2e2;">
                <div class="card-icon" style="color: #ef4444;"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong style="color: #ef4444;">Hạng B CAND</strong>
                        <span class="badge badge-hot">Mới</span>
                    </div>
                    <span class="desc">Bộ đề 500 câu riêng cho CAND</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="ccand" style="border-color: #fee2e2;">
                <div class="card-icon" style="color: #ef4444;"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong style="color: #ef4444;">Hạng C CAND</strong>
                        <span class="badge badge-hot">Mới</span>
                    </div>
                    <span class="desc">Bộ đề 500 câu riêng cho CAND</span>
                </div>
                <div class="card-indicator"></div>
            </div>
        </div>
    </div>
</div>
`;

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'backups' && file !== '.git') {
                processFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (!content.includes('id="navPopupOverlay"')) {
                // To safely insert before </body>
                const newContent = content.replace('</body>', `${modalHtml}\n</body>`);
                if (newContent !== content) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Injected modal into: ${file}`);
                }
            } else {
                console.log(`Modal already exists in: ${file}`);
            }
        }
    }
}

processFiles(directoryPath);
console.log('Finished bulk injecting modal.');
