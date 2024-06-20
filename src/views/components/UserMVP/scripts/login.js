const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");

function onLoginSubmit(event) {
  console.log(event);
  event.preventDefault();
  console.log(loginInputEmail.value);
  console.log(loginInputPassword.value);
  const userInfo = {
    email: loginInputEmail.value,
    password: loginInputPassword.value,
  };
  console.log(userInfo);
}

loginForm.addEventListener("submit", onLoginSubmit);
