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
	<div class="grid h-full place-content-center gap-12 pb-20">
		<RouterLink
			class="place-self-center text-blue-500 hover:underline"
			to="/rolls/effects"
		>
			Эффекты
		</RouterLink>

		<h1 class="text-center text-4xl font-semibold">Роллы</h1>

		<div
			class="flex h-40 w-full items-center justify-center gap-4 border border-slate-200"
		>
			<div>{{ rollText }}</div>
		</div>

		<div class="rounded-md bg-slate-200 px-8 py-4 empty:hidden">
			<p v-if="current">
				Ты сейчас играешь в {{ current?.name }}.

				<button
					class="cursor-pointer border-2 border-green-500 px-4 py-2 text-green-500"
					@click="onFinishGameButtonClick"
				>
					Закончить
				</button>

				<button
					class="cursor-pointer border-2 border-red-500 px-4 py-2 text-red-500"
					@click="onCancelGameButtonClick"
				>
					Бросить
				</button>
			</p>

			<p v-else-if="showUnplayedCountHint" class="info-item">
				Нужно хотя бы 6 игр в вишлисте, чтобы ролять новую.

				<RouterLink
					class="box-border border-2 border-blue-500 px-4 py-2 text-blue-500 hover:underline"
					to="/games"
				>
					Добавить игры
				</RouterLink>
			</p>
		</div>

		<button
			class="w-fit cursor-pointer justify-self-center bg-green-100 px-8 py-2 text-green-950 hover:bg-green-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-slate-200"
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
	@apply flex flex-col items-center gap-3 text-slate-950;
}
</style>
