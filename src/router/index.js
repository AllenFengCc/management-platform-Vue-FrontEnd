import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from "../views/Login"
import Home from "../views/Home";
import {Message} from "element-ui";
import AppManagement from "@/components/appManage/AppManagement";
import UserManagement from "@/components/userManage/UserManagement";
import SystemSetting from "@/components/sysSet/SystemSetting";
import SystemLog from "@/components/sysSet/SystemLog";
import MessagePub from "@/components/messagePub/MessagePub";
import MessageList from "@/components/messagePub/MessageList";


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    hidden: true,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      child: true,
      title: 'User',
      icon: 'el-icon-user',
      ind: '1',
    },
    children: [
      {
        path: '/UserManagement',
        name: 'UserManagement',
        component: UserManagement,
        meta: {
          title: 'User Management',
          icon: 'el-icon-receiving',
          roles: [
              'ROLE_admin','ROLE_user'
          ]
        },
      },
    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      child: true,
      title: 'Application',
      icon: 'el-icon-s-grid',
      ind: '2',
    },
    children: [
      {
        path: '/AppManagement',
        name: 'AppManagement',
        component: AppManagement,
        meta: {
          title: 'App Management',
          icon: 'el-icon-receiving',
          roles: [
            'ROLE_admin','ROLE_application'
          ]
        },
      },
    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      child: true,
      title: 'Setting',
      icon: 'el-icon-setting',
      ind: '3',
    },
    children: [
      {
        path: '/SystemSetting',
        name: 'SystemSetting',
        component: SystemSetting,
        meta: {
          title: 'System Setting',
          icon: 'el-icon-receiving',
          roles: [
            'ROLE_admin','ROLE_system'
          ]
        },
      },
      {
        path: '/SystemLog',
        name: 'SystemLog',
        component: SystemLog,
        meta: {
          title: 'System Log',
          icon: 'el-icon-receiving',
          roles: [
            'ROLE_admin','ROLE_system'
          ]
        },
      },
    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      child: true,
      title: 'MessagePub',
      ind: '4',
    },
    children: [
      {
        path: '/MessagePub',
        name: 'MessagePub',
        component: MessagePub,
        meta: {
          title: 'Message Publish',
        },
      },
      {
        path: '/MessageList',
        name: 'MessageList',
        component: MessageList,
        meta: {
          title: 'Message List',
        },
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 前置导航守卫，监控路由变化
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
    } else {
      let user = window.sessionStorage.getItem('LoginUser');
      if (user == null){
        Message.warning({message:'Please Login !'})
        next('/');
      } else {
        next();
      }
  }
})

export default router
