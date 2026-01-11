import { defineStore } from 'pinia'
import { api } from '../api-facade/api'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreName } from '../enums/storeName'
import { router } from '../router/router'
import { persistentStorage, StoreKey } from '../services/persistentStorage'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: userName, isReady: isUserNameReady } = usePersistentRef(
		StoreKey.UserName,
	)

	const getIsLoggedIn = async () => {
		const userName = await persistentStorage.get(StoreKey.UserName)
		console.log('store', { userName })
		return userName !== undefined
	}

	const signUp = ({
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

		api.auth
			.signUp({ body: { name, password, email } })
			.then(() => {
				userName.value = name

				return api.auth.logIn({ body: { name, password } })
			})
			.then(() => router.push('/'))
			.catch((e) => console.log('login error', e))
	}

	const logIn = (name: string, password: string) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		console.log('log in')

		api.auth
			.logIn({ body: { name, password } })
			.then(() => {
				userName.value = name
				router.push('/')
			})
			.catch((e) => console.log('login error', e))
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
