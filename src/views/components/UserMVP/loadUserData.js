//userId 가져오기
export const getUserId = () => {
  const path = window.location.pathname;
  const segments = path.split("/");
  return segments[2];
};

// user의 profile을 get (profile만 사용)
export async function loadProfileData(userId) {
  // API 호출
  const response = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  await updateProfileSection(data);
  return data;
}

// canEdit만 불러오기? 로컬 안 될때 방법
export async function getCanEdit(userId) {
  const response = await fetch(`/api/${mvp}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function getAPI(mvp, userId) {
  // API 호출
  const response = await fetch(`/api/${mvp}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function loadProjectData(userId) {
  // API 호출
  const response = await fetch(`/api/educations/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function loadAwardsData(userId) {
  // API 호출
  const response = await fetch(`/api/awards/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function loadCertificateData(userId) {
  // API 호출
  const response = await fetch(`/api/certificate/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export function changeDate(date) {
  const dateRaw = date;
  return dateRaw.substr(0, 10);
}

function updateProfileSection(data) {
  document.getElementById("profileImage").src = "../images/profile.png";
  // data.profileImage  ? data.profileImage : "https://cataas.com/cat";
  document.getElementById("nameText").innerText = data.name || "이름 없음";
  document.getElementById("emailText").innerText = data.email || "이메일 없음";
  document.getElementById("bioText").innerText =
    data.description || "설명이 아직 없습니다. 추가해 주세요.";
}
