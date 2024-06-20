const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");

function onLoginBtnclick() {
  console.log(loginInputEmail.value);
}

loginButton.addEventListener("click", onLoginBtnclick);
