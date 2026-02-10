<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEffectStore } from '../../../stores/effectStore'
import UserProfile from './UserProfile.vue'
import { RouteName } from '../../../router/routeNames'

const effectStore = useEffectStore()

const { availableCount } = storeToRefs(effectStore)
</script>

<template>
	<div class="flex justify-between items-center px-7">
		<UserProfile />

		<div class="flex gap-5 col-3">
			<RouterLink
				class="hover:underline text-blue-500"
				:to="{ name: RouteName.Timer }"
			>
				Таймер
			</RouterLink>

			<RouterLink
				class="hover:underline text-blue-500"
				:to="{ name: RouteName.Players }"
			>
				Игроки
			</RouterLink>

			<RouterLink
				class="hover:underline text-blue-500"
				:to="{ name: RouteName.RollEffects }"
			>
				Роллы {{ availableCount >= 1 ? '🔵' : '' }}
			</RouterLink>

			<RouterLink
				class="hover:underline text-blue-500"
				:to="{ name: RouteName.Games }"
			>
				Игры
			</RouterLink>

			<RouterLink
				class="hover:underline text-blue-500"
				:to="{ name: RouteName.Dev }"
			>
				Dev
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
@reference '@/style.css';
</style>
