import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { StoreName } from '../../enums/storeName'
import { useApiTimerStore } from '../api/apiTimerStore'
import { useAuthStore } from '../authStore'

export const useFeatureTimerStore = defineStore(StoreName.FeatureTimer, () => {
	const timerStore = useApiTimerStore()
	const authStore = useAuthStore()

	const state = computed(() => timerStore.state)

	const durationLeft = computed(() => timerStore.durationLeft)
	const durationTotal = computed(() => timerStore.durationTotal)

	;(() => {
		// Get current timer on login
		watch(
			() => authStore.isLoggedIn,
			(isLoggedIn) => {
				console.log({ isLoggedIn, getCurrent: timerStore.getCurrent })
				isLoggedIn && timerStore.getCurrent()
			},
			{ immediate: true },
		)
	})()

	return {
		state,

		durationLeft,
		durationTotal,
	}
})
