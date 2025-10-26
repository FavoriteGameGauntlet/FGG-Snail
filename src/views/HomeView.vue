<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const onLogoutClick = () => authStore.logOut()
</script>

<template>
	<h1>HomeView</h1>

	<button class="border-2 px-2 py-1" @click="onLogoutClick()">Log out</button>
</template>
