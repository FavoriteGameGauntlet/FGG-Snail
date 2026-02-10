<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { usePersistentRef } from '../../composables/usePersistentRef'
import { StoreKey } from '../../services/persistentStorage.web'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')

const isAuthError = ref(false)

const loginInput = useTemplateRef('loginInput')
const passwordInput = useTemplateRef('passwordInput')

const onFormSubmit = () => {
	authStore
		.logIn(userName.value, password.value)
		.then(() => router.push('/'))
		.catch((e) => {
			if (e['body']['code'] === 'WRONG_AUTH_DATA') {
				isAuthError.value = true
			}
		})
}

onMounted(async () => {
	// todo fix this mess. This should just work, but it don't
	usePersistentRef(StoreKey.UserName, (storedUserName) => {
		userName.value = storedUserName ?? ''

		if (userName.value) {
			passwordInput.value?.focus()
		} else {
			loginInput.value?.focus()
		}
	})
})
</script>

<template>
	<div class="grid h-full w-full place-content-center gap-4">
		<h1 class="w-60 text-3xl font-bold">Вход</h1>

		<form class="flex w-full flex-col gap-2" @submit.prevent="onFormSubmit">
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				placeholder="Логин"
				v-model.trim="userName"
				ref="loginInput"
			/>
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				type="password"
				placeholder="Пароль"
				v-model="password"
				ref="passwordInput"
			/>

			<div class="text-sm text-red-400" v-if="isAuthError">
				Неправильный логин или пароль.
			</div>

			<button class="rounded-md bg-emerald-200 py-0.5">Войти</button>

			<RouterLink to="signup" class="place-self-center text-sm text-cyan-700">
				Зарегистрироваться
			</RouterLink>
		</form>
	</div>
</template>
