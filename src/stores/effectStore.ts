import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import { Effect } from '../api-facade/models'
import { ref } from 'vue'

export const useGameStore = defineStore(StoreName.Effect, () => {
	const unplayed = ref<Effect[]>([])
	const current = ref<Effect>(null)

	const init = async () => {
		await Promise.all([
			api.games.getCurrent().then((game) => {
				current.value = game
			}),
			api.games.getGamesUnplayed().then((unplayedGames) => {
				unplayed.value = unplayedGames.body
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
