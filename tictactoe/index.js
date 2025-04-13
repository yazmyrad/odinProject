let board = [null, null, null, null, null, null, null, null, null];

let gamestatus = false;
let horizontal = [0, 3, 6];
let vertical   = [0, 1, 2];
let userscore  = [0, 0];

function checkGame(turn) {    
    for(let i of horizontal){
	    if ((board[i] !== null) && (board[i] === board[i+1]) && (board[i+1] === board[i+2])) {
		gamestatus = true;
		alert(`Player ${(turn % 2) ? 0 : 1} wins!`);
		userscore[(turn % 2) ? 0 : 1] += 1;
	    }
    }
    
    for(let i of vertical){
	    if ((board[i] !== null) && (board[i] === board[i+3]) && (board[i+3] === board[i+6])) {
		gamestatus = true;
		alert(`Player ${(turn % 2) ? 0 : 1} wins!`);
		userscore[(turn % 2) ? 0 : 1] += 1;
	    }
    }
    
    if ((board[0] !== null) && (board[0] === board[4]) && (board[4] === board[8])) {
	gamestatus = true;
	alert(`Player ${(turn % 2) ? 0 : 1} wins!`);
	userscore[(turn % 2) ? 0 : 1] += 1;
  	return gamestatus;
    }
    if ((board[2] !== null) && (board[2] === board[4]) && (board[4] === board[6])) {
	gamestatus = true;
	alert(`Player ${(turn % 2) ? 0 : 1} wins!`);
	userscore[(turn % 2) ? 0 : 1] += 1;
  	return gamestatus;
    }
    return gamestatus;    
}

let user = 0;
let turn = 0;
function game(num) {
	board[num] = user;

	gamestatus = checkGame(turn);

	user = (user + 1) % 2;
    	turn +=1;
    	return gamestatus;
}

let score = document.querySelector('.score');
let gameboard = document.querySelector('.gameboard');
function play(button){
    const fired_button = parseInt(button.value);
    if (board[fired_button] !== null) {
	    alert('Cell already taken! Choose again.');
    }else {
    	button.style.backgroundImage = `url(${user}.png)`;
	let output = game(fired_button);
	if(output === true || (output === false && turn === 8)){
		board = [null, null, null, null, null, null, null, null, null];
		turn = 0;
		user = 0;
		if (output === false && turn === 8){alert("It's draw!");};
		document.querySelectorAll('button').forEach(button => { button.style.backgroundImage = '';});
		score.textContent = `${userscore[0]} - ${userscore[1]}`;
		gamestatus = false;
		return true;
	}
    }            
}

function reset(){
	userscore = [0, 0];
	board = [null, null, null, null, null, null, null, null, null];
	turn = 0;
	user = 0;
	gameboard.querySelectorAll('button').forEach(button => { button.style.backgroundImage = '';});
	score.textContent = `${userscore[0]} - ${userscore[1]}`;
}




