// education.js
import { showElement, hideElement } from "../utils.js";
import {
  changeDate,
  deleteAPI,
  putAPI,
  postAPI,
  getAPI,
} from "../apiRequest.js";

const addEducationBtn = document.getElementById("addEducationBtn");
const educationForm = document.getElementById("educationForm");
const schoolNameInput = document.getElementById("schoolName");
const majorInput = document.getElementById("major");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

let educationList = [];

let educationEditingIndex = -1;
addEducationBtn.addEventListener("click", () => {
  educationEditingIndex = -1;
  clearEducationForm();
  toggleEducationForm();
});

//확인버튼 동작
const handleClickConfirm = (e) => {
  e.preventDefault();
  const itemDegree = selectedDegree();

  // 재학중이면 endDate 입력X
  const blankControl =
    schoolNameInput.value &&
    majorInput.value &&
    itemDegree &&
    startDateInput.value;

  if (blankControl) {
    if (itemDegree !== "재학중") {
      if (!endDate.value) {
        return alert("모든 필드를 입력해주세요!");
      }
    }
  } else {
    return alert("모든 필드를 입력해주세요!");
  }

  const educationData = {
    school: schoolNameInput.value,
    major: majorInput.value,
    degree: itemDegree,
    startDate: startDate.value,
    endDate: endDate.value,
  };

  if (educationEditingIndex === -1) {
    // 이 전에 없으면 추가
    educationList.push({
      schoolName: schoolNameInput.value,
      major: majorInput.value,
      degree: itemDegree,
      startDate: startDate.value,
      endDate: endDate.value,
    });
    const educationData = {
      school: schoolNameInput.value,
      major: majorInput.value,
      degree: itemDegree,
      startDate: startDate.value,
      endDate: endDate.value,
    };
    console.log(`추가한 데이터 ${educationData}`);
    //post
    postEducation(educationData);
  } else {
    // 있으면 수정
    educationList[educationEditingIndex] = {
      schoolName: schoolNameInput.value,
      major: majorInput.value,
      degree: itemDegree,
      startDate: startDate.value,
      endDate: endDate.value,
      educationId: educationList[educationEditingIndex].educationId,
    };
    const educationData = {
      school: schoolNameInput.value,
      major: majorInput.value,
      degree: itemDegree,
      startDate: startDate.value,
      endDate: endDate.value,
      educationId: educationList[educationEditingIndex].educationId,
    };

    console.log(`수정한 데이터 ${educationData}`);
    // put
    putEducation(educationEditingIndex, educationData);

    educationEditingIndex = -1;
  }
  console.log(`${educationList}`);
  // post / put 요청 함수 안에서 재랜더해서 주석처리
  //   console.log("재랜더");
  //   renderEducationList();
  clearEducationForm();
  toggleEducationForm();
};

//재학중 선택할 경우 졸업일 disabled 추가하기

//빈칸 검사
const checkBlank = (degree) => {
  const blankControl =
    schoolNameInput.value && majorInput.value && degree && startDateInput.value;

  if (blankControl) {
    if (degree !== "재학중") {
      if (!endDate.value) {
        return alert("모든 필드를 입력해주세요!");
      }
    }
  } else {
    return alert("모든 필드를 입력해주세요!");
  }
};

// 학력 업데이트
const renderEducationList = async () => {
  // get 실행
  console.log(`${localStorage.getItem("userId")}의 학력데이터`);
  const userId = localStorage.getItem("userId");
  const educationListData = await getAPI("educations", userId); // response 대기중
  educationList = educationListData;

  // (+) btn hidden
  const canEdit = localStorage.getItem("canEdit");
  console.log(`내가 사용할 canEdit ${canEdit}`);
  if (canEdit === "false") {
    addEducationBtn.className += " hidden";
  }

  const fragment = document.createDocumentFragment();
  const educationListDiv = document.getElementById("educationList");
  educationListDiv.innerHTML = "";

  educationList.forEach((item, index) => {
    // html 만들기
    const educationItemDiv = document.createElement("div");
    educationItemDiv.className = "education-item";

    const educationText = document.createElement("span");
    if (item.startDate && item.endDate) {
      const start = changeDate(item.startDate);
      const end = changeDate(item.endDate);
      educationText.innerText = `${item.school} ${item.major} (${item.degree}) ${start} ~ ${end}`;
    } else {
      const start = changeDate(item.startDate);
      educationText.innerText = `${item.school} ${item.major} (${item.degree}) ${start} ~ `;
    }

    // educationText.innerText = `${item.school} ${item.major} (${item.degree}) ${date}`;
    educationItemDiv.appendChild(educationText);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    console.log(`이 페이지에 적용된 ${canEdit}`);
    if (canEdit === "false") {
      editBtn.className += " hidden";
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
      deleteBtn.className += " hidden";
    }
    deleteBtn.addEventListener("click", () => {
      deleteEducation(index);
    });
    educationItemDiv.appendChild(deleteBtn);

    fragment.appendChild(educationItemDiv);
  });
  educationListDiv.appendChild(fragment);
};

//토글 on/off
function toggleEducationForm(forceOpen = false) {
  if (forceOpen) {
    showElement(educationForm);
  } else {
    educationForm.style.display =
      educationForm.style.display === "block" ? "none" : "block";
  }
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

//취소 버튼 이벤트
document.getElementById("cancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clearEducationForm();
  toggleEducationForm();
});

//confirmBtn 클릭 시 동작 이벤트
document
  .getElementById("confirmBtn")
  .addEventListener("click", handleClickConfirm);

//편집버튼 클릭하면 나오는 input창에 기존 정보 나오게 세팅
function editEducation(index) {
  educationEditingIndex = index;
  const item = educationList[index];
  console.log(item);
  schoolNameInput.value = item.school;
  majorInput.value = item.major;
  const degrees = document.getElementsByName("degree");
  console.log(item.degree);
  degrees.forEach((degree) => {
    degree.checked = degree.value === item.degree;
  });
  startDateInput.value = item.startDate.substr(0, 10);
  if (item.endDate) {
    endDateInput.value = item.endDate.substr(0, 10);
  }
  toggleEducationForm(true);
}

function selectedDegree() {
  const degreeElement = document.querySelector('input[name="degree"]:checked');

  //라디오버튼 값 할당
  const degree = degreeElement ? degreeElement.value : "";
  return degree;
}

async function deleteEducation(index) {
  // async 추가
  // deleteEducationAPI 호출
  console.log(educationList[index]);
  const result = await deleteAPI(
    "educations",
    educationList[index].educationId
  );
  educationList.splice(index, 1);
  console.log("delete 요청 후 재랜더");
  renderEducationList();
}

async function putEducation(index, data) {
  console.log(educationList[index]);
  const result = await putAPI(
    "educations",
    educationList[index].educationId,
    data
  );
  console.log("put 요청 후 재랜더");
  renderEducationList();
}

async function postEducation(data) {
  const result = await postAPI("educations", data);
  console.log("post 요청 후 재랜더");
  renderEducationList();
}

// 페이지 전부 로드 시 이벤트
window.addEventListener("load", () => {
  renderEducationList();
});
