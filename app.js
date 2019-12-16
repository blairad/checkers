let board = [];

function createBoard(){
    for(i=0; i < 64; i++){
        if(i < 16){
            board.push('x');
        }   else if(i <48){
            board.push('o');
        } else{
            board.push('w');
        }
    }
    
}
createBoard();


function renderBoard(){
    let boardContainer = document.getElementById('board')
    
    for(element of board){
        let gridSquare = document.createElement('div')
        gridSquare.id = element
        console.log(gridSquare)
        boardContainer.appendChild(gridSquare);
    }

}
renderBoard()
console.log(board)