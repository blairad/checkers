// importing board to serv to client
const board = require('../src/models/board.js'); 
const pieces = board.setupPieces();
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`listening on port ${port}`)
});


