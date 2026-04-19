const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  userInfo: state => state.user.userInfo,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}

export default getters
