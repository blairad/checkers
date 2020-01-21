const socket = require('socket.io-client')();
const game = require('./models/game.js');
// const board = require('./models/board.js');
const boardView = require('./views/boardView.js');
const gameView = require('./views/gameView');

// const newPlayer = (player, name) => {
//     return {
//         player,
//         name,
//         pieceCount: 12
//     };
// };

// const player1 = newPlayer(1, 'James');
// const player2 = newPlayer(2, 'Andrew');
let youArePlayer = 0;

window.onload = () => {
    // everything up to click event is only called at the start.
    // game.addPlayer(player1);
    // game.addPlayer(player2);

    game.board.setupPieces();
    game.board.calcMovePositions(game.activePlayer);
    boardView.renderBoard(game.board.board);
    boardView.renderPieces(game.board.pieces);
    gameView.renderActivePlayer(game.activePlayer);
    console.table(game.board.pieces);

    document.getElementById('new-game').onclick = () => {
        game.board.clearCapturePos();
        game.board.setupPieces();
        game.activePlayer = 1;
        game.opponent = 2;

        boardView.renderBoard(game.board.board);
        boardView.renderPieces(game.board.pieces);
        gameView.renderActivePlayer(game.activePlayer);
    };

    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const player = {
            name: event.target.name.value,
            player: +event.target.player.value, 
            id: socket.id
        };
        socket.emit('addPlayer', player);
    });

    socket.on('addPlayer', (players) => {
        players.forEach(player => {
            player.pieceCount = 12;
            game.addPlayer(player);
            if(player.id === socket.id) {
                youArePlayer = player.player;
            }
        });
        console.log(game.players);
        console.log(youArePlayer);
        if(youArePlayer === 1) {
            document.querySelector('#pieces-container').style.transform = 'rotate(180deg)';
        }
    })


    socket.on('pieces', (pieces) => {
        game.board.pieces = pieces;
        boardView.renderPieces(game.board.pieces);
        game.switchPlayer();
        gameView.renderActivePlayer(game.activePlayer);
        game.board.clearCaptureAndMovePos();
        game.board.calcMovePositions(game.activePlayer);
        game.board.calcCapturePositions(game.activePlayer, game.opponent);
    })

    // this is where the players 'turn' logic happens
    document.getElementById('pieces-container').addEventListener('click', event => {
        const clickPosition = +event.target.id.split('-')[1];
        let playerSelectedPieceNum = game.board.pieces[clickPosition].player;


        console.log('you are player: ', youArePlayer);
        console.log('selected piece player: ', playerSelectedPieceNum);
        console.log('click position: ', clickPosition);

        // can only make move if player has selected own piece
        if (playerSelectedPieceNum === youArePlayer || playerSelectedPieceNum === 0) {
            console.log('youre in!');

            game.addMovePosition(clickPosition);

            if (game.hasSelectedPieceAndMovePos()) {
                if (game.board.canCapture ) {
                    if(game.board.isValidCaptureMove(game.move)) {
                        game.board.capturePiece(game.move, game.getOpponent());
                        game.board.clearCaptureAndMovePos();
                        game.board.calcMovePositions(game.activePlayer);
                        game.board.calcCapturePositions(game.activePlayer, game.opponent);
                        if (!game.board.canCapture) {
                            game.switchPlayer();
                            game.board.clearCaptureAndMovePos();
                            game.board.calcMovePositions(game.activePlayer);
                            game.board.calcCapturePositions(game.activePlayer, game.opponent);
                            gameView.renderActivePlayer(game.activePlayer);
                            boardView.renderPieces(game.board.pieces);
                        }
                        gameView.renderActivePlayer(game.activePlayer);
                        boardView.renderPieces(game.board.pieces);
                        socket.emit('pieces', game.board.pieces);
                    }
                } else if (game.board.canMove) {
                    console.log(game.board.isValidMove(game.move));
                    if (game.board.isValidMove(game.move)){
                        game.board.movePiece(game.move);
                        console.log('active player: ', game.activePlayer);
                        game.switchPlayer();
                        console.log('active player: ', game.activePlayer);
                        game.board.clearCaptureAndMovePos();
                        game.board.calcMovePositions(game.activePlayer);
                        game.board.calcCapturePositions(game.activePlayer, game.opponent);
                        console.log(game.activePlayer);
                        gameView.renderActivePlayer(game.activePlayer);
                        console.log("valid move");
                        boardView.renderPieces(game.board.pieces);
                        socket.emit('pieces', game.board.pieces);
                    }
                }
            }
        }
        console.log('piece count: ', game.getActivePlayer().pieceCount);
        console.log(`player ${game.checkForWinner()} is the winner!`);
        // console.log(game.board.canCapture);
        console.log(game.move);
        // console.table(game.board.pieces); });
    });
};
