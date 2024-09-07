// script.js

const squares = document.querySelectorAll('.square');
const reset = document.querySelector('#reset');
const status = document.querySelector('#status');

let player = 'X';
let gameOver = false;
let mode; // 'AI' or 'Player'

// Initialize the game and prompt user for mode
function initializeGame() {
    mode = prompt("Do you want to play against the AI or with another player? Type 'AI' or 'Player'").toLowerCase();
    if (mode !== 'ai' && mode !== 'player') {
        alert("Invalid choice. Defaulting to Player vs Player.");
        mode = 'player';
    }
    status.textContent = "X's turn";
    gameOver = false;
}

function handleClick(square) {
    if (!gameOver && square.textContent === '') {
        square.textContent = player;
        if (checkWin()) {
            status.textContent = `${player} wins!`;
            gameOver = true;
            setTimeout(() => alert(`${player} wins!`), 100);
        } else if (isBoardFull()) {
            status.textContent = "It's a draw!";
            gameOver = true;
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            switchTurn();
            if (player === 'O' && mode === 'ai') {
                setTimeout(AI, 500); // AI makes its move after 500 milliseconds
            } else {
                status.textContent = `It's ${player}'s turn`;
            }
        }
    }
}

function AI() {
    const emptySquares = Array.from(squares).filter(square => square.textContent === '');

    if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        emptySquares[randomIndex].textContent = 'O';
        if (checkWin()) {
            status.textContent = 'O wins!';
            gameOver = true;
            setTimeout(() => alert('O wins!'), 100);
        } else if (isBoardFull()) {
            status.textContent = "It's a draw!";
            gameOver = true;
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            switchTurn();
            status.textContent = `It's ${player}'s turn`;
        }
    }
}

function switchTurn() {
    player = player === 'X' ? 'O' : 'X';
    if (!gameOver) {
        status.textContent = `It's ${player}'s turn`;
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(([a, b, c]) => 
        squares[a].textContent && 
        squares[a].textContent === squares[b].textContent && 
        squares[a].textContent === squares[c].textContent
    );
}

function isBoardFull() {
    return Array.from(squares).every(square => square.textContent !== '');
}

// Event listeners
squares.forEach(square => {
    square.addEventListener('click', () => handleClick(square));
});

reset.addEventListener('click', () => {
    squares.forEach(square => square.textContent = '');
    initializeGame();
});

// Initialize the game when the page loads
initializeGame();
