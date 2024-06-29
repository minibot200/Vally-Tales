function fetchPostLogout(event) {
  event.preventDefault();
  localStorage.clear();
  fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 204) {
      alert(`로그아웃!`);
      window.location.href = "/";
      return;
    } else {
      alert(`error : 오류가 발생했습니다.`);
      return;
    }
  });
}

export { fetchPostLogout };
