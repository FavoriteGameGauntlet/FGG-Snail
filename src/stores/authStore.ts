import { defineStore } from 'pinia'
import { usePersistentRef } from '../composables/usePersistentRef'
import { persistentStorage, StoreKey } from '../services/persistentStorage'
import { watchEffect } from 'vue'
import { router } from '../router/router'

export const useAuthStore = defineStore('counter', () => {
	const userName = usePersistentRef(StoreKey.UserName)
	const userId = usePersistentRef(StoreKey.UserId)

	watchEffect(() => console.log('store effect', { userId: userId.value }))

	const getIsLoggedIn = async () => {
		const userId = await persistentStorage.get(StoreKey.UserId)
		console.log('store', { userId })
		return userId !== null
	}

	const logIn = async (newUserName: string) => {
		userName.value = newUserName
		userId.value = 'default_user_id_123456789'
	}

	const logOut = () => {
		console.log('authStore: logOut')
		userName.value = null
		userId.value = null
		router.push('/login')
	}

	return { userName, userId, getIsLoggedIn, logIn, logOut }
})
