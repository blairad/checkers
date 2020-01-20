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
    lossTemplate: [
        1,0,0,0,0,0,0,0,
        0,2,0,0,0,0,0,0,
        0,0,2,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
    ],
    pieces: [],
    canCapture: false,
    canMove: false,

    setupPieces() {
        this.pieces =[];
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

    // isValidMove(move, activePlayer) {
    //     const piecePos = move.piecePos;
    //     const movePos = move.movePos;


    //     if (this.pieces[movePos].type === 'blank') {
    //         if (Math.abs(movePos - piecePos) === 7 || Math.abs(movePos - piecePos) === 9) {
    //             if (this.pieces[piecePos].type === 'king'){
    //                 return true;
    //             }
    //             if (activePlayer === 1) {
    //                 return movePos > piecePos;
    //             } else if (activePlayer === 2) {
    //                 return movePos < piecePos;
    //             }
    //         }
    //     }
    // },

    isValidCaptureMove(move) {
        const piece = this.pieces[move.piecePos];
        return piece.capturePos.length > 0;
    },
    isValidMove(move) {
        const piece = this.pieces[move.piecePos];
        return piece.movePos.includes(move.movePos);
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
            if(this.pieces[i].type === "king"){
                searchPositions.forEach(position => {
                const capturePos = (i - position[0]);
                const movePos = (i - position[1]);
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
            filteredSearchPositions.forEach(position => {
                const capturePos = (i - position[0]);
                const movePos = (i - position[1]);
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

    capturePiece(move, opponentObj) {
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

                opponentObj.pieceCount -= 1;

                this.makeKing(this.pieces[move.movePos]);
            }
        });
    },

    clearCaptureAndMovePos() {
        this.canCapture = false;
        this.canMove = false;
        this.pieces.forEach(piece => {
            piece.capturePos = [];
            piece.movePos = [];

        });
    },

    makeKing(piece) {
        if (piece.player === 1 && piece.pos > 55
            || piece.player === 2 && piece.pos < 8) {
            piece.type = 'king';
        }
    },
    calcMovePositions(activePlayer) {
        const searchPositions = [-7,-9,7,9];
        let filteredSearchPositions = [];
        if (activePlayer === 1) {
            filteredSearchPositions = searchPositions.slice(0,2);
        } else {
            filteredSearchPositions = searchPositions.slice(2,4);
        };

        for (let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].type === "king"){
                searchPositions.forEach(position => {
                const movePos = (i - position);

                if (this.pieces[i].player === activePlayer
                    && this.board[movePos] === 1
                    && this.pieces[movePos].type === 'blank') {
                    this.pieces[i].movePos.push(movePos);
                    this.canMove = true;
                }
                });
            }
            filteredSearchPositions.forEach(position => {
                const movePos = (i - position);

                if (this.pieces[i].player === activePlayer
                    && this.board[movePos] === 1
                    && this.pieces[movePos].type === 'blank') {
                    this.pieces[i].movePos.push(movePos);
                    this.canMove = true;
                }
            });
        }
    }


}

module.exports = board;
