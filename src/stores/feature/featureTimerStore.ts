import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { LoadingState } from '../../composables/useLoading'
import { StoreName } from '../../enums/storeName'
import { useApiGameStore } from '../api/apiGameStore'
import { useApiTimerStore } from '../api/apiTimerStore'
import { useAuthStore } from '../authStore'

export const useFeatureTimerStore = defineStore(StoreName.FeatureTimer, () => {
	const timerStore = useApiTimerStore()
	const authStore = useAuthStore()
	const gameStore = useApiGameStore()

	const state = computed(() => timerStore.state)

	const durationLeft = computed(() => timerStore.durationLeft)
	const durationTotal = computed(() => timerStore.durationTotal)

	const loading = computed(
		() =>
			timerStore.actionLoading.state === LoadingState.LOADING ||
			timerStore.currentLoading.state === LoadingState.LOADING,
	)

	const toggle = () => timerStore.toggle()

	// const start = () => {
	// 	apiStore.start()
	// }

	// const pause = () => {
	// 	apiStore.pause()
	// }

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

		// Reset timer on game change
		// watch(
		// 	{
		// 		isLoggedIn: authStore.isLoggedIn,
		// 		currentGame: authStore.login
		// 			? gameStore.current[authStore.login]
		// 			: null,
		// 	},
		// 	({ currentGame, isLoggedIn }) => {
		// 		isLoggedIn && timerStore.getCurrent()
		// 	},
		// 	{ immediate: true },
		// )
	})()

	return {
		state,

		durationLeft,
		durationTotal,

		loading,

		toggle,
	}
})
