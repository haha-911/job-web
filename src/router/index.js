import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login/index'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
     {
      path:'/',
      name:'home',
      component: () => import('@/views/Home/index'),
      meta:{title:"我的首页"}
     },
     {
      path: '/position',
      name: 'position',
      component: () => import('@/views/Position/index'),
      meta:{title:"招聘信息"}
     },
     {
      path: '/job/:id',
      name: 'job',
      component: () => import('@/views/Position/position'),
      meta:{title:"职位详情"}
     },
     {
      path: '/company/:id',
      name: 'company',
      component: () => import('@/views/Position/company'),
      meta:{title:"公司详情"}
     },
     {
      path: '/resume',
      name: 'resume',
      component: () => import('@/views/Dropdown/resume'),
      meta:{title:"我的简历"}
     },
     {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Dropdown/setting'),
      meta:{title:"账号设置"}
     },
    
     {
      path: '/recruit',
      name: 'recruit',
      component: () => import('@/views/Dropdown/recruit'),
       children: [
         {
           path: '/apply',
           name: 'apply',
           component: () => import('@/views/Dropdown/apply'),
           meta: { title: '我的投递' }
         },
         {
          path: '/interview',
          name: 'interview',
          component: () => import('@/views/Dropdown/interview'),
          meta: { title: '我的面试' }
        },
         {
          path: '/favor',
          name: 'favor',
          component: () => import('@/views/Dropdown/favor'),
          meta: { title: '我的收藏' }
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('@/views/Dropdown/follow'),
          meta: { title: '我的关注' }
        }
       ]
     }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index'),
    meta:{title:"用户登录/注册"}
   
  },
  {
    path: '/hrindex',
    name: 'hrindex',
    component: () => import('@/views/HR/index'),
    meta:{title:"HR管理页面"}
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
