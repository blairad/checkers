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
    
    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            if((i + j) % 2 === 0){
                let white = document.createElement('div');
                white.id = "white"
                console.log('true')
                boardContainer.appendChild(white);
            } else{
                let black = document.createElement('div');
                black.id = "black"
                
                boardContainer.appendChild(black);
            }
        
    }
       
    }

}
renderBoard()
console.log(board)