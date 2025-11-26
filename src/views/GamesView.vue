<script setup lang="ts">
import { storeToRefs } from 'pinia'
import GameRow from '../components/GameRow.vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const { games } = storeToRefs(gameStore)
</script>

<template>
	<div class="flex flex-col gap-8 px-12 py-8">
		<div class="grid grid-cols-[1fr_auto_auto] gap-4 items-center ps-6">
			<h1 class="text-4xl">Игры</h1>

			<!-- todo implement -->
			<!-- <button class="title-button bg-cyan-200">Импорт</button> -->

			<!-- todo implement -->
			<!-- <button class="title-button bg-purple-200">Экспорт</button> -->
		</div>

		<ul class="flex flex-col">
			<GameRow :gameId="game.id" :key="game.id" v-for="game in games"></GameRow>
		</ul>
	</div>
</template>

<style scoped>
@reference '../style.css';

.title-button {
	@apply cursor-pointer px-4 py-2;
}

.game-row :where(.edit-icon, .trash-button) {
	@apply hidden;
}

.game-row:hover :where(.edit-icon, .trash-button) {
	@apply block;
}
</style>
