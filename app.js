const availablePlayablePieces = [];

// checks for click events from player - so that correct piece is chosen, then makes move
piecesContainer.addEventListener('click', event => {
    
    console.log('hello', canTakeOpponentPiece());

    if (firstClickIsPlayerPiece(event)) {
        console.log('first click', true);
        console.log(lastSelectedPositions);
        lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
    } else if (lastSelectedPositions.length === 1 && event.target.className === 'blank') {
        console.log('second click', true);
        console.log(lastSelectedPositions);
        lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
    }

    if (lastSelectedPositions.length == 2 && canMoveFoarward() ||
        lastSelectedPositions.length == 2 && canTakePiece()) {
        swapPositions(lastSelectedPositions);
        removePiece();
        updatePieces();
        lastSelectedPositions = [];
        changeActivePlayer();
    }
    console.log('jobby', availablePlayablePieces);
});


function changeActivePlayer() {
    if (game.activePlayer === player1) {
        game.activePlayer = player2;
        document.getElementById('active-player').style['background-color'] = 'green';
    } else {
        game.activePlayer = player1;
        document.getElementById('active-player').style['background-color'] = 'red';
    }
}

function firstClickIsPlayerPiece(event) {
    return (lastSelectedPositions.length === 0 && event.target.className === game.activePlayer.colour);
}

// returns a boolean after determining whether player has opponent piece available to take
// only works for red player at the moment!!!!!
function canTakeOpponentPiece() {
    let result = false;
    for (i = 0; i < board.length; i++) {
        if ((board[i] === 'r' && board[i + 7] === 'g' && board[i + 14] === 'o')
            || (board[i] == 'r' && board[i + 9] === 'g' && board[i + 18] === 'o')) {
            availablePlayablePieces.push(i);
            result = true;
        }
    }
    return result;
}


