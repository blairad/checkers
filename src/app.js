const game = require('./models/game.js');
// const board = require('./models/board.js');
const boardView = require('./views/boardView.js');
const gameView = require('./views/gameView');

const newPlayer = (player, name) => {
    return {
        player,
        name,
        pieceCount: 12
    };
};

const player1 = newPlayer(1, 'James');
const player2 = newPlayer(2, 'Andrew');

window.onload = () => {
    // everything up to click event is only called at the start.
    game.addPlayer(player1);
    game.addPlayer(player2);

    game.board.setupPieces();
    game.board.calcMovePositions(game.activePlayer);
    boardView.renderBoard(game.board.board);
    boardView.renderPieces(game.board.pieces);
    gameView.renderActivePlayer(game.activePlayer);

    console.table(game.board.pieces);

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
                    game.board.updatePlayerPieceCount(game.players[0], game.players[1]);
                    gameView.renderActivePlayer(game.activePlayer);
                    boardView.renderPieces(game.board.pieces);
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
                    }
                }
            }
        console.log('piece count: ', game.getActivePlayer().pieceCount);
        console.log(`player ${game.checkForWinner()} is the winner!`);
        // console.log(game.board.canCapture);
        console.log(game.move);
        // console.table(game.board.pieces); });
})
};
