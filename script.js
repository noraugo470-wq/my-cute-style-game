const quiz = [
  {
    question: "Which animal is the cutest?",
    answers: ["Bunny 🐇", "Cat 🐱", "Dog 🐕", "Hamster 🐹"],
    correctAnswer: 0
  },
  {
    question: "Pick a cute color!",
    answers: ["Pink 🌸", "Purple 🌟", "Blue 💙", "Yellow sunshine ☀️", "Lavender 🌿", "Mint 🍃"],
    correctAnswer: 1
  },
  {
    question: "Choose a cute snack!",
    answers: ["Candy 🍭", "Ice cream 🍦", "Pie 🥧", "Donut 🍩", "Strawberry 🍓"],
    correctAnswer: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const activeQuestion = quiz[current];
  questionEl.innerText = activeQuestion.question;
  answersEl.innerHTML = "";
  answered = false;
  nextBtn.style.display = "none";
  scoreEl.innerText = "";

  activeQuestion.answers.forEach((ans, i) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.innerText = ans;
    button.disabled = false;
    button.addEventListener("click", () => checkAnswer(i, button));
    answersEl.appendChild(button);
  });
}

function checkAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;
  const correctIndex = quiz[current].correctAnswer;
  const answerButtons = [...answersEl.children];

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    button.classList.toggle("correct", index === correctIndex);
    button.classList.toggle("wrong", index === selectedIndex && index !== correctIndex);
  });

  if (selectedIndex === correctIndex) {
    score += 1;
  }

  nextBtn.style.display = "block";
  scoreEl.innerText = `Score: ${score}/${quiz.length}`;
}

function nextQuestion() {
  if (!answered) return;

  current += 1;
  if (current < quiz.length) {
    loadQuestion();
    return;
  } 

  questionEl.innerText = "Quiz Finished!";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.innerText = `Your score: ${score}/${quiz.length}`;
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
