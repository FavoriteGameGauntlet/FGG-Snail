<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useEffectStore } from '../../../stores/effectStore'
import UserProfile from './UserProfile.vue'

const effectStore = useEffectStore()

const { availableCount } = storeToRefs(effectStore)

watchEffect(() => {
	console.log({ avcount: availableCount.value })
})
</script>

<template>
	<div class="flex justify-between items-center px-7">
		<UserProfile />

		<div class="flex gap-5 col-3">
			<RouterLink class="hover:underline text-blue-500" to="/timer"
				>Таймер</RouterLink
			>

			<RouterLink class="hover:underline text-blue-500" to="/rolls">
				Роллы {{ availableCount >= 1 ? '🔵' : '' }}</RouterLink
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
