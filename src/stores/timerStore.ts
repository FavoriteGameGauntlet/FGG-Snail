import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { computed, ref, watch, watchEffect } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { useTimeSync } from '../composables/useTimeSync'
import { StoreName } from '../enums/storeName'

const defaultDuration = Temporal.Duration.from({
	hours: 2,
	minutes: 0,
	seconds: 0,
})

export const useTimerStore = defineStore(StoreName.Timer, () => {
	const state = ref(TimerState.Created)
	const durationTotal = ref(Temporal.Duration.from(defaultDuration))

	const lastActionDate = ref(Temporal.Now.instant())
	const durationLeft = ref(Temporal.Duration.from(defaultDuration))
	const dynamicDurationLeft = ref(durationLeft.value)

	let stopTimeSync: (() => void) | undefined = undefined

	const canStart = computed(
		() =>
			state.value &&
			(state.value === TimerState.Created || state.value === TimerState.Paused),
	)

	const canPause = computed(
		() => state.value && state.value === TimerState.Running,
	)

	const calcEndDate = () => {
		if (state.value === TimerState.Finished) return lastActionDate.value

		return lastActionDate.value?.add(durationLeft.value)
	}

	const endDate = ref(calcEndDate())

	const updateEndDate = () => {
		endDate.value = calcEndDate()
	}

	watch(durationLeft, () => {
		dynamicDurationLeft.value = durationLeft.value
	})

	watchEffect(() => {
		console.log({ durationLeft: durationLeft.value.toString() })
	})

	watchEffect(() => {
		console.log({ dynamicDuration: dynamicDurationLeft.value.toString() })
	})

	watchEffect(() => {
		console.log({ endDate: endDate.value.toString() })
	})

	watchEffect(() => {
		console.log({ durationTotal: durationTotal.value.toString() })
	})

	const updateDurationLeft = (now: Temporal.Instant) => {
		const newDuration =
			endDate.value?.since(now) ?? Temporal.Duration.from(defaultDuration)

		dynamicDurationLeft.value =
			newDuration.sign === 1
				? newDuration
				: Temporal.Duration.from({ seconds: 0 })
	}

	const stopUpdater = () => {
		updateDurationLeft(Temporal.Now.instant())
		stopTimeSync?.()
	}

	const startUpdater = () => {
		stopTimeSync = useTimeSync((now) => {
			updateDurationLeft(now)

			if (durationLeft.value.sign !== 1) stopUpdater?.()
		})
	}

	const getCurrent = async () => {
		return api.timers.getCurrent().then((v) => {
			durationTotal.value = v.duration
			durationLeft.value = v.remainingTime
			state.value = v.state
			lastActionDate.value = v.lastActionDate ?? Temporal.Now.instant()
			updateEndDate()

			if (state.value === TimerState.Running) {
				startUpdater()
			}
		})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()

		const prevState = state.value
		const prevLastActionDate = lastActionDate.value

		state.value = TimerState.Running
		lastActionDate.value = Temporal.Now.instant()

		updateEndDate()
		startUpdater()

		await api.timers
			.postStart()
			.then((timerAction) => {
				durationLeft.value = Temporal.Duration.from(timerAction.remainingTime)
				lastActionDate.value = Temporal.Now.instant()

				updateEndDate()
			})
			.catch(() => {
				state.value = prevState
				lastActionDate.value = prevLastActionDate
				updateEndDate()
				stopUpdater()
			})
	}

	const pause = async () => {
		if (!canPause.value) return Promise.reject()

		const prevLastActionDate = lastActionDate.value
		const prevState = state.value

		lastActionDate.value = Temporal.Now.instant()
		state.value = TimerState.Paused

		stopUpdater()
		updateEndDate()

		api.timers
			.postPause()
			.then(() => {
				updateEndDate()
				stopUpdater()
				lastActionDate.value = Temporal.Now.instant()
			})
			.catch(() => {
				state.value = prevState
				lastActionDate.value = prevLastActionDate

				updateEndDate()
				if (prevState === TimerState.Running) startUpdater()
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

	const init = async () => {
		await getCurrent()
	}

	return {
		state,
		endDate,
		durationTotal,
		durationLeft: dynamicDurationLeft,

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
