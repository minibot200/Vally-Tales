const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");
const joinButton = document.getElementById("join-btn-at-login");

// 로그인 버튼 submit event
function onLoginSubmit(event) {
  event.preventDefault();
  const useremail = loginInputEmail.value;
  const userpassword = loginInputPassword.value;
  fetchPostLogin(useremail, userpassword);
}

loginForm.addEventListener("submit", onLoginSubmit);

function fetchPostLogin(useremail, userpassword) {
    const user = JSON.stringify({
        email: useremail,
        password: userpassword,
    });
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
  }).then(res => console.log(res)).catch(err => alert(err));
}

