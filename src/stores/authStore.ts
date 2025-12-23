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

	watchEffect(() => console.log('store effect', { userName: userName.value }))

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

		http
			.post('/auth/signup', { body: { name, password, email } })
			.then(() => {
				userName.value = name

				return http.post('/auth/login', { body: { name, password } })
			})
			.then(() => router.push('/'))
			.catch((e) => console.log('login error', e))
	}

	const logIn = (name: string, password: string) => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		http
			.post('/auth/login', { body: { name, password } })
			.then(() => {
				userName.value = name
				router.push('/')
			})
			.catch((e) => console.log('login error', e))
	}

	const logOut = () => {
		if (!isUserNameReady)
			throw new Error('Persistent storage is not yet initialized')

		http.post('/auth/logout').then(() => {
			userName.value = undefined
			router.push('/login')
		})
	}

	return { userName, getIsLoggedIn, signUp, logIn, logOut }
})
