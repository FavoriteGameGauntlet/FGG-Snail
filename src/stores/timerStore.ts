import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { computed, ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { StoreName } from '../enums/storeName'
import { LoadingState, useLoading } from '../composables/useLoading'

const twoHours = Temporal.Duration.from({ hours: 2 })

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const timer = ref<Temporal.Duration>(Temporal.Duration.from(twoHours))
	const timerLoading = useLoading()
	const state = ref<TimerState>(TimerState.Created)
	const totalDuration = ref<Temporal.Duration>(Temporal.Duration.from(twoHours))

	const canStart = computed(
		() =>
			state.value &&
			(state.value === TimerState.Created || state.value === TimerState.Paused),
	)

	const canPause = computed(
		() => state.value && state.value === TimerState.Running,
	)

	const getCurrent = async () => {
		return api.timer.getCurrent().then((v) => {
			timer.value = v.remainingTime
			totalDuration.value = v.duration
			state.value = v.state
		})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()

		const prevState = state.value
		state.value = TimerState.Running

		await api.timer
			.postStart()
			.then((timerAction) => {
				timer.value = Temporal.Duration.from(timerAction.remainingTime)
			})
			.catch(() => {
				state.value = prevState
			})
	}

	const pause = async () => {
		if (!canPause.value) return Promise.reject()

		state.value = TimerState.Paused
		api.timer.postPause().then(() => {})
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

	const init = async () => {
		await getCurrent()
	}

	return {
		timer,
		state,
		totalDuration,

		canStart,
		canPause,

		init,

		getCurrent,
		start,
		pause,
		toggle,
	}
})
