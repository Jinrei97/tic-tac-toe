const gameBoard = function(){
    board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];

    function changeBoard(position, symbol) {
        let [x, y] = position;
        board[x][y] = symbol;
        console.log(board);
    }

    return { board, changeBoard };
}();

const displayController = function() {
    symbols = ["X", "O"];
    moveNumber = 1;
    currentPlayer = (Math.random() < 0.5) ? symbols[0] : symbols[1];

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer === symbols[0]) ? symbols[1] : symbols[0];
    }

    function getPlayerChoice(position) {
        gameBoard.changeBoard(position, currentPlayer);
        moveNumber += 1;
        changeCurrentPlayer();
        console.log(`Player's ${currentPlayer} turn`);
    }

    return { symbols, getPlayerChoice };
}();

function Player(symbol) {
    this.symbol = symbol;

    return { symbol };
};

const a = new Player("X");
const b = new Player("O");