const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const modalHtml = `
<!-- Class Selection Modal -->
<div id="navPopupOverlay" class="nav-popup-overlay">
    <div class="nav-popup-modal">
        <div class="nav-popup-header">
            <h3>Chọn hạng xe ôn tập</h3>
            <button id="navPopupClose" class="nav-popup-close" aria-label="Đóng popup"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-popup-body">
            <div class="nav-class-card" data-class="a1">
                <div class="card-icon"><i class="fa-solid fa-bicycle"></i></div>
                <div class="card-info">
                    <strong>Hạng A1</strong>
                    <span>Xe mô tô 2 bánh dung tích từ 50cm³ đến dưới 125cm³</span>
                </div>
            </div>
            <div class="nav-class-card" data-class="a">
                <div class="card-icon"><i class="fa-solid fa-motorcycle"></i></div>
                <div class="card-info">
                    <strong>Hạng A (A2 cũ)</strong>
                    <span>Xe mô tô 2 bánh dung tích từ 125cm³ trở lên</span>
                </div>
            </div>
            <div class="nav-class-card" data-class="b">
                <div class="card-icon"><i class="fa-solid fa-car"></i></div>
                <div class="card-info">
                    <strong>Hạng B (B1, B2 cũ)</strong>
                    <span>Ô tô đến 9 chỗ, tải dưới 3.500kg</span>
                </div>
            </div>
            <div class="nav-class-card" data-class="c1">
                <div class="card-icon"><i class="fa-solid fa-truck"></i></div>
                <div class="card-info">
                    <strong>Hạng C1</strong>
                    <span>Xe tải từ 3.500 kg đến dưới 7.500 kg</span>
                </div>
            </div>
            <div class="nav-class-card" data-class="c">
                <div class="card-icon"><i class="fa-solid fa-truck-moving"></i></div>
                <div class="card-info">
                    <strong>Hạng C</strong>
                    <span>Ô tô tải kéo trọng tải trên 7.500 kg</span>
                </div>
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
