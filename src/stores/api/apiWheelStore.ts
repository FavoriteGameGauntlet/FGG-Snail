import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../../api-facade/api'
import { RolledWheelEffect, WheelEffect } from '../../api-facade/models'
import { StoreName } from '../../enums/storeName'
import { WheelResult } from '../../types/wheelResult'

export const useApiWheelStore = defineStore(StoreName.ApiWheel, () => {
	const availableRollCount = ref(0)
	const effectsHistory = ref<Record<string, RolledWheelEffect[] | undefined>>(
		{},
	)
	const availableEffects = ref<WheelEffect[] | null>(null)
	const currentEffects = ref<WheelResult | null>(null)

	const pendingRoll = computed(() => availableRollCount.value !== 0)

	const getHistory = async (login: string) => {
		await api.wheelEffects.getHistory({ path: { login } }).then((rolls) => {
			effectsHistory.value[login] = rolls
		})
	}

	const getAvailableEffects = async () => {
		await api.wheelEffects.getAvailable().then((effects) => {
			availableEffects.value = effects
		})
	}

	const roll = async () => {
		if (!pendingRoll.value) {
			return Promise.reject('No pending rolls')
		}

		await api.wheelEffects.postRoll().then((effects) => {
			currentEffects.value = effects
		})
	}

	const reroll = async () => {
		throw new Error('not implemented yet')
	}

	const getAvailableCount = async () => {
		await api.wheelEffects.getAvailableCount().then((count) => {
			availableRollCount.value = count
		})
	}

	const getLastRoll = async () => {
		if (currentEffects.value) return currentEffects.value

		await api.wheelEffects.getLastRolled().then((effects) => {
			currentEffects.value = effects
		})
	}

	// const applyRoll = async () => {
	//  @todo remove applied from available
	// 	await api.wheelEffects.postApplyRoll()
	// }

	return {
		availableRollCount,
		effectsHistory,
		availableEffects,
		currentEffects,

		pendingRoll,

		getHistory,
		getAvailableEffects,
		roll,
		reroll,
		getAvailableCount,
		getLastRoll,
		// applyRoll,
	}
})
