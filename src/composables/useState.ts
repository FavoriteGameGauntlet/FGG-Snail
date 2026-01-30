import { ref, watch } from 'vue'

export const enum StoreState {
	INIT,
	LOADING,
	LOADED,
	ERROR,
}

export const useState = () => {
	const state = ref(StoreState.INIT)

	const on = async (target: StoreState[]): Promise<void> => {
		if (target.includes(state.value)) return

		return new Promise<void>((resolve) => {
			const stop = watch(state, (update) => {
				if (!target.includes(update)) return
				stop()
				resolve()
			})
		})
	}

	return {
		state,
		on,
	}
}
