<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTimerStore } from '../../stores/timerStore'
import { computed } from 'vue'
import type { Temporal } from 'temporal-polyfill'
import { TimerState } from '../../api-facade/models'
import { useGameStore } from '../../stores/gameStore'

const timerStore = useTimerStore()
const gameStore = useGameStore()

const { totalDuration, timer, state } = storeToRefs(timerStore)
const { current: currentGame } = storeToRefs(gameStore)

const timerButtonSvg = computed(() =>
	state.value === TimerState.Running
		? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
		: '<path d="M8 5v14l11-7z"/>',
)

const formatDuration = (duration: Temporal.Duration) =>
	`${duration.hours}:${duration.minutes.toString().padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`

const timerString = computed(() => formatDuration(timer.value))
const durationString = computed(() => formatDuration(totalDuration.value))

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
	<div class="flex flex-col items-center justify-center size-full">
		<div class="flex flex-col gap-x-4 gap-6 w-min mb-17">
			<div
				class="text-3xl font-bold leading-[110%] max-w-fit w-fit overflow-auto"
			>
				{{ currentGame?.name ?? 'Игра не выбрана' }}
			</div>

			<div
				class="text-massive font-bold font-mono leading-[80%] tracking-tighter w-fit shrink-0 min-w-fit"
			>
				{{ timerString }}
			</div>

			<div class="grid grid-cols-2 grid-rows-2">
				<button
					class="row-span-2 cursor-pointer border-2 px-5 py-2.5 w-fit text-2xl border-black"
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
					class="text-xl w-fit place-self-end font-mono leading-[100%] self-start justify-self-end"
				>
					/ {{ durationString }}
				</div>

				<div class="text-xl w-fit place-self-end font-mono leading-[100%]">
					В игре: {{ durationString }}
				</div>
			</div>

			<div class="flex w-full justify-between">
				<button
					class="cursor-pointer border-2 px-8 py-1.5 w-fit text-xl text-green-700 border-green-700"
					@click="onFinishButtonClick"
				>
					Завершить
				</button>

				<button
					class="cursor-pointer border-2 px-8 py-1.5 w-fit justify-self-end text-xl text-red-700 border-red-700"
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
