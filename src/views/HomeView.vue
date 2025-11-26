<script setup lang="ts">
import { persistentStorage } from '../services/persistentStorage'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const onDebugClick = async () => {
	const storage = await persistentStorage.getAll()
	console.log({ storage })
}

const onLogoutClick = () => authStore.logOut()

// api
// 	.test('welnyr')
// 	.then(async (r) => {
// 		const text = await r.text()
// 		const status = r.status

// 		return { text, status }
// 	})
// 	.then((result) => console.log({ result }))
</script>

<template>
	<div class="flex flex-col">
		<h1>HomeView</h1>

		<button class="border-2 px-2 py-1" @click="onDebugClick()">Debug</button>

		<button class="border-2 px-2 py-1" @click="onLogoutClick()">Log out</button>
	</div>
</template>
