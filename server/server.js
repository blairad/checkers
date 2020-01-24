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
    socket.on('joinLobby', (player) =>{
        players[player.id] = player;
        io.emit('playerList', players)
    });

    // change player status and create game obj
    socket.on('playerReady', playerId =>{
        players[playerId].gameStatus = 'ready';
        players[playerId].playerNum = 1;
        io.emit('playerList', players);
        games[playerId] = {
            player1: players[playerId]
        }
    });

    // add player2 to game
    socket.on('pairPlayers', (playerId, gameId) => {
        players[playerId].playerNum = 2;
        games[gameId].player2 = players[playerId];
    } )

    // send pieces on player turn 
    socket.on('pieces', (opponentId, pieces) => {
        socket.broadcast.to(opponentId).emit('pieces', pieces);
    })
});
