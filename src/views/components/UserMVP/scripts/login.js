const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");
const joinButton = document.getElementById("join-btn");

// 로그인 버튼 submit event
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

// 회원가입 버튼 click event
