import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { CurrentGame, WishlistedGame } from '../../api-facade/models'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { StoreName } from '../../enums/storeName'
import { useApiGameStore } from '../api/apiGameStore'
import { useAuthStore } from '../authStore'

export const useFeatureGameStore = defineStore(StoreName.FeatureGame, () => {
	const authStore = useAuthStore()
	const apiGameStore = useApiGameStore()

	const current = computed<CurrentGame | null>(() =>
		authStore.login ? (apiGameStore.current[authStore.login] ?? null) : null,
	)
	const wishlist = computed<WishlistedGame[]>(() =>
		authStore.login ? (apiGameStore.wishlist[authStore.login] ?? []) : [],
	)

	const enoughGamesInWishlist = computed(() => wishlist.value.length >= 6)
	const currentGameIsFinished = computed(() => current.value === null)

	const canRoll = computed(
		() =>
			currentGameIsFinished.value &&
			apiGameStore.currentLoading.state === LoadingState.LOADED &&
			enoughGamesInWishlist.value &&
			apiGameStore.wishlistLoading.state === LoadingState.LOADED,
	)

	const getWishlist = () => {
		if (!authStore.login) return Promise.reject('No current user login')

		return apiGameStore.getWishlist(authStore.login)
	}

	const addToWishlist = async (game: WishlistedGame) => {
		if (!authStore.login) return Promise.reject('No current user login')

		return apiGameStore.addToWishlist(authStore.login, game)
	}

	const roll = async (login: string | undefined = authStore.login) => {
		if (!login) return Promise.reject('No current user login')
		if (!canRoll.value) return Promise.reject('Can not roll')

		return apiGameStore.roll(login)
	}

	const cancel = (login: string | undefined = authStore.login) => {
		if (!login) return Promise.reject('No current user login')

		return apiGameStore.cancel(login)
	}

	const finish = (login: string | undefined = authStore.login) => {
		if (!login) return Promise.reject('No current user login')

		return apiGameStore.finish(login)
	}

	;(() => {
		// get current game on login
		watch(
			() => authStore.login,
			(login) => {
				// console.log({ login, getCurrentGame: apiGameStore.getCurrent })
				login && apiGameStore.getCurrent(login)
			},
			{ immediate: true },
		)
	})()

	return {
		current,
		wishlist,

		currentLoading: computed(() => apiGameStore.currentLoading),
		wishlistLoading: computed(() => apiGameStore.wishlistLoading),

		enoughGamesInWishlist,
		currentGameIsFinished,

		canRoll,

		addToWishlist,
		getWishlist,
		roll,
		cancel,
		finish,
	}
})
