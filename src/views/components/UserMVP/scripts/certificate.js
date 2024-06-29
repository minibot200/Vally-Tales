// certificate.js
import { showElement, hideElement } from './utils.js';

const addCertificateBtn = document.getElementById('addCertificateBtn');
const certificateForm = document.getElementById('certificateForm');
const certificateNameInput = document.getElementById('certificateName');
const certificateOrganizationInput = document.getElementById('certificateOrganization');
const certificateDateInput = document.getElementById('certificateDate');
const certificateList = [];
let certificateEditingIndex = -1;

addCertificateBtn.addEventListener('click', () => {
    certificateEditingIndex = -1;
    clearCertificateForm();
    toggleCertificateForm();
});

document.getElementById('certificateCancelBtn').addEventListener('click', () => {
    clearCertificateForm();
    toggleCertificateForm();
});

document.getElementById('certificateConfirmBtn').addEventListener('click', () => {
    if (certificateNameInput.value && certificateOrganizationInput.value && certificateDateInput.value) {
        if (certificateEditingIndex === -1) {
            certificateList.push({
                name: certificateNameInput.value,
                organization: certificateOrganizationInput.value,
                date: certificateDateInput.value
            });
        } else {
            certificateList[certificateEditingIndex] = {
                name: certificateNameInput.value,
                organization: certificateOrganizationInput.value,
                date: certificateDateInput.value
            };
            certificateEditingIndex = -1;
        }

        updateCertificateList();
        clearCertificateForm();
        toggleCertificateForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateCertificateList() {
    const certificateListDiv = document.getElementById('certificateList');
    certificateListDiv.innerHTML = '';

    certificateList.forEach((item, index) => {
        const certificateItemDiv = document.createElement('div');
        certificateItemDiv.className = 'certificate-item';
        
        const certificateText = document.createElement('span');
        certificateText.innerText = `${item.name} - ${item.organization} - ${item.date}`;
        certificateItemDiv.appendChild(certificateText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editCertificate(index);
        });
        certificateItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteCertificate(index);
        });
        certificateItemDiv.appendChild(deleteBtn);

        certificateListDiv.appendChild(certificateItemDiv);
    });
}

function editCertificate(index) {
    certificateEditingIndex = index;
    const item = certificateList[index];
    certificateNameInput.value = item.name;
    certificateOrganizationInput.value = item.organization;
    certificateDateInput.value = item.date;
    toggleCertificateForm(true);
}

function deleteCertificate(index) {
    certificateList.splice(index, 1);
    updateCertificateList();
}

function clearCertificateForm() {
    certificateNameInput.value = '';
    certificateOrganizationInput.value = '';
    certificateDateInput.value = '';
}

function toggleCertificateForm(forceOpen = false) {
    if (forceOpen) {
        showElement(certificateForm);
    } else {
        certificateForm.style.display = certificateForm.style.display === 'block' ? 'none' : 'block';
    }
}
