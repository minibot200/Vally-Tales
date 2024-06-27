// profile.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadProfileData } from "./loadUserData.js";

// 프로필 수정 기능
const editProfileBtn = document.getElementById("editProfileBtn");
const profileButtons = document.getElementById("profileButtons");
const nameInput = document.getElementById("nameInput");
// const emailInput = document.getElementById("emailInput");
const bioInput = document.getElementById("bioInput");
const nameText = document.getElementById("nameText");
const emailText = document.getElementById("emailText");
const bioText = document.getElementById("bioText");
const profileImage = document.getElementById("profileImage");
const imageURLInput = document.getElementById("imageURLInput");
const imagePreview = document.getElementById("imagePreview");

//userId path에서 추출
const userId = getUserId();
localStorage.removeItem("userId");
localStorage.setItem("userId", userId);
console.log(localStorage.getItem("userId"));

async function loadData(userId) {
  //get api 호출 후 data 저장
  const userData = await loadProfileData(userId);
  console.log(`누구의 데이터를 로드? ${userId}`);
  const canEdit = userData.canEdit;

  //로컬에 canEdit 저장
  localStorage.removeItem("canEdit");
  localStorage.setItem("canEdit", canEdit);
  console.log(`로컬에 저장 ${localStorage.getItem("canEdit")}`);

  // 불러온 사용자 데이터를 UI에 반영
  nameText.innerText = userData.name; // 수정된 부분
  emailText.innerText = userData.email; // 수정된 부분
  bioText.innerText = userData.description; // 수정된 부분
  profileImage.src = userData.profileImageUrl
    ? userData.profileImageUrl
    : "./images/profile.png"; // 수정된 부분
}

// 초기 로드 시 편집 섹션 숨기기
const elementsToHide = [
  nameInput,
  // emailInput,
  bioInput,
  imageURLInput,
  imagePreview,
  profileButtons,
];

elementsToHide.forEach(hideElement);

editProfileBtn.addEventListener("click", () => {
  nameInput.value = nameText.innerText;
  // emailInput.value = emailText.innerText;
  bioInput.value = bioText.innerText;
  const elementsToShow = [
    nameInput,
    // emailInput,
    bioInput,
    imageURLInput,
    imagePreview,
    profileButtons,
  ];
  elementsToShow.forEach(showElement);

  hideElement(editProfileBtn);
});

document
  .getElementById("profileConfirmBtn")
  .addEventListener("click", async () => {
    // async 추가
    if (nameInput.value) {
      nameText.innerText = nameInput.value;
    }
    // if (emailInput.value) {
    //   emailText.innerText = emailInput.value;
    // }
    if (bioInput.value) {
      bioText.innerText = bioInput.value;
    }
    if (imageURLInput.value) {
      profileImage.src = imageURLInput.value;
    }

    // PUT 요청 추가
    const userData = {
      userId: userId,
      name: nameInput.value,
      // email: emailInput.value,
      description: bioInput.value,
    };

    await updateUser(userId, userData); // 사용자 정보 업데이트

    // GET 요청으로 업데이트된 정보 다시 불러오기
    await loadData(userId);

    hideProfileEdit();
  });

document.getElementById("profileCancelBtn").addEventListener("click", () => {
  hideProfileEdit();
});

function hideProfileEdit() {
  const elementsToHide = [
    nameInput,
    // emailInput,
    bioInput,
    imageURLInput,
    imagePreview,
    profileButtons,
  ];

  elementsToHide.forEach(hideElement);

  showElement(editProfileBtn);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadData(userId);
  const canEdit = await localStorage.getItem("canEdit");

  console.log(`내가 비교한 canEdit ${canEdit}`);
  if (canEdit === "false") {
    editProfileBtn.className += " hidden";
    profileButtons.className += " hidden";
  }
});

// 사용자 정보 업데이트 함수 (PUT)
const updateUser = async (userId, userData) => {
  // 함수 추가
  try {
    const response = await fetch(`/api/users`, {
      // API URL 수정
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      console.log(response);

      throw new Error("Failed to update user data");
    }
    const result = await response.json();
    console.log("User updated:", result);
    alert("프로필 변경 성공!");
  } catch (error) {
    console.error("Error:", error);
    console.log(response);
  }
};
