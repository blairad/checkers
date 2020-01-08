const boardView = {
    renderActivePlayer(activePlayer){
        const activePlayerElement = document.getElementById('active-player')
        if (activePlayer === 1 ){
            activePlayerElement.className = 'player-1';
        } else {
            activePlayerElement.className = 'player-2'
        }
    }
};

module.exports = boardView;