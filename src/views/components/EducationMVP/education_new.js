// education.js
import { showElement, hideElement } from "../utils.js";
import { getUserId, loadEducationData } from "../loadUserData_2.js";

const addEducationBtn = document.getElementById("addEducationBtn");
const educationForm = document.getElementById("educationForm");
const schoolNameInput = document.getElementById("schoolName");
const majorInput = document.getElementById("major");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
let educationList = [];

const handleClickConfirm = () => {
  // post | put 실행

  updateEducation();
};

const updateEducation = async () => {
  // get 실행
  const educationListData = await fetch(""); // response 대기중
  educationList = educationListData;
  educationListData.forEach((data) => {
    // html 만들기
  });
};

window.addEventListener("load", () => {
  updateEducation();
});
