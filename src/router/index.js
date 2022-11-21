import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [

  {
    path: '/',
    name: '',
    component: () => import('../views/home'),
    children: [
      // {
      //   path: 'articleList',
      //   name: '文章列表',
      //   component: () => import('../views/home/articleList'),
      //   children:[
      //     {
      //       path: 'articles',
      //       name: '全部文章',
      //       component: () => import('../components/articles/Articles')
      //     },
      //     {
      //       path: 'published',
      //       name: '已发表',
      //       component: () => import('../components/published/Published')
      //     },
      //     {
      //       path: 'draft',
      //       name: '草稿箱',
      //       component: () => import('../components/draft/Draft')
      //     },
      //     {
      //       path: 'recycleBin',
      //       name: '回收站',
      //       component: () => import('../components/recycleBin/RecycleBin')
      //     },
      //     {
      //       path: 'blogs',
      //       name: '博客管理',
      //       component: () => import('../components/blogs/Blogs')
      //     },
      //     {
      //       path: 'configuration',
      //       name: '博客配置',
      //       component: () => import('../components/configuration/Configuration')
      //     },
      //   ]
      // },
      // {
      //   path: 'publication',
      //   name: '发表文章',
      //   component: () => import('../views/home/publication')
      // },
      {
        path: '/manager',
        name: '管理员',
        component: () => import('../views/home/manager')
      },
      {
        path: '/user',
        name: '用户管理',
        component: () => import('../views/home/user')
      },
      {
        path: '/feedback',
        name: '用户反馈',
        component: () => import('../views/home/feedback')
      },
      {
        path: '/userOpinion',
        name: '用户言论',
        component: () => import('../views/home/userOpinion')
      },
      {
        path: '/requestLog',
        name: '请求日志',
        component: () => import('../views/home/requestLog')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/Register'),
  },

]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('Authorization')
  if (to.name === '') {
    if (!token) {
      return next('/login')
    }
  }
  next()
})

export default router
