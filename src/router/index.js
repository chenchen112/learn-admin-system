import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/redirect",
    component: () => import("@/layout/index.vue"),
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "登录", hidden: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/login/register.vue"),
    meta: { title: "注册", hidden: true },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: { title: "404", hidden: true },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "首页", icon: "el-icon-s-home", affix: true },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/system",
    component: () => import("@/layout/index.vue"),
    redirect: "/system/user",
    name: "System",
    meta: {
      title: "系统管理",
      icon: "el-icon-s-tools",
      permissions: ["system"],
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "el-icon-user-solid",
          permissions: ["system:user"],
        },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/system/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "el-icon-s-check",
          permissions: ["system:role"],
        },
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "el-icon-menu",
          permissions: ["system:menu"],
        },
      },
      {
        path: "config",
        name: "Config",
        component: () => import("@/views/system/config/index.vue"),
        meta: {
          title: "系统配置",
          icon: "el-icon-setting",
          permissions: ["system:config"],
        },
      },
    ],
  },
  {
    path: "/log",
    component: () => import("@/layout/index.vue"),
    redirect: "/log/operation",
    name: "Log",
    meta: {
      title: "日志管理",
      icon: "el-icon-document",
      permissions: ["log"],
    },
    children: [
      {
        path: "operation",
        name: "OperationLog",
        component: () => import("@/views/log/operation.vue"),
        meta: {
          title: "操作日志",
          icon: "el-icon-tickets",
          permissions: ["log:operation"],
        },
      },
      {
        path: "login",
        name: "LoginLog",
        component: () => import("@/views/log/login.vue"),
        meta: {
          title: "登录日志",
          icon: "el-icon-time",
          permissions: ["log:login"],
        },
      },
    ],
  },
  {
    path: "/profile",
    component: () => import("@/layout/index.vue"),
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
        meta: { title: "个人中心", icon: "el-icon-user" },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
