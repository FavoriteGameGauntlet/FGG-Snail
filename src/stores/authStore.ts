import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { persistentStorage, StoreKey } from '../services/persistentStorage'

export const useAuthStore = defineStore('counter', () => {
	const userName = ref<null | string>(null)
	const userId = ref<null | string>(null)

	const isLoggedIn = computed(() => userId.value !== null)

	watchEffect(() => {
		if (userName.value === null) {
			persistentStorage.delete(StoreKey.UserName)
		} else {
			persistentStorage.set(StoreKey.UserName, userName.value)
		}

		console.log(
			'Updated persistentStorage[userName]',
			persistentStorage.get(StoreKey.UserName),
		)
	})

	watchEffect(() => {
		if (userId.value === null) {
			persistentStorage.delete(StoreKey.UserId)
		} else {
			persistentStorage.set(StoreKey.UserId, userId.value)
		}

		console.log(
			'Updated persistentStorage[userId]',
			persistentStorage.get(StoreKey.UserId),
		)
	})

	const logIn = async (newUserName: string) => {
		userName.value = newUserName
		userId.value = 'default_user_id_123456789'
	}

	const logOut = () => {
		userName.value = null
		userId.value = null
	}

	return { userName, userId, isLoggedIn, logIn, logOut }
})
