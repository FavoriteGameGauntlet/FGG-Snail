import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { type Game, type UnplayedGame } from '../api-facade/models'
import { StoreName } from '../enums/storeName'
import { useState, StoreState } from '../composables/useState'
import { type HttpErrorResponse } from '../api-facade/http'

export const useGameStore = defineStore(StoreName.Game, () => {
	const unplayed = ref<UnplayedGame[]>([])
	const { state: unplayedState, on: onUnplayed } = useState()
	const current = ref<Game | null>(null)
  const { state: currentState, on: onCurrent } = useState()

	const addUnplayed = async (games: UnplayedGame[]) => {
		return api.games.postAddUnplayed({ body: games }).then(() => {
			unplayed.value = [...unplayed.value, ...games]
		})
	}

	const getUnplayed = async () => {
		unplayedState.value = StoreState.LOADING

		return api.games
			.getUnplayed()
			.then((games) => {
				unplayed.value = games
				unplayedState.value = StoreState.LOADED
			})
			.catch(() => {
				unplayedState.value = StoreState.ERROR
			})
	}

	const getCurrent = async () => {
		currentState.value = StoreState.LOADING

		return api.games
			.getCurrent()
			.then((game) => {
				current.value = game
				currentState.value = StoreState.LOADED

				return current.value
			})
			.catch((error: HttpErrorResponse) => {
				currentState.value = StoreState.ERROR

				// @todo check if this is 404
				if (error.statusText === 'CURRENT_GAME_NOT_FOUND') {
					current.value = null
				}

				return current.value
			})
	}

	const rollNew = async () => {
		if (currentState.value === StoreState.INIT) await getCurrent()
		if (currentState.value === StoreState.)
		if (unplayedState.value !== StoreState.LOADED) return

		const finishFirstError = Promise.reject('Finish the current game first')

		if (current.value) return finishFirstError

		return api.games
			.postRoll()
			.then((newGame) => (current.value = newGame))
			.catch((error: HttpErrorResponse) => {
				if (error.status === 409) return finishFirstError
			})
	}

	const init = async () => {
		await Promise.all([getCurrent(), getUnplayed()])
	}

	return { current, unplayed, init, addUnplayed, getUnplayed }
})
