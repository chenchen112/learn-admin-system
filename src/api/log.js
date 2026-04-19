import request from "@/utils/request";

export function getLogList(params) {
  return request({
    url: "/log/list",
    method: "get",
    params,
  });
}

export function getLogDetail(id) {
  return request({
    url: `/log/${id}`,
    method: "get",
  });
}

export function deleteLog(id) {
  return request({
    url: `/log/${id}`,
    method: "delete",
  });
}

export function batchDeleteLog(ids) {
  return request({
    url: "/log/batch",
    method: "delete",
    data: { ids },
  });
}

export function clearLog(data) {
  return request({
    url: "/log/clear",
    method: "post",
    data,
  });
}

export function exportLog(params) {
  return request({
    url: "/log/export",
    method: "get",
    params,
    responseType: "blob",
  });
}

export function getLogStatistics(params) {
  return request({
    url: "/log/statistics",
    method: "get",
    params,
  });
}
