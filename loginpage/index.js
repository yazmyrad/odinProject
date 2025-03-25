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

