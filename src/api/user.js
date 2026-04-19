import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "get",
  });
}

export function updateUserInfo(data) {
  return request({
    url: "/user/info",
    method: "put",
    data,
  });
}

export function updatePassword(data) {
  return request({
    url: "/user/password",
    method: "put",
    data,
  });
}

export function getUserList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params,
  });
}

export function createUser(data) {
  return request({
    url: "/user",
    method: "post",
    data,
  });
}

export function updateUser(data) {
  return request({
    url: "/user",
    method: "put",
    data,
  });
}

export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: "delete",
  });
}

export function updateUserStatus(id, status) {
  return request({
    url: `/user/status/${id}`,
    method: "put",
    data: { status },
  });
}

export function resetPassword(id) {
  return request({
    url: `/user/reset-password/${id}`,
    method: "put",
  });
}

export function assignRole(data) {
  return request({
    url: "/user/assign-role",
    method: "post",
    data,
  });
}
