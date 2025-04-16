function createUser(name){
	const username = name;
	let score    = 0;
	const addscore = ()=> score++;
	const getscore = ()=> score;
	const zeroscore = ()=>score=0;
	
	return {username, addscore, getscore, zeroscore};
}

function game(user1, user2){
	let board = new Array(9).fill(null);
	let gamestatus = false;
	let turn       = 0;
	const players  = [user1, user2];
	
	const schema = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	];
	
	//const setStartingPlayer = (playerIndex) => turn = playerIndex;
	
	const markCell = (cell)=> board[cell] = turn % 2;
	
	const nextMove = (bool) => {
		if(bool){turn +=1;}
		else{turn = 0;}
		return turn;
	};
	
	const resetGame = ()=>{
		board.fill(null);
		gamestatus = false;
		turn = 0;
	}
	
	const isDraw = ()=>{
		if(gamestatus === false && board.every((value)=>value!==null)){
			return true;
		}
		return false;
	}
	
	const checkGame = () => {    
	    for(const pattern of schema){
	    	const [i, j, k] = pattern;
		if (board[i] !== null && board[i] === board[j] && board[j] === board[k]) {
			gamestatus = true;
			players[(turn - 1) % 2].addscore();
			return;
		}
		
	    }
	    return;
	}
	
	return {
		get gamestatus() { return gamestatus; }, 
		markCell, board, checkGame, 
		resetGame, nextMove, isDraw
	}; 
}

const user_1 = createUser(String(prompt("User 1 name")));
const user_2 = createUser(String(prompt("User 2 name")));
document.querySelector('.usernames').textContent = `${user_1.username} & ${user_2.username}`;

const playBoard    = game(user_1, user_2);

function reset(){
	user_1.zeroscore();
	user_2.zeroscore();
	playBoard.resetGame();
	playBoard.nextMove(false);
	document.querySelector('.gameboard').querySelectorAll('button').forEach(button => { button.style.backgroundImage = '';});
	score.textContent = `${user_1.getscore()} - ${user_2.getscore()}`;
}


function play(button){
    const fired_button = parseInt(button.value);
    
    if (playBoard.board[fired_button] !== null) {
	    alert('Cell already taken! Choose again.');
	    return;
    }else {
    	button.style.backgroundImage = `url(${(playBoard.nextMove(true)-1) % 2}.png)`;
    	playBoard.markCell(fired_button);
    	
	playBoard.checkGame();
	
	if(playBoard.gamestatus === true || playBoard.isDraw()){
		document.querySelectorAll('button').forEach(button => { button.style.backgroundImage = '';});
		document.querySelector('.score').textContent = `${user_1.getscore()} - ${user_2.getscore()}`;
		playBoard.resetGame();
	}
    }  
}





