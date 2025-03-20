let screen  = document.getElementById('screen');
let buttons = document.getElementById('buttons'); 

NUMBER_OF_BUTTONS = 19;
BUTTON_NAMES = [['AC', '+/-', '%', '/'], 
		['7', '8', '9', '*'], 
		['4', '5', '6', '-'], 
		['1', '2', '3', '+'], 
		['0', '', '.', '='] ]
		
let stack = [];
const operators = ['%', '/', '*', '-', '+'];
const operands  = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let output = [];
let operatorStack = [];

const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
};

function RPN(){
	let screen = document.getElementById('screen');
	for(let value of output){
		if(stack.length !== 0 && operators.includes(value)){
			let operand1 = parseInt(stack.pop());
			let operand2 = parseInt(stack.pop());
			if (value == '%'){
				stack.push((100 * operand2) / operand1);
			}
			if (value == '/'){
				stack.push(operand2/operand1);
			}
			if (value == '*'){
				stack.push(operand2*operand1);
			}
			if (value == '-'){
				stack.push(operand2-operand1);		
			}
			if (value == '+'){
				stack.push(operand2+operand1);
			}
			screen.innerHTML = '';
		}else if (operands.includes(value)){
			stack.push(value);
			screen.innerHTML += value;
		}
	}
	return stack.pop();
}

function calculation(token) {
    	
	if (operands.includes(token)) { 
	    output.push(token);
	} else if (operators.includes(token)) {
	    while (
		operatorStack.length > 0 &&
		operators.includes(operatorStack.pop()) &&
		precedence[operatorStack.pop()] >= precedence[token]
	    ) {
		output.push(operatorStack.pop());
	    }
	    operatorStack.push(token);
	}
console.log(operatorStack, output);
}



function getOperation(div){
	let screen = document.getElementById('screen');
	let value = div.getAttribute("data-value");
	if (value === 'AC'){
		output = [];
		screen.innerHTML = '';
	}else if(value === '='){
		screen.innerHTML = RPN();
	}else {
		calculation(value);
	}
	
	console.log(value);
}


function createButtons(){
	for (let i=0; i<5; i++){
		let block = document.createElement('div');
		block.style.flex = '1';
		block.style.margin = '0';
		block.style.display = 'flex';
		block.style.flex_direction = 'row';
		block.style.width = '100%';
		for (let j=0; j<4; j++){
			if(i == 4 && j == 1){
				continue;
			}
			let gridDiv = document.createElement('div');
			gridDiv.className = 'block';
			gridDiv.style.borderRadius = '4px';
			gridDiv.style.margin = '1px';
			gridDiv.style.flex  = '1';
			gridDiv.style.display = 'flex';
			gridDiv.style.height = '9vh';
			gridDiv.style.width = '11.5vh';
			gridDiv.style.color = 'white';
			gridDiv.style.backgroundColor = '#217C7E';
			gridDiv.style.alignItems = 'center';	
			gridDiv.style.justifyContent = 'center';
			gridDiv.style.cursor = "pointer";					
			gridDiv.innerHTML = BUTTON_NAMES[i][j];
			gridDiv.dataset.value = BUTTON_NAMES[i][j];
			block.appendChild(gridDiv);
		};
		buttons.appendChild(block);
	};
	let blocks = document.querySelectorAll('.block');
	blocks.forEach(block => {
	block.addEventListener('mouseup', () => {
	    block.style.backgroundColor = '#217C7E'; 
	    getOperation(block);
	  });
	block.addEventListener('mousedown', () => {
	    block.style.backgroundColor = '#1E7071'; 
	    
	  });
	  });
}

createButtons();
