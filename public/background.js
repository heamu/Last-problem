chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {  
  if (changeInfo.status === "complete" && tab.url) {  
      let problemURL = tab.url;  

      if (problemURL.includes("leetcode.com/problems/")) {  
         
          updateLeetcodeProblemList(problemURL);  
      } else if (problemURL.match(/codeforces\.com\/problemset\/problem\/\d+\/[A-Z](?:\?.*)?$/)) {  
          
          updateCodeforcesProblemList(problemURL);  
      } else if (problemURL.match(/codeforces\.com\/contest\/\d+\/problem\/[A-Z](?:\?.*)?$/)) {  
           
          updateCodeforcesProblemList(problemURL);  
      } else {  
          console.log(" URL did not match any expected problem URL pattern.");  
          console.log("Current URL:", problemURL);  
      }  
  }  
});  

// Extract exact LeetCode problem name  
function extractLeetcodeProblemName(url) {  
  const match = url.match(/leetcode\.com\/problems\/([^/]+)/);  
  return match ? decodeURIComponent(match[1]).replace(/-/g, " ") : null;  
}  

// Extract unique Codeforces problem name (Format: "2091-B")  
function extractCodeforcesProblemName(url) {  
  const match = url.match(/codeforces\.com\/(?:problemset\/problem\/(\d+)\/([A-Z])|contest\/(\d+)\/problem\/([A-Z]))/);  
  if (match) {  
      // For problemset URLs, the problem number is the second capture group, and the letter is the third.  
      // For contest URLs, the contest ID is the fourth capture group, and the letter is the fifth.  
      const problemLetter = match[2] || match[4];  
      return problemLetter ? `${match[1] || match[3]}-${problemLetter}` : null;  
  }  
  return null;  
}  
// Update LeetCode problems (No duplicates by name)  
function updateLeetcodeProblemList(newProblemURL) {  
  let newProblemName = extractLeetcodeProblemName(newProblemURL);  
  if (!newProblemName) {  
      console.log(" Failed to extract LeetCode problem name.");  
      return;  
  }  

  chrome.storage.local.get(["leetcodeProblems"], (result) => {  
      let problemList = result.leetcodeProblems || [];  
      problemList = problemList.filter(({ name }) => name !== newProblemName);  
      problemList.unshift({ name: newProblemName, url: newProblemURL });  
      problemList = problemList.slice(0, 5);  
      chrome.storage.local.set({ leetcodeProblems: problemList }, () => {  
          console.log(" Successfully updated LeetCode problem list.");  
      });  
  });  
}  

// Update Codeforces problems (No duplicates by name)  
function updateCodeforcesProblemList(newProblemURL) {  
  let newProblemName = extractCodeforcesProblemName(newProblemURL);  
  if (!newProblemName) {  
      
      return;  
  }  

  chrome.storage.local.get(["codeforcesProblems"], (result) => {  
      let problemList = result.codeforcesProblems || [];  
      problemList = problemList.filter(({ name }) => name !== newProblemName);  
      problemList.unshift({ name: newProblemName, url: newProblemURL });  
      problemList = problemList.slice(0, 5);  
      chrome.storage.local.set({ codeforcesProblems: problemList }, () => {  
           
      });  
  });  
}  