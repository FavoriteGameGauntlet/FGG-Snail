import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import { ref } from 'vue'

export const useSettingsStore = defineStore(StoreName.Settings, () => {
	const roughnessModifier = ref(2)

	return { roughnessModifier }
})
