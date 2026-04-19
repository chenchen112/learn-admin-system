import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function getMenuTree() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

export function getUserMenus() {
  return request({
    url: '/menu/user-menus',
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/menu',
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: `/menu/${id}`,
    method: 'delete'
  })
}

export function getMenuDetail(id) {
  return request({
    url: `/menu/${id}`,
    method: 'get'
  })
}

export function updateMenuSort(data) {
  return request({
    url: '/menu/sort',
    method: 'put',
    data
  })
}
