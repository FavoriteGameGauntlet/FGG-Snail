<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

console.log('signup')

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')
const email = ref('')

const onFormSubmit = () => {
	authStore
		.signUp({
			name: userName.value,
			password: password.value,
			email: email.value,
		})
		.then(() => router.push('/'))
		.catch((e) => console.log(e))
}
</script>

<template>
	<div class="grid place-content-center h-full w-full gap-4">
		<h1 class="text-3xl font-bold w-60">Регистрация</h1>

		<form class="flex flex-col gap-2 w-full" @submit.prevent="onFormSubmit">
			<input
				class="border border-slate-400 px-2 py-0.5 rounded-md"
				placeholder="Логин"
				v-model.trim="userName"
			/>
			<input
				class="border border-slate-400 px-2 py-0.5 rounded-md"
				type="email"
				placeholder="Эл. почта"
				v-model.trim="email"
			/>
			<input
				class="border border-slate-400 px-2 py-0.5 rounded-md"
				type="password"
				placeholder="Пароль"
				v-model="password"
			/>

			<button class="bg-emerald-200 py-0.5 rounded-md">
				Зарегистрироваться
			</button>

			<RouterLink to="login" class="text-cyan-700 text-sm place-self-center">
				Вход
			</RouterLink>
		</form>
	</div>
</template>
