function canMoveFoarward(){
    if(game.activePlayer.colour === 'redCircle'){
    return lastSelectedPositions[1] - 8 === lastSelectedPositions[0]
    } else if (game.activePlayer.colour === 'greenCircle'){
        return lastSelectedPositions[1] + 8 === lastSelectedPositions[0]
    }
}
function canTakePiece(){
    if(game.activePlayer.colour === 'redCircle'){
        return (lastSelectedPositions[1] - 18 === lastSelectedPositions[0] 
            && board[lastSelectedPositions[1] - 9] === 'w')
            || (lastSelectedPositions[1] - 14 === lastSelectedPositions[0]
            && board[lastSelectedPositions[1] - 7] === 'w')
    } else if (game.activePlayer.colour === 'greenCircle'){
        return (lastSelectedPositions[1] + 18 === lastSelectedPositions[0]
            && board[lastSelectedPositions[1] + 9] === 'x')
            || (lastSelectedPositions[1] + 14 === lastSelectedPositions[0]
            && board[lastSelectedPositions[1] + 7] === 'x')
}
}