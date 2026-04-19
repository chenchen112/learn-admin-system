const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    permissions: [
      "system",
      "system:user",
      "system:role",
      "system:menu",
      "system:config",
      "log",
      "log:operation",
      "log:login",
    ],
    name: "Admin",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    userId: 1,
  },
  "editor-token": {
    roles: ["editor"],
    permissions: ["system", "system:user"],
    name: "Editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    userId: 2,
  },
};

export default [
  {
    url: "/user/login",
    type: "post",
    response: (config) => {
      const body =
        typeof config.body === "string" ? JSON.parse(config.body) : config.body;
      const { username } = body;
      const token = tokens[username];

      if (!token) {
        return {
          code: 60204,
          message: "用户名或密码错误",
        };
      }

      return {
        code: 200,
        data: token,
      };
    },
  },
  {
    url: "/user/info.*",
    type: "get",
    response: (config) => {
      const token =
        config.headers?.Authorization?.replace("Bearer ") || "admin-token";
      const info = users[token];

      if (!info) {
        return {
          code: 50008,
          message: "登录失败，无法获取用户信息",
        };
      }

      return {
        code: 200,
        data: info,
      };
    },
  },
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
];
