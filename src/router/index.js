import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import goods from '@/components/goods/goods'
import rating from '@/components/rating/rating'
import seller from '@/components/seller/seller'
Vue.use(Router)

export default new Router({
	mode:"history",
	linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: goods
    },
    {
    	path:'/goods',
    	name:'goods',
    	component:goods
    },
    {
    	path:'/rating',
    	name:'rating',
    	component:rating
    },
    {
    	path:'/seller',
    	name:'seller',
    	component:seller
    }
  ]
})
// Router.beforeEach((to, from, next) => {
// 	next("{path:'/goods'}")
// })



