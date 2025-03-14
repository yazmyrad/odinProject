let screen  = document.getElementById('screen');
let buttons = document.getElementById('buttons'); 


NUMBER_OF_BUTTONS = 19;
BUTTON_NAMES = [['AC', '+/-', '%', '/'], 
		['7', '8', '9', '*'], 
		['4', '5', '6', '-'], 
		['1', '2', '3', '+'], 
		['0', '.', '='] ]

function createButtons(){
	for (let i=0; i<5; i++){
		let block = document.createElement('div');
		block.style.flex = '1';
		block.style.margin = '0';
		block.style.display = 'flex';
		block.style.flex_direction = 'row';
		block.style.textAlign = 'center';
		//block.style.width = '100%';
		for (let j=0; j<4; j++){
			if(i == 4 && j == 1){
				continue;
			}
			let gridDiv = document.createElement('div');
			gridDiv.className = 'block';
			gridDiv.style.borderRadius = '4px';
			gridDiv.style.margin = '1px';
			gridDiv.style.flex  = '1';
			gridDiv.style.height = '50px';
			gridDiv.style.width = '100px';
			gridDiv.style.color = 'white';
			gridDiv.style.backgroundColor = '#217C7E';
			gridDiv.style.textAlign = 'center';			
			gridDiv.innerHTML = BUTTON_NAMES[i][j];
			block.appendChild(gridDiv);
		};
		buttons.appendChild(block);
	};
	const blocks = document.querySelectorAll('.block');
	blocks.forEach(block => {
		block.addEventListener('click', ()=>{block.style.background_color = 'grey'});
	    });
}

createButtons();
