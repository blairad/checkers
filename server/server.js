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
        players[playerId].playerNum = Math.floor(Math.random() * (3 - 1) + 1);
        io.emit('playerList', players);
        games[playerId] = {
            player1: players[playerId]
        }
        console.log(players)
    });

    // add player2 to game
    socket.on('pairPlayers', (playerId, gameId) => {
        games[gameId].player2 = players[playerId];
        players[playerId].playerNum = () => {
            return games[gameId][gameId].playerNum === 1 ? 2 : 1;
        };
        socket.emit('game', games[gameId] )
    } )

    // send pieces on player turn 
    socket.on('pieces', (opponentId, pieces) => {
        socket.broadcast.to(opponentId).emit('pieces', pieces);
    })
    

});
