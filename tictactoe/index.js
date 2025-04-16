class User{
	constructor(name){
		this._username = name;
		this._score    = 0;
	}
	
	addscore() { this._score++ }
	zeroscore() { this._score=0}
	
	get name() {
		return this._username;
	}
	
	get score(){
		return this._score;
	}
}

class Game{
	constructor(user1, user2){
		this.board = new Array(9).fill(null);
		this._gamestatus = false;
		this.turn       = 0;
		this.players  = [user1, user2];
		
		this.schema = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];
	}
	
	markCell(cell) {this.board[cell] = this.turn % 2}
	
	nextMove(bool) {
		if(bool){this.turn +=1;}
		else{this.turn = 0;}
		return this.turn;
	}
	
	resetGame() {
		this.board.fill(null);
		this._gamestatus = false;
		this.turn = 0;
	}
	
	isDraw(){
		if(this._gamestatus === false && this.board.every((value)=>value!==null)){
			return true;
		}
		return false;
	}
	
	checkGame(){    
	    for(const pattern of this.schema){
	    	const [i, j, k] = pattern;
		if (this.board[i] !== null && this.board[i] === this.board[j] && this.board[j] === this.board[k]) {
			this._gamestatus = true;
			this.players[(this.turn - 1) % 2].addscore();
			return;
		}
		
	    }
	    return;
	}
	
	get gamestatus() { return this._gamestatus; }
}

const user_1 = new User(String(prompt("User 1 name")));
const user_2 = new User(String(prompt("User 2 name")));

document.querySelector('.usernames').textContent = `${user_1.name} & ${user_2.name}`;

const playBoard    = new Game(user_1, user_2);

function reset(){
	user_1.zeroscore();
	user_2.zeroscore();
	playBoard.resetGame();
	playBoard.nextMove(false);
	document.querySelector('.gameboard').querySelectorAll('button').forEach(button => { button.style.backgroundImage = '';});
	document.querySelector('.score').textContent = `${user_1.score} - ${user_2.score}`;
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
		document.querySelector('.score').textContent = `${user_1.score} - ${user_2.score}`;
		playBoard.resetGame();
	}
    }  
}





