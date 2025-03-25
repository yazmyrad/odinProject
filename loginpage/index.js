//You don't need this, but wait what if you wanna change the theme
document.getElementById('signform').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  const formValues = Object.fromEntries(formData.entries());
  
  console.log('Form data:', formValues);
  
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
});


const phoneInputField = document.getElementById("phone");
const phoneInput = window.intlTelInput(phoneInputField, { utilsScript:
	"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
