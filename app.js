// checks for click events from player - so that correct piece is chosen, then makes move
piecesContainer.addEventListener('click', event => {
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
