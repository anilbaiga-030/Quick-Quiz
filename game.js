const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
// console.log(choices[2].dataset.number);

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
console.log(game);

let currentQueston = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    // questions = loadedQuestions; //   Only in Case of Local json file

    // console.log(loadedQuestions.results);  // Array of Objects

    questions = loadedQuestions.results.map((loadedQuestion) => {
      // Let's create a formatted question here similar to our

      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3 + 1); // +1 bcz our answer property is not in zero base indexing

      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      ); // adding correct choice as answer

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //   console.log(availableQuestions);

  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

// To display the Questions and choices
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    // goto the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;

  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 101}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQueston = availableQuestions[questionIndex];
  question.innerText = currentQueston.question;

  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQueston["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true; // Wheather answer is accepted or not Or in clear way wheather this question
  // is displayed for game or not?
};

// To check Which choice have been choosed

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target; // e.target gives use that selected HTML choice Element
    const selectedAnswer = selectedChoice.dataset.number;

    // check wheather choice is correct or incorrect(Using Ternery Operator) ;
    const classToApply =
      selectedAnswer == currentQueston.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increamentScore(CORRECT_BONUS);
    }
    // Red,Green Animation and Updating the Questions
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1450);
  });
});

increamentScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
