<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')

const onFormSubmit = () => {
	authStore
		.logIn(userName.value, password.value)
		.then(() => router.push('/'))
		.catch((e) => console.error(e))
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

			<button class="bg-emerald-200 py-0.5 rounded-md">Войти</button>

			<RouterLink to="signup" class="text-cyan-700 text-sm place-self-center">
				Зарегистрироваться
			</RouterLink>
		</form>
	</div>
</template>
