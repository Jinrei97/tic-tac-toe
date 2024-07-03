const gameBoard = {
    board: [["", "", ""],
            ["", "", ""],
            ["", "", ""]],

    symbols: ["X", "O"],
    moveNumber: 1,
    currentPlayer: "X",
    firstGame: true,

    resetBoard: function() {
        this.board = [["", "", ""],
                      ["", "", ""],
                      ["", "", ""]];
        this.moveNumber = 1;
        this.currentPlayer = (Math.random() < 0.5) ? this.symbols[0] : this.symbols[1];
    },

    checkPosition: function(x, y) {
        let exists = (x > 2 || y > 2 || x < 0 || y < 0);
        if (!exists) {
            let taken = (this.board[x][y] !== "");
            return (exists || taken);
        }
        return true;
    },

    checkEndState: function() {
        const possibleLines = [[0, 0], [1, 0], [2, 0],
                               [0, 0], [0, 1], [0, 2],
                               [0, 0], [0, 2]];
        const directions =    [[0, 1], [0, 1], [0, 1],
                               [1, 0], [1, 0], [1, 0],
                               [1, 1], [1, -1]]; 
        const symbol = this.currentPlayer;

        function checkLine(start, direction) {
            let [x, y] = start;
            for (let i = 0; i<=2; i++) {
                if (this.board[x][y] !== symbol) {
                    return false;
                }
                x += direction[0];
                y += direction[1];
                if (i === 2) {
                    return true;
                }
            }
            return false;
        };

        for (let i = 0; i < possibleLines.length; i++) {
            if (checkLine.call(this, possibleLines[i], directions[i])) {
                return true;
            };
        };
        return false;
    },


    changeBoard: function(x, y, symbol) {
        this.board[x][y] = symbol;
        console.log(this.board);
    },

    changeCurrentPlayer: function() {
        this.currentPlayer = (this.currentPlayer === this.symbols[0]) ? this.symbols[1] : this.symbols[0];
    },

    _ending: function() {
        console.log(`Player ${this.currentPlayer} won`);
    },
    _tie: function() {
        console.log(`Tie`);
    },

    getPlayerChoice: function(position) {
        let [x, y] = position;
        if (this.checkPosition(x, y)) {
            console.log("This position doesn't exist");
        } else {
            this.changeBoard(x, y, this.currentPlayer);
            if (this.checkEndState()){
                this._ending(this.currentPlayer);
            } else if( this.moveNumber >= 9) {
                this._tie();
            }
            this.moveNumber += 1;
            this.changeCurrentPlayer();
            console.log(`Player's ${this.currentPlayer} turn`);
        }
    },
    
    startButtonEvent: function(event) {
        let name_1 = prompt("What's your name: ");
        let name_2 = prompt("What's your name: ");
        delete player_1;
        delete player_2;
        const player_1 = new Player(name_1, "O");
        const player_2 = new Player(name_2, "X");
        this.resetBoard();
        if (this.firstGame) {
            displayController.displayBoard();
            this.firstGame = false;
        } else {
            displayController.updateBoard();
        }
    },
};

const displayController = function() {

    function displayBoard() {
        const board_div = document.createElement("div");
        board_div.className = "board";
        for (let row_index = 0; row_index <= 2; row_index++) {
            const row = document.createElement("div");
            row.className = "row";
            row.classList.add(`${row_index}`);
            for (let col_index = 0; col_index <= 2; col_index++) {
                const cell = document.createElement("button");
                cell.className = "cell";
                cell.classList.add(`${row_index}${col_index}`);
                cell.textContent = gameBoard.board[row_index][col_index];
                cell.addEventListener("click", e => {
                    cellClick(e);
                });
                row.appendChild(cell);
            }
            board_div.appendChild(row);
        }
        document.querySelector("body").appendChild(board_div);
    };

    function cellClick(event) {
        const cell = event.target;
        position = cell.classList[1];
        gameBoard.getPlayerChoice(position);
        updateBoard();
    };

    function updateBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            [x, y] = cell.classList[1];
            cell.textContent = gameBoard.board[x][y];
        });
    };

    return { displayBoard, updateBoard };
}();

function Player(name, symbol) {
    this.symbol = symbol;

    return { symbol };
};

document.querySelector(".start").addEventListener("click", e => {
    gameBoard.startButtonEvent(e);
});