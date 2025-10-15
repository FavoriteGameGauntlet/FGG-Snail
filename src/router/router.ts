import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore'

const routes = [
	{ path: '/', component: HomeView },
	{ path: '/login', component: LoginView },
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach((to) => {
	if (to.path === '/login') return true

	const authStore = useAuthStore()

	return authStore.isLoggedIn || { path: '/login' }
})
