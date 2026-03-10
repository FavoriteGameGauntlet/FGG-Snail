import { Temporal } from '@js-temporal/polyfill'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../../api-facade/api'
import { TimerState } from '../../api-facade/models'
import { StoreName } from '../../enums/storeName'

const DEFAULT_DURATION = Temporal.Duration.from({
	hours: 2,
	minutes: 0,
	seconds: 0,
})

export const useApiTimerStore = defineStore(StoreName.ApiTimer, () => {
	const state = ref(TimerState.Created)
	const durationTotal = ref(Temporal.Duration.from(DEFAULT_DURATION))

	const lastActionDate = ref(Temporal.Now.instant())
	const durationLeft = ref(Temporal.Duration.from(DEFAULT_DURATION))

	const canStart = computed(
		() =>
			state.value &&
			(state.value === TimerState.Created || state.value === TimerState.Paused),
	)

	const canPause = computed(
		() => state.value && state.value === TimerState.Running,
	)

	const getCurrent = async () => {
		return api.timers.getCurrent().then((v) => {
			durationTotal.value = v.duration
			durationLeft.value = v.remainingTime
			state.value = v.state
			lastActionDate.value = v.lastActionDate ?? Temporal.Now.instant()
		})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()

		const prevState = state.value
		const prevLastActionDate = lastActionDate.value

		state.value = TimerState.Running
		lastActionDate.value = Temporal.Now.instant()

		await api.timers
			.postStart()
			.then((timerAction) => {
				durationLeft.value = Temporal.Duration.from(timerAction.remainingTime)
				lastActionDate.value = Temporal.Now.instant()
			})
			.catch(() => {
				state.value = prevState
				lastActionDate.value = prevLastActionDate
			})
	}

	const pause = async () => {
		if (!canPause.value) return Promise.reject()

		const prevLastActionDate = lastActionDate.value
		const prevState = state.value

		lastActionDate.value = Temporal.Now.instant()
		state.value = TimerState.Paused

		api.timers
			.postPause()
			.then(() => {
				lastActionDate.value = Temporal.Now.instant()
			})
			.catch(() => {
				state.value = prevState
				lastActionDate.value = prevLastActionDate
			})
	}

	const toggle = async () => {
		switch (state.value) {
			case TimerState.Created:
			case TimerState.Paused:
				return start()
			case TimerState.Running:
				return pause()
		}
	}

	return {
		state,
		durationTotal,
		durationLeft,

		lastActionDate,

		canStart,
		canPause,

		getCurrent,
		start,
		pause,
		toggle,
	}
})
