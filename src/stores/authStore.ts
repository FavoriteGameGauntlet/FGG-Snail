import { defineStore } from 'pinia'
import { api } from '../api-facade/api'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreName } from '../enums/storeName'
import { router } from '../router/router'
import { persistentStorage, StoreKey } from '../services/persistentStorage'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: login, isReady: isUserNameReady } = usePersistentRef(
		StoreKey.Login,
	)

	const getIsLoggedIn = async () => {
		const userName = await persistentStorage.get(StoreKey.Login)
		return userName !== undefined
	}

	const signUp = async (data: {
		login: string
		password: string
		email: string
	}) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.signUp({ body: data }).then(() => {
			login.value = data.login

			return api.auth.logIn({
				body: { login: data.login, password: data.password },
			})
		})
	}

	const logIn = async (data: { login: string; password: string }) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.logIn({ body: data }).then(() => {
			login.value = data.login
		})
	}

	const logOut = () => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		api.auth.logOut().finally(() => {
			login.value = undefined
			router.push('/login')
		})
	}

	return {
		login: login,
		getIsLoggedIn,
		signUp,
		logIn,
		logOut,
	}
})
