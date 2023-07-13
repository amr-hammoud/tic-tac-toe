
const all_squares = document.getElementsByClassName('square');
let current_player_symbol = "X";
let is_end = false;

for (let i = 0; i < all_squares.length; i++) {
    all_squares[i].addEventListener('click',handleClickEvent)
}

function handleClickEvent(e) {
    const square = e.target;
    if(!is_end && square.innerText === ""){
        square.innerText = current_player_symbol;
        addColor(square);
        changeTurn();
    }
}

function changeTurn(){
    if(current_player_symbol === "X")
        current_player_symbol = "O"
    else
        current_player_symbol = "X"
}

function addColor(square){
    if(current_player_symbol === "X")
        square.classList.add("x")
    else
        square.classList.add("o")
}   