import { type NavigationGuard } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { RouteName } from './routeNames'

export const authGuard: NavigationGuard = async (to) => {
	if (
		typeof to.name === 'string' &&
		[RouteName.Login, RouteName.Signup].includes(to.name as RouteName)
	)
		return true

	const authStore = useAuthStore()
	const isLoggedIn = await authStore.getIsLoggedIn()

	return isLoggedIn || { name: RouteName.Login }
}
