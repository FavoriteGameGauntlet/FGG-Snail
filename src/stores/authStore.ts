import { defineStore } from 'pinia'
import { api } from '../api-facade/api'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreName } from '../enums/storeName'
import { router } from '../router/router'
import { persistentStorage, StoreKey } from '../services/persistentStorage'
import { computed, watch } from 'vue'

export const useAuthStore = defineStore(StoreName.Auth, () => {
	const { state: login, isReady: isLoginReady } = usePersistentRef(
		StoreKey.Login,
	)

	const getIsLoggedIn = async () => {
		const login = await persistentStorage.get(StoreKey.Login)
		return login !== undefined
	}

	const isLoggedIn = computed(() => login.value !== undefined)

	const signUp = async (data: {
		login: string
		password: string
		email: string
	}) => {
		if (!isLoginReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.signUp({ body: data }).then(() => {
			login.value = data.login

			return api.auth.logIn({
				body: { login: data.login, password: data.password },
			})
		})
	}

	const logIn = async (data: { login: string; password: string }) => {
		if (!isLoginReady)
			throw new Error('Persistent storage is not yet initialized')

		return api.auth.logIn({ body: data }).then(() => {
			login.value = data.login
		})
	}

	const logOut = () => {
		if (!isLoginReady)
			throw new Error('Persistent storage is not yet initialized')

		api.auth.logOut().finally(() => {
			login.value = undefined
			router.push('/login')
		})
	}

	return {
		login,
		getIsLoggedIn,
		isLoggedIn,

		signUp,
		logIn,
		logOut,
	}
})
