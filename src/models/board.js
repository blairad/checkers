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
        pieceToMove.pos = move.movePos;
        pieceAtMove.pos = move.piecePos;
        this.pieces[move.movePos] = pieceToMove;
        this.pieces[move.piecePos] = pieceAtMove;

        this.makeKing(this.pieces[move.movePos]);

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
                    && this.board[movePos] === 1
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
        pieceToMove.pos = move.movePos;
        pieceAtMove.pos = move.piecePos;

        pieceToMove.capturePos.forEach(position => {
            console.log(position);
            if (position.movePos === move.movePos) {
                this.pieces[move.movePos] = pieceToMove;
                this.pieces[move.piecePos] = pieceAtMove;
                this.pieces[position.capturePos] = newPiece(0, 'blank', position.capturePos);

                this.makeKing(this.pieces[move.movePos]);
            }
        });
    },

    clearCapturePos() {
        this.canCapture = false;
        this.pieces.forEach(piece => {
            piece.capturePos = [];
        });
    },

    makeKing(piece) {
        if (piece.player === 1 && piece.pos > 55
            || piece.player === 2 && piece.pos < 8) {
            piece.type = 'king';
        }
    }


}

module.exports = board;
