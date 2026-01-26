import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { StoreName } from '../enums/storeName'

const TWO_HOURS_IN_S = 2 * 60 * 60

const getTimeFromSeconds = (seconds: number) =>
	Temporal.PlainTime.from({
		hour: Math.floor(seconds / 3600),
		minute: Math.floor((seconds / 60) % 60),
		second: seconds % 60,
	})

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const timer = ref(getTimeFromSeconds(TWO_HOURS_IN_S))
	const state = ref<TimerState | null>(TimerState.Created)
	const totalDuration = ref(getTimeFromSeconds(TWO_HOURS_IN_S))

	const init = () => {
		console.log('[TIMER STORE] init')
		api.timer
			.getCurrent()
			.then((v) => {
				timer.value = getTimeFromSeconds(v.remainingTimeInS)
				totalDuration.value = getTimeFromSeconds(v.durationInS)
				state.value = v.state
			})
			.catch(() => {
				timer.value = getTimeFromSeconds(TWO_HOURS_IN_S)
				totalDuration.value = getTimeFromSeconds(TWO_HOURS_IN_S)
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
