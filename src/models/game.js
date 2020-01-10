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
        } else if (this.move.piecePos != ''){
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
        if(!this.board.canCapture && !this.board.canMove || this.activePlayer === this.checkForNoPieces()){
            return this.opponent
        }
        
    },
    checkForNoPieces(){
        this.players.forEach(player => {
            if (player.pieces === 0) {
                return player.player
            }
        })
    }

}

module.exports = game;


