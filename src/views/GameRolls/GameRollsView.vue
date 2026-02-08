<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useGameStore } from '../../stores/gameStore'
import { storeToRefs } from 'pinia'
import { LoadingState } from '../../composables/useLoading'

const gameStore = useGameStore()

const { enoughGamesInWishlist, current, canRoll } = storeToRefs(gameStore)

const rollText = ref('Загрузка...')

const showUnplayedCountHint = computed(
	() =>
		!enoughGamesInWishlist &&
		gameStore.currentLoading.state === LoadingState.LOADED &&
		gameStore.unplayedLoading.state === LoadingState.LOADED,
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

gameStore.currentLoading.on([LoadingState.LOADED]).then(() => {
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
		[LoadingState.ERROR, LoadingState.INIT].includes(
			gameStore.unplayedLoading.state,
		)
	) {
		gameStore.getUnplayed()
	}
})
</script>

<template>
	<div class="grid place-content-center h-full gap-12 pb-20">
		<RouterLink
			class="place-self-center hover:underline text-blue-500"
			to="/rolls/effects"
		>
			Эффекты
		</RouterLink>

		<h1 class="text-4xl font-semibold text-center">Роллы</h1>

		<div
			class="flex w-full h-40 gap-4 border-slate-200 border items-center justify-center"
		>
			<div>{{ rollText }}</div>
		</div>

		<div class="px-8 py-4 bg-slate-200 rounded-md empty:hidden">
			<p v-if="current">
				Ты сейчас играешь в {{ current?.name }}.

				<button
					class="border-2 border-green-500 text-green-500 px-4 py-2 cursor-pointer"
					@click="onCancelGameButtonClick"
				>
					Закончить
				</button>

				<button
					class="border-2 border-red-500 text-red-500 px-4 py-2 cursor-pointer"
					@click="onCancelGameButtonClick"
				>
					Бросить
				</button>
			</p>

			<p v-else-if="showUnplayedCountHint" class="info-item">
				Нужно хотя бы 6 игр в вишлисте, чтобы ролять новую.

				<RouterLink
					class="border-2 border-blue-500 text-blue-500 px-4 py-2 box-border hover:underline"
					to="/games"
				>
					Добавить игры
				</RouterLink>
			</p>
		</div>

		<button
			class="py-2 px-8 w-fit justify-self-center cursor-pointer text-green-950 bg-green-100 hover:bg-green-200 disabled:bg-slate-100 disabled:hover:bg-slate-200 disabled:text-slate-400"
			:disabled="!canRoll"
			@click="onRollButtonClick"
		>
			Прокрутить
		</button>
	</div>
</template>

<style scoped>
@reference '@/style.css';

.info-item {
	@apply text-slate-950 flex flex-col items-center gap-3;
}
</style>
