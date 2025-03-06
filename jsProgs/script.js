let HumanScore 	  = 0;
let ComputerScore = 0;
let HumanChoice   = '';
let maxiteration = 5;
let iteration	 = 0;


const result = document.querySelector("#box");
const scores = document.querySelector("#score").firstElementChild;

const prg = document.createElement("p");
prg.classList.add("gameresult");
result.appendChild(prg);

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


function playRound(userChoice){
	const ComputerChoice = getComputerChoice();
	let text = '';
	if(ComputerChoice === userChoice){
		HumanScore++;
		ComputerScore++;
		text = "Draw";
	}else if(ComputerChoice == "Rock" && userChoice == "Paper"){
		HumanScore++;
		text =  "You win! Paper beats Rock";	
	}else if(ComputerChoice == "Paper" && userChoice == "Rock"){
		ComputerScore++;
		text = "You lose! Paper beats Rock";	
	}else if(ComputerChoice == "Scissors" && userChoice == "Paper"){
		ComputerScore++;
		text = "You lose! Scissors beats Paper";	
	}else if(ComputerChoice == "Paper" && userChoice == "Scissors"){
		HumanScore++;
		text = "You win! Scissors beats Paper";	
	}else if(ComputerChoice == "Rock" && userChoice == "Scissors"){
		ComputerScore++;
		text = "You lose! Rock beats Scissors";	
	}else if(ComputerChoice == "Scissors" && userChoice == "Rock"){
		HumanScore++;
		text = "You win! Rock beats Scissors";	
	}
	
	return text;
};

function game(){
	const button = document.querySelectorAll(".btn");
	button.forEach(btn => { 
		btn.addEventListener("click", function(){

			let choice = parseInt(this.dataset.value);
	
			if (choice == 4) {
				HumanScore = 0;
				ComputerScore = 0;
				iteration = 0;
				prg.textContent = '';
				score.textContent = `Human score is - ${HumanScore}. Computer score is - ${ComputerScore}`;
			}else { 
				if (iteration >= maxiteration) {
					console.log("Maximum iterations reached. Game over!");
					return; // Stop if max iterations are reached
				}
				if (choice == 1){
					HumanChoice = "Rock";
				}else if (choice == 2){
					HumanChoice = "Paper";
				}else if(choice == 3){
					HumanChoice = "Scissors";
				}
				let result = playRound(HumanChoice);

				prg.textContent = result;
				score.textContent = `Human score is - ${HumanScore}. Computer score is - ${ComputerScore}`;
				iteration++; 
				if(iteration == maxiteration){
					console.log("Game over!");
				};
			}		
			
		});
	});
};


game();


