let HumanScore 	  = 0;
let ComputerScore = 0;

function getComputerChoice(){
	let randomNumber = Math.floor(Math.random() * 3);
	if (randomNumber == 0){
		return "Rock";
	}else if (randomNumber == 1){
		return "Paper";
	}else{
		return "Scissors";
	}
};

function getHumanChoice(){
	let choice = parseInt(prompt("Please make your choice! 1- Rock, 2- Paper, 3- Scissors"));
	if (choice == 1){
		return "Rock";
	}else if (choice == 2){
		return "Paper";
	}else if (choice == 3){
		return "Scissors";
	}else {
		return "Not valid input";
	}
};

function playRound(){
	const ComputerChoice = getComputerChoice();
	const HumanChoice    = getHumanChoice();
	if(ComputerChoice === HumanChoice){
		HumanScore++;
		ComputerScore++;
		console.log("Draw");
	}else if(ComputerChoice == "Rock" && HumanChoice == "Paper"){
		HumanScore++;
		console.log("You win! Paper beats Rock");	
	}else if(ComputerChoice == "Paper" && HumanChoice == "Rock"){
		ComputerScore++;
		console.log("You lose! Paper beats Rock");	
	}else if(ComputerChoice == "Scissors" && HumanChoice == "Paper"){
		ComputerScore++;
		console.log("You lose! Scissors beats Paper");	
	}else if(ComputerChoice == "Paper" && HumanChoice == "Scissors"){
		HumanScore++;
		console.log("You win! Scissors beats Paper");	
	}else if(ComputerChoice == "Rock" && HumanChoice == "Scissors"){
		ComputerScore++;
		console.log("You lose! Rock beats Scissors");	
	}else if(ComputerChoice == "Scissors" && HumanChoice == "Rock"){
		HumanScore++;
		console.log("You win! Rock beats Scissors");	
	}
};


for(let i =0; i<5; i++){
	playRound();
};

console.log(`Human score is - ${HumanScore}. Computer score is - ${ComputerScore}`);

