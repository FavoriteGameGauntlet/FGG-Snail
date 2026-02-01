import { ref, watch } from 'vue'

export const enum LoadingState {
	INIT,
	LOADING,
	LOADED,
	ERROR,
}

export const useLoading = () => {
	const state = ref(LoadingState.INIT)

	const on = async (target: LoadingState[]): Promise<void> => {
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
