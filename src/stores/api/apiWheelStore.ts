import { defineStore } from 'pinia'
import { StoreName } from '../../enums/storeName'
import { computed, ref } from 'vue'
import { api } from '../../api-facade/api'

export const useApiWheelStore = defineStore(StoreName.ApiWheel, () => {
	const availableCount = ref(0)

	const pendingRoll = computed(() => availableCount.value !== 0)

	const getAvailableCount = async () => {
		await api.wheelEffects.getAvailableCount().then((count) => {
			availableCount.value = count
		})
	}

	return {
		availableCount,
		pendingRoll,

		getAvailableCount,
	}
})
