//import

const joinButton = document.getElementById("join-btn-at-login");

const [
  loginForm,
  loginInputEmail,
  loginInputDomain,
  loginInputPassword,
  loginButton,
] = document.querySelectorAll("[id^=login-]");

// 로그인 버튼 submit event
function onLoginSubmit(event) {
  event.preventDefault();

  const loginEmail = loginInputEmail.value + "@" + loginInputDomain.value;
  const loginPassword = loginInputPassword.value;

  if (loginInputEmail.value === "" || loginInputDomain.value === "") {
    return alert("이메일을 입력해주세요!");
  } else if (loginPassword === "") {
    return alert("비밀번호를 입력해주세요!");
  }

  // api POST 요청
  fetchPostLogin(loginEmail, loginPassword);
}

function fetchPostLogin(loginEmail, loginPassword) {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url;
      return;
    } else if (res.status === 400) {
      return alert(`error : 이메일 또는 비밀번호를 확인해 주세요!`);
    }
    return alert(`오류가 발생했습니다.`);
  });
}

loginForm.addEventListener("submit", onLoginSubmit);
