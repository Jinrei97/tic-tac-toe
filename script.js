const gameBoard = function(){
    board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];

    function _checkPositionExists(x, y) {
        return  (x > 2 || y > 2 || x < 0 || y < 0);
    };
    function checkPosition(x, y) {
        let taken = (board[x][y] !== "");
        return (_checkPositionExists(x, y) || taken);
    };

    function checkEndState() {
        const possibleLines = [[0, 0], [1, 0], [2, 0],
                               [0, 0], [0, 1], [0, 2],
                               [0, 0], [0, 2]];
        const directions =    [[0, 1], [0, 1], [0, 1],
                               [1, 0], [1, 0], [1, 0],
                               [1, 1], [1, -1]]; 
        const symbol = displayController.currentPlayer;

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

    }

    function changeBoard(x, y, symbol) {
        board[x][y] = symbol;
        console.log(board);
    }

    return { board, changeBoard, checkPosition, checkEndState };
}();

const displayController = function() {
    symbols = ["X", "O"];
    moveNumber = 1;
    currentPlayer = (Math.random() < 0.5) ? symbols[0] : symbols[1];

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer === symbols[0]) ? symbols[1] : symbols[0];
    }

    function _ending() {
        console.log(`Player ${currentPlayer} won`);
    }
    function _tie() {
        console.log(`Tie`);
    }

    function getPlayerChoice(position) {
        let [x, y] = position;
        if (gameBoard.checkPosition(x, y)) {
            console.log("This position doesn't exist");
        } else {
            gameBoard.changeBoard(x, y, currentPlayer);
            if (gameBoard.checkEndState()){
                _ending(currentPlayer);
            } else if( moveNumber >= 9) {
                _tie();
            }
            moveNumber += 1;
            changeCurrentPlayer();
            console.log(`Player's ${currentPlayer} turn`);
        }
    }

    return { symbols, getPlayerChoice, currentPlayer };
}();

function Player(symbol) {
    this.symbol = symbol;

    return { symbol };
};

const a = new Player("X");
const b = new Player("O");