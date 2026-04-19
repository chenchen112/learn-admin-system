import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

export function getAllRoles() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function getRolePermissions(id) {
  return request({
    url: `/role/permissions/${id}`,
    method: 'get'
  })
}

export function updateRolePermissions(data) {
  return request({
    url: '/role/permissions',
    method: 'put',
    data
  })
}

export function getRoleUsers(id, params) {
  return request({
    url: `/role/users/${id}`,
    method: 'get',
    params
  })
}
