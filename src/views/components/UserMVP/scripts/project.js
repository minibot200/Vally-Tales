// project.js
import { showElement, hideElement } from './utils.js';

const addProjectBtn = document.getElementById('addProjectBtn');
const projectForm = document.getElementById('projectForm');
const projectNameInput = document.getElementById('projectName');
const projectDescriptionInput = document.getElementById('projectDescription');
const projectList = [];
let projectEditingIndex = -1;

addProjectBtn.addEventListener('click', () => {
    projectEditingIndex = -1;
    clearProjectForm();
    toggleProjectForm();
});

document.getElementById('projectCancelBtn').addEventListener('click', () => {
    clearProjectForm();
    toggleProjectForm();
});

document.getElementById('projectConfirmBtn').addEventListener('click', () => {
    if (projectNameInput.value && projectDescriptionInput.value) {
        if (projectEditingIndex === -1) {
            projectList.push({
                name: projectNameInput.value,
                description: projectDescriptionInput.value
            });
        } else {
            projectList[projectEditingIndex] = {
                name: projectNameInput.value,
                description: projectDescriptionInput.value
            };
            projectEditingIndex = -1;
        }

        updateProjectList();
        clearProjectForm();
        toggleProjectForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateProjectList() {
    const projectListDiv = document.getElementById('projectList');
    projectListDiv.innerHTML = '';

    projectList.forEach((item, index) => {
        const projectItemDiv = document.createElement('div');
        projectItemDiv.className = 'project-item';
        
        const projectText = document.createElement('span');
        projectText.innerText = `${item.name} - ${item.description}`;
        projectItemDiv.appendChild(projectText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editProject(index);
        });
        projectItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteProject(index);
        });
        projectItemDiv.appendChild(deleteBtn);

        projectListDiv.appendChild(projectItemDiv);
    });
}

function editProject(index) {
    projectEditingIndex = index;
    const item = projectList[index];
    projectNameInput.value = item.name;
    projectDescriptionInput.value = item.description;
    toggleProjectForm(true);
}

function deleteProject(index) {
    projectList.splice(index, 1);
    updateProjectList();
}

function clearProjectForm() {
    projectNameInput.value = '';
    projectDescriptionInput.value = '';
}

function toggleProjectForm(forceOpen = false) {
    if (forceOpen) {
        showElement(projectForm);
    } else {
        projectForm.style.display = projectForm.style.display === 'block' ? 'none' : 'block';
    }
}
