let currentLevel = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let questionCount = 0;
let currentQuestion = {};
let askedQuestions = [];
let levelNames = ["начальный", "средний", "продвинутый"];

function startGame() {
  currentLevel = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  questionCount = 0;
  askedQuestions = [];
  generateQuestion();
  updateDisplay();
}

function generateQuestion() {
  let q;
  do {
    if (currentLevel === 0) {
      q = generateBasicQuestion();
    } else if (currentLevel === 1) {
      q = generateMediumQuestion();
    } else {
      q = generateAdvancedQuestion();
    }
  } while (askedQuestions.includes(q.text));

  askedQuestions.push(q.text);
  currentQuestion = q;
  document.getElementById("question").textContent = q.text;
  document.getElementById("answer").value = "";
}

function generateBasicQuestion() {
  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;
  let ops = ["+", "-", "*", "/"];
  let op = ops[Math.floor(Math.random() * ops.length)];
  let text = `${a} ${op} ${b}`;
  let answer;
  if (op === "+") answer = a + b;
  else if (op === "-") answer = a - b;
  else if (op === "*") answer = a * b;
  else answer = Math.floor(a / b);
  return {text, answer};
}

function generateMediumQuestion() {
  if (Math.random() > 0.5) {
    return generateBasicQuestion();
  } else {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    let ops = [">", "<", "==", ">=", "<="];
    let op = ops[Math.floor(Math.random() * ops.length)];
    let text = `${a} ${op} ${b}`;
    let answer;
    if (op === ">") answer = a > b;
    else if (op === "<") answer = a < b;
    else if (op === "==") answer = a === b;
    else if (op === ">=") answer = a >= b;
    else answer = a <= b;
    return {text, answer: answer.toString()};
  }
}

function generateAdvancedQuestion() {
  if (Math.random() > 0.5) {
    let a = Math.random() > 0.5;
    let b = Math.random() > 0.5;
    let ops = ["&&", "||"];
    let op = ops[Math.floor(Math.random() * ops.length)];
    let text = `${a} ${op} ${b}`;
    let answer = op === "&&" ? a && b : a || b;
    return {text, answer: answer.toString()};
  } else {
    let num = Math.floor(Math.random() * 16);
    let text = `${num} в двоичной системе`;
    let answer = num.toString(2);
    return {text, answer};
  }
}

function checkAnswer() {
  let userAnswer = document.getElementById("answer").value.trim();
  let correctAnswer = currentQuestion.answer.toString();

  if (userAnswer === correctAnswer) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  questionCount++;

  if (questionCount >= 10) {
    let percentage = (correctAnswers / 10) * 100;
    if (percentage >= 80 && currentLevel < 2) {
      currentLevel++;
      alert(`Поздравляем! Вы перешли на ${levelNames[currentLevel]} уровень!`);
      correctAnswers = 0;
      wrongAnswers = 0;
      questionCount = 0;
      askedQuestions = [];
    } else if (currentLevel === 2 && percentage >= 80) {
      alert("Поздравляем! Вы завершили игру!");
      return;
    } else {
      alert(`Уровень не пройден. Правильных ответов: ${correctAnswers}/10`);
      return;
    }
  }

  generateQuestion();
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("level").textContent = `Уровень: ${levelNames[currentLevel]}`;
  document.getElementById("stats").textContent = `Правильных: ${correctAnswers} | Неправильных: ${wrongAnswers} | Вопрос: ${questionCount + 1}/10`;
}

function restartGame() {
  startGame();
}

function exitGame() {
  document.body.innerHTML = "<h1>Спасибо за игру!</h1>";
}

startGame();
