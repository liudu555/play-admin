import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "数据中心",
  },
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      component: "./layout/Login",
      layout: false,
    },
    {
      name: "首页",
      path: "/home",
      component: "./business/Home",
    },
    {
      name: "权限演示",
      path: "/access",
      component: "./business/Access",
    },
    {
      name: " CRUD 示例",
      path: "/table",
      component: "./business/Table",
    },
    {
      icon: "user",
      name: "用户管理",
      path: "/user",
      routes: [
        {
          name: "用户管理",
          path: "/user/businessUser",
          component: "./business/User/BusinessUser",
        },
        {
          name: "FB账户密钥",
          path: "/user/FaceBookAccount",
          component: "./business/User/FaceBookAccount",
        },
        {
          name: "成员组管理",
          path: "/user/Group",
          component: "./business/User/Group",
        },
      ],
    },
    {
      name: "链接数据",
      path: "/link",
      icon: "link",
      routes: [
        {
          name: "链接数据",
          path: "/link/LinkData",
          component: "./business/Link/LinkData",
        },
        {
          name: "Facebook数据",
          path: "/link/FaceBookData",
          component: "./business/Link/FaceBookData",
        },
      ],
    },
  ],
  npmClient: "yarn",
  tailwindcss: {},
  proxy: {
    '/api': {
      'target': 'http://192.168.2.239:8001/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
