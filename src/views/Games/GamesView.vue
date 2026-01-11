<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useGameStore } from '../../stores/gameStore'

const gameStore = useGameStore()

const { unplayed } = storeToRefs(gameStore)

const isAddingGame = ref(false)
const gameName = ref('')

const onAddGameFormSubmit = () => {
	isAddingGame.value = true
	gameStore
		.addGames([{ name: gameName.value }])
		.then(() => (gameName.value = ''))
		.finally(() => (isAddingGame.value = false))
}
</script>

<template>
	<div class="flex flex-col items-center px-12 py-8 w-full">
		<div class="flex flex-col w-180 gap-8">
			<h1 class="text-4xl">Игры</h1>

			<form class="flex gap-4" @submit.prevent="onAddGameFormSubmit">
				<input
					ref="add-game-input"
					placeholder="Название игры..."
					:disabled="isAddingGame"
					v-model="gameName"
				/>

				<button>Добавить</button>
			</form>

			<ol class="flex flex-col ps-10" v-if="unplayed.length">
				<li class="list-decimal" :key="game.name" v-for="game in unplayed">
					{{ game.name }}
				</li>
			</ol>

			<p class="w-full" v-else>У тебя ещё нет игр!</p>
		</div>
	</div>
</template>

<style scoped>
@reference '@/style.css';

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
