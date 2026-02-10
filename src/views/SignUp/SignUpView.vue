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
	<div class="grid h-full w-full place-content-center gap-4">
		<h1 class="w-60 text-3xl font-bold">Регистрация</h1>

		<form class="flex w-full flex-col gap-2" @submit.prevent="onFormSubmit">
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				placeholder="Логин"
				v-model.trim="userName"
			/>
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				type="email"
				placeholder="Эл. почта"
				v-model.trim="email"
			/>
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				type="password"
				placeholder="Пароль"
				v-model="password"
			/>

			<button class="rounded-md bg-emerald-200 py-0.5">
				Зарегистрироваться
			</button>

			<RouterLink to="login" class="place-self-center text-sm text-cyan-700">
				Вход
			</RouterLink>
		</form>
	</div>
</template>
