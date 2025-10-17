import { ref, watchEffect, type Ref } from 'vue'
import {
	persistentStorage,
	type StoreKey,
	type StoredData,
} from '../services/persistentStorage'

export function usePersistentRef<Key extends StoreKey>(
	key: Key,
	initialValue?: StoredData[Key],
): Ref<StoredData[Key]> {
	const state = ref<StoredData[Key]>(initialValue) as Ref<StoredData[Key]>

	persistentStorage.get(key).then((value) => {
		state.value = value
	})

	watchEffect(() => {
		if (state.value === null) {
			persistentStorage.delete(key)
		} else {
			persistentStorage.set(key, state.value)
		}
	})

	return state
}
