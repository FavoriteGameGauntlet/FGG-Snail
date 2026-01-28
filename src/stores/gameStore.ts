import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { type Game, type UnplayedGame } from '../api-facade/models'
import { StoreName } from '../enums/storeName'

export const useGameStore = defineStore(StoreName.Game, () => {
	const unplayed = ref<UnplayedGame[]>([])
	const current = ref<Game | null>(null)

	const init = async () => {
		await Promise.all([
			api.games.getCurrent().then((game) => {
				current.value = game
			}),
			api.games.getGamesUnplayed().then((unplayedGames) => {
				unplayed.value = unplayedGames
			}),
		])
	}

	const addGames = async (games: UnplayedGame[]) => {
		return api.games.postAddUnplayed({ body: games }).then(() => {
			unplayed.value = [...unplayed.value, ...games]
		})
	}

	return { current, unplayed, init, addGames }
})
