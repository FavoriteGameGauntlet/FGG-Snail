<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type TempGame, useGameStore } from '../stores/gameStore'
import { computed } from 'vue'

type Props = {
	gameId: number
}

const props = defineProps<Props>()

const gameStore = useGameStore()

const { games } = storeToRefs(gameStore)

const game = computed<TempGame | undefined>(() =>
	games.value.find((g) => g.id === props.gameId),
)
</script>

<template>
	<li
		class="game-row px-6 py-2 h-12 hover:bg-slate-100 flex justify-between items-center"
		v-if="game"
	>
		<button class="cursor-pointer flex gap-2">
			<span>{{ game.name }}</span>
			<!-- todo implement -->
			<!-- <span class="edit-icon hidden">✏️</span> -->
		</button>

		<!-- todo implement -->
		<!-- <button class="trash-button hover:bg-red-200 size-8 cursor-pointer">
			 🗑
		</button>  -->
	</li>
</template>

<style scoped>
@reference '../style.css';
</style>
