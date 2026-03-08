import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../../api-facade/api'
import { type HttpErrorResponse } from '../../api-facade/http'
import { type CurrentGame, type WishlistedGame } from '../../api-facade/models'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { StoreName } from '../../enums/storeName'

export const useApiGameStore = defineStore(StoreName.ApiGame, () => {
	const wishlist = ref<Record<string, WishlistedGame[]>>({})
	// const unplayed = ref<WishlistedGame[]>([])
	const unplayedLoading = useLoading()

	const current = ref<Record<string, CurrentGame | null>>({})
	const currentLoading = useLoading()

	// const enoughGamesInWishlist = computed(() => wishlist.value.length >= 6)
	// const currentGameIsFinished = computed(() => current.value === null)

	// const canRoll = computed(
	// 	() =>
	// 		currentGameIsFinished.value &&
	// 		currentLoading.state.value === LoadingState.LOADED &&
	// 		enoughGamesInWishlist.value &&
	// 		unplayedLoading.state.value === LoadingState.LOADED,
	// )

	const addUnplayed = async (login: string, game: WishlistedGame) => {
		return api.games.postWishlist({ path: { login }, body: game }).then(() => {
			wishlist.value[login] = [...wishlist.value[login], game]
		})
	}

	const getUnplayed = async (login: string) => {
		unplayedLoading.state.value = LoadingState.LOADING

		return api.games
			.getWishlist({ path: { login } })
			.then((games) => {
				wishlist.value[login] = games
				unplayedLoading.state.value = LoadingState.LOADED

				return games
			})
			.catch((e) => {
				unplayedLoading.state.value = LoadingState.ERROR

				throw e
			})
	}

	const getCurrent = async (login: string) => {
		currentLoading.state.value = LoadingState.LOADING

		return api.games
			.getCurrent({ path: { login } })
			.then((game) => {
				current.value[login] = game
				currentLoading.state.value = LoadingState.LOADED

				return current.value
			})
			.catch((error: HttpErrorResponse) => {
				// @todo check if backend returns status === 404
				if (error.body?.code === 'CURRENT_GAME_NOT_FOUND') {
					current.value[login] = null
					currentLoading.state.value = LoadingState.LOADED

					return current.value
				}

				console.log(error)

				currentLoading.state.value = LoadingState.ERROR
				return error
			})
	}

	// const roll = async () => {
	// 	if (!canRoll.value) return Promise.reject('Bitch you cannot roll games')

	// 	return api.games.postRoll().then((newGame) => {
	// 		current.value = newGame
	// 		unplayed.value = unplayed.value.filter((g) => g.name !== newGame.name)

	// 		return current.value
	// 	})
	// }

	// const cancel = async () => {
	// 	return api.games.postCancelCurrent().then(() => {
	// 		current.value = null
	// 	})
	// }

	// const finish = async () => {
	// 	return api.games.postFinishCurrent().then(() => {
	// 		current.value = null
	// 	})
	// }

	// const init = async () => {
	// 	await Promise.all([getCurrent()])
	// }

	return {
		current,
		currentLoading,

		// unplayed,
		unplayedLoading,

		// enoughGamesInWishlist,
		// currentGameIsFinished,
		// canRoll,

		// init,

		getCurrent,
		addUnplayed,
		getUnplayed,
		// roll,
		// cancel,
		// finish,
	}
})
