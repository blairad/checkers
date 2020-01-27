const socket = require('socket.io-client')();
const game = require('./models/game.js');
const board = require('./models/board.js');
const gameView = require('./views/gameView.js');
const lobbyView = require('./views/lobbyView.js')

let youArePlayer = 0;
let opponentId = 0;


window.onload = () => {
    // FORM 
    // player join lobby on form submition
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const player = {
            name: event.target.name.value,
            id: socket.id,
            gameStatus: 'waiting'
        };
        socket.emit('joinLobby', player);
    });

    // LOBBY
    // renders player list
    socket.on('playerList', (players) => {
        lobbyView.renderPlayers(players);
    });

    // ready game for player by sending player id to create game
    document.querySelector('#player-ready').addEventListener('click', () => {
        socket.emit('playerReady', socket.id)
    });

    // listen to player joining game, send player id and game id
    document.getElementById('players').addEventListener('click', event => {
        const playerId = socket.id;
        const gameId = event.target.id;
        socket.emit('pairPlayers', playerId, gameId);
    })

    // GAME
    // assigning opponent / rotating board / showing game
    socket.on('game', (readyGame) => {
        readyGame.forEach(player => {
            game.addPlayer(player);
            if (player.id === socket.id) {
                youArePlayer = player.playerNum;
            } else {
                opponentId = player.id;
            }
        });
        if (youArePlayer === 1) {
            document.querySelector('#pieces-container').style.transform = 'rotate(180deg)';
        }
        document.querySelector('form').hidden = true;
        document.getElementById('lobby').hidden = true;
        document.getElementById('game').hidden = false;
    })

    // initial setup of game
    game.board.setupPieces();
    game.board.calcMovePositions(game.activePlayer);
    gameView.renderBoard(game.board.board);
    gameView.renderPieces(game.board.pieces);
    gameView.renderActivePlayer(game.activePlayer);

    // resets board for new game
    document.getElementById('new-game').onclick = () => {
        game.board.clearCaptureAndMovePos();
        game.board.setupPieces();
        game.activePlayer = 1;
        game.opponent = 2;

        gameView.renderBoard(game.board.board);
        gameView.renderPieces(game.board.pieces);
        gameView.renderActivePlayer(game.activePlayer);
    };

    // receives pieces from opponent turn 
    socket.on('pieces', (pieces) => {
        game.board.pieces = pieces;
        gameView.renderPieces(game.board.pieces);
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

        // can only make move if player has selected own piece
        if (playerSelectedPieceNum === youArePlayer || playerSelectedPieceNum === 0) {
            game.addMovePosition(clickPosition);
            if (game.hasSelectedPieceAndMovePos()) {
                if (game.board.canCapture) {
                    if (game.board.isValidCaptureMove(game.move)) {
                        game.board.capturePiece(game.move, game.getOpponent());
                        game.board.clearCaptureAndMovePos();
                        game.board.calcMovePositions(game.activePlayer);
                        game.board.calcCapturePositions(game.activePlayer, game.opponent);
                        if (!game.board.canCapture) {
                            game.switchPlayer();
                            game.board.clearCaptureAndMovePos();
                            game.board.calcMovePositions(game.activePlayer);
                            game.board.calcCapturePositions(game.activePlayer, game.opponent);
                        }
                        gameView.renderActivePlayer(game.activePlayer);
                        gameView.renderPieces(game.board.pieces);
                        socket.emit('pieces', opponentId, game.board.pieces);
                    }
                } else if (game.board.canMove) {
                    if (game.board.isValidMove(game.move)) {
                        game.board.movePiece(game.move);
                        game.switchPlayer();
                        game.board.clearCaptureAndMovePos();
                        game.board.calcMovePositions(game.activePlayer);
                        game.board.calcCapturePositions(game.activePlayer, game.opponent);
                        gameView.renderActivePlayer(game.activePlayer);
                        gameView.renderPieces(game.board.pieces);
                        socket.emit('pieces', opponentId, game.board.pieces);
                    }
                }
            }
        }
    });
};