import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import type { RolledEffect, Effect } from '../api-facade/models'
import { ref } from 'vue'
import { api } from '../api-facade/api'

export const useEffectStore = defineStore(StoreName.Effect, () => {
	const available = ref<Effect[]>()
	const history = ref<RolledEffect[]>()
	const availableCount = ref(0)

	const getAvailable = async () => {
		return api.effects.getAvailable().then((effects) => {
			available.value = effects
		})
	}

	const getAvailableCount = async () => {
		return api.effects.getAvailableCount().then((count) => {
			availableCount.value = count
		})
	}

	const getHistory = async () => {
		return api.effects.getHistory().then((effects) => {
			history.value = effects
		})
	}

	const roll = async () => {
		return api.effects.postRoll().then((effect) => {
			history.value = history.value ? [...history.value, effect] : [effect]
		})
	}

	const init = async () => {
		await getAvailableCount()
	}

	return {
		history,
		available,
		availableCount,
		init,
		getAvailable,
		getAvailableCount,
		getHistory,
		roll,
	}
})
