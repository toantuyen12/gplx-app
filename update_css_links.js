const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

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
            let newContent = content
                .replace(/href="(\.\.\/)*css\/style\.css(\?[^"]*)?"/g, 'href="$1css/style-v3.css"')
                .replace(/href="(\.\.\/)*css\/mobile-drawer\.css(\?[^"]*)?"/g, 'href="$1css/mobile-drawer-v3.css"');
            
            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated CSS links in: ${file}`);
            }
        }
    }
}

processFiles(directoryPath);
console.log('Finished updating CSS links.');
