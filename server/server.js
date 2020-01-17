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

server.listen(port, () => {
    console.log(`listening on port ${port}`)
});

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('pieces', (pieces) => {
        console.log('pieces sent');
        console.log(pieces);
        socket.broadcast.emit('pieces', pieces);
    })
});
