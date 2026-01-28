import { defineStore } from 'pinia'
import { api } from '../api-facade/api'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreName } from '../enums/storeName'
import { router } from '../router/router'
import { persistentStorage, StoreKey } from '../services/persistentStorage'
import { watchEffect } from 'vue'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: userName, isReady: isUserNameReady } = usePersistentRef(
		StoreKey.UserName,
	)

	watchEffect(() => {
		console.log('[AUTH_STORE] userName:', userName.value)
	})

	const getIsLoggedIn = async () => {
		const userName = await persistentStorage.get(StoreKey.UserName)
		console.log('store', { userName })
		return userName !== undefined
	}

	const signUp = async ({
		name,
		password,
		email,
	}: {
		name: string
		password: string
		email: string
	}) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth
			.signUp({ body: { name, password, email } })
			.then(() => {
				userName.value = name

				return api.auth.logIn({ body: { name, password } })
			})
			.catch((e) => console.log('login error', e))
	}

	const logIn = async (name: string, password: string) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.logIn({ body: { name, password } }).then(() => {
			userName.value = name
		})
	}

	const logOut = () => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		api.auth.logOut().finally(() => {
			userName.value = undefined
			router.push('/login')
		})
	}

	return { userName, getIsLoggedIn, signUp, logIn, logOut }
})
