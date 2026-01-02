<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTimerStore } from '../../stores/timerStore'
import { computed } from 'vue'

const timerStore = useTimerStore()

const { state, totalDuration, timer } = storeToRefs(timerStore)

const formatDate = (date: Date) =>
	`${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`

const timerString = computed(() => formatDate(timer.value))
const durationString = computed(() => formatDate(totalDuration.value))

const onStartButtonClick = () => null
const onPauseButtonClick = () => null
</script>

<template>
	<div class="grid place-content-center px-4 pt-4 pb-8 gap-8">
		<div class="flex flex-col gap-1 font-mono">
			<div class="text-xl place-self-center">В игре: 12:34:56</div>
			<div class="text-6xl font-bold">{{ timerString }}</div>
			<div class="text-xl w-fit place-self-end">/ 2:00:00</div>
		</div>

		<button
			class="cursor-pointer border-2 px-11 py-1 w-fit justify-self-center text-2xl text-green-700 border-green-700"
			@click="onStartButtonClick"
		>
			Старт
		</button>

		<button
			class="cursor-pointer border-2 px-11 py-1 w-fit justify-self-center text-2xl text-orange-700 border-orange-700"
			@click="onPauseButtonClick"
		>
			Стоп
		</button>
	</div>
</template>
