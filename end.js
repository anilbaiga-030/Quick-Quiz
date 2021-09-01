const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const finlaScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// console.log(highScores);

const MAX_HIGH_SCORES = 5; // For Hish Score Records

finlaScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("Clicked the save Button");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  // console.log(highScores);

  window.location.assign("/gameHome.html");
  // And Because of this new window refering the on the console
  // "Clicked the save Button" will be prompted for a less than a second
};
