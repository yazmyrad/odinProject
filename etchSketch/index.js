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
		gridDiv.style.width  = '8px';
		gridDiv.style.height = '15px';

		block.appendChild(gridDiv);
	};
	container.appendChild(block);
};

let style = document.createElement('style');
var css  = '.block:hover{ background-color: white }';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);
}
