function fetchPostLogout(event) {
  event.preventDefault();
  fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.redirected) {
      alert(`로그아웃!`);
      window.location.href = res.url;
      return;
    } else {
      alert(`error : 오류가 발생했습니다.`);
      return;
    }
  });
}

export { fetchPostLogout };
