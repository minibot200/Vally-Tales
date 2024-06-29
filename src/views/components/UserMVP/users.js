import { fetchPostLogout } from "./logout.js";
import { fetchGetInfo } from "../apiRequest.js";
// 새 코드

document.addEventListener("DOMContentLoaded", async function () {
  const userCardsContainer = document.getElementById("userCards");

  // fetch 함수를 사용하여 데이터 가져오기
  const users = await fetchGetInfo("users");

  // 카드 요소를 생성
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    if (!user.description) {
      user.description = "아직 설명이 없어요!";
    } else if (!user.imageUrl) {
      user.imageUrl = "./images/profile.png";
    }

    card.innerHTML = `
            <div class="card">
                <img src="${user.imageUrl}" class="card-img-top" alt="${user.name}" onerror="this.src='./images/profile.png';">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text">${user.description}</p>
                    <a href="/users/${user.userId}" class="btn btn-primary show-btn">Show User</a>
                </div>
            </div>
        `;

    userCardsContainer.appendChild(card);
  });
});
