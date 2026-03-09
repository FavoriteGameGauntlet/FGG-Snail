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

	const signUp = async ({
		login,
		password,
		email,
	}: {
		login: string
		password: string
		email: string
	}) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.signUp({ body: { login, password, email } }).then(() => {
			login.value = login

			return api.auth.logIn({ body: { login, password } })
		})
	}

	const logIn = async ({
		login,
		password,
	}: {
		login: string
		password: string
	}) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.logIn({ body: { login, password } }).then(() => {
			login.value = login
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
