import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo, getUserInfo as getStoredUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: '',
  roles: [],
  permissions: [],
  userInfo: getStoredUserInfo()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { roles, name, avatar, userId, permissions } = data

        if (!roles || roles.length <= 0) {
          reject('该用户没有角色')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USER_ID', userId)
        commit('SET_PERMISSIONS', permissions || [])
        commit('SET_USER_INFO', data)
        setUserInfo(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_USER_INFO', null)
        removeToken()
        removeUserInfo()
        resetRouter()
        dispatch('permission/resetRoutes', null, { root: true })
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
      removeUserInfo()
      resolve()
    })
  },

  updateUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
    commit('SET_NAME', userInfo.name)
    commit('SET_AVATAR', userInfo.avatar)
    setUserInfo(userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
