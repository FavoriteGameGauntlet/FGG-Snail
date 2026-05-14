<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import UiButton from '../../components/ui/UiButton.vue'
import { useFeatureGameStore } from '../../stores/feature/featureGameStore'
import { LoadingStatus } from '../../utils/loadingState'

const gameStore = useFeatureGameStore()

const { current, canRoll } = storeToRefs(gameStore)

const rollText = ref('Загрузка...')

const showWishlistCountHint = computed(
	() =>
		!gameStore.enoughGamesInWishlist &&
		gameStore.getCurrentState.state === LoadingStatus.LOADED &&
		gameStore.getWishlistState.state === LoadingStatus.LOADED,
)

const onRollButtonClick = () => {
	gameStore.roll()
}

const onCancelGameButtonClick = () => {
	gameStore.cancel()
}

const onFinishGameButtonClick = () => {
	gameStore.finish()
}

gameStore.getCurrentState.on([LoadingStatus.LOADED]).then(() => {
	watch(
		current,
		() => {
			rollText.value = current.value?.name ?? 'Крути барабан'
		},
		{ immediate: true },
	)
})

onMounted(() => {
	if (
		[LoadingStatus.ERROR, LoadingStatus.INIT].includes(
			gameStore.getWishlistState.state,
		)
	) {
		gameStore.getWishlist()
	}
})
</script>

<template>
	<div class="game-rolls-view">
		<RouterLink class="effects-link" to="/rolls/effects"> Эффекты </RouterLink>

		<h1 class="title">Роллы</h1>

		<div class="roll-display">
			<div>{{ rollText }}</div>
		</div>

		<div class="status-container">
			<p v-if="current" class="current-game">
				Ты сейчас играешь в {{ current?.name }}.

				<span class="current-game-actions">
					<UiButton class="status-button" @click="onFinishGameButtonClick">
						Закончить
					</UiButton>

					<UiButton class="status-button" @click="onCancelGameButtonClick">
						Бросить
					</UiButton>
				</span>
			</p>

			<p v-else-if="showWishlistCountHint" class="info-item">
				Нужно хотя бы 6 игр в вишлисте, чтобы ролять новую.

				<RouterLink class="add-games-link" to="/games">
					Добавить игры
				</RouterLink>
			</p>
		</div>

		<div class="action-row">
			<UiButton
				class="roll-button"
				:disabled="!canRoll"
				@click="onRollButtonClick"
			>
				Прокрутить
			</UiButton>
		</div>
	</div>
</template>

<style scoped>
.game-rolls-view {
	display: grid;
	height: 100%;
	place-content: center;
	gap: 48px;
	padding-bottom: 80px;
}

.effects-link {
	place-self: center;
	color: #3b82f6;
}

.effects-link:hover {
	text-decoration: underline;
}

.title {
	text-align: center;
	font-size: 2.25rem;
	font-weight: 600;
}

.roll-display {
	display: flex;
	height: 160px;
	width: 100%;
	align-items: center;
	justify-content: center;
	gap: 16px;
	border: 1px solid #e2e8f0;
}

.status-container {
	width: 360px;
	border-radius: 6px;
	background-color: #e2e8f0;
	padding: 16px 32px;
}

.status-container:empty {
	display: none;
}

.current-game {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	gap: 16px;
}

.current-game-actions {
	display: flex;
	gap: 16px;
	justify-content: center;
	width: 100%;
}

.status-button {
	height: 48px;
	width: 45%;
}

.info-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	color: #0f172a;
}

.add-games-link {
	box-sizing: border-box;
	border: 2px solid #3b82f6;
	padding: 8px 16px;
	color: #3b82f6;
}

.add-games-link:hover {
	text-decoration: underline;
}

.roll-button {
	height: 72px;
	font-size: 1.25rem;
	width: 240px;
}

.roll-button:disabled {
	opacity: 0.5;
}

.roll-button:disabled:hover {
	background-color: #e2e8f0;
}

.action-row {
	display: flex;
	justify-content: center;
}
</style>
