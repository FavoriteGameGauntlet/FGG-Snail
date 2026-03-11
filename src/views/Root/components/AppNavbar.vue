<script setup lang="ts">
import { RouteName } from '../../../router/routeNames'
import { useApiWheelStore } from '../../../stores/api/apiWheelStore'
import UserProfile from './UserProfile.vue'

const wheelStore = useApiWheelStore()
</script>

<template>
	<div class="flex items-center justify-between px-7">
		<UserProfile />

		<div class="col-3 flex gap-5">
			<RouterLink
				class="text-blue-500 hover:underline"
				:to="{ name: RouteName.Timer }"
			>
				Таймер
			</RouterLink>

			<RouterLink
				class="text-blue-500 hover:underline"
				:to="{ name: RouteName.Players }"
			>
				Игроки
			</RouterLink>

			<RouterLink
				class="text-blue-500 hover:underline"
				:to="{ name: RouteName.WheelRolls }"
			>
				Роллы {{ wheelStore.pendingRoll ? '🔵' : '' }}
			</RouterLink>

			<RouterLink
				class="text-blue-500 hover:underline"
				:to="{ name: RouteName.Games }"
			>
				Игры
			</RouterLink>

			<RouterLink
				class="text-blue-500 hover:underline"
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
