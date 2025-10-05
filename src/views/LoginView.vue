<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const { userId, userName } = storeToRefs(authStore)

console.log({
	userId: userId.value,
	userName: userName.value,
})
</script>

<template>
	<h1 class="text-3xl font-bold">Вход</h1>
</template>
