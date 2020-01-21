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

players = [];

server.listen(port, () => {
    console.log(`listening on port ${port}`)
});

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('addPlayer', (player) => {
        if(players.length < 2) {
            if(players.length === 0) {
                player.player = 1;
            } else {
                player.player = 2;
            }
            players.push(player);
            console.log(player);
            console.log(players);
        }; 
        if (players.length === 2) {
            io.emit('addPlayer', players);
            console.log('players sent');
        };     
    });

    socket.on('pieces', (pieces) => {
        console.log('pieces sent');
        console.log(pieces);
        socket.broadcast.emit('pieces', pieces);
    })
});
