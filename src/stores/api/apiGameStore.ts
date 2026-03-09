import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../../api-facade/api'
import { type HttpErrorResponse } from '../../api-facade/http'
import { type CurrentGame, type WishlistedGame } from '../../api-facade/models'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { StoreName } from '../../enums/storeName'

export const useApiGameStore = defineStore(StoreName.ApiGame, () => {
	const wishlist = ref<Record<string, WishlistedGame[]>>({})
	const wishlistLoading = useLoading()

	const current = ref<Record<string, CurrentGame | null>>({})
	const currentLoading = useLoading()

	const addToWishlist = async (login: string, game: WishlistedGame) => {
		return api.games.postWishlist({ path: { login }, body: game }).then(() => {
			wishlist.value[login] = [...wishlist.value[login], game]
		})
	}

	const getWishlist = async (login: string) => {
		wishlistLoading.state.value = LoadingState.LOADING

		return api.games
			.getWishlist({ path: { login } })
			.then((games) => {
				wishlist.value[login] = games
				wishlistLoading.state.value = LoadingState.LOADED

				return games
			})
			.catch(() => {
				wishlistLoading.state.value = LoadingState.ERROR
				wishlist.value[login] ??= []

				return wishlist.value[login]
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
				if (error.status === 404) {
					current.value[login] ??= null
					currentLoading.state.value = LoadingState.LOADED

					return current.value[login]
				}

				currentLoading.state.value = LoadingState.ERROR
				return error
			})
	}

	const roll = async (login: string) => {
		return api.games.postRoll().then((newGame) => {
			current.value[login] = newGame
			wishlist.value[login] = wishlist.value[login].filter(
				(game) => game.name !== newGame.name,
			)

			return current.value
		})
	}

	const cancel = async (login: string) => {
		return api.games.postCancelCurrent().then(() => {
			current.value[login] = null
		})
	}

	const finish = async (login: string) => {
		return api.games.postFinishCurrent().then(() => {
			current.value[login] = null
		})
	}

	return {
		current,
		currentLoading,

		wishlist,
		wishlistLoading,

		getCurrent,
		addToWishlist,
		getWishlist,
		roll,
		cancel,
		finish,
	}
})
