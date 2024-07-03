const gameBoard = {
    board: [["", "", ""],
            ["", "", ""],
            ["", "", ""]],

    symbols: ["X", "O"],
    moveNumber: 1,
    currentSymbol: "X",
    currentPlayer: ["test", "X"],
    firstGame: true,
    player_1: 1,
    player_2: 1,
    ended: false,

    resetBoard: function() {
        this.board = [["", "", ""],
                      ["", "", ""],
                      ["", "", ""]];
        this.moveNumber = 1;
        this.currentSymbol = (Math.random() < 0.5) ? this.symbols[0] : this.symbols[1];
        this.currentPlayer = (this.currentSymbol === this.player_1.symbol) ? this.player_1 : this.player_2;
        this.ended = false;
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
        const symbol = this.currentSymbol;

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
        this.currentSymbol = (this.currentSymbol === this.symbols[0]) ? this.symbols[1] : this.symbols[0];
        this.currentPlayer = (this.currentSymbol === this.player_1.symbol) ? this.player_1 : this.player_2;
    },

    _ending: function() {
        this.ended = true;
    },

    getPlayerChoice: function(position) {
        let [x, y] = position;
        if (this.checkPosition(x, y)) {
            displayController.message("Invalid position");
        } else if (this.ended === true) {
            displayController.message("The game is over, please start a new game");
        } else {
            this.changeBoard(x, y, this.currentSymbol);
            if (this.checkEndState()){
                this._ending.call(this);
                let winner = (this.currentSymbol === this.player_1.symbol) ? this.player_1.name : this.player_2.name;
                displayController.message(`${winner} won`);
            } else if( this.moveNumber >= 9) {
                this._ending.call(this);
                displayController.message("Tie");
            } else {
                this.moveNumber += 1;
                this.changeCurrentPlayer();
                console.log(`Player's ${this.currentPlayer} turn`);
                displayController.message(`${this.currentPlayer.name}'s turn`);
            }
        }
    },
    
    startButtonEvent: function(event) {
        let name_1 = prompt("What's your name: ");
        let name_2 = prompt("What's your name: ");
        this.player_1 = new Player(name_1, "O");
        this.player_2 = new Player(name_2, "X");
        this.resetBoard();
        displayController.resetMessages();
        displayController.message(`${this.currentPlayer.name}'s turn`);
        if (this.firstGame) {
            displayController.displayBoard();
            this.firstGame = false;
        } else {
            displayController.updateBoard();
        }
    },
};

const displayController = function() {
    const text_display = document.querySelector(".text");

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
        document.querySelector(".container").appendChild(board_div);
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

    function message(msg) {
        text_display.textContent += `\n${msg}`;
    }

    function resetMessages() {
        text_display.textContent = "";
    }

    return { displayBoard, updateBoard, message, resetMessages };
}();

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
};

document.querySelector(".start").addEventListener("click", e => {
    gameBoard.startButtonEvent(e);
});