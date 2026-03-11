import os

target_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

old_snip_start = "<!-- Real Analytics Fetching -->"
old_snip_end = "</script>"

new_script = """<!-- Real Analytics Fetching -->
    <script>
        function getPersistentExtraVisits() {
            const todayStr = new Date().toDateString();
            const storedData = localStorage.getItem('gplx_extra_visits');
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    if (parsed.date === todayStr) {
                        return parseInt(parsed.count) || 0;
                    }
                } catch(e) {}
            }
            return 0;
        }

        function savePersistentExtraVisits(count) {
            const todayStr = new Date().toDateString();
            localStorage.setItem('gplx_extra_visits', JSON.stringify({
                date: todayStr,
                count: count
            }));
        }

        let localExtraVisits = getPersistentExtraVisits();
        let baseToday = 0; // Store the base from API to survive API failures
        
        // Immediately set the text to stored visits before API finishes
        const todayUsersEl = document.getElementById("todayUsers");
        if (todayUsersEl) {
            todayUsersEl.textContent = localExtraVisits;
        }
        
        async function fetchAnalytics() {
            try {
                const res = await fetch("/api/analytics");
                if (res.ok) {
                    const data = await res.json();
                    document.getElementById("onlineUsers").textContent = data.activeUsers || 0;
                    baseToday = parseInt(data.todayUsers) || 0;
                    document.getElementById("totalUsers").textContent = typeof data.totalUsers === 'number' ? data.totalUsers.toLocaleString() : "0";
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                // Re-check persistent visits to sync across potential multiple tabs
                localExtraVisits = getPersistentExtraVisits();
                if (document.getElementById("todayUsers")) {
                    document.getElementById("todayUsers").textContent = baseToday + localExtraVisits;
                }
            }
        }
        
        // Fetch initially when page loads
        fetchAnalytics();
        // Then fetch periodically every 60 seconds
        setInterval(fetchAnalytics, 60000);

        // Increment local counter independently every 60s
        setInterval(() => {
            localExtraVisits = getPersistentExtraVisits() + 1;
            savePersistentExtraVisits(localExtraVisits);
            
            const todayEl = document.getElementById("todayUsers");
            if (todayEl) {
                todayEl.textContent = baseToday + localExtraVisits;
            }
        }, 60000);
    </script>"""

html_files = [f for f in os.listdir(target_dir) if f.endswith('.html')]

for f in html_files:
    file_path = os.path.join(target_dir, f)
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    idx_start = content.find(old_snip_start)
    if idx_start != -1:
        # find the closing script tag AFTER idx_start
        idx_end = content.find(old_snip_end, idx_start)
        if idx_end != -1:
            idx_end += len(old_snip_end)
            
            new_content = content[:idx_start] + new_script + content[idx_end:]
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(new_content)
            print(f"Updated {f}")
        else:
            print(f"Malformed script found in {f}")
    else:
        print(f"Not found in {f}")
