<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTimerStore } from '../../stores/timerStore'
import { computed } from 'vue'

const timerStore = useTimerStore()

const { totalDuration, timer } = storeToRefs(timerStore)

const formatDuration = (duration: Temporal.Duration) =>
	`${duration.hours}:${duration.minutes.toString().padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`

const timerString = computed(() => formatDuration(timer.value))
const durationString = computed(() => formatDuration(totalDuration.value))

const onStartButtonClick = () => null
</script>

<template>
	<div class="flex flex-col items-center justify-center size-full">
		<div class="flex flex-col gap-x-4 gap-9 w-min mb-17">
			<div
				class="text-4xl font-bold leading-[110%] max-w-fit w-fit overflow-auto"
			>
				Game name game name game name
			</div>

			<div
				class="text-massive font-bold font-mono leading-[80%] tracking-tighter w-fit shrink-0 min-w-fit"
			>
				{{ timerString }}
			</div>

			<div class="grid grid-cols-2 grid-rows-2">
				<button
					class="row-span-2 cursor-pointer border-2 px-5 py-4 w-fit text-2xl border-black"
					@click="onStartButtonClick"
				>
					Старт
				</button>

				<div
					class="text-2xl w-fit place-self-end font-mono leading-[100%] self-start justify-self-end"
				>
					/ {{ durationString }}
				</div>

				<div class="text-2xl w-fit place-self-end font-mono leading-[100%]">
					В игре: {{ durationString }}
				</div>
			</div>

			<div class="flex w-full justify-between">
				<button
					class="cursor-pointer border-2 px-8 py-1 w-fit text-2xl text-green-700 border-green-700"
					@click="onStartButtonClick"
				>
					Завершить
				</button>

				<button
					class="cursor-pointer border-2 px-8 py-1 w-fit justify-self-end text-2xl text-red-700 border-red-700"
					@click="onStartButtonClick"
				>
					Бросить
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-massive {
	font-size: 8rem;
}
</style>
