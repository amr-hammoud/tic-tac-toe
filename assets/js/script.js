// Landing Screen
const start_modal = document.getElementById("modal");

const start_btn = document.getElementById("start");
start_btn.addEventListener("click", startGame);

// In Game
const all_squares = document.getElementsByClassName("square");
for (let i = 0; i < all_squares.length; i++) {
	all_squares[i].addEventListener("click", handleClickEvent);
}

const new_round = document.getElementById("new-round");
new_round.addEventListener("click", reset);

const reset_btn = document.getElementById("reset");
reset_btn.addEventListener("click", reset);

// Winner Popup
const winner_popup = document.getElementById("winner-popup");

const winner_new_round = document.getElementById("winner-new-round");
winner_new_round.addEventListener("click", winnerNewRound);

const winner_reset_btn = document.getElementById("winner-restart");
winner_reset_btn.addEventListener("click", winnerReset);

const winner_name = document.getElementById("winner-name");

// Game Variables
let current_player_symbol = "X";
let is_end = false;

let player_x_name = "Player X";
let player_o_name = "Player O";

let player_x_score = document.getElementById("player_x_score");
let player_o_score = document.getElementById("player_o_score");
let score_x_value = 0;
let score_o_value = 0;

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

let filled_squares = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];

function setupGame() {
	start_modal.classList.add("hidden");
	updateScoreText();
}

// Handle players names input then start game
function startGame() {
	let player_x_input = document.getElementById("player_x");
	let player_x_error = document.getElementById("player_x_error");
	let player_o_input = document.getElementById("player_o");
	let player_o_error = document.getElementById("player_o_error");

	player_x_name = player_x_input.value;
	player_o_name = player_o_input.value;

	if (player_x_name === "") {
		player_x_error.classList.remove("hidden");
		player_x_input.classList.add("error");
	} else {
		player_x_error.classList.add("hidden");
		player_x_input.classList.remove("error");
	}
	if (player_o_name === "") {
		player_o_error.classList.remove("hidden");
		player_o_input.classList.add("error");
	} else {
		player_o_error.classList.add("hidden");
		player_o_input.classList.remove("error");
	}
	if (player_x_name !== "" && player_o_name !== "") {
		setupGame();
	}
}

function handleClickEvent(e) {
	const square = e.target;
	if (!is_end && square.innerText === "") {
		square.innerText = current_player_symbol;
		filled_squares[square.id - 1] = true;
		addColor(square);
		checkWinner();
		changeTurn();
	}
}

function emptyFilledSquares() {
	for (let i = 0; i < filled_squares.length; i++) {
		filled_squares[i] = false;
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

// Function to be used by the checkWinner function to check draw state
function isTrue(s) {
	if (s) {
		return true;
	} else {
		return false;
	}
}

function checkWinner() {
	if (filled_squares.every(isTrue)) {
		setTimeout(drawState, 1000);
	} else {
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
				updateScore(current_player_symbol);
				is_end = true;
				setTimeout(showWinner, 1000, current_player_symbol);
			}
		}
	}
}

function drawState() {
	const winner_text = document.getElementById("winner-text");
	winner_text.classList.add("hidden");
	winner_name.innerText = "DRAW!";
	winner_popup.classList.remove("hidden");
}

function updateScore(player_symbol) {
	if (player_symbol === "X") {
		score_x_value += 1;
		updateScoreText();
	} else {
		score_o_value += 1;
		updateScoreText();
	}
}

function updateScoreText() {
	player_x_score.innerHTML = `<strong>${player_x_name} (X):</strong> ${score_x_value} points`;
	player_o_score.innerHTML = `<strong>${player_o_name} (O):</strong> ${score_o_value} points`;
}

function resetScore() {
	score_o_value = 0;
	score_x_value = 0;
	updateScoreText();
}

function showWinner(player_symbol) {
	let winner;
	if (player_symbol === "X") {
		winner = player_x_name;
	} else {
		winner = player_o_name;
	}
	winner_name.innerText = winner;
	winner_popup.classList.remove("hidden");
}

function winnerNewRound() {
	reset();
	winner_popup.classList.add("hidden");
}

function winnerReset() {
	reset();
	current_player_symbol = "X";
	resetScore();
	winner_popup.classList.add("hidden");
}

function reset() {
	for (let i = 1; i <= 9; i++) {
		document.getElementById(i.toString()).innerText = "";
		document.getElementById(i.toString()).classList.remove("x");
		document.getElementById(i.toString()).classList.remove("o");
		document.getElementById(i.toString()).classList.remove("win");
		emptyFilledSquares();
		is_end = false;
	}
}
