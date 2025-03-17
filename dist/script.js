class Puissance4 {
    constructor() {
        this.boardElement = document.querySelector(".board");
        this.statusElement = document.querySelector(".status");
        this.winnerElement = document.querySelector(".winner");
        this.resetBtn = document.getElementById("reset-btn");
        this.undoBtn = document.getElementById("back");
        this.startBtn = document.getElementById("start-game");
        this.colonneInput = document.getElementById("cols"); 
        this.ligneInput = document.getElementById("rows");

        this.rows = 6; 
        this.cols = 7; 
        this.gameBoard = [];
        this.currentPlayer = "red";
        this.isGameOver = false;
        this.moveHistory = [];

        this.bindEvents();
    }

    bindEvents() {
        this.startBtn.addEventListener("click", () => this.startGame());
        this.resetBtn.addEventListener("click", () => this.resetGame());
        this.boardElement.addEventListener("click", (e) => this.handleCellClick(e));
        this.undoBtn.addEventListener("click", () => this.undoMove());
    }

    startGame() {
        const cols = parseInt(this.colonneInput.value);
        const rows = parseInt(this.ligneInput.value);

        
        if (cols >= 4 && rows >= 4) {
            this.cols = cols;
            this.rows = rows;
        }

        this.grilleSet(); 
        document.querySelector(".grid-settings").style.display = "none"; 
    }

    resetGame() {
        this.grilleSet(); 
        this.winnerElement.innerText = ""; 
        this.isGameOver = false; 
    }

    grilleSet() {
        this.gameBoard = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        this.boardElement.innerHTML = "";
        this.isGameOver = false; 
        this.moveHistory = []; 

        this.boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const disc = document.createElement("div");
                disc.classList.add("cell");
                disc.setAttribute("data-col", c);
                disc.setAttribute("data-row", r);
                this.boardElement.appendChild(disc);
            }
        }

        this.jouerActuel(); 
    }

    handleCellClick(e) {
        if (!this.isGameOver && e.target.classList.contains("cell")) {
            const col = parseInt(e.target.getAttribute("data-col"));
            for (let row = this.rows - 1; row >= 0; row--) {
                let clickedCell = this.boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (!clickedCell.classList.contains("red") && !clickedCell.classList.contains("yellow")) {
                    clickedCell.classList.add(this.currentPlayer);
                    this.gameBoard[row][col] = this.currentPlayer;
                    this.moveHistory.push({ row, col, playerColor: this.currentPlayer });

                    clickedCell.classList.add('fall'); 

                    if (this.winCheck()) {
                        this.winnerElement.innerText = `${this.currentPlayer.toUpperCase()} wins!`;
                        this.isGameOver = true;
                        return;
                    }

                    this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red";
                    this.jouerActuel();
                    break;
                }
            }
        }
    }

    winCheck() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c <= this.cols - 4; c++) {
                const player = this.gameBoard[r][c];
                if (player && player === this.gameBoard[r][c + 1] && player === this.gameBoard[r][c + 2] && player === this.gameBoard[r][c + 3]) {
                    return true;
                }
            }
        }

        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r <= this.rows - 4; r++) {
                const player = this.gameBoard[r][c];
                if (player && player === this.gameBoard[r + 1][c] && player === this.gameBoard[r + 2][c] && player === this.gameBoard[r + 3][c]) {
                    return true;
                }
            }
        }

        for (let r = 0; r <= this.rows - 4; r++) {
            for (let c = 0; c <= this.cols - 4; c++) {
                const player = this.gameBoard[r][c];
                if (player && player === this.gameBoard[r + 1][c + 1] && player === this.gameBoard[r + 2][c + 2] && player === this.gameBoard[r + 3][c + 3]) {
                    return true;
                }
            }
        }

        for (let r = 3; r < this.rows; r++) {
            for (let c = 0; c <= this.cols - 4; c++) {
                const player = this.gameBoard[r][c];
                if (player && player === this.gameBoard[r - 1][c + 1] && player === this.gameBoard[r - 2][c + 2] && player === this.gameBoard[r - 3][c + 3]) {
                    return true;
                }
            }
        }

        return false;
    }

    jouerActuel() {
        const currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
        currentPlayerDisplay.innerText = `Au tour du joueur: ${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}`;
    }

    undoMove() {
        if (this.moveHistory.length > 0) {
            const lastMove = this.moveHistory.pop();
            const { row, col, playerColor } = lastMove;

            const cell = this.boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.classList.remove(playerColor);
            this.gameBoard[row][col] = null;

            this.currentPlayer = (this.currentPlayer === 'red') ? 'yellow' : 'red';
            this.jouerActuel();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Puissance4();
});
