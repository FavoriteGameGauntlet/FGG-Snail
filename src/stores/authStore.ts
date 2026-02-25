import { defineStore } from 'pinia'
import { api } from '../api-facade/api'
import { useLoading } from '../composables/useLoading'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreName } from '../enums/storeName'
import { router } from '../router/router'
import { persistentStorage, StoreKey } from '../services/persistentStorage'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: userName, isReady: isUserNameReady } = usePersistentRef(
		StoreKey.UserName,
	)
	const {} = useLoading()

	const getIsLoggedIn = async () => {
		const userName = await persistentStorage.get(StoreKey.UserName)
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
			userName.value = login

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
			userName.value = login
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
