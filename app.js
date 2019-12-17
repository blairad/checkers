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
            let whiteCircle = document.createElement('div');
            whiteCircle.className = "whiteCircle";
            whiteCircle.id = `index-${i}`;
            piecesContainer.appendChild(whiteCircle);
        } else if (board[i] == 'w') {
            let blackCircle = document.createElement('div');
            blackCircle.className = "blackCircle";
            blackCircle.id = `index-${i}`;
            piecesContainer.appendChild(blackCircle);
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
    console.log(board);
    renderPieces();
}

piecesContainer.addEventListener('click', event => {
    if (lastSelectedPositions.length < 2) {
        lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
    } else {
        lastSelectedPositions.shift();
        lastSelectedPositions.push(parseInt(event.target.id.split('-')[1]));
    }
    if (lastSelectedPositions.length == 2) {
        swapPositions(lastSelectedPositions);
    }
    console.log('position', lastSelectedPositions);
});


// addPosition();
renderBoard();
renderPieces();
// console.log(board);
