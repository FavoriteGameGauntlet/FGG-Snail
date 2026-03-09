import { defineStore } from 'pinia'
import { StoreName } from '../../enums/storeName'
import { useApiTimerStore } from '../api/apiTimerStore'
import { watch } from 'vue'
import { useAuthStore } from '../authStore'

export const useFeatureTimerStore = defineStore(StoreName.ApiTimer, () => {
	const timerStore = useApiTimerStore()
	const authStore = useAuthStore()

	;(() => {
		watch(
			() => authStore.isLoggedIn,
			(isLoggedIn) => isLoggedIn && timerStore.getCurrent(),
		)
	})()

	return {}
})
