// education.js
import { showElement, hideElement } from './utils.js';

const addEducationBtn = document.getElementById('addEducationBtn');
const educationForm = document.getElementById('educationForm');
const schoolNameInput = document.getElementById('schoolName');
const majorInput = document.getElementById('major');
const educationList = [];
let educationEditingIndex = -1;

addEducationBtn.addEventListener('click', () => {
    educationEditingIndex = -1;
    clearEducationForm();
    toggleEducationForm();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    clearEducationForm();
    toggleEducationForm();
});

document.getElementById('confirmBtn').addEventListener('click', () => {
    const degreeElement = document.querySelector('input[name="degree"]:checked');
    const degree = degreeElement ? degreeElement.value : '';

    if (schoolNameInput.value && majorInput.value && degree) {
        if (educationEditingIndex === -1) {
            educationList.push({
                schoolName: schoolNameInput.value,
                major: majorInput.value,
                degree: degree
            });
        } else {
            educationList[educationEditingIndex] = {
                schoolName: schoolNameInput.value,
                major: majorInput.value,
                degree: degree
            };
            educationEditingIndex = -1;
        }

        updateEducationList();
        clearEducationForm();
        toggleEducationForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateEducationList() {
    const educationListDiv = document.getElementById('educationList');
    educationListDiv.innerHTML = '';

    educationList.forEach((item, index) => {
        const educationItemDiv = document.createElement('div');
        educationItemDiv.className = 'education-item';
        
        const educationText = document.createElement('span');
        educationText.innerText = `${item.schoolName} ${item.major} (${item.degree})`;
        educationItemDiv.appendChild(educationText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editEducation(index);
        });
        educationItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteEducation(index);
        });
        educationItemDiv.appendChild(deleteBtn);

        educationListDiv.appendChild(educationItemDiv);
    });
}

function editEducation(index) {
    educationEditingIndex = index;
    const item = educationList[index];
    schoolNameInput.value = item.schoolName;
    majorInput.value = item.major;
    const degrees = document.getElementsByName('degree');
    degrees.forEach(degree => {
        degree.checked = (degree.value === item.degree);
    });
    toggleEducationForm(true);
}

function deleteEducation(index) {
    educationList.splice(index, 1);
    updateEducationList();
}

function clearEducationForm() {
    schoolNameInput.value = '';
    majorInput.value = '';
    const degrees = document.getElementsByName('degree');
    degrees.forEach(degree => {
        degree.checked = false;
    });
}

function toggleEducationForm(forceOpen = false) {
    if (forceOpen) {
        showElement(educationForm);
    } else {
        educationForm.style.display = educationForm.style.display === 'block' ? 'none' : 'block';
    }
}
