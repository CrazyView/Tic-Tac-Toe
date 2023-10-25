// Define variables
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['','','','','','','','','',''];
let gameActive = true;

// Win conditions
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Event listeners
cells.forEach(cell => cell.addEventListener('click', cellClick));
restartButton.addEventListener('click', restartGame);

// Handle cell click
function cellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-index'));

  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      endGame(false);
      message.textContent = `${currentPlayer} wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
      endGame(true);
      message.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `${currentPlayer}'s turn`;
    }
  }
}

// Check for a win
function checkWin(player) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
      return true;
    }
  }
  return false;
}

// End the game
function endGame(isDraw) {
  gameActive = false;
  cells.forEach(cell => cell.classList.add('disabled'));
  restartButton.style.display = 'block';
}

// Restart the game
function restartGame() {
  gameBoard = ['','','','','','','','','',''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'disabled');
  });
  message.textContent = `${currentPlayer}'s turn`;
  restartButton.style.display = 'none';
}

// Initialize the game
restartGame();
