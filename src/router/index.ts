import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import AdminLogin from '@/views/adminLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:AdminLogin
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue'),
      children:[
        {
          path:'',
          name:'homeNews',
          redirect:'home/news'
        },
      {path: 'chat',
      component:()=>import('@/views/chat.vue')
      },
      {
        path:'news',
        component:()=>import('@/views/news.vue')
      },
      {
        path:'user',
        name:'user',
        component:() => import('@/views/user.vue')
      },
      {
        path:'manage',
        name:'manage',
        component:()=>import('@/views/manage.vue')
      }
      ]
    },
    
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path !== '/login' && to.path !== '/adminLogin' ){
      const token = localStorage.getItem('access_token')
      if(!token){ console.log('身份认证失败'); next('/login')}
      else{   next()	}
  }
 else{  next()	} //访问的的不是后台主页
})


export default router
