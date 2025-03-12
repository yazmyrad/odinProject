const colors = [
    "#3F888F",
    "#8673A1",
    "#8F8F8F",
    "#6D6552",
    "#57A639",
    "#dad6ff",
    "#ffd6e8"
  ];

let container = document.getElementById("container");

function hoverEffect(){
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	let style = document.createElement('style');
	style.id = 'dynamic-hover-style';
	var css  = `.block:hover{ background-color: ${randomColor} }`;
	
	if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	} else {
	    style.appendChild(document.createTextNode(css));
	};
	
	const oldStyle = document.getElementById('dynamic-hover-style');
    	if (oldStyle) {
		oldStyle.remove();
   	}
	
	document.getElementsByTagName('head')[0].appendChild(style);
}
function gridding(LENGTH, WIDTH){
	
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
			gridDiv.style.margin = '3px';
			gridDiv.style.height = '15px';

			block.appendChild(gridDiv);
		};
		container.appendChild(block);
	};
	const blocks = document.querySelectorAll('.block');
	blocks.forEach(block => {
		block.addEventListener('mouseover', hoverEffect);
	    });
}

gridding(16, 16);

function checkNumber(string){
	return /^([1-9]|[1-3][0-9])$/.test(string);
}
var button = document.getElementById('button');

button.addEventListener('click', function() {

	let child = container.firstElementChild;
        while (child) {
            container.removeChild(child);
            child = container.lastElementChild;
        }
	let row = prompt('Number of row elements').toLowerCase();
	let column = prompt('NUmber of column elements').toLowerCase();
	const log = document.getElementById('paragraph');
	
	if (!checkNumber(row) && !checkNumber(column)) {
	    	log.innerText = "Please input number between 1 and 39";
	  } else{
	  	gridding(parseInt(row), parseInt(column));
	  	log.innerText = '';
	  }
});

