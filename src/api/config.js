import request from '@/utils/request'

export function getConfigList(params) {
  return request({
    url: '/config/list',
    method: 'get',
    params
  })
}

export function getConfigByKey(key) {
  return request({
    url: `/config/key/${key}`,
    method: 'get'
  })
}

export function createConfig(data) {
  return request({
    url: '/config',
    method: 'post',
    data
  })
}

export function updateConfig(data) {
  return request({
    url: '/config',
    method: 'put',
    data
  })
}

export function deleteConfig(id) {
  return request({
    url: `/config/${id}`,
    method: 'delete'
  })
}

export function refreshCache() {
  return request({
    url: '/config/refresh-cache',
    method: 'post'
  })
}

export function getConfigByGroup(group) {
  return request({
    url: `/config/group/${group}`,
    method: 'get'
  })
}
