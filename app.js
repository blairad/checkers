piecesContainer.addEventListener('click', event => {
    console.log(event.target.className)
    if(event.target.className === game.activePlayer.colour || event.target.className === "blank"){
        if (lastSelectedPositions.length < 2) {
            lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
        } else {
            lastSelectedPositions.shift();
            lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
        }
        if (lastSelectedPositions.length == 2) {
            swapPositions(lastSelectedPositions);
            updatePieces();
            lastSelectedPositions = [];
        }
    console.log('position', lastSelectedPositions);
    }
});

document.getElementById('turn-change').addEventListener('click', event =>{
    if(game.activePlayer === player1){
        game.activePlayer = player2
        document.getElementById('active-player').style['background-color'] 
        = 'green'
    } else {
        game.activePlayer = player1
        document.getElementById('active-player').style['background-color'] 
        = 'red'
    } 
    console.log(game.activePlayer.name)
})