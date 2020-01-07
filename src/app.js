const game = require('./models/game.js');
const board = require('./models/board.js');
const boardView = require('./views/boardView.js');


const player1 = {
    name: "James",
    player: 1
};
const player2 = {
    name: "Andrew",
    player: 2
};

window.onload = () => {
    game.addPlayer(player1);
    game.addPlayer(player2);

    board.setupPieces();
    console.table(board.pieces);

    boardView.renderBoard(board.board);
    boardView.renderPieces(board.pieces);
}

// const availablePlayablePieces = [];



// // checks for click events from player - so that correct piece is chosen, then makes move
// piecesContainer.addEventListener('click', event => {
//     turn(event)

//     function turn(event) {
//         let pieceIndex = event.target.id.split('-')[1];
//         console.log("attacking move?", availablePlayablePieces)
//         console.log("previous position", lastSelectedPositions)
//         console.log("pieces index", pieceIndex)


//         if (isFirstClickPlayerPiece(event)) {
//             // console.log('first click', true);
//             // console.log(lastSelectedPositions);
//             if (availablePlayablePieces.length > 0) {

//                 if (availablePlayablePieces.includes(parseInt(pieceIndex))) {
//                     console.log('includes', pieceIndex)
//                     lastSelectedPositions.push(parseInt(pieceIndex));
//                 }
//             } else {
//                 lastSelectedPositions.push(parseInt(pieceIndex));
//             }
//         } else if (isSecondClickBlank(event)) {
//             console.log('second click', true);
//             console.log(lastSelectedPositions);
//             lastSelectedPositions.push(parseInt(pieceIndex));
//         }

//         if (lastSelectedPositions.length == 2 && canMoveFoarward() ||
//             lastSelectedPositions.length == 2 && canTakePiece()) {
//             swapPositions(lastSelectedPositions);
//             removePiece();
//             updatePieces();
//             lastSelectedPositions = [];
//             // changeActivePlayer();
//             collectCapturePiecesIndex(changeActivePlayer());
//             console.log("attacking move?", availablePlayablePieces)

//         }
//     }
// });

// function changeActivePlayer() {
//     if (game.activePlayer === player1) {
//         game.activePlayer = player2;
//         document.getElementById('active-player').style['background-color'] = 'green';
//         return player2
//     } else {
//         game.activePlayer = player1;
//         document.getElementById('active-player').style['background-color'] = 'red';
//         return player1
//     }
// }

// function isFirstClickPlayerPiece(event) {
//     return (lastSelectedPositions.length === 0 && event.target.className === game.activePlayer.colour);
// }

// function isSecondClickBlank(event) {
//     return lastSelectedPositions.length === 1 && event.target.className === 'blank';
// }

// // returns a boolean after determining whether player has opponent piece available to take
// // only works for red player at the moment!!!!!
// // function canTakeOpponentPiece() {
// //     let result = false;
// //     for (i = 0; i < board.length; i++) {
// //         if ((board[i] === 'r' && board[i + 7] === 'g' && board[i + 14] === 'o')
// //             || (board[i] == 'r' && board[i + 9] === 'g' && board[i + 18] === 'o')) {
// //             availablePlayablePieces.push(i);
// //             result = true;
// //         }
// //     }
// //     return result;
// // }

// function collectCapturePiecesIndex(player) {
//     let capturePieceFound = false
//     const playablePiece = {
//         pieceIndex: 0,
//         captureIndex: []
//     }
//     // checks both positions in attack to see if they are free and poushes to array if they are
//     if (player === player1) {
//         for (i = 0; i < board.length; i++) {

//             if (board[i] === 'r' && board[i + 7] === 'g' && board[i + 14] === 'o') {
//                 playablePiece.captureIndex.push(i + 14)
//                 playablePiece.pieceIndex = i;
//                 capturePieceFound = true;
//             }
//             if (board[i] == 'r' && board[i + 9] === 'g' && board[i + 18] === 'o') {
//                 playablePiece.captureIndex.push(i + 18)
//                 playablePiece.pieceIndex = i;
//                 capturePieceFound = true;
//             }
//             if (capturePieceFound) {
//                 availablePlayablePieces.push(playablePiece)
//                 capturePieceFound = false;
//             }
//         }
//     } else {
//         for (i = 0; i < board.length; i++) {
//             let capturePieceFound = false
//             if (board[i] === 'g' && board[i - 7] === 'r' && board[i - 14] === 'o') {
//                 availablePlayablePieces.push(i - 14)
//                 playablePiece.pieceIndex = i;
//                 capturePieceFound = true;
//             }
//             if (board[i] == 'g' && board[i - 9] === 'r' && board[i - 18] === 'o') {
//                 playablePiece.captureIndex.push(i - 18)
//                 playablePiece.pieceIndex = i;
//                 capturePieceFound = true;
//             }

//             if (capturePieceFound) {
//                 availablePlayablePieces.push(playablePiece)
//                 capturePieceFound = false;
//             }
//         }
//     }
// }



