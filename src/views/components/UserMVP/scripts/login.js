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
  console.log(useremail);
  console.log(userpassword);
  fetchPostLogin(useremail, userpassword);
}

loginForm.addEventListener("submit", onLoginSubmit);

function fetchPostLogin(useremail, userpassword) {
  fetch("./auth/join", {
    method: "POST",
    body: JSON.stringify({
      email: useremail,
      password: userpassword,
    }),
  })
    .then((res) => {
      res.json();
    })
    .then((res) => {
      if (res.success) {
        alert("로그인 성공!");
      }
    });
}

// 회원가입 버튼 click event fetch
function onJoinBtnClickAtLogin(event) {}
