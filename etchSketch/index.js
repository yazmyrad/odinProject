window.onload = () => {
const LENGTH = 16;
const WIDTH  = 16;

let container = document.getElementById("container");

for (let i=0; i<LENGTH; i++){
	let block = document.createElement('div');
	block.style.flex = '1';
	block.style.margin = '5px';
	block.style.display = 'flex';
	block.style.flex_direction = 'row';
	for (let j=0; j<WIDTH; j++){
		let gridDiv = document.createElement('div');
		gridDiv.className = 'block';
		gridDiv.style.border = '0.7px solid red';
		gridDiv.style.flex  = '1';
		gridDiv.style.margin = '5px';
		gridDiv.style.width  = '10px';
		gridDiv.style.height = '10px';

		block.appendChild(gridDiv);
	};
	container.appendChild(block);
};
}
