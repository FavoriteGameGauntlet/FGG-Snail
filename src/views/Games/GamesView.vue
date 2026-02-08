<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, useTemplateRef, watchEffect } from 'vue'
import { useGameStore } from '../../stores/gameStore'
import { LoadingState } from '../../composables/useLoading'

const gameStore = useGameStore()

const { unplayed } = storeToRefs(gameStore)
const showCountHint = ref(false)

const addGameInput = useTemplateRef('add-game-input')

gameStore.unplayedLoading.on([LoadingState.LOADED]).then(() => {
	showCountHint.value = !gameStore.enoughGamesInWishlist
	addGameInput.value?.focus()
})

const gameName = ref('')

const isLoading = computed(
	() => gameStore.unplayedLoading.state === LoadingState.LOADING,
)

/** @todo extract validation */
const validator = computed(() => {
	const result: { ok: boolean; message?: string } = { ok: true }

	if (unplayed.value.find((u) => u.name === gameName.value)) {
		result.ok = false
		result.message = 'Такая игра уже есть'
	}

	return result
})

watchEffect(() => {
	addGameInput.value?.setCustomValidity(
		validator.value.ok ? '' : (validator.value.message ?? 'Неверные данные'),
	)
	addGameInput.value?.reportValidity()
})

const onAddGameFormSubmit = () => {
	if (!validator.value.ok) return
	if (!gameName.value.length) return

	gameStore.addUnplayed([{ name: gameName.value }]).then(() => {
		gameName.value = ''
		showCountHint.value = !gameStore.enoughGamesInWishlist
	})
}

onMounted(() => {
	if (
		[LoadingState.ERROR, LoadingState.INIT].includes(
			gameStore.unplayedLoading.state,
		)
	) {
		gameStore.getUnplayed()
	}
})
</script>

<template>
	<div class="flex flex-col items-center px-12 py-8 w-full">
		<div class="flex flex-col w-180 gap-8">
			<h1 class="text-4xl">Игры</h1>

			<form class="flex gap-4" @submit.prevent="onAddGameFormSubmit">
				<input
					class="border border-slate-300 bg-slate-100 rounded-md px-3 py-1 w-80"
					ref="add-game-input"
					placeholder="Название игры..."
					:disabled="isLoading"
					v-model.trim="gameName"
				/>

				<button
					class="bg-slate-100 hover:bg-slate-200 cursor-pointer disabled:text-slate-500 px-4 py-1"
					:disabled="isLoading"
				>
					Добавить
				</button>
			</form>

			<p class="px-5 py-2 bg-slate-100 rounded-md w-fit" v-if="showCountHint">
				Чтобы крутить следующую игру, надо 6 игр, нужно ещё
				{{ 6 - unplayed.length }}.
			</p>

			<ol class="flex flex-col ps-10" v-if="unplayed.length">
				<li class="list-decimal" :key="game.name" v-for="game in unplayed">
					{{ game.name }}
				</li>
			</ol>

			<p class="w-full" v-else-if="isLoading && !gameName.length">
				Загружаем игры...
			</p>

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
