let board = [null, null, null, null, null, null, null, null, null];

let gamestatus = false;
let horizontal = [0, 3, 6];
let vertical   = [0, 1, 2];

function checkGame(turn) {    
    for(let i of horizontal){
	    if ((board[i] !== null) && (board[i] === board[i+1]) && (board[i+1] === board[i+2])) {
		gamestatus = true;
		console.log(`Player ${(turn % 2) ? 0 : 1} wins!`);
	    }
    }
    
    for(let i of vertical){
	    if ((board[i] !== null) && (board[i] === board[i+3]) && (board[i+3] === board[i+6])) {
		gamestatus = true;
		console.log(`Player ${(turn % 2) ? 0 : 1} wins!`);
	    }
    }
    
    if ((board[0] !== null) && (board[0] === board[4]) && (board[4] === board[8])) {
	gamestatus = true;
	console.log(`Player ${(turn % 2) ? 0 : 1} wins!`);
  	return gamestatus;
    }
    if ((board[2] !== null) && (board[2] === board[4]) && (board[4] === board[6])) {
	gamestatus = true;
	console.log(`Player ${(turn % 2) ? 0 : 1} wins!`);
  	return gamestatus;
    }
    return gamestatus;    
}

function display(turn){
	let zero = document.querySelector('.zero');
	let one = document.querySelector('.one');
	let two = document.querySelector('.two');
	let three = document.querySelector('.three');
	let four = document.querySelector('.four');
	let five = document.querySelector('.five');
	let six = document.querySelector('.six');
	let seven = document.querySelector('.seven');
	let eight = document.querySelector('.eight');
	
	zero.addEventListener('click', function() {
	  zero.style.backgroundImage = "url('close.png')";
	});
	
};
function getHuman(){};
function game() {
    let user = 0; // Start with Player 0
    
    for (let turn = 0; turn < 9; turn++) {
        if (gamestatus) break;
        
        console.log(`Player ${user}'s turn`);
        console.log('Current board:');
        console.log(board.slice(0, 3));
        console.log(board.slice(3, 6));
        console.log(board.slice(6, 9));
        display();
        
        let num = getHuman();
        
        while (board[num] !== null) {
            console.log('Cell already taken! Choose again.');
            num = getHuman();
        }
        
        board[num] = user;
        
        gamestatus = checkGame(turn);
        
        user = (user + 1) % 2;
    }
    
    readline.close();
    
    if (!gamestatus) {
        console.log("It's a draw!");
    }
    
    return true;
}

//game().then(end => console.log("Game ended:", end));
