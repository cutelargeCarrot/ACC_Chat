import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path:'/user',
      name:'user',
      component:() => import('@/views/user.vue')
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path !== '/login'){
      const token = localStorage.getItem('token')
      if(to.path !== '/login' && !token){next('/login')}
      else{   next()	}
  }
 else{
      next()	//访问的的不是后台主页
  }
})


export default router
