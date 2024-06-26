// education.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadEducationData, changeDate } from "../loadUserData_2.js";

const addEducationBtn = document.getElementById("addEducationBtn");
const educationForm = document.getElementById("educationForm");
const schoolNameInput = document.getElementById("schoolName");
const majorInput = document.getElementById("major");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const educationList = [];

async function loadData() {
  //get api 호출 후 data 저장
  const userId = await getUserId();
  // const userId = await localStorage.getItem("userId");
  console.log(userId);
  const userData = await loadEducationData(userId);
  educationList.push(userData);
  console.log(educationList);
  const canEdit = localStorage.getItem("canEdit");

  // 편집버튼 유무
  if (canEdit === "false") {
    addEducationBtn.className += " hidden";
  }

  // add버튼을 누른지 확인
  let educationEditingIndex = -1;
  addEducationBtn.addEventListener("click", () => {
    educationEditingIndex = -1;
    clearEducationForm();
    toggleEducationForm();
  });

  // 리스트를 묶으면 안됨

  document.getElementById("cancelBtn").addEventListener("click", () => {
    e.preventDefault();
    clearEducationForm();
    toggleEducationForm();
  });

  document.getElementById("confirmBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const degreeElement = document.querySelector(
      'input[name="degree"]:checked'
    );
    const degree = degreeElement ? degreeElement.value : "";

    // 추가 or 수정??
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

      //Div에 dataset으로 eduId 추가
      educationItemDiv.eduId = item.educationId;

      const educationText = document.createElement("span");
      const date = changeDate(item.startDate, item.endDate);
      educationText.innerText = `${item.school} ${item.major} (${item.degree}) ${date}`;
      educationItemDiv.appendChild(educationText);

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn btn btn-link";
      if (canEdit === "false") {
        addEducationBtn.className += " hidden";
      }
      editBtn.innerText = "편집";
      editBtn.addEventListener("click", () => {
        editEducation(index);
      });
      educationItemDiv.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn btn btn-link";
      deleteBtn.innerText = "삭제";
      if (canEdit === "false") {
        addEducationBtn.className += " hidden";
      }
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
    schoolNameInput.value = item.school;
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

  updateEducationList(educationList);
}

// (async () => await loadData())();
window.addEventListener("load", () => loadData());
