<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { TimerState } from '../../api-facade/models'
import UiTimer from '../../components/ui/UiTimer.vue'
import { useGameStore } from '../../stores/gameStore'
import { useTimerStore } from '../../stores/timerStore'

const timerStore = useTimerStore()
const gameStore = useGameStore()

const { totalDuration, timer, state } = storeToRefs(timerStore)
const { current: currentGame } = storeToRefs(gameStore)

const timerButtonSvg = computed(() =>
	state.value === TimerState.Running
		? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
		: '<path d="M8 5v14l11-7z"/>',
)

const onStartButtonClick = () => {
	timerStore.toggle()
}

const onFinishButtonClick = () => {
	gameStore.finish()
}

const onCancelButtonClick = () => {
	gameStore.cancel()
}
</script>

<template>
	<div class="flex size-full flex-col items-center justify-center">
		<div class="mb-17 flex w-min flex-col gap-4 gap-x-4">
			<div
				class="w-fit max-w-fit overflow-auto text-3xl leading-[110%] font-bold"
			>
				<!-- @todo fix text on load -->
				{{ currentGame?.name ?? 'Игра не выбрана' }}
			</div>

			<UiTimer
				class="text-massive w-fit min-w-fit shrink-0 font-bold"
				:time="timer"
			/>

			<div class="grid grid-cols-2 grid-rows-2">
				<button
					class="row-span-2 w-fit cursor-pointer border-2 border-black px-5 py-3 text-2xl"
					@click="onStartButtonClick"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						v-html="timerButtonSvg"
					></svg>
				</button>

				<div
					class="w-fit place-self-end self-start justify-self-end font-mono text-xl"
				>
					/ <UiTimer class="inline" :time="totalDuration" />
				</div>

				<div class="w-fit place-self-end text-xl">
					В игре: <UiTimer class="inline" :time="totalDuration" />
				</div>
			</div>

			<div class="flex w-full justify-between">
				<button
					class="w-fit cursor-pointer border-2 border-green-700 px-8 py-1.5 text-xl text-green-700"
					@click="onFinishButtonClick"
				>
					Завершить
				</button>

				<button
					class="w-fit cursor-pointer justify-self-end border-2 border-red-700 px-8 py-1.5 text-xl text-red-700"
					@click="onCancelButtonClick"
				>
					Забросить
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-massive {
	font-size: 6rem;
}
</style>
