<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')

const isAuthError = ref(false)

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
</script>

<template>
	<div class="grid place-content-center h-full w-full gap-4">
		<h1 class="text-3xl font-bold w-60">Вход</h1>

		<form class="flex flex-col gap-2 w-full" @submit.prevent="onFormSubmit">
			<input
				class="border border-slate-400 px-2 py-0.5 rounded-md"
				placeholder="Логин"
				v-model.trim="userName"
			/>
			<input
				class="border border-slate-400 px-2 py-0.5 rounded-md"
				type="password"
				placeholder="Пароль"
				v-model="password"
			/>

			<div class="text-sm text-red-400" v-if="isAuthError">
				Неправильный логин или пароль.
			</div>

			<button class="bg-emerald-200 py-0.5 rounded-md">Войти</button>

			<RouterLink to="signup" class="text-cyan-700 text-sm place-self-center">
				Зарегистрироваться
			</RouterLink>
		</form>
	</div>
</template>
