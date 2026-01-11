<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/authStore'
import UserProfile from './UserProfile.vue'

const authStore = useAuthStore()

const { userName } = storeToRefs(authStore)
</script>

<template>
	<div class="flex justify-between items-center px-7">
		<UserProfile v-if="userName" :name="userName" />

		<div class="flex gap-5 col-3">
			<RouterLink class="hover:underline text-blue-500" to="/timer"
				>Таймер</RouterLink
			>

			<RouterLink class="hover:underline text-blue-500" to="/rolls"
				>Роллы</RouterLink
			>

			<RouterLink class="hover:underline text-blue-500" to="/games"
				>Игры</RouterLink
			>
		</div>
	</div>
</template>

<style scoped>
@reference '@/style.css';
</style>
