// import { defineStore } from 'pinia'
// import { StoreName } from '../enums/storeName'
// import type { RolledWheelEffect, WheelEffect } from '../api-facade/models'
// import { ref } from 'vue'
// import { api } from '../api-facade/api'

// export const useEffectStore = defineStore(StoreName.ApiWheelEffect, () => {
// 	const available = ref<WheelEffect[]>()
// 	const history = ref<RolledWheelEffect[]>()
// 	const availableCount = ref(0)

// 	const getAvailable = async () => {
// 		return api.wheelEffects.getAvailable().then((effects) => {
// 			available.value = effects
// 		})
// 	}

// 	const getAvailableCount = async () => {
// 		return api.wheelEffects.getAvailableCount().then((count) => {
// 			availableCount.value = count
// 		})
// 	}

// 	const getHistory = async () => {
// 		return api.wheelEffects.getHistory().then((effects) => {
// 			history.value = effects
// 		})
// 	}

// 	const roll = async () => {
// 		return api.wheelEffects.postRoll().then((effect) => {
// 			history.value = history.value ? [...history.value, effect] : [effect]
// 		})
// 	}

// 	const init = async () => {
// 		await getAvailableCount()
// 	}

// 	init()

// 	return {
// 		history,
// 		available,
// 		availableCount,

// 		init,
// 		getAvailable,
// 		getAvailableCount,
// 		getHistory,
// 		roll,
// 	}
// })
