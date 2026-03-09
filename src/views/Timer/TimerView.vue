<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Temporal } from '@js-temporal/polyfill'
import { computed, ref } from 'vue'
import { TimerState } from '../../api-facade/models'
import UiTimestamp from '../../components/ui/UiTimestamp.vue'
import { useFeatureGameStore } from '../../stores/feature/featureGameStore'
// import { useTimerStore } from '../../stores/timerStore'

// const timerStore = useTimerStore()
const gameStore = useFeatureGameStore()

// const { durationTotal, state } = storeToRefs(timerStore)
const durationTotal = Temporal.Duration.from({ hours: 2 })
const { current: currentGame } = storeToRefs(gameStore)
// const currentTimer = Temporal.Now.instant()
const state = ref(TimerState.Created)

const timerButtonSvg = computed(() =>
	state.value === TimerState.Running
		? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
		: '<path d="M8 5v14l11-7z"/>',
)

// const timeLeft = computed(
// 	() => timerStore.durationLeft ?? Temporal.Duration.from({ hours: 2 }),
// )

const timeLeft = Temporal.Duration.from({ hours: 2 })

const onStartButtonClick = () => {
	// timerStore.toggle()
}

const onFinishButtonClick = () => {
	// gameStore.finish()
}

const onCancelButtonClick = () => {
	// gameStore.cancel()
}
</script>

<template>
	<div class="flex size-full flex-col items-center justify-center">
		<div class="mb-17 flex w-min flex-col gap-4 gap-x-4">
			<div
				class="w-fit max-w-fit overflow-auto text-3xl leading-[150%] font-bold"
			>
				<!-- @todo fix text on load -->
				{{ currentGame?.name ?? 'Игра не выбрана' }}
			</div>

			<UiTimestamp
				class="text-massive w-fit min-w-fit shrink-0 font-bold"
				:time="timeLeft"
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
					/ <UiTimestamp class="inline" :time="durationTotal" />
				</div>

				<div class="w-fit place-self-end text-xl">
					В игре:
					<UiTimestamp
						class="inline"
						:time="
							gameStore.current?.timeSpent ??
							Temporal.PlainDateTime.from({ year: 0, month: 1, day: 1 })
						"
					/>
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
