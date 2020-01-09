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
    canCapture: false,

    setupPieces() {
        for (let i = 0; i < this.piecesTemplate.length; i++) {
            const player = this.piecesTemplate[i];
            const type = 'std';
            let piece = '';
            if (player === 1) {
                piece = newPiece(player, type);
            } else if (player === 2) {
                piece = newPiece(player, type);
            } else {
                piece = newPiece(player, 'blank');
            }
            this.pieces.push(piece);
        }
    },

    isValidMove(move, activePlayer) {
        const piecePos = move.piecePos;
        const movePos = move.movePos;
        if (this.pieces[movePos].type === 'blank') {
            if (Math.abs(movePos - piecePos) === 7 || Math.abs(movePos - piecePos) === 9) {
                if (activePlayer === 1) {
                    return movePos > piecePos;
                } else if (activePlayer === 2) {
                    return movePos < piecePos;
                }
            }
        }
    },

    isValidCaptureMove(move) {
        const piece = this.pieces[move.piecePos];
        return piece.capturePos.length > 0;
    },

    movePiece(move) {
        const pieceToMove = this.pieces[move.piecePos];
        const pieceAtMove = this.pieces[move.movePos];
        this.pieces[move.movePos] = pieceToMove;
        this.pieces[move.piecePos] = pieceAtMove;

    },

    calcCapturePositions(activePlayer, opponent) {
        const searchPositions = [[-9, -18], [-7, -14], [9, 18], [7, 14]];
        let filteredSearchPositions = [];

        if (activePlayer === 1) {
            filteredSearchPositions = searchPositions.slice(0, 2);
        } else {
            filteredSearchPositions = searchPositions.slice(2, 4);
        }

        // console.log(filteredSearchPositions);


        for (let i = 0; i < this.pieces.length; i++) {
            filteredSearchPositions.forEach(position => {
                const capturePos = (i - position[0]);
                const movePos = (i - position[1]);
                // console.log('capture pos: ', capturePos);
                // console.log('move pos: ', movePos);
                if (this.pieces[i].player === activePlayer
                    && this.pieces[capturePos].player === opponent
                    && this.pieces[movePos].type === 'blank') {
                    const captureMove = {
                        movePos: movePos,
                        capturePos: capturePos
                    };
                    this.pieces[i].capturePos.push(captureMove);
                    this.canCapture = true;
                }
            });
        }
    },

    capturePiece(move) {
        const pieceToMove = this.pieces[move.piecePos];
        const pieceAtMove = this.pieces[move.movePos];

        pieceToMove.capturePos.forEach(position => {
            console.log(position);
            if (position.movePos === move.movePos) {
                this.pieces[move.movePos] = pieceToMove;
                this.pieces[move.piecePos] = pieceAtMove;
                this.pieces[position.capturePos] = newPiece(0, 'blank');
            }
        });
    },

    clearCapturePos() {
        this.canCapture = false;
        this.pieces.forEach(piece => {
            piece.capturePos = [];
        });
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
