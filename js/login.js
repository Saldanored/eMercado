//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if(sessionStorage.getItem('key')){
    window.location.href = "index.html";
  }
});

$('input, select, textarea').on("invalid", function(e) {
  e.preventDefault();
});

function checkValidationErrors() {
  var inpEmailObj = document.getElementById("nameInput");
  if (!inpEmailObj.checkValidity()) {
    const nameInput = document.getElementById("nameInput");
    document.getElementById("nameError").innerHTML = inpEmailObj.validationMessage;
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
  } else {
    document.getElementById("nameError").innerHTML = "";
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
  } 
  var inpPassObj = document.getElementById("passwordInput");
  if (!inpPassObj.checkValidity()) {
    document.getElementById("passError").innerHTML = inpPassObj.validationMessage;
    document.getElementById("passwordInput").classList.add("is-invalid");
    document.getElementById("passwordInput").classList.remove("is-valid");
  } else {
    document.getElementById("passError").innerHTML = "";
    document.getElementById("passwordInput").classList.add("is-valid");
    document.getElementById("passwordInput").classList.remove("is-invalid");
  } 
} 

function fakeLogin(){
  sessionStorage.setItem('key', 'accessoPermitido'); 
  localStorage.setItem('nombreUsuario', document.getElementById("nameInput").value)

}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  localStorage.setItem('nombreUsuario', profile.getName());
  sessionStorage.setItem('key', 'accessoPermitido'); 
  window.location.href="index.html";
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}