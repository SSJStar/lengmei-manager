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
  //主页，又名"布局组件"，包含组件：HeadNav、LeftMenu、router-view
  {
    path: "/layoutView",
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutView.vue'),
    children: [
      {
        path: "",
        component: () => import("../views/user/UserListView.vue"),
      },
      // 用户列表
      {
        path: "userListView",
        name: "userListView",
        component: () => import("../views/user/UserListView.vue"),
      },
      // 设备列表
      {
        path: "deviceListView",
        name: "deviceListView",
        component: () => import("../views/device/DeviceListView.vue"),
      },
      // 设备详情
      {
        path: "deviceDetailView",
        name: "deviceDetailView",
        component: () => import("../views/device/DeviceDetailView.vue"),
      },

    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
