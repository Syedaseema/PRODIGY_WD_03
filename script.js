const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !running) {
        return;
    }

    board[index] = currentPlayer;
    this.innerText = currentPlayer;
    checkWinner();
}

function switchPlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = `${currentPlayer} Wins!`;
            running = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "Draw!";
        running = false;
        return;
    }

    switchPlayer();
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerText = "");
    statusText.innerText = "";
    running = true;
}