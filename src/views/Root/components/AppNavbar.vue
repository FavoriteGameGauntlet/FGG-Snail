<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEffectStore } from '../../../stores/effectStore'
import UserProfile from './UserProfile.vue'
import { RouteName } from '../../../router/routeNames'

const effectStore = useEffectStore()

const { availableCount } = storeToRefs(effectStore)
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
				:to="{ name: RouteName.RollEffects }"
			>
				Роллы {{ availableCount >= 1 ? '🔵' : '' }}
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
