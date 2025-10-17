import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistentRef } from '../composables/usePersistentRef'
import { StoreKey } from '../services/persistentStorage'

export const useAuthStore = defineStore('counter', () => {
	const userName = usePersistentRef(StoreKey.UserName)
	const userId = usePersistentRef(StoreKey.UserId)

	const isLoggedIn = computed(() => userId.value !== null)

	const logIn = async (newUserName: string) => {
		userName.value = newUserName
		userId.value = 'default_user_id_123456789'
	}

	const logOut = () => {
		userName.value = undefined
		userId.value = undefined
	}

	return { userName, userId, isLoggedIn, logIn, logOut }
})
