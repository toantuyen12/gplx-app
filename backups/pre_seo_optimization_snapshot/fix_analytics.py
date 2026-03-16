import os
import re

ANALYTICS_SCRIPT = """<!-- Real Analytics Fetching -->
<script>
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

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    if file == 'feedback.html':
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean the old updateStats local storage script from index.html (or any file it might be in)
    content = re.sub(r'<script>\s*let totalBase = localStorage\.getItem\("totalUsers"\);.*?setInterval\(updateStats, 30000\);\s*</script>', '', content, flags=re.DOTALL)
    
    # 2. Prevent duplication if ran multiple times
    content = re.sub(r'<!-- Real Analytics Fetching -->\s*<script>\s*async function fetchAnalytics\(\).*?setInterval\(fetchAnalytics, 60000\);\s*</script>', '', content, flags=re.DOTALL)
    
    # 3. Inject new analytics block
    if "async function fetchAnalytics()" not in content:
        content = content.replace('</body>', f'{ANALYTICS_SCRIPT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Propagated analytics to {len(html_files) - 1} html files.")
