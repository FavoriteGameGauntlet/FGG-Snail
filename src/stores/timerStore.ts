import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { computed, ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { StoreName } from '../enums/storeName'
import { useTimeSync } from '../composables/useTimeSync'

const twoHours = Temporal.Duration.from({ hours: 2, minutes: 0, seconds: 0 })

export const useTimerStore = defineStore(StoreName.Timer, () => {
	// const timerLoading = useLoading()
	const state = ref<TimerState>(TimerState.Created)
	const durationTotal = ref<Temporal.Duration>(Temporal.Duration.from(twoHours))

	const lastActionDate = ref<Temporal.ZonedDateTime>()
	const endDate = computed(() =>
		state.value === TimerState.Running
			? lastActionDate.value?.add(durationTotal.value)
			: undefined,
	)
	const durationLeft = ref<Temporal.Duration>()

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
			durationLeft.value = v.remainingTime
			durationTotal.value = v.duration
			state.value = v.state
			lastActionDate.value = v.timerActionDate?.toZonedDateTime(
				Temporal.Now.timeZoneId(),
			)

			console.log({ lastAction: lastActionDate.value })
		})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()

		const prevState = state.value
		state.value = TimerState.Running

		await api.timer
			.postStart()
			.then((timerAction) => {
				durationLeft.value = Temporal.Duration.from(timerAction.remainingTime)
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
		useTimeSync((now) => {
			durationLeft.value = endDate.value?.since(now)
			console.log('sync that timer', endDate.value, durationLeft.value)
		})

		await getCurrent()
	}

	return {
		state,
		endDate,
		durationTotal,
		durationLeft,

		/** Time zone is required for calculations */
		lastActionDate,

		canStart,
		canPause,

		init,

		getCurrent,
		start,
		pause,
		toggle,
	}
})
