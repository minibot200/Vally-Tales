// education.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadEducationData } from "../loadUserData_2.js";

const addEducationBtn = document.getElementById("addEducationBtn");
const educationForm = document.getElementById("educationForm");
const schoolNameInput = document.getElementById("schoolName");
const majorInput = document.getElementById("major");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
let educationList = []; // let으로 변경(전역 변수로)

async function loadData(userId) {
  const userData = await loadEducationData(userId);
  educationList = userData; // educationList에 userData 할당

  let educationEditingIndex = -1;
  addEducationBtn.addEventListener("click", () => {
    educationEditingIndex = -1;
    clearEducationForm();
    toggleEducationForm();
  });

  updateEducationList();
}

loadData(localStorage.getItem("userId"));

document.getElementById("cancelBtn").addEventListener("click", () => {
  clearEducationForm();
  toggleEducationForm();
});

document.getElementById("confirmBtn").addEventListener("click", async (e) => { // async 추가
  e.preventDefault();
  const degreeElement = document.querySelector('input[name="degree"]:checked');
  const degree = degreeElement ? degreeElement.value : "";

  if (
    schoolNameInput.value &&
    majorInput.value &&
    degree &&
    startDateInput.value &&
    endDateInput.value
  ) {
    const educationData = {
      schoolName: schoolNameInput.value,
      major: majorInput.value,
      degree: degree,
      startDate: startDateInput.value,
      endDate: endDateInput.value,
    };

    if (educationEditingIndex === -1) {
      // 새로운 학력 추가
      const result = await addEducation(localStorage.getItem("userId"), educationData); // addEducation 호출 및 결과 저장
      educationList.push(result); // educationList에 추가
    } else {
      // 기존 학력 수정
      const result = await updateEducation(localStorage.getItem("userId"), educationList[educationEditingIndex].id, educationData); // updateEducation 호출 및 결과 저장
      educationList[educationEditingIndex] = result; // educationList 업데이트
      educationEditingIndex = -1;
    }

    updateEducationList();
    clearEducationForm();
    toggleEducationForm();
  } else {
    alert("모든 필드를 입력해 주세요.");
  }
});

function updateEducationList() {
  const fragment = document.createDocumentFragment();
  const educationListDiv = document.getElementById("educationList");
  educationListDiv.innerHTML = "";

  educationList.forEach((item, index) => {
    const educationItemDiv = document.createElement("div");
    educationItemDiv.className = "education-item";

    const educationText = document.createElement("span");
    educationText.innerText = `${item.schoolName} ${item.major} (${item.degree}) ${item.startDate}~${item.endDate}`;
    educationItemDiv.appendChild(educationText);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editEducation(index);
    });
    educationItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteEducation(index);
    });
    educationItemDiv.appendChild(deleteBtn);

    fragment.appendChild(educationItemDiv);
  });
  educationListDiv.appendChild(fragment);
}

function editEducation(index) {
  educationEditingIndex = index;
  const item = educationList[index];
  schoolNameInput.value = item.schoolName;
  majorInput.value = item.major;
  const degrees = document.getElementsByName("degree");
  degrees.forEach((degree) => {
    degree.checked = degree.value === item.degree;
  });
  startDateInput.value = item.startDate;
  endDateInput.value = item.endDate;
  toggleEducationForm(true);
}

async function deleteEducation(index) { // async 추가
  const result = await deleteEducationAPI(localStorage.getItem("userId"), educationList[index].id); // deleteEducationAPI 호출
  educationList.splice(index, 1);
  updateEducationList();
}

function clearEducationForm() {
  schoolNameInput.value = "";
  majorInput.value = "";
  const degrees = document.getElementsByName("degree");
  degrees.forEach((degree) => {
    degree.checked = false;
  });
  startDateInput.value = "";
  endDateInput.value = "";
}

function toggleEducationForm(forceOpen = false) {
  if (forceOpen) {
    showElement(educationForm);
  } else {
    educationForm.style.display =
      educationForm.style.display === "block" ? "none" : "block";
  }
}

// 학력 조회 함수
const getEducations = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/educations`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 학력 추가 함수
const addEducation = async (userId, educationData) => {
  try {
    const response = await fetch(`/api/users/${userId}/educations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(educationData),
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 학력 수정 함수 추가
const updateEducation = async (userId, educationId, educationData) => {
  try {
    const response = await fetch(`/api/users/${userId}/educations/${educationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(educationData),
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 학력 삭제 함수 추가
const deleteEducationAPI = async (userId, educationId) => {
  try {
    const response = await fetch(`/api/users/${userId}/educations/${educationId}`, {
      method: "DELETE",
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};
