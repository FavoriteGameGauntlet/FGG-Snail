import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import { ref } from 'vue'

export type TempGame = {
	id: number
	name: string
}

export const useGameStore = defineStore(StoreName.Game, () => {
	const games = ref<TempGame[]>([
		{ id: 1, name: 'Amogus 3D' },
		{ id: 2, name: 'Wolf Amougs' },
		{ id: 3, name: 'GTA VI' },
		{ id: 4, name: 'Deadlock' },
		{ id: 5, name: 'Minecraft' },
	])

	return { games }
})
