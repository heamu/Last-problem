import { useState, useEffect } from "react";
import "./popup.css"; // Importing the CSS file
import leetcodeIcon from "../assets/leetcode.png";
import codeforcesIcon from "../assets/codeforces.png";

function Popup() {
  const [leetcodeProblems, setLeetcodeProblems] = useState([]);
  const [codeforcesProblems, setCodeforcesProblems] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("leetcode"); // Default: LeetCode

  useEffect(() => {
    chrome.storage.local.get(["leetcodeProblems", "codeforcesProblems"], (result) => {
      setLeetcodeProblems(result.leetcodeProblems || []);
      setCodeforcesProblems(result.codeforcesProblems || []);
    });
  }, []);

  return (
    <div className="popup-container">
      <div className="toggle-buttons">
        <button 
          className={`toggle-btn ${selectedPlatform === "leetcode" ? "active" : ""}`}
          onClick={() => setSelectedPlatform("leetcode")}
        >
          LeetCode
        </button>
        <button 
          className={`toggle-btn ${selectedPlatform === "codeforces" ? "active" : ""}`}
          onClick={() => setSelectedPlatform("codeforces")}
        >
          Codeforces
        </button>
      </div>

      {selectedPlatform === "leetcode" ? (
        <>
          <h3 className="popup-title">Last 5 LeetCode Problems</h3>
          <ul className="problems-list">
            {leetcodeProblems.length > 0 ? (
              leetcodeProblems.map((problem, index) => (
                <li key={index} className="problem-item">
                  <a href={problem.url} target="_blank" rel="noopener noreferrer" className="problem-link full-item">
                    <img src={leetcodeIcon} alt="LeetCode Icon" className="problem-icon" />
                    {problem.name} {/* LeetCode problems always have correct names */}
                  </a>
                </li>
              ))
            ) : (
              <li className="no-problems">No recent problems</li>
            )}
          </ul>
        </>
      ) : (
        <>
          <h3 className="popup-title">Last 5 Codeforces Problems</h3>
          <ul className="problems-list">
            {codeforcesProblems.length > 0 ? (
              codeforcesProblems.map((problem, index) => (
                <li key={index} className="problem-item">
                  <a href={problem.url} target="_blank" rel="noopener noreferrer" className="problem-link full-item">
                    <img src={codeforcesIcon} alt="Codeforces Icon" className="problem-icon" />
                    {problem.name || `Problem ${String(index + 1).padStart(2, "0")}`} {/* Fallback for CF */}
                  </a>
                </li>
              ))
            ) : (
              <li className="no-problems">No recent problems</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Popup;
