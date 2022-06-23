import { createRouter, createWebHistory } from 'vue-router';
import { getTokenApi } from '@/api/token';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Category from '@/views/Category';
import Cart from '@/views/Cart';
import Orders from '@/views/Orders';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
	  path: '/login',
	  name: 'login',
	  component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/cart',
		name: 'cart',
		component: Cart
	},
	{
		path: '/orders',
		name: 'orders',
		component: Orders
	},
	{
	  path: '/:category',
	  component: Category
	},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	const token = getTokenApi();

	if (token && ['/login', '/register'].includes(to.path)) {
		next('/');
	} else {
		next();
	}
})

export default router
