let res = document.querySelector(".reset");
res.addEventListener("click", reset);
let btn = document.querySelector(".btn-submit");
let intro = document.getElementById("intro");
let quiz = document.getElementById("quiz");

const questions = [
  { question: "Quelle est la capitale de la France ?", options: ["Paris", "Lyon", "Marseille", "Toulouse"], answer: "Paris" },
  { question: "Quel est le résultat de 3 x 4 ?", options: ["7", "12", "9", "15"], answer: "12" },
  { question: "Qui a écrit 'Les Misérables' ?", options: ["Victor Hugo", "Émile Zola", "Albert Camus", "Molière"], answer: "Victor Hugo" }
];

let currentQuestion = 0;
let score = 0;
let timer;
const timePerQuestion = 5;

btn.addEventListener("click", buttonlogic);

function buttonlogic() {
  clearInterval(timer);
  
  if (currentQuestion === 0) {
    intro.classList.add("hidden");
    quiz.classList.remove("hidden");
    btn.textContent = "Question Suivante";
  }

  if (currentQuestion < questions.length) {
    displayquestion(questions[currentQuestion]);
    currentQuestion++;
  } else {
    displayscore();
  
  }
  
  startTimer();
}

function reset() {
  currentQuestion = 0;
  score = 0;
  res.classList.add("hidden");
  btn.classList.remove("hidden");
  btn.textContent = "Commencer";
  quiz.innerHTML = "";
  intro.classList.remove("hidden");
  quiz.classList.add("hidden");
}

function startTimer() {
  let timeLeft = timePerQuestion;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Temps restant: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Temps restant: ${timeLeft}s`;
    if (timeLeft < 0) {
      clearInterval(timer);
      buttonlogic();
    }
  }, 1000);
}

function displayquestion(currentq) {
  quiz.innerHTML = "";
  let questionText = document.createElement("h2");
  questionText.textContent = currentq.question;
  quiz.appendChild(questionText);
  
  let time_rem = document.createElement("div");
  time_rem.className = "timer";
  time_rem.id = "timer";
  quiz.appendChild(time_rem);
  
  currentq.options.forEach(option => {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "curr_q";
    input.value = option;
    let label = document.createElement("label");
    label.innerText = option;
    quiz.appendChild(input);
    quiz.appendChild(label);
  });
}

function verifyanswer(currentq) {
  let selectedOption = [...document.getElementsByName("curr_q")].find(input => input.checked);
  if (selectedOption && selectedOption.value === currentq.answer) {
    score++;
  }
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}

function displayscore() {
  quiz.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.innerText = `Votre score est ${score}`;
  quiz.appendChild(h2);
}