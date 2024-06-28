// award.js
import { showElement, hideElement } from "../utils.js";
import {
  changeDate,
  deleteAPI,
  putAPI,
  postAPI,
  getAPI,
} from "../apiRequest.js";

const [
  addAwardBtn,
  awardForm,
  awardHistoryInput,
  organizationInput,
  awardDateInput,
] = document.querySelectorAll("[id^=award-form]");
let awardList = []; // let으로 변경
let awardEditingIndex = -1;

const initializeAwardForm = () => {
  clearAwardForm();
  toggleAwardForm();
};

addAwardBtn.addEventListener("click", () => {
  awardEditingIndex = -1;
  initializeAwardForm();
});

document.getElementById("awardCancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  initializeAwardForm();
});

document
  .getElementById("awardConfirmBtn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    if (
      awardHistoryInput.value &&
      organizationInput.value &&
      awardDateInput.value
    ) {
      // const awardData = {
      //   title: awardHistoryInput.value,
      //   organization: organizationInput.value,
      //   date: awardDateInput.value, // 날짜 필드 이름 수정
      // };

      if (awardEditingIndex === -1) {
        // 새로운 수상 추가
        const awardData = {
          title: awardHistoryInput.value,
          organization: organizationInput.value,
          date: awardDateInput.value, // 날짜 필드 이름 수정
        };
        const result = await postAward(awardData); // postAward 호출 및 결과 저장
        awardList.push(result); // awardList에 추가
      } else {
        // 기존 수상 수정
        const awardData = {
          title: awardHistoryInput.value,
          organization: organizationInput.value,
          date: awardDateInput.value, // 날짜 필드 이름 수정
          awardId: awardList[awardEditingIndex].awardId,
        };

        const result = await putAward(
          awardList[awardEditingIndex].awardId,
          awardData
        ); // putAward 호출 및 결과 저장
        awardList[awardEditingIndex] = result; // awardList 업데이트
        awardEditingIndex = -1;
      }

      updateAwardList();
      initializeAwardForm();
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  });

async function updateAwardList() {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(`/api/awards/${userId}`, {
      // API URL 수정
      method: "GET",
    });
    const result = await response.json();
    awardList.splice(0, awardList.length, ...result); // 기존 리스트를 새로운 데이터로 덮어쓰기
  } catch (error) {
    console.error("Error:", error);
  }

  const awardListDiv = document.getElementById("awardList");
  awardListDiv.innerHTML = "";

  // const canEdit = localStorage.getItem("canEdit");
  // if (canEdit === "false") {
  //   addAwardBtn.className += " hidden";
  // }

  const fragment = document.createDocumentFragment();

  awardList.forEach((item, index) => {
    const awardItemDiv = document.createElement("div");
    awardItemDiv.className = "award-item";

    const awardText = document.createElement("span");
    awardText.innerText = `${item.title}
    ${item.organization}
    ${item.date.substr(0, 10)}
    `; // 날짜 필드 이름 수정
    awardItemDiv.appendChild(awardText);
    const canEdit = localStorage.getItem("canEdit");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    if (canEdit === "false") {
      editBtn.className += " hidden";
    }
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editAward(index);
    });
    awardItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    if (canEdit === "false") {
      deleteBtn.className += " hidden";
    }
    deleteBtn.innerText = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteAward(index);
    });
    awardItemDiv.appendChild(deleteBtn);

    fragment.appendChild(awardItemDiv);
  });

  awardListDiv.appendChild(fragment);
}

function editAward(index) {
  awardEditingIndex = index;
  const item = awardList[index];
  awardHistoryInput.value = item.title;
  organizationInput.value = item.organization;
  awardDateInput.value = item.date.substr(0, 10); // 날짜 필드 이름 수정
  toggleAwardForm(true);
}

async function deleteAward(index) {
  // async 추가
  const result = await deleteAPI("awards", awardList[index].awardId); // deleteAwardAPI 호출
  awardList.splice(index, 1);
  updateAwardList();
}

function clearAwardForm() {
  awardHistoryInput.value = "";
  organizationInput.value = "";
  awardDateInput.value = "";
}

function toggleAwardForm(forceOpen = false) {
  if (forceOpen) {
    showElement(awardForm);
  } else {
    awardForm.style.display =
      awardForm.style.display === "block" ? "none" : "block";
  }
}

// 수상 조회 함수
const getAwards = async (userId) => {
  try {
    const response = await fetch(`/api/awards/${userId}`, {
      // API URL 수정
      method: "GET",
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 수상 추가 함수
const postAward = async (awardData) => {
  // 함수 이름 수정
  try {
    const response = await fetch(`/api/awards`, {
      // API URL 수정
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(awardData),
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 수상 수정 함수
const putAward = async (awardId, awardData) => {
  try {
    const response = await fetch(`/api/awards/${awardId}`, {
      // API URL 수정
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(awardData),
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 수상 삭제 함수
const deleteAwardAPI = async (awardId) => {
  try {
    const response = await fetch(`/api/awards/${awardId}`, {
      // API URL 수정
      method: "DELETE",
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

// 페이지 로드 시 수상 목록 불러오기
window.addEventListener("load", async () => {
  updateAwardList();
});
