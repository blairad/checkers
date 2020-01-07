function piece(player, type, pos) {
    return {
        player,
        type,
        pos,
        movePos: [],
        capturPos: []
    };
};

module.exports = piece;
