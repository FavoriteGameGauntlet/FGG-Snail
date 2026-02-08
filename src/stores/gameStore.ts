import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../api-facade/api'
import { type Game, type UnplayedGame } from '../api-facade/models'
import { StoreName } from '../enums/storeName'
import { useLoading, LoadingState } from '../composables/useLoading'
import { type HttpErrorResponse } from '../api-facade/http'

export const useGameStore = defineStore(StoreName.Game, () => {
	const unplayed = ref<UnplayedGame[]>([])
	const unplayedLoading = useLoading()

	const current = ref<Game | null>(null)
	const currentLoading = useLoading()

	const enoughGamesInWishlist = computed(() => unplayed.value.length >= 6)
	const currentGameIsFinished = computed(() => current.value === null)

	const canRoll = computed(
		() =>
			currentGameIsFinished.value &&
			currentLoading.state.value === LoadingState.LOADED &&
			enoughGamesInWishlist.value &&
			unplayedLoading.state.value === LoadingState.LOADED,
	)

	const addUnplayed = async (games: UnplayedGame[]) => {
		return api.games.postAddUnplayed({ body: games }).then(() => {
			unplayed.value = [...unplayed.value, ...games]
		})
	}

	const getUnplayed = async () => {
		unplayedLoading.state.value = LoadingState.LOADING

		return api.games
			.getUnplayed()
			.then((games) => {
				unplayed.value = games
				unplayedLoading.state.value = LoadingState.LOADED

				return unplayed.value
			})
			.catch(() => {
				unplayedLoading.state.value = LoadingState.ERROR

				return unplayed.value
			})
	}

	const getCurrent = async () => {
		currentLoading.state.value = LoadingState.LOADING

		return api.games
			.getCurrent()
			.then((game) => {
				current.value = game
				currentLoading.state.value = LoadingState.LOADED

				return current.value
			})
			.catch((error: HttpErrorResponse) => {
				// @todo check if backend returns status === 404
				if (error.body?.code === 'CURRENT_GAME_NOT_FOUND') {
					current.value = null
					currentLoading.state.value = LoadingState.LOADED

					return current.value
				}

				console.log(error)

				currentLoading.state.value = LoadingState.ERROR
				return error
			})
	}

	const roll = async () => {
		if (!canRoll.value) return Promise.reject('Bitch you cannot roll games')

		return api.games.postRoll().then((newGame) => {
			current.value = newGame
			unplayed.value = unplayed.value.filter((g) => g.name !== newGame.name)

			return current.value
		})
	}

	const cancel = async () => {
		return api.games.postCancelCurrent().then(() => {
			current.value = null
		})
	}

	const finish = async () => {
		return api.games.postFinishCurrent().then(() => {
			current.value = null
		})
	}

	const init = async () => {
		await Promise.all([getCurrent()])
	}

	return {
		current,
		currentLoading,

		unplayed,
		unplayedLoading,

		enoughGamesInWishlist,
		currentGameIsFinished,
		canRoll,

		init,

		getCurrent,
		addUnplayed,
		getUnplayed,
		roll,
		cancel,
		finish,
	}
})
