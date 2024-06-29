// certificate.js
import { showElement, hideElement } from "../utils.js";
import {
  changeDate,
  deleteAPI,
  putAPI,
  postAPI,
  getAPI,
} from "../apiRequest.js";

const addCertificateBtn = document.getElementById("addCertificateBtn");
const certificateForm = document.getElementById("certificateForm");
const certificateNameInput = document.getElementById("certificateName");
const certificateOrganizationInput = document.getElementById(
  "certificateOrganization"
);
const certificateDateInput = document.getElementById("certificateDate");
const certificateExpInput = document.getElementById("ExpDate");

let certificateList = [];

let certificateEditingIndex = -1;
addCertificateBtn.addEventListener("click", () => {
  certificateEditingIndex = -1;
  initializeCertificateForm();
});

// const canEdit = localStorage.getItem("canEdit");
// if (canEdit === "false") {
//   addCertificateBtn.className += " hidden";
// }

const initializeCertificateForm = () => {
  clearCertificateForm();
  toggleCertificateForm();
};

document
  .getElementById("certificateCancelBtn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    initializeCertificateForm();
  });

document
  .getElementById("certificateConfirmBtn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    //만료일은 필수x
    if (
      certificateNameInput.value &&
      certificateOrganizationInput.value &&
      certificateDateInput.value
    ) {
      if (certificateEditingIndex === -1) {
        certificateList.push({
          name: certificateNameInput.value,
          organization: certificateOrganizationInput.value,
          issuingDate: certificateDateInput.value,
          expirationDate: certificateExpInput.value,
        });
        const certificateData = {
          name: certificateNameInput.value,
          organization: certificateOrganizationInput.value,
          issuingDate: certificateDateInput.value,
          expirationDate: certificateExpInput.value,
        };
        postCertificate(certificateData);
      } else {
        certificateList[certificateEditingIndex] = {
          name: certificateNameInput.value,
          organization: certificateOrganizationInput.value,
          issuingDate: certificateDateInput.value,
          expirationDate: certificateExpInput.value,
          certificateId: certificateList[certificateEditingIndex].certificateId,
        };
        const certificateData = {
          name: certificateNameInput.value,
          organization: certificateOrganizationInput.value,
          issuingDate: certificateDateInput.value,
          expirationDate: certificateExpInput.value,
          certificateId: certificateList[certificateEditingIndex].certificateId,
        };
        putCertificate(certificateEditingIndex, certificateData);
        certificateEditingIndex = -1;
      }
      initializeCertificateForm();
    } else {
      return alert("모든 필드를 입력해 주세요.");
    }
  });

async function renderCertificateList() {
  const userId = localStorage.getItem("userId");
  const certificateListData = await getAPI("certificates", userId);
  certificateList = certificateListData;

  // const canEdit = localStorage.getItem("canEdit");
  // if (canEdit === "false") {
  //   addCertificateBtn.className += " hidden";
  // }

  const fragment = document.createDocumentFragment();
  const certificateListDiv = document.getElementById("certificateList");
  certificateListDiv.innerHTML = "";

  certificateList.forEach((item, index) => {
    const certificateItemDiv = document.createElement("div");
    certificateItemDiv.className = "certificate-item";

    const certificateText = document.createElement("span");
    const issuing = changeDate(item.issuingDate);

    if (item.expirationDate) {
      const exp = changeDate(item.expirationDate);
      certificateText.innerText = `${item.name} (${item.organization})
          취득일 : ${issuing}
          만료일 : ${exp}
          `;
    } else {
      certificateText.innerText = `${item.name} (${item.organization})
          취득일 : ${issuing}
          `;
    }
    certificateItemDiv.appendChild(certificateText);
    const canEdit = localStorage.getItem("canEdit");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    if (canEdit === "false") {
      editBtn.className += " hidden";
    }
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editCertificate(index);
    });
    certificateItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    if (canEdit === "false") {
      deleteBtn.className += " hidden";
    }
    deleteBtn.addEventListener("click", () => {
      deleteCertificate(index);
    });
    certificateItemDiv.appendChild(deleteBtn);

    fragment.appendChild(certificateItemDiv);
  });
  certificateListDiv.appendChild(fragment);
}

function editCertificate(index) {
  certificateEditingIndex = index;
  const item = certificateList[index];
  certificateNameInput.value = item.name;
  certificateOrganizationInput.value = item.organization;
  const issuing = changeDate(item.issuingDate);
  certificateDateInput.value = issuing;
  if (item.expirationDate) {
    const exp = changeDate(item.expirationDate);
    certificateExpInput.value = exp;
  }

  toggleCertificateForm(true);
}

function clearCertificateForm() {
  certificateNameInput.value = "";
  certificateOrganizationInput.value = "";
  certificateDateInput.value = "";
  certificateExpInput.value = "";
}

function toggleCertificateForm(forceOpen = false) {
  if (forceOpen) {
    showElement(certificateForm);
  } else {
    certificateForm.style.display =
      certificateForm.style.display === "block" ? "none" : "block";
  }
}

const getCertificateId = () => {
  const path = window.location.pathname;
  const segments = path.split("/");
  return segments[2];
};

async function putCertificate(index, data) {
  const result = await putAPI(
    "certificates",
    certificateList[index].certificateId,
    data
  );
  renderCertificateList();
}
async function postCertificate(data) {
  const result = await postAPI("certificates", data);
  renderCertificateList();
}

async function deleteCertificate(index) {
  const result = await deleteAPI(
    "certificates",
    certificateList[index].certificateId
  );
  certificateList.splice(index, 1);
  renderCertificateList();
}

window.addEventListener("load", () => {
  //get으로 정보를 불러서 화면에 띄우는 것까지
  renderCertificateList();
});

// const certificateId = getCertificateId();
// localStorage.setItem('certificateId', certificateId)
// const result = await deleteAPI ('certificate', certificateId)
