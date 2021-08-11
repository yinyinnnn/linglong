import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import Goodsdetail from '../views/goodsdetail.vue'
import Pay from '../views/pay.vue'
import Backstagelogin from '../views/backstagelogin.vue'
import Backstagehome from '../views/backstagehome.vue'
import Own from '../views/own.vue'
import GoodsListPage from '../views/goodsListPage.vue'
// 懒加载路由组件
const Welcome =() => import('../components/home/welcome.vue')
const AuthorityUser = () => import('../components/home/authorityUser.vue')
const GoodsManager = () => import('../components/home/goodsManager.vue')
const OrderManager = () => import('../components/home/orderManager.vue')
const AdminManager = () => import('../components/home/adminManager.vue')




const routes = [
  {
    path: '/',
    component: Index
  },
  {
  	path: '/index',
  	component: Index
  },
  {
	path: '/login',
	component: Login
  },
  {
	path: '/register',
	component: Register
  },
  {
  	path: '/cart',
  	component: Cart
  },
  {
	 path: '/own',
	 component: Own 
  },
  {
  	path: '/goodsdetail',
  	component: Goodsdetail
  },
  {
  	path: '/backstagelogin',
  	component: Backstagelogin
  },
  {
  	path: '/pay',
  	component: Pay
  },
 {
	 path:'/goodsListPage',
	 component:GoodsListPage
 },
  {
	  path:'/backstagehome',
	  component:Backstagehome,
	  redirect:'/welcome',
	  children : [
	  	{path : '/welcome', component : Welcome},
	  	{path : '/authorityUser', component : AuthorityUser},
	  	{path : '/goodsManager', component : GoodsManager},
		{path : '/orderManager', component : OrderManager},
		{path : '/adminMagager', component : AdminManager},
	   ]
	  
  }
]


const router = new VueRouter({
  routes
})

export default router
