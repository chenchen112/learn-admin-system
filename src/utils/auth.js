const TokenKey = "Admin-Token";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getUserInfo() {
  const info = localStorage.getItem("Admin-UserInfo");
  return info ? JSON.parse(info) : null;
}

export function setUserInfo(info) {
  return localStorage.setItem("Admin-UserInfo", JSON.stringify(info));
}

export function removeUserInfo() {
  return localStorage.removeItem("Admin-UserInfo");
}

export function clearAuth() {
  removeToken();
  removeUserInfo();
}
