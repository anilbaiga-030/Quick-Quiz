const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);

// Here is the UseCase of Map
// And i Don't know about the Map, so learn it later

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`;
  })
  .join("");

// Above code returning the Array of the these(defined above)Strings
