const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/public')));

let players = {};

let games = {};

server.listen(port, () => {
    console.log(`listening on port ${port}`)
});

io.on('connection', (socket) => {
    // initial form submition 
    socket.on('joinLobby', (player) => {
        players[player.id] = player;
        io.emit('playerList', players)
    });

    // change player status and create game obj
    socket.on('playerReady', playerId => {
        // console.log(players[playerId])
        players[playerId].gameStatus = 'ready';
        createNewGame(playerId);
        // console.log(games);
        // console.log(games[playerId][playerId])
        // games[playerId][playerId][playerNum] = Math.floor(Math.random() * (3 - 1) + 1)
        io.emit('playerList', players);

        // console.log(players) 
    });

    // add player2 to game
    socket.on('pairPlayers', (playerId, gameId) => {
        players[playerId].gameStatus = 'in-game';
        players[gameId].gameStatus = 'in-game';
        games[gameId].push(players[playerId]);
        // players[playerId].playerNum = () => {
        //     return games[gameId][gameId].playerNum === 1 ? 2 : 1;
        // };
        assignPlayerNums(games[gameId])
        console.log(games)
        io.emit('playerList', players)
        socket.emit('game', games[gameId])
    })

    // send pieces on player turn 
    socket.on('pieces', (opponentId, pieces) => {
        socket.broadcast.to(opponentId).emit('pieces', pieces);
    })

    function createNewGame(playerId) {
        games[playerId] = [
            players[playerId]
        ]
    }

    function assignPlayerNums(game) {
        const player1RandomNum = Math.floor(Math.random() * (3 - 1) + 1);
        const player2RandomNum = player1RandomNum === 1 ? 2 : 1;
        
        const randomNums = [player1RandomNum, player2RandomNum];

        for (let i = 0; i < game.length; i++) {
            game[i].playerNum = randomNums[i];
        }
    }

});