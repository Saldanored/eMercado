var data = sessionStorage.getItem('key');
if (data != "accessoPermitido") {
  window.location.href="login.html";        
}