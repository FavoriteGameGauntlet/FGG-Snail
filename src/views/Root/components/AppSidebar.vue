<script setup lang="ts">
import { toRefs } from 'vue'
import { useAuthStore } from '../../../stores/authStore'
import GameTimer from './GameTimer.vue'

const userStore = useAuthStore()
const { userName } = toRefs(userStore)

const onLogoutButtonClick = () => userStore.logOut()
</script>

<template>
	<div class="flex flex-col">
		<div class="section">
			<h2>Game name</h2>

			<p>В игре:</p>

			<GameTimer />
		</div>

		<nav class="section h-full flex flex-col">
			<RouterLink class="link" to="games">Игры</RouterLink>

			<span class="link cursor-pointer">Карта (скоро!)</span>

			<RouterLink class="link" to="timer">Таймер</RouterLink>

			<RouterLink class="link" to="rolls">Роллы</RouterLink>
		</nav>

		<div
			class="section grid gap-y-1 gap-x-3 grid-cols-[auto_1fr] items-center px-4"
		>
			<div class="h-12 w-12 bg-slate-300 rounded-full row-span-2"></div>
			<h2>{{ userName }}</h2>
			<button
				class="text-cyan-700 text-sm cursor-pointer text-start"
				@click="onLogoutButtonClick"
			>
				Выйти
			</button>
		</div>
	</div>
</template>

<style scoped>
@reference '@/style.css';

.section {
	@apply py-3  not-last:border-b border-b-slate-500;
}

.link {
	@apply py-2 px-4 hover:bg-slate-100;
}
</style>
