# learn-admin-system

一个基于 Vue2 + Webpack 的中后台管理系统 Demo

## 技术栈

| 技术       | 版本   | 说明                   |
| ---------- | ------ | ---------------------- |
| Vue        | 2.6.x  | 渐进式 JavaScript 框架 |
| Webpack    | 5.x    | 模块打包工具           |
| Element-UI | 2.15.x | UI 组件库              |
| Vue-Router | 3.x    | 路由管理               |
| Vuex       | 3.x    | 状态管理               |
| Axios      | 1.x    | HTTP 请求库            |
| ECharts    | 5.x    | 图表库                 |
| SCSS       | -      | CSS 预处理器           |
| pnpm       | -      | 包管理器               |

## 功能模块

| 模块      | 功能说明                                |
| --------- | --------------------------------------- |
| 登录注册  | 用户登录、注册、Token 认证              |
| 用户管理  | 用户 CRUD、状态切换、角色分配、密码重置 |
| 角色管理  | 角色 CRUD、权限分配                     |
| 菜单管理  | 树形结构菜单 CRUD、图标配置             |
| 日志管理  | 操作日志、登录日志查询                  |
| 系统配置  | 系统参数配置、缓存管理                  |
| 个人中心  | 个人信息修改、密码修改                  |
| Dashboard | 数据统计卡片、ECharts 图表展示          |

## 项目结构

```
learn-admin-system/
├── build/                      # Webpack 配置
│   ├── webpack.base.js         # 基础配置
│   ├── webpack.dev.js          # 开发环境配置
│   └── webpack.prod.js         # 生产环境配置
├── public/
│   └── index.html              # HTML 模板
├── src/
│   ├── api/                    # API 接口
│   │   ├── user.js             # 用户相关接口
│   │   ├── role.js             # 角色相关接口
│   │   ├── menu.js             # 菜单相关接口
│   │   ├── log.js              # 日志相关接口
│   │   ├── config.js           # 配置相关接口
│   │   └── dashboard.js        # Dashboard 接口
│   ├── assets/                 # 静态资源
│   │   └── styles/             # 全局样式
│   │       ├── index.scss      # 主样式文件
│   │       ├── variables.scss  # SCSS 变量
│   │       └── mixins.scss     # SCSS 混入
│   ├── components/             # 公共组件
│   │   ├── Breadcrumb/         # 面包屑组件
│   │   ├── Hamburger/          # 折叠按钮组件
│   │   └── Pagination/         # 分页组件
│   ├── layout/                 # 布局组件
│   │   ├── index.vue           # 主布局
│   │   └── components/         # 布局子组件
│   │       ├── Navbar.vue      # 顶部导航栏
│   │       ├── Sidebar.vue     # 侧边菜单栏
│   │       ├── SidebarItem.vue # 菜单项
│   │       ├── AppMain.vue     # 内容区域
│   │       └── Logo.vue        # Logo 组件
│   ├── router/                 # 路由配置
│   │   ├── index.js            # 路由定义
│   │   └── permission.js       # 路由守卫
│   ├── store/                  # Vuex 状态管理
│   │   ├── index.js            # Store 入口
│   │   ├── getters.js          # Getters
│   │   └── modules/            # Store 模块
│   │       ├── user.js         # 用户模块
│   │       ├── permission.js   # 权限模块
│   │       ├── app.js          # 应用模块
│   │       └── tagsView.js     # 标签页模块
│   ├── utils/                  # 工具函数
│   │   ├── auth.js             # Token 管理
│   │   ├── request.js          # Axios 封装
│   │   ├── validate.js         # 验证函数
│   │   └── index.js            # 通用工具
│   ├── views/                  # 页面视图
│   │   ├── login/              # 登录注册
│   │   ├── dashboard/          # 首页仪表盘
│   │   ├── system/             # 系统管理
│   │   │   ├── user/           # 用户管理
│   │   │   ├── role/           # 角色管理
│   │   │   ├── menu/           # 菜单管理
│   │   │   └── config/         # 系统配置
│   │   ├── log/                # 日志管理
│   │   │   ├── operation.vue   # 操作日志
│   │   │   └── login.vue       # 登录日志
│   │   ├── profile/            # 个人中心
│   │   ├── error/              # 错误页面
│   │   └── redirect/           # 重定向页面
│   ├── mock/                   # Mock 数据
│   │   ├── index.js            # Mock 入口
│   │   └── user.js             # 用户 Mock
│   ├── App.vue                 # 根组件
│   └── main.js                 # 入口文件
├── .env.development            # 开发环境变量
├── .env.production             # 生产环境变量
├── babel.config.js             # Babel 配置
├── postcss.config.js           # PostCSS 配置
└── package.json                # 项目配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```

访问 http://localhost:8080

### 生产构建

```bash
pnpm build
```

### 测试账号

| 用户名 | 密码   | 角色               |
| ------ | ------ | ------------------ |
| admin  | 123456 | 管理员（所有权限） |
| editor | 123456 | 编辑（部分权限）   |

## 构建优化

### 代码分割

生产构建采用以下代码分割策略：

| Chunk      | 内容                      | 加载方式 |
| ---------- | ------------------------- | -------- |
| vendor     | Vue/Vue-Router/Vuex/Axios | 同步     |
| element-ui | Element UI 组件           | 同步     |
| echarts    | ECharts 图表库            | 异步     |
| common     | 公共代码                  | 同步     |
| runtime    | Webpack 运行时            | 同步     |

### 其他优化

- **SourceMap**: 生产环境关闭，保护源码安全
- **代码压缩**: TerserPlugin 压缩 JS，CssMinimizerPlugin 压缩 CSS
- **Tree Shaking**: 自动移除未使用代码
- **控制台清理**: 生产环境自动移除 console 和 debugger

## 权限控制

### 路由权限

- 静态路由：无需权限即可访问（登录、注册、404）
- 动态路由：根据用户权限动态加载

### 权限指令

```javascript
// 使用方式
<el-button v-permission="['system:user:add']">新增</el-button>
```

### 权限验证

```javascript
import { checkPermission } from '@/utils/permission'

// 检查是否有权限
if (checkPermission(['system:user:edit'])) {
  // 有权限
}
```

## 环境变量

```bash
# .env.development
NODE_ENV = development
VUE_APP_BASE_API = /api
VUE_APP_TITLE = Admin System

# .env.production
NODE_ENV = production
VUE_APP_BASE_API = /api
VUE_APP_TITLE = Admin System
```

## 注意事项

1. 当前使用 Mock 数据，API 请求通过 Mock.js 拦截
2. 如需对接真实后端，修改 `.env.development` 中的代理配置
3. 生产环境构建前，建议关闭 Mock 功能
