const player1 = {name: "James", colour: "redCircle"};
const player2 = {name: "Andrew", colour: "greenCircle"};
// let players =[player1, player2];
const game = {activePlayer: player}


const boardContainer = document.getElementById('board');
let piecesContainer = document.getElementById('pieces-container');
let lastSelectedPositions = [];

let board = [];

function createBoard() {
    for (i = 0; i < 64; i++) {
        if (i < 16) {
            board.push('x');
        } else if (i < 48) {
            board.push('o');
        } else {
            board.push('w');
        }
    }
}

createBoard();

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
        if (board[i] == 'x') {
            let redCircle = document.createElement('div');
            redCircle.className = "redCircle";
            redCircle.id = `index-${i}`;
            piecesContainer.appendChild(redCircle);
        } else if (board[i] == 'w') {
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

function playerTurn(){
    
}