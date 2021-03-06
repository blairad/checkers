const gameView = {
    boardContainer: document.getElementById('board-container'),
    // piecesContainer: document.getElementById('pieces-container'),

    renderBoard(board) {

        const boardContainer = document.getElementById('board-container');

        for (let i = 0; i < board.length; i++) {
            if (board[i] === 1) {
                const blackSquare = document.createElement('div');
                blackSquare.style.backgroundColor = "black";
                // console.log(this.boardContainer);
                // console.log(this.piecesContainer);
                boardContainer.appendChild(blackSquare);
            } else {
                const whiteSquare = document.createElement('div');
                whiteSquare.style.backgroundColor = "white";
                boardContainer.appendChild(whiteSquare);
            }
        }
    },

    renderPieces(pieces) {
        const piecesContainer = document.getElementById('pieces-container');
        piecesContainer.innerHTML = '';
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].player === 1) {
                let player1Piece = document.createElement('div');
                if (pieces[i].type === 'king') {
                    player1Piece.className = "piece player-1-king";
                } else {
                    player1Piece.className = "piece player-1";
                }
                player1Piece.id = `index-${i}`;
                piecesContainer.appendChild(player1Piece);
            } else if (pieces[i].player === 2) {
                let player2Piece = document.createElement('div');
                if (pieces[i].type === 'king') {
                    player2Piece.className = "piece player-2-king";
                } else {
                    player2Piece.className = "piece player-2";
                }
                player2Piece.id = `index-${i}`;
                piecesContainer.appendChild(player2Piece);
            } else {
                let blank = document.createElement('div');
                blank.className = "blank";
                blank.id = `index-${i}`;
                piecesContainer.appendChild(blank);
            }
        }
    },

    renderActivePlayer(activePlayer){
        const activePlayerElement = document.getElementById('active-player')
        if (activePlayer === 1 ){
            activePlayerElement.className = 'player-1';
        } else {
            activePlayerElement.className = 'player-2'
        }
    }
};

module.exports = gameView;
