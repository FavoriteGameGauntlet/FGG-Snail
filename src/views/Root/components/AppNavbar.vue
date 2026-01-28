<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/authStore'
import UserProfile from './UserProfile.vue'
import { useEffectStore } from '../../../stores/effectStore'
import { watchEffect } from 'vue'

const authStore = useAuthStore()
const effectStore = useEffectStore()

const { availableCount } = storeToRefs(effectStore)

watchEffect(() => {
	console.log({ avcount: availableCount.value })
})

const { userName } = storeToRefs(authStore)
</script>

<template>
	<div class="flex justify-between items-center px-7">
		<UserProfile v-if="userName" :name="userName" />

		<div class="flex gap-5 col-3">
			<RouterLink class="hover:underline text-blue-500" to="/timer"
				>Таймер</RouterLink
			>

			<RouterLink class="hover:underline text-blue-500" to="/rolls">
				Роллы {{ availableCount >= 0 ? '🔵' : '' }}</RouterLink
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
