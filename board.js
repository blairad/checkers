const player1 = {
    name: "James",
    colour: "redCircle"
};
const player2 = {
    name: "Andrew",
    colour: "greenCircle"
};
// let players =[player1, player2];
const game = {activePlayer: player}


const boardContainer = document.getElementById('board');
let piecesContainer = document.getElementById('pieces-container');
let lastSelectedPositions = [];

let board = [];

// populates 'board' with single characters referencing player colour
function createBoard() {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                board.push('o');
            } else {
                board.push('r');
            }
        }
    }
    for (k = 0; k < 16; k++) {
        board.push('o');
    }
    for (l = 0; l < 3; l++) {
        for (m = 0; m < 8; m++) {
            if ((l + m) % 2 === 0) {
                board.push('g');
            } else {
                board.push('o');
            }
        }
    }
}

createBoard();

// creates checkered board
function renderBoard() {

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                let white = document.createElement('div');
                white.id = "white";
                boardContainer.appendChild(white);
            } else {
                let black = document.createElement('div');
                black.id = "black";

                boardContainer.appendChild(black);
            }
        }
    }
}

function renderPieces() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 'r') {
            let redCircle = document.createElement('div');
            redCircle.className = "redCircle";
            redCircle.id = `index-${i}`;
            piecesContainer.appendChild(redCircle);
        } else if (board[i] == 'g') {
            let greenCircle = document.createElement('div');
            greenCircle.className = "greenCircle";
            greenCircle.id = `index-${i}`;
            piecesContainer.appendChild(greenCircle);
        } else {
            let blank = document.createElement('div');
            blank.className = "blank";
            blank.id = `index-${i}`;
            piecesContainer.appendChild(blank);
        }
    }
}

function swapPositions(positionArray) {
    let pos1 = board[positionArray[0]];
    let pos2 = board[positionArray[1]];
    console.log('pos1', pos1);
    console.log('pos2', pos2);
    board[positionArray[1]] = pos1;
    board[positionArray[0]] = pos2;

    console.log('last clicked pos', board[positionArray[1]]);
}

function updatePieces() {
    piecesContainer.innerHTML = '';
    renderPieces();
}

// addPosition();
renderBoard();
renderPieces();
// console.log(board);

function playerTurn() {

}
