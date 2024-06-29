// award.js
import { showElement, hideElement } from './utils.js';

const addAwardBtn = document.getElementById('addAwardBtn');
const awardForm = document.getElementById('awardForm');
const awardHistoryInput = document.getElementById('awardHistory');
const organizationInput = document.getElementById('organization');
const awardDateInput = document.getElementById('awardDate');
const awardList = [];
let awardEditingIndex = -1;

addAwardBtn.addEventListener('click', () => {
    awardEditingIndex = -1;
    clearAwardForm();
    toggleAwardForm();
});

document.getElementById('cancelBtn2').addEventListener('click', () => {
    clearAwardForm();
    toggleAwardForm();
});

document.getElementById('confirmBtn2').addEventListener('click', () => {
    if (awardHistoryInput.value && organizationInput.value && awardDateInput.value) {
        if (awardEditingIndex === -1) {
            awardList.push({
                awardHistory: awardHistoryInput.value,
                organization: organizationInput.value,
                awardDate: awardDateInput.value
            });
        } else {
            awardList[awardEditingIndex] = {
                awardHistory: awardHistoryInput.value,
                organization: organizationInput.value,
                awardDate: awardDateInput.value
            };
            awardEditingIndex = -1;
        }

        updateAwardList();
        clearAwardForm();
        toggleAwardForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateAwardList() {
    const awardListDiv = document.getElementById('awardList');
    awardListDiv.innerHTML = '';

    awardList.forEach((item, index) => {
        const awardItemDiv = document.createElement('div');
        awardItemDiv.className = 'award-item';
        
        const awardText = document.createElement('span');
        awardText.innerText = `${item.awardHistory} ${item.organization} ${item.awardDate}`;
        awardItemDiv.appendChild(awardText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editAward(index);
        });
        awardItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteAward(index);
        });
        awardItemDiv.appendChild(deleteBtn);

        awardListDiv.appendChild(awardItemDiv);
    });
}

function editAward(index) {
    awardEditingIndex = index;
    const item = awardList[index];
    awardHistoryInput.value = item.awardHistory;
    organizationInput.value = item.organization;
    awardDateInput.value = item.awardDate;
    toggleAwardForm(true);
}

function deleteAward(index) {
    awardList.splice(index, 1);
    updateAwardList();
}

function clearAwardForm() {
    awardHistoryInput.value = '';
    organizationInput.value = '';
    awardDateInput.value = '';
}

function toggleAwardForm(forceOpen = false) {
    if (forceOpen) {
        showElement(awardForm);
    } else {
        awardForm.style.display = awardForm.style.display === 'block' ? 'none' : 'block';
    }
}
