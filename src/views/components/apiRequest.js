export async function getAPI(mvp, userId) {
  // API 호출

  //mvp = api명세서
  const response = await fetch(`/api/${mvp}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export const postAPI = async (mvp, data) => {
  try {
    const response = await fetch(`/api/${mvp}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

export const putAPI = async (mvp, dataId, data) => {
  try {
    const response = await fetch(`/api/${mvp}/${dataId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteAPI = async (mvp, dataId) => {
  try {
    const response = await fetch(`/api/${mvp}/${dataId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result; // 결과 반환
  } catch (error) {
    console.error("Error:", error);
  }
};

export function changeDate(date) {
  const dateRaw = date;
  return dateRaw.substr(0, 10);
}

/////////////////////////////////////////////////////////////////

export async function fetchGetInfo(url) {
  // API 호출
  const response = await fetch(`/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
