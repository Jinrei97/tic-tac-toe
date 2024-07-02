const gameBoard = function(){
    board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];

    function checkPosition(x, y) {
        return (x > 2 || y > 2 || x < 0 || y < 0);
    }

    function changeBoard(x, y, symbol) {
        board[x][y] = symbol;
        console.log(board);
    }

    return { board, changeBoard, checkPosition };
}();

const displayController = function() {
    symbols = ["X", "O"];
    moveNumber = 1;
    currentPlayer = (Math.random() < 0.5) ? symbols[0] : symbols[1];

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer === symbols[0]) ? symbols[1] : symbols[0];
    }

    function getPlayerChoice(position) {
        let [x, y] = position;
        if (gameBoard.checkPosition(x, y)) {
            console.log("This position doesn't exist");
        } else {
            gameBoard.changeBoard(x, y, currentPlayer);
            moveNumber += 1;
            changeCurrentPlayer();
            console.log(`Player's ${currentPlayer} turn`);
        }
    }

    return { symbols, getPlayerChoice };
}();

function Player(symbol) {
    this.symbol = symbol;

    return { symbol };
};

const a = new Player("X");
const b = new Player("O");