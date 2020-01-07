const game = {
    players: [],
    activePlayer: 1,
    move: {piecePos: '', movePos: ''},

    addPlayer(player) {
        this.players.push(player);
    }
}

module.exports = game;


