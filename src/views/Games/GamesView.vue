<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
	computed,
	onMounted,
	ref,
	useTemplateRef,
	watch,
	watchEffect,
} from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useFeatureGameStore } from '../../stores/feature/featureGameStore'
import { LoadingStatus } from '../../utils/loadingState'

const gameStore = useFeatureGameStore()
const authStore = useAuthStore()

const { wishlist } = storeToRefs(gameStore)
const showCountHint = ref(false)

const addGameInput = useTemplateRef('add-game-input')

gameStore.getWishlistState.on([LoadingStatus.LOADED]).then(() => {
	showCountHint.value = !gameStore.enoughGamesInWishlist
	addGameInput.value?.focus()
})

const gameName = ref('')

const isLoading = computed(
	() => gameStore.getWishlistState.state === LoadingStatus.LOADING,
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

	gameStore.addToWishlist({ name: gameName.value }).then(() => {
		gameName.value = ''
		showCountHint.value = !gameStore.enoughGamesInWishlist
	})
}

const updateGamesOnLoginChange = () => {
	watch(
		() => authStore.login,
		(login) => {
			if (
				[LoadingStatus.ERROR, LoadingStatus.INIT].includes(
					gameStore.getWishlistState.state,
				) &&
				login
			) {
				gameStore.getWishlist()
			}
		},
		{ immediate: true },
	)
}

onMounted(() => {
	updateGamesOnLoginChange()
})
</script>

<template>
	<div class="games-view">
		<div class="container">
			<h1 class="title">Игры</h1>

			<form class="add-form" @submit.prevent="onAddGameFormSubmit">
				<input
					class="game-input"
					ref="add-game-input"
					placeholder="Название игры..."
					:disabled="isLoading"
					v-model.trim="gameName"
				/>

				<button class="submit-button" :disabled="isLoading">Добавить</button>
			</form>

			<p class="hint" v-if="showCountHint">
				Чтобы крутить следующую игру, надо 6 игр, нужно ещё
				{{ 6 - wishlist.length }}.
			</p>

			<ol class="game-list" v-if="wishlist.length">
				<li :key="game.name" v-for="game in wishlist">
					{{ game.name }}
				</li>
			</ol>

			<p class="message" v-else-if="isLoading && !gameName.length">
				Загружаем игры...
			</p>

			<p class="message" v-else>У тебя ещё нет игр!</p>
		</div>
	</div>
</template>

<style scoped>
.games-view {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	padding: 32px 48px;
}

.container {
	display: flex;
	width: 720px;
	flex-direction: column;
	gap: 32px;
}

.title {
	font-size: 2.25rem;
}

.add-form {
	display: flex;
	gap: 16px;
}

.game-input {
	width: 320px;
	border-radius: 6px;
	border: 1px solid #cbd5e1;
	background-color: #f1f5f9;
	padding: 4px 12px;
}

.submit-button {
	cursor: pointer;
	background-color: #f1f5f9;
	padding: 4px 16px;
}

.submit-button:hover {
	background-color: #e2e8f0;
}

.submit-button:disabled {
	color: #64748b;
}

.hint {
	width: fit-content;
	border-radius: 6px;
	background-color: #f1f5f9;
	padding: 8px 20px;
}

.game-list {
	display: flex;
	flex-direction: column;
	padding-left: 40px;
	list-style: decimal;
}

.message {
	width: 100%;
}
</style>
