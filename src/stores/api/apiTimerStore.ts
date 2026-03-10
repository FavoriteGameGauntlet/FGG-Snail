import { Temporal } from '@js-temporal/polyfill'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../../api-facade/api'
import { TimerState } from '../../api-facade/models'
import { StoreName } from '../../enums/storeName'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { HttpErrorResponse } from '../../api-facade/http'

const DEFAULT_DURATION = Temporal.Duration.from({
	hours: 2,
	minutes: 0,
	seconds: 0,
})

export const useApiTimerStore = defineStore(StoreName.ApiTimer, () => {
	const state = ref(TimerState.Created)
	const durationTotal = ref(Temporal.Duration.from(DEFAULT_DURATION))

	const currentLoading = useLoading()
	const actionLoading = useLoading()

	const lastActionDate = ref<Temporal.Instant | null>(null)
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
		if (currentLoading.state.value === LoadingState.LOADING) return

		currentLoading.state.value = LoadingState.LOADING

		await api.timers
			.getCurrent()
			.then((timer) => {
				durationTotal.value = timer.duration
				durationLeft.value = timer.remainingTime
				state.value = timer.state
				lastActionDate.value = timer.lastActionDate ?? Temporal.Now.instant()

				currentLoading.state.value = LoadingState.LOADED
			})
			.catch((e) => {
				currentLoading.state.value = LoadingState.ERROR

				throw e
			})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()
		if (actionLoading.state.value === LoadingState.LOADING) return

		actionLoading.state.value = LoadingState.LOADING

		const prevState = state.value
		const prevLastActionDate = lastActionDate.value

		state.value = TimerState.Running
		lastActionDate.value = Temporal.Now.instant()

		await api.timers
			.postStart()
			.then((timer) => {
				actionLoading.state.value = LoadingState.LOADED

				durationLeft.value = timer.remainingTime
				durationTotal.value = timer.duration
				lastActionDate.value = timer.lastActionDate ?? null
			})
			.catch(() => {
				actionLoading.state.value = LoadingState.ERROR

				state.value = prevState
				lastActionDate.value = prevLastActionDate
			})
	}

	const pause = async () => {
		if (!canPause.value) return Promise.reject()
		if (actionLoading.state.value === LoadingState.LOADING) return

		actionLoading.state.value = LoadingState.LOADING

		const prevLastActionDate = lastActionDate.value
		const prevState = state.value

		lastActionDate.value = Temporal.Now.instant()
		state.value = TimerState.Paused

		await api.timers
			.postPause()
			.then((timer) => {
				actionLoading.state.value = LoadingState.LOADED

				lastActionDate.value = timer.lastActionDate ?? null
				durationLeft.value = timer.remainingTime
				durationTotal.value = timer.duration
			})
			.catch((error: HttpErrorResponse) => {
				if (error.status) actionLoading.state.value = LoadingState.ERROR
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

		currentLoading,
		actionLoading,

		lastActionDate,

		canStart,
		canPause,

		getCurrent,
		start,
		pause,
		toggle,
	}
})
