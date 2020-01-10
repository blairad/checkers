const board = require('./board.js');

const game = {
    players: [],
    activePlayer: 1,
    opponent: 2,
    board: board,
    move: {piecePos: '', movePos: ''},

    addPlayer(player) {
        this.players.push(player);
    },

    getActivePlayer() {
        return this.activePlayer === 1 ? this.players[0] : this.players[1];
    },

    getOpponent() {
        return this.opponent === 1 ? this.players[0] : this.players[1];
    },

    clearMove() {
        this.move = {piecePos: '', movePos: ''};
    },

    hasSelectedPieceAndMovePos() {
        return this.move.piecePos !== '' && this.move.movePos !== '';
    },

    addMovePosition(pos) {
        if (this.board.pieces[pos].player === this.activePlayer) {
            this.clearMove();
            this.move.piecePos = pos;
        } else if (this.move.piecePos !== ''){
            this.move.movePos = pos;
        }
    },
    switchPlayer(){
        if(this.activePlayer === 1 ){
            this.activePlayer = 2;
            this.opponent = 1;
        }else {
            this.activePlayer = 1;
            this.opponent = 2;
        }
    },

    checkForWinner(){
        if(!this.board.canCapture && !this.board.canMove
           || this.getActivePlayer().pieceCount === 0){
            return this.opponent;
        }
    },

}

module.exports = game;


