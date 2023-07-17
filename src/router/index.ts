import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/LayoutView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ "../views/test/Test.vue"),
  },
  {
    path: "/secondView",
    component: () => import("../views/test/SecondView.vue"),
  },
  //主页，又名"布局组件"，包含组件：HeadNav、LeftMenu、router-view
  {
    path: "/layoutView",
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutView.vue'),
    children: [
      //默认选中
      {
        path: "/",
        name: "home",
        component: () => import("../views/user/UserListView.vue"),
        // component: () => import("../views/test/RootView.vue"),
        // component: () => import("../views/test/Test.vue"),
      },
      // 用户列表
      {
        path: "userListView",
        name: "1",
        component: () => import("../views/user/UserListView.vue"),
      },
      // 用户详情
      {
        path: "userDetailView",
        // name: "userDetailView",
        component: () => import("../views/user/UserDetailView.vue"),
      },
      // 设备列表
      {
        path: "deviceListView",
        name: "2",
        component: () => import("../views/device/DeviceListView.vue"),
      },
      // 设备详情
      {
        path: "deviceDetailView",
        // name: "deviceDetailView",
        component: () => import("../views/device/DeviceDetailView.vue"),
      },
      // 测试
      {
        path: "testView",
        component: () => import("../views/SSJTest.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
