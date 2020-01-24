// importing board to serv to client
const board = require('../client/src/models/board.js'); 
board.setupPieces();
const pieces = board.pieces; 
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
    socket.adapter.rooms
    // console.log('a user connected')

    // socket.on('addPlayer', (player) => {
    //     if(players.length < 2) {
    //         if(players.length === 0) {
    //             player.player = 1;
    //         } else {
    //             player.player = 2;
    //         }
    //         players.push(player);
    //         // console.log(player);
    //         // console.log(players);
    //     }; 
    //     if (players.length === 2) {
    //         players.forEach(player => {
    //             io.to(player.id).emit('addPlayer', players);
    //         })
    //         // console.log('players sent');
    //         players = [];
    //     };     
    // });

    socket.on('joinLobby', (player) =>{
        // console.log(player);
        players[player.id] = player;
        // console.log(players);
        io.emit('playerList', players)
    });

    socket.on('playerReady', playerid =>{
        io.emit('playerReady', playerid)

        games[playerid] = {
            player1: players[playerid]
        }

        console.log(games);

        // players.forEach(player => {
        //     if(player.id === playerid){
        //         games.playerid = {
        //             player1: player
        //         }
        //         console.log('new game', games.playerid)
        //         // games.push(newGame)
        //     }
        // })
    });

    socket.on('pairPlayers', (playerId, gameId) => {
        console.log('gameId: ', gameId);
        console.log('playerId: ', playerId);
        games[gameId].player2 = players[playerId];
        console.log(games);

    } )


    socket.on('pieces', (opponentId, pieces) => {
        // console.log('pieces sent');
        // console.log('incoming: ', pieces);
        // console.log(opponentId);
        socket.broadcast.to(opponentId).emit('pieces', pieces);
    })
});
