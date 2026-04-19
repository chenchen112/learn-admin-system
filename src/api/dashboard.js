import request from "@/utils/request";

export function getDashboardData() {
  return request({
    url: "/dashboard/data",
    method: "get",
  });
}

export function getVisitStatistics(params) {
  return request({
    url: "/dashboard/visit",
    method: "get",
    params,
  });
}

export function getUserStatistics(params) {
  return request({
    url: "/dashboard/user",
    method: "get",
    params,
  });
}

export function getSystemInfo() {
  return request({
    url: "/dashboard/system",
    method: "get",
  });
}
