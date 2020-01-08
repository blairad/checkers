const newPiece = require('./pieces.js');

const board = {
    board: [
        1,0,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,
        1,0,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,
        1,0,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,
        1,0,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,
    ],
    piecesTemplate: [
        1,0,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,
        1,0,1,0,1,0,1,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,2,0,2,0,2,0,2,
        2,0,2,0,2,0,2,0,
        0,2,0,2,0,2,0,2,
    ],
    pieces: [],

    setupPieces() {
        for (let i = 0; i < this.piecesTemplate.length; i++) {
            const player = this.piecesTemplate[i];
            const type = 'std';
            const pos = i;
            let piece = '';
            if (player === 1) {
                piece = newPiece(player, type, pos);
            } else if (player === 2) {
                piece = newPiece(player, type, pos);
            } else {
                piece = newPiece(player, 'blank', pos);
            }
            this.pieces.push(piece);
        }
    },

    isValidMove(move, activePlayer) {
        const piecePos = move.piecePos;
        const movePos = move.movePos;
        // console.log(activePlayer)
        // console.log( "move", move)
        
        if (Math.abs(movePos - piecePos === 7) || Math.abs(movePos - piecePos === 9)) {
            if (activePlayer === 1) {
                return movePos > piecePos;
            } else if (activePlayer === 2) {
                
                return movePos < piecePos;
            }
        }
    },

    movePiece(move) {
        const pieceToMove = this.pieces[move.piecePos];
        const pieceAtMove = this.pieces[move.movePos];
        this.pieces[move.movePos] = pieceToMove;
        this.pieces[move.piecePos] = pieceAtMove;

    }



// function swapPositions(positionArray) {
//     let pos1 = board[positionArray[0]];
//     let pos2 = board[positionArray[1]];
//     console.log('pos1', pos1);
//     console.log('pos2', pos2);
//     board[positionArray[1]] = pos1;
//     board[positionArray[0]] = pos2;

//     console.log('last clicked pos', board[positionArray[1]]);
// }

// function updatePieces() {
//     piecesContainer.innerHTML = '';
//     renderPieces();
// }

// // addPosition();
// renderBoard();
// renderPieces();
// // console.log(board);

// function playerTurn() {

// }

}

module.exports = board;
