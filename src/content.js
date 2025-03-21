function saveProblem(site, title, url) {
    const storageKey = site === "LeetCode" ? "leetcodeProblems" : "codeforcesProblems";

    chrome.storage.local.get([storageKey], (data) => {
        let problems = data[storageKey] || [];

        // Remove duplicates and keep only the last 5
        problems = problems.filter(p => p.url !== url);
        problems.unshift({ title, url, date: new Date().toISOString() });
        if (problems.length > 5) problems.pop();

        chrome.storage.local.set({ [storageKey]: problems });
    });
}

if (window.location.href.includes("leetcode.com/problems")) {
    const title = document.querySelector("div[data-cy='question-title']")?.innerText;
    if (title) saveProblem("LeetCode", title, window.location.href);
}

if (window.location.href.includes("codeforces.com/problemset/problem")) {
    const title = document.querySelector(".title")?.innerText;
    if (title) saveProblem("Codeforces", title, window.location.href);
}
