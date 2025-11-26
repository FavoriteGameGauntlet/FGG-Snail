import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import { ref } from 'vue'

export type TempGame = {
	id: number
	name: string
}

/** to test it */
const getGames = () =>
	JSON.parse(
		JSON.stringify([
			{ id: 1, name: 'Amogus 3D' },
			{ id: 2, name: 'Wolf Amougs' },
			{ id: 3, name: 'GTA VI' },
			{ id: 4, name: 'Deadlock' },
			{ id: 5, name: 'Minecraft' },
		]),
	)

export const useGameStore = defineStore(StoreName.Game, () => {
	const games = ref<TempGame[]>(getGames())

	const editOne = (game: TempGame) => {
		setTimeout(() => {
			const index = games.value.findIndex((g) => g.id === game.id)
			games.value[index] = { ...game }
			// games.value = getGames()
		}, 200)
	}

	const deleteOne = (id: number) => {
		setTimeout(() => {
			games.value = games.value.filter(({ id: gameId }) => id !== gameId)
		}, 200)
	}

	return { games, editOne, deleteOne }
})
