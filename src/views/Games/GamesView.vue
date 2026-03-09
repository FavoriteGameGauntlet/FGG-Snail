<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, useTemplateRef, watchEffect } from 'vue'
import { useFeatureGameStore } from '../../stores/feature/featureGameStore'
import { LoadingState } from '../../composables/useLoading'

const gameStore = useFeatureGameStore()

const { wishlist } = storeToRefs(gameStore)
const showCountHint = ref(false)

const addGameInput = useTemplateRef('add-game-input')

gameStore.wishlistLoading.on([LoadingState.LOADED]).then(() => {
	showCountHint.value = !gameStore.enoughGamesInWishlist
	addGameInput.value?.focus()
})

const gameName = ref('')

const isLoading = computed(
	() => gameStore.wishlistLoading.state === LoadingState.LOADING,
)

/** @todo extract validation */
const validator = computed(() => {
	const result: { ok: boolean; message?: string } = { ok: true }

	if (wishlist.value.find((u) => u.name === gameName.value)) {
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
			gameStore.wishlistLoading.state,
		)
	) {
		gameStore.getUnplayed()
	}
})
</script>

<template>
	<div class="flex w-full flex-col items-center px-12 py-8">
		<div class="flex w-180 flex-col gap-8">
			<h1 class="text-4xl">Игры</h1>

			<form class="flex gap-4" @submit.prevent="onAddGameFormSubmit">
				<input
					class="w-80 rounded-md border border-slate-300 bg-slate-100 px-3 py-1"
					ref="add-game-input"
					placeholder="Название игры..."
					:disabled="isLoading"
					v-model.trim="gameName"
				/>

				<button
					class="cursor-pointer bg-slate-100 px-4 py-1 hover:bg-slate-200 disabled:text-slate-500"
					:disabled="isLoading"
				>
					Добавить
				</button>
			</form>

			<p class="w-fit rounded-md bg-slate-100 px-5 py-2" v-if="showCountHint">
				Чтобы крутить следующую игру, надо 6 игр, нужно ещё
				{{ 6 - wishlist.length }}.
			</p>

			<ol class="flex flex-col ps-10" v-if="wishlist.length">
				<li class="list-decimal" :key="game.name" v-for="game in wishlist">
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
