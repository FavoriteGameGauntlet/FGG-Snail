<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { ref } from 'vue'
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const { userId } = storeToRefs(authStore)

const onFormSubmit = async () => {
	console.log('LoginView.onFormSubmit')
	await authStore.logIn(userName.value)
	router.push('/')
}

watchEffect(() => {
	console.log({ formValue: userName.value })
})
</script>

<template>
	<div class="grid place-content-center h-full w-full">
		<h1 class="text-3xl font-bold">Вход</h1>

		{{ userId }}

		<form class="flex flex-col gap-2 w-40" @submit.prevent="onFormSubmit">
			<input placeholder="Имя пользователя" v-model.trim="userName" />

			<button>Войти</button>
		</form>
	</div>
</template>
