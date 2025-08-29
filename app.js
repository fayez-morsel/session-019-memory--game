const startText = document.getElementById("startText");
const statusText = document.getElementById("statusText");
const currentLevelText = document.getElementById("currentLevel");
const bestScoreText = document.getElementById("bestScore");
const playerNameText = document.getElementById("playerName");
const buttons = document.querySelectorAll(".btn");

let playerName = localStorage.getItem("playerName");
if (!playerName) {
  playerName = prompt("Enter your name:") || "Player";
  localStorage.setItem("playerName", playerName);
}
playerNameText.textContent = "👾 " + playerName;

const sounds = [
  new Audio("green.mp3"),
  new Audio("red.mp3"),
  new Audio("yellow.mp3"),
  new Audio("blue.mp3"),
];
const wrongSound = new Audio("wrong.mp3");

let sequence = [];
let playerSequence = [];
let level = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let canClick = false;
let waitingForStart = true;

bestScoreText.textContent = "Best: " + bestScore;

function playSound(index) {
  sounds[index].currentTime = 0;
  sounds[index].play();
}

function playSoundWrong() {
  wrongSound.currentTime = 0;
  wrongSound.play();
}

function flashButton(btn) {
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 400);
}

function playSequence() {
  canClick = false;
  startText.textContent = "⏳ Playing...";
  statusText.textContent = "Watch the sequence!";
  const idx = sequence[sequence.length - 1];
  const btn = document.querySelector(`.btn[data-btn='${idx}']`);

  setTimeout(() => {
    flashButton(btn);
    playSound(idx);
    setTimeout(() => {
      canClick = true;
      statusText.textContent = "Your turn!";
    }, 500);
  }, 500);
}

function nextLevel() {
  level++;
  currentLevelText.textContent = "Level: " + level;
  sequence.push(Math.floor(Math.random() * 4));
  playerSequence = [];
  waitingForStart = true;
}

function gameOver() {
  playSoundWrong();
  statusText.textContent = "❌ You Lost! Press Start";
  if (level > bestScore) {
    bestScore = level;
    localStorage.setItem("bestScore", bestScore);
    bestScoreText.textContent = "Best: " + bestScore;
  }
  sequence = [];
  level = 0;
  currentLevelText.textContent = "Level: 0";
  canClick = false;
  waitingForStart = true;
  startText.textContent = "▶ Start";
}

function handleClick(e) {
  if (!canClick) return;
  const btn = e.target;
  const index = parseInt(btn.dataset.btn);

  playSound(index);
  flashButton(btn);
  playerSequence.push(index);

  if (
    playerSequence[playerSequence.length - 1] !==
    sequence[playerSequence.length - 1]
  ) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    canClick = false;
    waitingForStart = true;
    statusText.textContent = "✅ Good! Click ▶ Next Level";
    startText.textContent = "▶ Next Level";
  }
}
