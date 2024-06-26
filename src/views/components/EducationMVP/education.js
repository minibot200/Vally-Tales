// education.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadEducationData } from "../loadUserData_2.js";

const addEducationBtn = document.getElementById("addEducationBtn");
const educationForm = document.getElementById("educationForm");
const schoolNameInput = document.getElementById("schoolName");
const majorInput = document.getElementById("major");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
// const educationList = [];

async function loadData() {
  //get api 호출 후 data 저장
  const userId = await getUserId();
  console.log(userId);
  const userData = await loadEducationData(userId);
  const educationList = userData;
  console.log(educationList);

  let educationEditingIndex = -1;
  addEducationBtn.addEventListener("click", () => {
    educationEditingIndex = -1;
    clearEducationForm();
    toggleEducationForm();
  });

  // 리스트를 묶으면 안됨
  updateEducationList(educationList);

  document.getElementById("cancelBtn").addEventListener("click", () => {
    clearEducationForm();
    toggleEducationForm();
  });

  document.getElementById("confirmBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const degreeElement = document.querySelector(
      'input[name="degree"]:checked'
    );
    const degree = degreeElement ? degreeElement.value : "";

    if (
      schoolNameInput.value &&
      majorInput.value &&
      degree &&
      startDateInput.value &&
      endDateInput.value
    ) {
      if (educationEditingIndex === -1) {
        // 이 전에 없으면 추가
        educationList.push({
          schoolName: schoolNameInput.value,
          major: majorInput.value,
          degree: degree,
          startDate: startDate.value,
          endDate: endDate.value,
        });
        //post
      } else {
        // 있으면 수정
        educationList[educationEditingIndex] = {
          schoolName: schoolNameInput.value,
          major: majorInput.value,
          degree: degree,
          startDate: startDate.value,
          endDate: endDate.value,
        };
        // put
        educationEditingIndex = -1;
      }

      updateEducationList();
      clearEducationForm();
      toggleEducationForm();
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  });

  function updateEducationList(educationList) {
    const fragment = document.createDocumentFragment();
    const educationListDiv = document.getElementById("educationList");
    educationListDiv.innerHTML = "";

    educationList.forEach((item, index) => {
      console.log(index);
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
        // 삭제 api
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
      startDateInput.value = item.startDate;
      endDateInput.value = item.endDate;
    });
    toggleEducationForm(true);
  }

  function deleteEducation(index) {
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
}

loadData();
