const game = require('./models/game.js');
// const board = require('./models/board.js');
const boardView = require('./views/boardView.js');
const gameView = require('./views/gameView');


const player1 = {
    name: "James",
    player: 1
};
const player2 = {
    name: "Andrew",
    player: 2
};

window.onload = () => {
    // everything up to click event is only called at the start.
    game.addPlayer(player1);
    game.addPlayer(player2);

    game.board.setupPieces();
    game.board.calcMovePositions(game.activePlayer);
    boardView.renderBoard(game.board.board);
    boardView.renderPieces(game.board.pieces);
    gameView.renderActivePlayer(game.activePlayer);

    document.getElementById('new-game').onclick = () => {
        console.log('butts');
        game.board.clearCapturePos();
        game.board.setupPieces();
        game.activePlayer = 1;
        game.opponent = 2;

        boardView.renderBoard(game.board.board);
        boardView.renderPieces(game.board.pieces);
        gameView.renderActivePlayer(game.activePlayer);
    };

    // this is where the players 'turn' logic happens
    document.getElementById('pieces-container').addEventListener('click', event => {
        const clickPosition = parseInt(event.target.id.split('-')[1]);
        console.log(clickPosition);

        game.addMovePosition(clickPosition);

        if (game.hasSelectedPieceAndMovePos()) {
            if (game.board.canCapture ) {
                if(game.board.isValidCaptureMove(game.move)) {
                    game.board.capturePiece(game.move);
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
                }
            } else if (game.board.canMove) {
                console.log(game.board.isValidMove(game.move));
                if (game.board.isValidMove(game.move)){
                    game.board.movePiece(game.move);
                    game.switchPlayer();
                    game.board.clearCaptureAndMovePos();
                    game.board.calcMovePositions(game.activePlayer);
                    game.board.calcCapturePositions(game.activePlayer, game.opponent);
                    console.log(game.activePlayer);
                    gameView.renderActivePlayer(game.activePlayer);
                    console.log("valid move");
                    boardView.renderPieces(game.board.pieces);
                    }
                }
            }
        console.log(game.board.canCapture);
        console.log(game.move);
        console.table(game.board.pieces);
    });



}

