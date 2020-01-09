function piece(player, type, pos) {
    return {
        player,
        type,
        pos,
        movePos: [],
        capturePos: []
    };
};

module.exports = piece;
