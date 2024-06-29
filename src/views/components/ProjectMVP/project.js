// project.js
import { showElement, hideElement } from "../utils.js";
import {
  changeDate,
  deleteAPI,
  putAPI,
  postAPI,
  getAPI,
} from "../apiRequest.js";

const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");
const projectNameInput = document.getElementById("projectName");
const projectDescriptionInput = document.getElementById("projectDescription");
const startDateInput = document.getElementById("pjStartDate");
const endDateInput = document.getElementById("pjEndDate");

let projectList = [];
let projectEditingIndex = -1;

const initializeProjectForm = () => {
  clearProjectForm();
  toggleProjectForm();
};

addProjectBtn.addEventListener("click", () => {
  projectEditingIndex = -1;
  // clearProjectForm();
  initializeProjectForm();
});

document.getElementById("projectCancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  // clearEducationForm();
  initializeProjectForm();
});

// 확인버튼 동작
document.getElementById("projectConfirmBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (projectNameInput.value && projectDescriptionInput.value) {
    if (projectEditingIndex === -1) {
      //추가
      projectList.push({
        title: projectNameInput.value,
        description: projectDescriptionInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
      });
      const projectData = {
        title: projectNameInput.value,
        description: projectDescriptionInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
      };
      //post api
      postProject(projectData);
    } else {
      projectList[projectEditingIndex] = {
        title: projectNameInput.value,
        description: projectDescriptionInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        projectId: projectList[projectEditingIndex].projectId,
      };
      const projectData = {
        title: projectNameInput.value,
        description: projectDescriptionInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        projectId: projectList[projectEditingIndex].projectId,
      };
      putProject(projectEditingIndex, projectData);
      projectEditingIndex = -1;
    }

    updateProjectList();
    initializeProjectForm();
  } else {
    alert("모든 필드를 입력해 주세요.");
  }
});

async function updateProjectList() {
  //get 실행
  const userId = localStorage.getItem("userId");
  const projectListData = await getAPI("projects", userId); // response 대기중
  projectList = projectListData;

  // (+) btn hidden
  // const canEdit = localStorage.getItem("canEdit");
  // if (canEdit === "false") {
  //   addProjectBtn.className += " hidden";
  // }

  const fragment = document.createDocumentFragment();
  const projectListDiv = document.getElementById("projectList");
  projectListDiv.innerHTML = "";

  projectList.forEach((item, index) => {
    const projectItemDiv = document.createElement("div");
    projectItemDiv.className = "project-item";

    const projectText = document.createElement("span");

    //날짜데이터 가공
    const start = changeDate(item.startDate);
    const end = changeDate(item.endDate);
    projectText.innerText = `${item.title}\n${item.description}\n${start} ~ ${end}\n`;
    projectItemDiv.appendChild(projectText);

    //편집, 삭제 버튼 생성
    const canEdit = localStorage.getItem("canEdit");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    if (canEdit === "false") {
      editBtn.className += " hidden";
    }
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editProject(index);
    });
    projectItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    if (canEdit === "false") {
      deleteBtn.className += " hidden";
    }
    deleteBtn.addEventListener("click", () => {
      deleteProject(index);
    });
    projectItemDiv.appendChild(deleteBtn);

    fragment.appendChild(projectItemDiv);
  });
  projectListDiv.appendChild(fragment);
}

function editProject(index) {
  projectEditingIndex = index;
  const item = projectList[index];
  projectNameInput.value = item.title;
  projectDescriptionInput.value = item.description;
  startDateInput.value = item.startDate.substr(0, 10);
  endDateInput.value = item.endDate.substr(0, 10);
  toggleProjectForm(true);
}

function clearProjectForm() {
  projectNameInput.value = "";
  projectDescriptionInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
}

function toggleProjectForm(forceOpen = false) {
  if (forceOpen) {
    showElement(projectForm);
  } else {
    projectForm.style.display =
      projectForm.style.display === "block" ? "none" : "block";
  }
}

async function deleteProject(index) {
  const result = await deleteAPI("projects", projectList[index].projectId);
  projectList.splice(index, 1);
  updateProjectList();
}

async function putProject(index, data) {
  const result = await putAPI("projects", projectList[index].projectId, data);
  updateProjectList();
}

async function postProject(data) {
  const result = await postAPI("projects", data);
  updateProjectList();
}

// 페이지 전부 로드 시 이벤트
document.addEventListener("DOMContentLoaded", () => {
  //get으로 정보를 불러서 화면에 띄우는 것까지
  updateProjectList();
});
