const library = []

function Book(id, name='Me Before You', pagenumber=369, author='Jojo Moyes', genre='fiction', read=false, imagesource='cover.jpeg'){
	if(!new.target){
		throw Error("Please use 'new' operator to create object");
	}
	this.id    = id;
	this.title = name;
	this.page  = pagenumber;
	this.author= author;
	this.genre = genre;
	this.read  = read;
	this.cover = imagesource;
}
let book = new Book(id=1234);
library.push(book);
function addBooktoLibrary(name, page ,author, genre, read, imagesource){
	const id = crypto.randomUUID()
	let book = new Book(id, name, page, author, genre, read, imagesource);
	library.push(book);
} 

function showBooks(){
	let area = document.querySelector('#list-th');
	area.innerHTML = '';
	library.forEach(book => {
		let status = 'read';
		if (book.read === false){
			status = 'unread';
		}
	    const bookHTML = `
	      <div class="book">
		<div class="cover">
		<img src=${book.cover}>
		  <div class="description">
		    <p class="title">${book.title}<br>
		      <span class="author">${book.author}</span>
		    </p>
		  </div>
		  <div class="buttons">
		  <div class="btnStatus">
		      	<button onclick=readStatus(${book.id})>${status}</button>
	         </div>
		 <div class="btnDelete">
	     		<button onclick=deleteBook(${book.id})>Delete</button>
		 </div>
		 </div>
		 </div>
	      </div>
	    `;
	    area.insertAdjacentHTML('beforeend', bookHTML);
	  });
	
}

function openForm() {
  const overlay = document.getElementById("popupOverlay");
  const form = document.getElementById("popupForm");
  
  overlay.style.display = "flex";
  setTimeout(() => {
    form.classList.add("show");
  }, 10);
}

function closeForm() {
  const overlay = document.getElementById("popupOverlay");
  const form = document.getElementById("popupForm");
  
  form.classList.remove("show");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 200);
}

// Close when clicking outside the form
document.getElementById("popupOverlay").addEventListener("click", function(e) {
  if (e.target === this) {
    closeForm();
  }
});

// Prevent clicks inside the form from closing
document.getElementById("popupForm").addEventListener("click", function(e) {
  e.stopPropagation();
});

const form = document.getElementById('bookform');
form.addEventListener('submit', function(event) {
	event.preventDefault();
	closeForm();
	const formData = new FormData(this);

	const formValues = Object.fromEntries(formData.entries());

	let bookname = formData.get("bookname");
	let numberofpages = formData.get("numberofpages");
	let authorname = formData.get("authorname");
	let genre = formData.get("genre");
	let read = formData.get("read");
	let imagesrc = formData.get("cover");
	if(imagesrc === ''){
		imagesrc = "https://picsum.photos/200/300?random=1";
	}
	addBooktoLibrary(bookname, numberofpages, authorname, genre, read, imagesource=imagesrc);
	showBooks();
	form.reset();

});

function readStatus(id){
	const bookIndex = library.findIndex(book => book.id === id);

	let book = library[bookIndex];
	if(book.read === false){
		book.read = true;
	}else{
		book.read = false;
	}
//	console.log(bookIndex, book);
	showBooks();

};

function deleteBook(id){
	const bookIndex = library.findIndex(book => book.id === id);

	if (bookIndex !== -1) {
		library.splice(bookIndex, 1);
	}
	showBooks();

};

showBooks();








