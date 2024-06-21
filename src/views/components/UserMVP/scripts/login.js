const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");
const joinButton = document.getElementById("join-btn-at-login");

console.log(loginForm);

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
  fetch("api/auth/join", {
    method: "POST",
    body: JSON.stringify({
      email: useremail,
      password: userpassword,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.log("response error");
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
      return res.json();
    })
    // 로그인 응답 어떻게 들어오는지 보고 쓰기
    .then((res) => {
      if (res) {
        console.log(res);
      }
    });
}

// text 정보만 사용 가능
const nonBodyMethods = ["GET", "DELETE"];
const baseApi = async (url, method, data = {}, headers) => {
  const userId = localStorage.getItem("userId");
  try {
    if (nonBodyMethods.includes(method)) {
      // GET, DELETE 요청이면 바디 없이 fetch
      return await fetch(url, { method, headers });
    }
    // POST, PUT 요청이면 바디 있는 fetch
    return await fetch(url, { method, body: JSON.stringify(data) });
  } catch (err) {
    console.log("login - try error");
    console.log(err);
  }
};
