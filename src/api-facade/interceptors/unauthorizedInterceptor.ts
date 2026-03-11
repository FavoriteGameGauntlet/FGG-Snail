import { RouteName } from '../../router/routeNames'
import { router } from '../../router/router'
import { useAuthStore } from '../../stores/authStore'
import type { HttpErrorResponse } from '../http'

/** @todo probably think of a better way to type and manage these */
export const unauthorizedInterceptor = (response: HttpErrorResponse) => {
	if (
		response.status === 401 &&
		['COOKIE_NOT_FOUND', 'NO_ACTIVE_SESSION'].includes(
			(response as HttpErrorResponse).body?.['code'] ?? '',
		)
	) {
		const authStore = useAuthStore()
		authStore.login = undefined
		router.push({ name: RouteName.Login })
	}
}
