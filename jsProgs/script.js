let HumanScore 	  = 0;
let ComputerScore = 0;

const result = document.querySelector("#box");
const scores = document.querySelector("#score").firstElementChild;
const prg = document.createElement("p");
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
	let text = '';
	if(ComputerChoice === HumanChoice){
		HumanScore++;
		ComputerScore++;
		text = "Draw";
	}else if(ComputerChoice == "Rock" && HumanChoice == "Paper"){
		HumanScore++;
		text =  "You win! Paper beats Rock";	
	}else if(ComputerChoice == "Paper" && HumanChoice == "Rock"){
		ComputerScore++;
		text = "You lose! Paper beats Rock";	
	}else if(ComputerChoice == "Scissors" && HumanChoice == "Paper"){
		ComputerScore++;
		text = "You lose! Scissors beats Paper";	
	}else if(ComputerChoice == "Paper" && HumanChoice == "Scissors"){
		HumanScore++;
		text = "You win! Scissors beats Paper";	
	}else if(ComputerChoice == "Rock" && HumanChoice == "Scissors"){
		ComputerScore++;
		text = "You lose! Rock beats Scissors";	
	}else if(ComputerChoice == "Scissors" && HumanChoice == "Rock"){
		HumanScore++;
		text = "You win! Rock beats Scissors";	
	}
	return text;
};

prg.classList.add("gameresult");
result.appendChild(prg);

for(let i =0; i<5; i++){
	setTimeout(() => {
		let result = playRound();
		prg.textContent = result;
		score.textContent = `Human score is - ${HumanScore}. Computer score is - ${ComputerScore}`;
    	}, i * 100);		
	
};


