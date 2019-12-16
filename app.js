let board = [];

function createBoard(){
    for(i=0; i < 64; i++){
        if(i < 16){
            board.push(1);
        }   else if(i <48){
            board.push(0);
        } else{
            board.push(2);
        }
    }
    
}
createBoard();
console.log(board)

function renderBoard(){
    document.createElement('')
}