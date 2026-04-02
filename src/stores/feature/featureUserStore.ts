import { defineStore } from 'pinia'
import { computed } from 'vue'
import { Login } from '../../api-facade/models/users-models'
import { StoreName } from '../../enums/storeName'
import { useApiUserStore } from '../api/apiUserStore'
import { useAuthStore } from '../authStore'

export const useFeatureUserStore = defineStore(StoreName.FeatureUser, () => {
	const apiStore = useApiUserStore()
	const authStore = useAuthStore()

	const currentUser = computed<Partial<Login>>(() => ({
		login: authStore.login,
		displayName: apiStore.currentUserDisplayName ?? authStore.login,
	}))

	const users = computed(() => apiStore.users)

	const init = async () => {
		await apiStore.getDisplayName()
	}

	return {
		currentUser,
		users,

		setDisplayLoading: apiStore.setDisplayLoading,
		getDisplayNameLoading: apiStore.getDisplayNameLoading,
		getAllNamesLoading: apiStore.getAllNamesLoading,

		getAllUsers: apiStore.getAllUsers,
		setDisplayName: apiStore.setDisplayName,

		init,
	}
})
