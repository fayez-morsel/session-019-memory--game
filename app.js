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
