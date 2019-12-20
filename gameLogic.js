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
 
function removePiece(){
    let leftOrRight = lastSelectedPositions[1] - lastSelectedPositions[0]
        if(game.activePlayer.colour === 'redCircle'){
        if(leftOrRight === 18){
            board[lastSelectedPositions[0] + 9] = 'o'
        } else if (leftOrRight === 14){
            board[lastSelectedPositions[0] + 7] = 'o'
        } 
    }
    if(game.activePlayer.colour === 'greenCircle'){
        if(leftOrRight === -18){
            board[lastSelectedPositions[0] - 9] = 'o'
        } else if (leftOrRight === -14 ){
            board[lastSelectedPositions[0] - 7] = 'o'
        } 
    }
console.log(leftOrRight);

}
