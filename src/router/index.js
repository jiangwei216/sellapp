import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Message from '../views/Message.vue'
// import BScroll from 'better-scroll'
Vue.use(VueRouter)
// Vue.use(BScroll)
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[{//商品
      path:'/Goods',
      name:'Goods',
      component:()=> import( '../views/Goods.vue')
    },
    {//评价
      path:'/Evaluate',
      name:'Evaluate',
      component:()=> import( '../views/Evaluate.vue')
    },
    {//商家
      path:'/Merchant',
      name:'Merchant',
      component:()=> import( '../views/Merchant.vue')
    },
    
    
  ]
  },
  {
    path:'/Message',
    name:'Message',
    component: Message,
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
