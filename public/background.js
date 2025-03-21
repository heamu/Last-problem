chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    let problemURL = tab.url;

    if (problemURL.includes("leetcode.com/problems/")) {
      updateLeetcodeProblemList(problemURL);
    } else if (problemURL.includes("codeforces.com/problemset/problem/")) {
      updateCodeforcesProblemList(problemURL);
    }
  }
});

// Function to extract the exact LeetCode problem name
function extractLeetcodeProblemName(url) {
  const match = url.match(/leetcode\.com\/problems\/([^/]+)/);
  return match ? decodeURIComponent(match[1]).replace(/-/g, " ") : null; // Returns null if no name found
}

// Function to update LeetCode problems (No duplicates by name, perfect names)
function updateLeetcodeProblemList(newProblemURL) {
  
  let newProblemName = extractLeetcodeProblemName(newProblemURL);
  if (!newProblemName) return; // Ignore invalid URLs

  chrome.storage.local.get(["leetcodeProblems"], (result) => {
    let problemList = result.leetcodeProblems || [];

    // Remove duplicates by name
    problemList = problemList.filter(({ name }) => name !== newProblemName);

    // Add new problem at the beginning
    problemList.unshift({ name: newProblemName, url: newProblemURL });

    // Keep only the last 5 problems
    problemList = problemList.slice(0, 5);

    chrome.storage.local.set({ leetcodeProblems: problemList });
  });
}

// Function to update Codeforces problems (Duplicates allowed)
function updateCodeforcesProblemList(newProblemURL) {
  let problemName = "Codeforces Problem"; // Keeping generic name for Codeforces

  chrome.storage.local.get(["codeforcesProblems"], (result) => {
    let problemList = result.codeforcesProblems || [];

    // Add new problem at the beginning
    problemList.unshift({ name: problemName, url: newProblemURL });

    // Keep only the last 5 problems
    problemList = problemList.slice(0, 5);

    chrome.storage.local.set({ codeforcesProblems: problemList });
  });
}
