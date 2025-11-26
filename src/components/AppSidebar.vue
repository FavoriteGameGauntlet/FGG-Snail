<script setup lang="ts">
import GameTimer from './GameTimer.vue'
import { API_URL } from '../constants/apiUrl'

console.log(API_URL)
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

		<div class="section">
			<h2>User profile</h2>
		</div>
	</div>
</template>

<style scoped>
@reference '../style.css';

.section {
	@apply py-3  not-last:border-b border-b-slate-500;
}

.link {
	@apply py-2 px-4 hover:bg-slate-100;
}
</style>
