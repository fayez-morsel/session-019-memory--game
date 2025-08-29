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
