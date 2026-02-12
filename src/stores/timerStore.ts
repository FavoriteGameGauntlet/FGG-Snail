import { defineStore } from 'pinia'
import { Temporal } from 'temporal-polyfill'
import { computed, ref } from 'vue'
import { api } from '../api-facade/api'
import { TimerState } from '../api-facade/models'
import { useTimeSync } from '../composables/useTimeSync'
import { StoreName } from '../enums/storeName'

const twoHours = Temporal.Duration.from({ hours: 2, minutes: 0, seconds: 0 })

export const useTimerStore = defineStore(StoreName.Timer, () => {
	// const timerLoading = useLoading()
	const state = ref(TimerState.Created)
	const durationTotal = ref(Temporal.Duration.from(twoHours))

	const lastActionDate = ref(Temporal.Now.zonedDateTimeISO())
	const durationLeft = ref(Temporal.Duration.from(twoHours))

	let stopTimeSync: (() => void) | undefined = undefined

	const endDate = computed(() => {
		if (state.value === TimerState.Finished) return lastActionDate.value

		return lastActionDate.value?.add(durationLeft.value)
	})

	const canStart = computed(
		() =>
			state.value &&
			(state.value === TimerState.Created || state.value === TimerState.Paused),
	)

	const canPause = computed(
		() => state.value && state.value === TimerState.Running,
	)

	const updateDurationLeft = (now: Temporal.ZonedDateTime) => {
		const newDuration =
			endDate.value?.since(now) ?? Temporal.Duration.from(twoHours)

		durationLeft.value =
			newDuration.sign === 1
				? newDuration
				: Temporal.Duration.from({ seconds: 0 })

		// console.log('sync that timer', endDate.value, durationLeft.value)
	}

	const stopUpdater = () => {
		updateDurationLeft(Temporal.Now.zonedDateTimeISO())
		stopTimeSync?.()
	}

	const startUpdater = () => {
		stopTimeSync = useTimeSync((now) => {
			updateDurationLeft(now)

			if (durationLeft.value.sign !== 1) stopUpdater?.()
		})
	}

	const getCurrent = async () => {
		return api.timer.getCurrent().then((v) => {
			durationLeft.value = v.remainingTime
			durationTotal.value = v.duration
			state.value = v.state
			lastActionDate.value =
				v.timerActionDate?.toZonedDateTime(Temporal.Now.timeZoneId()) ??
				Temporal.Now.zonedDateTimeISO()

			if (state.value === TimerState.Running) {
				startUpdater()
			}
		})
	}

	const start = async () => {
		if (!canStart.value) return Promise.reject()

		const prevState = state.value
		state.value = TimerState.Running
		lastActionDate.value = Temporal.Now.zonedDateTimeISO()

		startUpdater()

		await api.timer
			.postStart()
			.then((timerAction) => {
				durationLeft.value = Temporal.Duration.from(timerAction.remainingTime)
				lastActionDate.value = Temporal.Now.zonedDateTimeISO()
			})
			.catch(() => {
				state.value = prevState
				stopUpdater()
			})
	}

	const pause = async () => {
		if (!canPause.value) return Promise.reject()
		lastActionDate.value = Temporal.Now.zonedDateTimeISO()
		stopUpdater()

		const prevState = state.value
		state.value = TimerState.Paused
		api.timer
			.postPause()
			.then(() => {
				lastActionDate.value = Temporal.Now.zonedDateTimeISO()
			})
			.catch(() => {
				state.value = prevState
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
