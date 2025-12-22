import { defineStore } from 'pinia'
import { usePersistentRef } from '../composables/usePersistentRef'
import { persistentStorage, StoreKey } from '../services/persistentStorage'
import { watchEffect } from 'vue'
import { router } from '../router/router'
import { StoreName } from '../enums/storeName'
import { http } from '../api-facade/http.tauri'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: userName, isReady: isUserNameReady } = usePersistentRef(
		StoreKey.UserName,
	)
	const { state: userId, isReady: isUserIdReady } = usePersistentRef(
		StoreKey.UserId,
	)

	watchEffect(() => console.log('store effect', { userName: userName.value }))
	watchEffect(() => console.log('store effect', { userId: userId.value }))

	const getIsLoggedIn = async () => {
		const userId = await persistentStorage.get(StoreKey.UserId)
		console.log('store', { userId })
		return userId !== undefined
	}

	const logIn = (name: string, password: string) => {
		if (!isUserIdReady.value || !isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		http.post('/auth/login', { body: { name, password } }).then((r) => {
			console.log('login success', r)

			userName.value = name
		})
		// .catch((e) => console.log('login error', e))
	}

	const logOut = () => {
		if (!isUserIdReady.value || !isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		userName.value = undefined
		userId.value = undefined
		router.push('/login')
	}

	return { userName, userId, getIsLoggedIn, logIn, logOut }
})
