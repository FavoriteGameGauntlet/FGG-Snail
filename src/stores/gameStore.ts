import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { type Game, type UnplayedGame } from '../api-facade/models'
import { StoreName } from '../enums/storeName'

export const useGameStore = defineStore(StoreName.Game, () => {
	const unplayed = ref<UnplayedGame[]>([])
	const current = ref<Game | null>(null)

	const init = () => {
		api.games.getCurrent().then((game) => {
			current.value = game
		})
	}

	const getUnplayed = () => {
		api.games.getGamesUnplayed().then((unplayedGames) => {
			unplayed.value = unplayedGames
		})
	}

	// const editUnplayedOne = (game: UnplayedGame) => {
	// 	setTimeout(() => {
	// 		const index = unplayed.value.findIndex((g) => g.id === game.id)
	// 		unplayed.value[index] = { ...game }
	// 		// games.value = getGames()
	// 	}, 200)
	// }

	// const deleteOne = (id: number) => {
	// 	setTimeout(() => {
	// 		unplayed.value = unplayed.value.filter(({ id: gameId }) => id !== gameId)
	// 	}, 200)
	// }

	return { current, unplayed, init, getUnplayed }
})
