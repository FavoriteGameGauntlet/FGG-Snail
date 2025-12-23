import { type NavigationGuard } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export const authGuard: NavigationGuard = async (to) => {
	if (['/login', '/signup'].includes(to.path)) return true

	const authStore = useAuthStore()
	const isLoggedIn = await authStore.getIsLoggedIn()

	return isLoggedIn || { path: '/login' }
}
