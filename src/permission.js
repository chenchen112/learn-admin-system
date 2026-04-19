import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      return
    }
    
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    
    if (hasRoles) {
      next()
    } else {
      try {
        const { roles, permissions } = await store.dispatch('user/getInfo')
        
        const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, permissions })
        
        router.addRoutes(accessRoutes)
        
        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
