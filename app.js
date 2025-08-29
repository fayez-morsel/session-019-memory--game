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