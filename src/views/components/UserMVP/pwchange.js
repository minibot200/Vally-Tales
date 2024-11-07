const oldPassword = document.getElementById("oldPassword").value;
const newPassword = document.getElementById("newPassword").value;
const confirmPassword = document.getElementById("confirmPassword").value;
const messageDiv = document.getElementById("message");

document
  .getElementById("passwordChangeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageDiv = document.getElementById("message");

    if (oldPassword && newPassword && confirmPassword) {
    } else {
      messageDiv.textContent = "모든 필드를 입력해 주세요.";
      return;
    }

    if (newPassword !== confirmPassword) {
      messageDiv.textContent = "새 비밀번호가 일치하지 않습니다!";
      messageDiv.style.color = "red";
      return;
    }

    if (newPassword.length < 4) {
      messageDiv.textContent = "새 비밀번호를 4글자 이상 입력해주세요.";
      messageDiv.style.color = "gray";
      return;
    }

    messageDiv.textContent = "";

    fetch("/api/auth", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          alert("비밀번호 변경에 성공했습니다!");
          window.location.href = "/";
          return;
        } else {
          messageDiv.textContent = "비밀번호가 틀렸습니다.";
          messageDiv.style.color = "gray";
        }
      })
      .catch((error) => (res) => null);
  });
