// const userInfo = {};
// import
const joinForm = document.getElementById("join-form");
let passwordMessage = document.getElementById("pw-check-message");
const [
  joinInputEmail,
  joinInputDomain,
  joinInputEmailCheck,
  joinInputPass1,
  joinInputPass2,
  joinInputName,
] = document.querySelectorAll("[name=join]");
const emailReqBtn = document.getElementById("email-reqbtn");
const emailMessage = document.getElementById("email-check-message");
const emailCheckNum = document.getElementById("join-emailcheck");
const nameMessage = document.getElementById("name-check-message");

// 폼 제출 시 api 요청
function onJoinSubmit(event) {
  event.preventDefault();

  // 빈칸 경고, 비밀번호 일치 확인
  if (joinInputEmail.value === "" || joinInputDomain.value === "") {
    return alert("이메일을 입력해주세요!");
  } else if (joinInputPass1.value === "") {
    return alert("비밀번호를 입력해주세요!");
  } else if (joinInputPass2.value === "") {
    return alert("비밀번호 확인을 입력해주세요!");
  } else if (passwordMessage.style.color !== "green") {
    return alert("비밀번호를 다시 확인해주세요!");
  } else if (!joinInputName.value) {
    return alert("이름을 입력해주세요!");
  } else if (nameMessage.style.color !== "green") {
    return alert("이름을 확인해주세요!");
  }

  const joinEmail = joinInputEmail.value + "@" + joinInputDomain.value;
  const joinPassword = joinInputPass1.value;
  const joinName = joinInputName.value;
  const verificationCode = emailCheckNum.value;

  fetchPostJoin(joinEmail, joinPassword, joinName, verificationCode);
}

// 비밀번호 확인 칸 change event
function checkPassword() {
  if (joinInputPass1.value.length < 4) {
    passwordMessage.innerText = "4글자 이상 입력해주세요.";
    passwordMessage.style.color = "red";
  } else if (joinInputPass1.value !== joinInputPass2.value) {
    passwordMessage.innerText = "비밀번호가 일치하지 않습니다.";
    passwordMessage.style.color = "gray";
  } else if (joinInputPass1.value === joinInputPass2.value) {
    passwordMessage.innerText = "비밀번호가 일치합니다!";
    passwordMessage.style.color = "green";
  }
  return;
}

function checkName() {
  if (joinInputName.value.length < 2) {
    nameMessage.innerText = "2자 이상의 이름이 필요합니다.";
    nameMessage.style.color = "gray";
  } else if (joinInputName.value.length > 12) {
    nameMessage.innerText = "12자 이하의 이름이 필요합니다.";
    nameMessage.style.color = "gray";
  } else {
    nameMessage.innerText = "멋진 이름입니다!";
    nameMessage.style.color = "green";
  }
}

function fetchPostJoin(joinEmail, joinPassword, joinName, verificationCode) {
  fetch("/api/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: joinEmail,
      password: joinPassword,
      name: joinName,
      verificationCode: verificationCode,
    }),
  }).then((res) => {
    if (res.redirected) {
      alert(`회원가입에 성공했습니다!`);
      window.location.href = res.url;
      return;
    } else {
      emailMessage.innerText = `인증번호를 확인해주세요!`;
      emailMessage.style.color = "red";
      return;
    }
  });
}

joinForm.addEventListener("submit", onJoinSubmit);
joinInputPass1.addEventListener("input", checkPassword);
joinInputPass2.addEventListener("input", checkPassword);
joinInputName.addEventListener("input", checkName);

emailReqBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const joinEmail = joinInputEmail.value + "@" + joinInputDomain.value;
  if (!joinInputEmail.value || !joinInputDomain.value) {
    emailMessage.innerText = "이메일 주소를 바르게 입력해주세요.";
    emailMessage.style.color = "gray";
    return;
  } else if (
    joinInputEmail.value.includes("@") ||
    joinInputDomain.value.includes("@")
  ) {
    emailMessage.innerText = `'@'를 삭제해주세요.`;
    emailMessage.style.color = "red";
    return;
  }

  const authResult = await requestAuthCode(joinEmail);
  if (authResult.message) {
    emailMessage.innerText = authResult.message;
    emailMessage.style.color = "";
  } else if (authResult.error) {
    emailMessage.innerText = authResult.error;
    emailMessage.style.color = "red";
  }
});

const requestAuthCode = (joinEmail) => {
  return fetch("/api/auth/email", {
    method: "POST",
    body: JSON.stringify({ email: joinEmail }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        emailCheckNum.disabled = false;
      }
      return res.json();
    })
    .catch((res) => null);
};
