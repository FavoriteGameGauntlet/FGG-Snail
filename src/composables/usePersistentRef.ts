import { computed, type ComputedRef, ref, watchEffect, type Ref } from 'vue'
import {
	persistentStorage,
	type StoreKey,
	type StoredData,
} from '../services/persistentStorage'

export function usePersistentRef<Key extends StoreKey>(
	key: Key,
	/** @deprecated remove in the future */
	onReady?: (state: StoredData[Key]) => void,
): {
	state: Ref<StoredData[Key]>
	isLoading: ComputedRef<boolean>
	isReady: ComputedRef<boolean>
} {
	const state = ref<StoredData[Key]>() as Ref<StoredData[Key]>

	// I don't expose this one for type safety
	const _isLoading = ref(true)

	const isLoading = computed(() => _isLoading.value)
	const isReady = computed(() => !isLoading.value)

	persistentStorage.get(key).then((value) => {
		state.value = value
		_isLoading.value = false

		onReady?.(state.value)

		watchEffect(() => {
			if (state.value === undefined) {
				persistentStorage.delete(key)
			} else {
				persistentStorage.set(key, state.value)
			}
		})
	})

	return { state, isLoading, isReady }
}
