const gameBoard = function(){
    board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];

    symbols = ["X", "O"];
    moveNumber = 1;
    currentPlayer = (Math.random() < 0.5) ? symbols[0] : symbols[1];

    function checkPosition(x, y) {
        let exists = (x > 2 || y > 2 || x < 0 || y < 0);
        if (!exists) {
            let taken = (board[x][y] !== "");
            return (exists || taken);
        }
        return true;
    };

    function checkEndState() {
        const possibleLines = [[0, 0], [1, 0], [2, 0],
                               [0, 0], [0, 1], [0, 2],
                               [0, 0], [0, 2]];
        const directions =    [[0, 1], [0, 1], [0, 1],
                               [1, 0], [1, 0], [1, 0],
                               [1, 1], [1, -1]]; 
        const symbol = currentPlayer;

        function checkLine(start, direction) {
            let [x, y] = start;
            for (let i = 0; i<=2; i++) {
                if (board[x][y] !== symbol) {
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
            if (checkLine(possibleLines[i], directions[i])) {
                return true;
            };
        };
        return false;
    };

    function changeBoard(x, y, symbol) {
        board[x][y] = symbol;
        console.log(board);
    };

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer === symbols[0]) ? symbols[1] : symbols[0];
    };

    function _ending() {
        console.log(`Player ${currentPlayer} won`);
    };
    function _tie() {
        console.log(`Tie`);
    };

    function getPlayerChoice(position) {
        let [x, y] = position;
        if (checkPosition(x, y)) {
            console.log("This position doesn't exist");
        } else {
            changeBoard(x, y, currentPlayer);
            if (checkEndState()){
                _ending(currentPlayer);
            } else if( moveNumber >= 9) {
                _tie();
            }
            moveNumber += 1;
            changeCurrentPlayer();
            console.log(`Player's ${currentPlayer} turn`);
        }
    };
    
    return { board, getPlayerChoice };
}();

const displayController = function() {

    function displayBoard() {
        const board = gameBoard.board;
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
                cell.textContent = board[row_index][col_index];
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
        const board = gameBoard.board;
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            [x, y] = cell.classList[1];
            cell.textContent = board[x][y];
        });
    };

    return { displayBoard };
}();

function Player(symbol) {
    this.symbol = symbol;

    return { symbol };
};

const a = new Player("X");
const b = new Player("O");

displayController.displayBoard();