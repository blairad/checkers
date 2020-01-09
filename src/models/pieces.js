function piece(player, type) {
    return {
        player,
        type,
        movePos: [],
        capturePos: []
    };
};

module.exports = piece;
