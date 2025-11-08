<script setup lang="ts">
import { persistentStorage } from '../services/persistentStorage'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const onDebugClick = async () => {
	const storage = await persistentStorage.getAll()
	console.log({ storage })
}

const onLogoutClick = () => authStore.logOut()
</script>

<template>
	<h1>HomeView</h1>

	<button class="border-2 px-2 py-1" @click="onDebugClick()">Debug</button>

	<button class="border-2 px-2 py-1" @click="onLogoutClick()">Log out</button>
</template>
