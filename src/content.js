function saveProblem(site, title, url) {  
    const storageKey = site === "LeetCode" ? "leetcodeProblems" : "codeforcesProblems";  

    chrome.storage.local.get([storageKey], (data) => {  
        let problems = data[storageKey] || [];  

        problems = problems.filter(p => p.url !== url);  
        problems.unshift({ title, url, date: new Date().toISOString() });  
        if (problems.length > 5) problems.pop();  

        chrome.storage.local.set({ [storageKey]: problems }, () => {  
            
        });  
    });  
}  

 
if (window.location.href.includes("leetcode.com/problems")) {  
    const title = document.querySelector("div[data-cy='question-title']")?.innerText;  
    if (title) {  
        saveProblem("LeetCode", title, window.location.href);  
       
    }  
}  


const problemsetMatch = window.location.href.match(/codeforces\.com\/problemset\/problem\/(\d+)\/([A-Z])(?:\?.*)?$/);  
if (problemsetMatch) {  
    const title = `${problemsetMatch[1]}-${problemsetMatch[2]}`; // "2090-C"  
    saveProblem("Codeforces", title, window.location.href);  
    
}  


const contestMatch = window.location.href.match(/codeforces\.com\/contest\/(\d+)\/problem\/([A-Z])(?:\?.*)?$/);  
if (contestMatch) {  
    const title = `${contestMatch[1]}-${contestMatch[2]}`; // "2085-B"  
    saveProblem("Codeforces", title, window.location.href);  
    
}  