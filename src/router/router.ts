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

router.beforeEach(async (to) => {
	if (to.path === '/login') return true

	const authStore = useAuthStore()
	const isLoggedIn = await authStore.getIsLoggedIn()

	console.log('Login guard', { isLoggedIn, userId: authStore.userId })

	return isLoggedIn || { path: '/login' }
})
