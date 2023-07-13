const all_squares = document.getElementsByClassName("square");
let current_player_symbol = "X";
let is_end = false;

const possible_wins = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

for (let i = 0; i < all_squares.length; i++) {
	all_squares[i].addEventListener("click", handleClickEvent);
}

function handleClickEvent(e) {
	const square = e.target;
	if (!is_end && square.innerText === "") {
		square.innerText = current_player_symbol;
		addColor(square);
		checkWinner();
		changeTurn();
	}
}

function changeTurn() {
	if (current_player_symbol === "X") current_player_symbol = "O";
	else current_player_symbol = "X";
}

function addColor(square) {
	if (current_player_symbol === "X") square.classList.add("x");
	else square.classList.add("o");
}

function checkWinner() {
	for (let i = 0; i < possible_wins.length; i++) {
		let box1 = document.getElementById(possible_wins[i][0]);
		let box2 = document.getElementById(possible_wins[i][1]);
		let box3 = document.getElementById(possible_wins[i][2]);
		if (
			box1.innerText === current_player_symbol &&
			box2.innerText === current_player_symbol &&
			box3.innerText === current_player_symbol
		) {
			box1.classList.add("win");
			box2.classList.add("win");
			box3.classList.add("win");
			is_end = true;
		}
	}
}

const reset_btn = document.getElementById("reset");
reset_btn.addEventListener("click", reset);
function reset() {
	for (let i = 1; i <= 9; i++) {
		document.getElementById(i.toString()).innerText = "";
		document.getElementById(i.toString()).classList.remove("x");
		document.getElementById(i.toString()).classList.remove("o");
		document.getElementById(i.toString()).classList.remove("win");
		is_end = false;
	}
}
