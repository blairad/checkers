const board = require('./board.js');

const game = {
    players: [],
    activePlayer: 1,
    board: board,
    move: {piecePos: '', movePos: ''},

    addPlayer(player) {
        this.players.push(player);
    },

    clearMove() {
        this.move = {piecePos: '', movePos: ''};
    },

    addMovePosition(pos) {
        if (this.board.pieces[pos].player === this.activePlayer) {
            this.clearMove();
            this.move.piecePos = pos;
        } else if (this.move.piecePos != ''){
            this.move.movePos = pos;
        }
    },
    switchPlayer(){
        if(this.activePlayer === 1 ){
            this.activePlayer = 2
        }else {
            this.activePlayer = 1
        }
    }

}

module.exports = game;


