
const all_squares = document.getElementsByClassName('square');
let is_player1_turn = true;


for (let i = 0; i < all_squares.length; i++) {
    all_squares[i].addEventListener('click',handleClickEvent)
}

function handleClickEvent(e) {
    const square = e.target;
    if(is_player1_turn){
        square.innerText = "X"
        is_player1_turn = false
    }else{
        square.innerText = "O"
        is_player1_turn = true
    }
    
}