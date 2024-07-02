const gameBoard = function(){
    this.board = [];
    for (let i = 0; i<9; i++) {
        this.board.push("");
    }

    return { board };
}();

const displayController = function() {
    symbols = ["X", "O"];
    moveNumber = 1;
    currentPlayer = (Math.random() < 0.5) ? this.symbols[0] : this.symbols[1];
    
    return { symbols };
}();

function Player(symbol) {
    this.symbol = symbol;

    return { symbol };
};

const a = new Player("X");
const b = new Player("O");