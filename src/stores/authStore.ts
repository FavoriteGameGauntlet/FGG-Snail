import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

export const useAuthStore = defineStore('counter', () => {
	const userName = ref<null | string>(null)
	const userId = ref<null | string>(null)

	const isLoggedIn = computed(() => userId.value !== null)

	watchEffect(() => {
		if (userName.value === null) {
			localStorage.removeItem('userName')
		} else {
			localStorage.setItem('userName', userName.value)
		}
	})

	watchEffect(() => {
		if (userId.value === null) {
			localStorage.removeItem('userId')
		} else {
			localStorage.setItem('userId', userId.value)
		}
	})

	const logIn = (newUserName: string) => {
		userName.value = newUserName
		userId.value = 'default_user_id_123456789'
	}

	const logOut = () => {
		userName.value = null
		userId.value = null
	}

	return { userName, userId, isLoggedIn, logIn, logOut }
})
