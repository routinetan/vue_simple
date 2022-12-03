const Router = require('vue-router')

const routes = [{
	path: '/',
	name: 'recommend',
	component: () => import('../view/recommend.vue')
	
},{
	path: '/see',
	name: 'see',
	component: () => import('../view/see.vue')
	
}]

const router = new VueRouter({
	routes
})

export default router
