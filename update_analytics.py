import os
import glob

search_dir = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app'
html_files = glob.glob(os.path.join(search_dir, '*.html'))

old_block = """<script>
async function fetchAnalytics() {
    try {
        const res = await fetch("/api/analytics");
        if (res.ok) {
            const data = await res.json();
            document.getElementById("onlineUsers").textContent = data.activeUsers || 0;
            document.getElementById("todayUsers").textContent = data.todayUsers || 0;
            document.getElementById("totalUsers").textContent = typeof data.totalUsers === 'number' ? data.totalUsers.toLocaleString() : "0";
        }
    } catch (error) {
        console.error("Error fetching analytics:", error);
    }
}
// Fetch initially when page loads
fetchAnalytics();
// Then fetch periodically every 60 seconds
setInterval(fetchAnalytics, 60000);
</script>"""

new_block = """<script>
let localExtraVisits = 0;
async function fetchAnalytics() {
    try {
        const res = await fetch("/api/analytics");
        if (res.ok) {
            const data = await res.json();
            document.getElementById("onlineUsers").textContent = data.activeUsers || 0;
            let baseToday = parseInt(data.todayUsers) || 0;
            document.getElementById("todayUsers").textContent = baseToday + localExtraVisits;
            document.getElementById("totalUsers").textContent = typeof data.totalUsers === 'number' ? data.totalUsers.toLocaleString() : "0";
        }
    } catch (error) {
        console.error("Error fetching analytics:", error);
    }
}
// Fetch initially when page loads
fetchAnalytics();
// Then fetch periodically every 60 seconds
setInterval(fetchAnalytics, 60000);

// Increment local counter independently every 60s
setInterval(() => {
    localExtraVisits++;
    const todayEl = document.getElementById("todayUsers");
    if (todayEl) {
        let current = parseInt(todayEl.textContent) || 0;
        todayEl.textContent = current + 1;
    }
}, 60000);
</script>"""

count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_block in content:
        new_content = content.replace(old_block, new_block)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Updated {os.path.basename(fpath)}')

print(f'Updated {count} files in total.')
