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

let user = 0;
let turn = 0;
function game(num) {

	if (board[num] !== null) {
	    console.log('Cell already taken! Choose again.');
	    return false;
	}

	board[num] = user;

	gamestatus = checkGame(turn);

	user = (user + 1) % 2;
    
    if (!gamestatus) {
        console.log("It's a draw!");
    }
    turn +=1;
    
    return true;
}

document.querySelectorAll('button').forEach(button => { button.addEventListener( "click", () => {
            const fired_button = parseInt(button.value);
            button.style.backgroundImage = `url(${user}.png)`;
            let output = game(fired_button);
            if (output === false)
                alert("Already taken");
            
            
        }
    );
});
//game().then(end => console.log("Game ended:", end));
