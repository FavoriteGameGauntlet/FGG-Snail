import { defineStore } from 'pinia'
import { StoreName } from '../../enums/storeName'
import { useApiTimerStore } from '../api/apiTimerStore'
import { watch } from 'vue'
import { useApiWheelStore } from '../api/apiWheelStore'
import { TimerState } from '../../api-facade/models'

export const useFeatureWheelStore = defineStore(StoreName.FeatureWheel, () => {
	const wheelStore = useApiWheelStore()
	const timerStore = useApiTimerStore()

	const init = () => {
		wheelStore.getAvailableCount()

		watch(
			() => timerStore.state,
			(state) => {
				if (!state || [TimerState.Finished].includes(state))
					wheelStore.getAvailableCount()
			},
		)
	}

	return {
		init,
	}
})
