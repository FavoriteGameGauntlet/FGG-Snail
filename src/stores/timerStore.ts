import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { StoreName } from '../enums/storeName'

const twoHours = Temporal.Duration.from({
	hours: 2,
	minutes: 0,
	seconds: 0,
})

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const timer = ref<Temporal.Duration>(Temporal.Duration.from(twoHours))
	const state = ref<TimerState | null>(TimerState.Created)
	const totalDuration = ref<Temporal.Duration>(twoHours)

	const init = () => {
		console.log('[TIMER STORE] init')
		api.timer
			.getCurrent()
			.then((v) => {
				timer.value = v.remainingTime
				totalDuration.value = v.duration
				state.value = v.state
			})
			.catch(() => {
				timer.value = Temporal.Duration.from(twoHours)
				totalDuration.value = Temporal.Duration.from(twoHours)
				state.value = null
			})
	}

	// todo
	const getTimer = () => {
		api.timer.getCurrent().then((r) => {
			state.value = r.state
		})
	}

	const startTimer = () => {
		state.value = TimerState.Running
		api.timer.postStart().then(() => {})
	}

	const pauseTimer = () => {
		state.value = TimerState.Paused
		api.timer.postPause().then(() => {})
	}

	return { timer, state, totalDuration, init, getTimer, startTimer, pauseTimer }
})
