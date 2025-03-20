let screen  = document.getElementById('screen');
let buttons = document.getElementById('buttons'); 

NUMBER_OF_BUTTONS = 19;
BUTTON_NAMES = [['AC', '+/-', '%', '/'], 
		['7', '8', '9', '*'], 
		['4', '5', '6', '-'], 
		['1', '2', '3', '+'], 
		['0', '', '.', '='] ]
		
let stack = [];
let operatorStack = [];

const operators = ['%', '/', '*', '-', '+'];
const operands  = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let regexNumber = /^([+-]?[1-9][0-9]*(\.\d+)?)$/;
let inputToken = '';


function RPN(){
	let screen = document.getElementById('screen');
	let value = operatorStack.pop();
	if(stack.length !== 0 && operators.includes(value)){
		let result = 0;
		let operand1 = parseFloat(stack.pop());
		let operand2 = parseFloat(stack.pop());
		if (value == '%'){
			result = ((100 * operand1) / operand2).toFixed(3);
		}
		if (value == '/'){
			result = (operand2/operand1).toFixed(3);
		}
		if (value == '*'){
			result = (operand2*operand1).toFixed(3);
		}
		if (value == '-'){
			result = (operand2-operand1).toFixed(3);		
		}
		if (value == '+'){
			result = (operand2+operand1).toFixed(3);
		}
		if (result.includes('.')) {
			result = result.replace(/\.?0+$/, ''); // Remove trailing zeros and decimal point
		}
		stack.push(result);
	}
	
	return stack[stack.length-1];
}


function getOperation(div){
	let screen = document.getElementById('screen');
	let value = div.getAttribute("data-value");
	
	if (value === 'AC'){
		stack = [];
        	operatorStack = [];
        	inputToken = '';
		screen.innerHTML = '';
	}else if(value === '='){
		if(inputToken.length > 0){
			stack.push(inputToken);
		}
		result = RPN();
		screen.innerHTML = result;
		inputToken = result;
	}else if(value == '.'){
		inputToken += value;
		screen.innerHTML += value;
	}else {
		if(operands.includes(value)){
			inputToken += value;
			screen.innerHTML += value;
		}else if(operatorStack.length > 0){
			RPN();
			operatorStack.pop();
		}else{			
			if (regexNumber.test(inputToken) && !(stack.includes(inputToken))) { 
			    stack.push(inputToken);
			}
			operatorStack.push(value);
		    inputToken = '';
		    screen.innerHTML = '';
		}
	}	
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
