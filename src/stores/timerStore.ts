import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { StoreName } from '../enums/storeName'

const TWO_HOURS_IN_S = 2 * 60 * 60
const getDateFromSeconds = (seconds: number) => new Date(seconds * 1000)

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const timer = ref<Date>(getDateFromSeconds(TWO_HOURS_IN_S))
	const state = ref<TimerState | null>(TimerState.Created)
	const totalDuration = ref<Date>(getDateFromSeconds(TWO_HOURS_IN_S))

	const init = () => {
		console.log('[TIMER STORE] init')
		api.timer
			.getCurrent()
			.then((v) => {
				timer.value = getDateFromSeconds(v.remainingTimeInS)
				totalDuration.value = getDateFromSeconds(v.durationInS)
				state.value = v.state
			})
			.catch(() => {
				timer.value = getDateFromSeconds(TWO_HOURS_IN_S)
				totalDuration.value = getDateFromSeconds(TWO_HOURS_IN_S)
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
