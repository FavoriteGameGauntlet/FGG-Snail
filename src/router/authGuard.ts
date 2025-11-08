import { type NavigationGuard } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export const authGuard: NavigationGuard = async (to) => {
	if (to.path === '/login') return true

	const authStore = useAuthStore()
	const isLoggedIn = await authStore.getIsLoggedIn()

	return isLoggedIn || { path: '/login' }
}
