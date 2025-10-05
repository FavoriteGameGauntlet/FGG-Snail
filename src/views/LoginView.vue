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
	<div>LoginView</div>

	<div>You are:</div>

	<RouterLink to="/">aboba</RouterLink>
</template>
