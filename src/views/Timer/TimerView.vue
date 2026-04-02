<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { TimerState } from '../../api-facade/models/timers-models'
import UiButton from '../../components/ui/UiButton.vue'
import UiTimestamp from '../../components/ui/UiTimestamp.vue'
import { LoadingState } from '../../composables/useLoading'
import { RouteName } from '../../router/routeNames'
import { useApiWheelStore } from '../../stores/api/apiWheelStore'
import { useFeatureGameStore } from '../../stores/feature/featureGameStore'
import { useFeatureTimerStore } from '../../stores/feature/featureTimerStore'
import GameTimer from './components/GameTimer.vue'
import WheelTimer from './components/WheelTimer.vue'
import { useAuthStore } from '../../stores/authStore'

const timerStore = useFeatureTimerStore()
const gameStore = useFeatureGameStore()
const wheelStore = useApiWheelStore()
const authStore = useAuthStore()

const {
	durationTotal,
	state,
	loading: isTimerLoading,
} = storeToRefs(timerStore)
const { current: currentGame } = storeToRefs(gameStore)

const gameNameText = computed(() =>
	gameStore.currentLoading.state === LoadingState.LOADED
		? (currentGame.value?.name ?? 'Крути новую игру')
		: 'Загрузка...',
)

const timerButtonSvg = computed(() =>
	state.value === TimerState.Running
		? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
		: '<path d="M8 5v14l11-7z"/>',
)

const onStartButtonClick = () => {
	timerStore.toggle()
}
</script>

<template>
	<div class="flex size-full flex-col items-center justify-center">
		<div class="mb-17 flex w-min flex-col gap-4 gap-x-4">
			<RouterLink
				class="w-fit max-w-fit overflow-auto text-3xl leading-[150%] font-bold"
				:to="{ name: RouteName.GameRolls }"
			>
				{{ gameNameText }}
			</RouterLink>

			<WheelTimer class="text-massive w-fit min-w-fit shrink-0 font-bold" />

			<div class="grid grid-cols-2 grid-rows-2">
				<button
					class="row-span-2 w-fit border-2 border-black px-5 py-3 text-2xl not-disabled:cursor-pointer disabled:opacity-50"
					:disabled="isTimerLoading || !timerStore.canToggle"
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
					<GameTimer
						class="inline"
						v-if="authStore.login"
						:login="authStore.login"
					/>
				</div>
			</div>

			<div
				class="wheel-action"
				:class="{ 'wheel-action_disabled': !wheelStore.pendingRoll }"
			>
				<RouterLink
					class="wheel-action-link"
					:to="{ name: RouteName.WheelRolls }"
				>
					<UiButton>{{
						wheelStore.pendingRoll ? 'Крути колесо!' : 'Ждём таймер...'
					}}</UiButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-massive {
	font-size: 6rem;
}

.wheel-action {
	height: 80px;
	font-size: 1.5rem;
}

.wheel-action_disabled {
	pointer-events: none;
	user-select: none;
	cursor: default;
	opacity: 40%;
}

.wheel-action-link {
	width: 100%;
}
</style>
