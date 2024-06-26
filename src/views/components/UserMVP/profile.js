// profile.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadProfileData } from "../loadUserData_2.js";

// 프로필 수정 기능
const editProfileBtn = document.getElementById("editProfileBtn");
const profileButtons = document.getElementById("profileButtons");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const bioInput = document.getElementById("bioInput");
const nameText = document.getElementById("nameText");
const emailText = document.getElementById("emailText");
const bioText = document.getElementById("bioText");
const profileImage = document.getElementById("profileImage");
const imageURLInput = document.getElementById("imageURLInput");
// const imageFileInput = document.getElementById("imageFileInput");
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
}

// 초기 로드 시 편집 섹션 숨기기
const elementsToHide = [
  nameInput,
  emailInput,
  bioInput,
  imageURLInput,
  // imageFileInput,
  imagePreview,
  profileButtons,
];

elementsToHide.forEach(hideElement);

editProfileBtn.addEventListener("click", () => {
  nameInput.value = nameText.innerText;
  emailInput.value = emailText.innerText;
  bioInput.value = bioText.innerText;
  const elementsToShow = [
    nameInput,
    emailInput,
    bioInput,
    imageURLInput,
    // imageFileInput,
    imagePreview,
    profileButtons,
  ];
  elementsToShow.forEach(showElement);

  hideElement(editProfileBtn);
});

document.getElementById("profileConfirmBtn").addEventListener("click", () => {
  if (nameInput.value) {
    nameText.innerText = nameInput.value;
  }
  if (emailInput.value) {
    emailText.innerText = emailInput.value;
  }
  if (bioInput.value) {
    bioText.innerText = bioInput.value;
  }

  if (imageURLInput.value) {
    profileImage.src = imageURLInput.value;
  }

  hideProfileEdit();
});

document.getElementById("profileCancelBtn").addEventListener("click", () => {
  hideProfileEdit();
});

// imageFileInput.addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     profileImage.src = e.target.result;
//     imagePreview.src = e.target.result;
//   };
//   if (file) {
//     reader.readAsDataURL(file);
//   }
// });

function hideProfileEdit() {
  const elementsToHide = [
    nameInput,
    emailInput,
    bioInput,
    imageURLInput,
    // imageFileInput,
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

// 기다렸다가 canEdit 받아오기
// const canEdit = await localStorage.getItem("canEdit");

// console.log(`내가 비교한 canEdit ${canEdit}`);
// if (canEdit === "false") {
//   editProfileBtn.className += " hidden";
//   profileButtons.className += " hidden";
// }

// 수정 api 요청
