import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(permission => route.meta.permissions.includes(permission))
  }
  return true
}

function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTES: (state) => {
    state.addRoutes = []
    state.routes = constantRoutes
  }
}

const actions = {
  generateRoutes({ commit }, { roles, permissions }) {
    return new Promise(resolve => {
      let accessedRoutes
      
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      }

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  
  resetRoutes({ commit }) {
    commit('RESET_ROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
