const cells = document.querySelectorAll(".cell");
const messageContainer = document.querySelector(".message-container");
const messageText = document.querySelector(".message-text");
const newGameBtn = document.querySelector(".new-game-btn");
const changeBgBtn = document.querySelector(".change-bg-btn");

let currentPlayer = "Boy"; // Start with 'X' player
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// URLs for male and female logos

const maleLogoURL =
  "https://img.freepik.com/premium-photo/3d-cartoon-little-boy-red-hair-freckled-face-glasses-white-background_812426-4961.jpg?w=360";
const femaleLogoURL =
  "https://storage.googleapis.com/pai-images/379b336e750a4cf18d08106351b14b6b.jpeg";
// const maleLogoURL = "../images/boy.jpg";
// const femaleLogoURL = "../images/girl.jpeg";

// Function to handle a move by a player
function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === "") {
    // Update the cell content with the respective logo
    cells[cellIndex].innerHTML =
      currentPlayer === "Boy"
        ? `<img src="${maleLogoURL}" alt="Male Logo">`
        : `<img src="${femaleLogoURL}" alt="Female Logo">`;
    cells[cellIndex].classList.add("occupied");
    // Update the board with 'X' or 'O'
    board[cellIndex] = currentPlayer;
    togglePlayer();
    checkWin();
  }
}

// Function to toggle the current player
function togglePlayer() {
  currentPlayer = currentPlayer === "Boy" ? "Girl" : "Boy";
}

// Function to check for a win or draw
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      displayMessage(`${board[a]} wins!`);
      return;
    }
  }

  if (!board.includes("") && gameActive) {
    gameActive = false;
    displayMessage("It's a draw!");
  }
}

// Function to display the end-of-game message
function displayMessage(message) {
  messageText.textContent = message;
  messageContainer.style.display = "block";
}

// Event listener for cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => makeMove(index));
});

// Function to restart the game
function restartGame() {
  currentPlayer = "Boy";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  cells.forEach((cell) => {
    cell.innerHTML = ""; // Clear the cell content
    cell.classList.remove("occupied");
  });
  messageContainer.style.display = "none";
}

// Function to change the background color
function changeBackgroundColor() {
  const colors = ["#33cc33", "#0033cc", "#cc0033", "#ff9900", "#6600cc"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = `linear-gradient(to bottom, ${randomColor}, ${randomColor})`;
}

// Initial game setup
restartGame();
