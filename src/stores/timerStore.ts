import { defineStore } from 'pinia'
import { StoreName } from '../enums/storeName'
import { api } from '../api-facade/api'
import { ref } from 'vue'
import { TimerState } from '../api-facade/models'

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const timer = ref<Date>(new Date(2 * 60 * 60 * 1000))
	const state = ref<TimerState>(TimerState.Created)
	const totalDuration = ref<Date>(new Date(2 * 60 * 60 * 1000))

	const getTimer = () => {
		api.getCurrentTimer().then((r) => {
			state.value = r.state
		})
	}

	const startTimer = () => {
		state.value = TimerState.Running
		api.postStartTimer().then(() => {})
	}

	const pauseTimer = () => {
		state.value = TimerState.Paused
		api.postPauseTimer().then(() => {})
	}

	return { timer, state, totalDuration, getTimer, startTimer, pauseTimer }
})
