import { Temporal } from '@js-temporal/polyfill'
import { computed, ref } from 'vue'
import { useTimeSync } from './useTimeSync'

export const useTimer = (mode: 'add' | 'subtract' = 'add') => {
	const elapsed = ref(Temporal.Duration.from({ seconds: 0 }))
	let baseElapsed = Temporal.Duration.from({ seconds: 0 })
	let startedAt: Temporal.Instant | null = null
	const stopTimeSync = ref<(() => void) | null>(null)

	const updateElapsed = (time: Temporal.Instant = Temporal.Now.instant()) => {
		elapsed.value = baseElapsed[mode](time.since(startedAt!)).round({
			largestUnit: 'hour',
			roundingMode: 'trunc',
		})
	}

	const stop = () => {
		if (!stopTimeSync.value) return

		stopTimeSync.value()
		stopTimeSync.value = null
		baseElapsed = elapsed.value
		startedAt = null
	}

	const start = () => {
		if (stopTimeSync.value) return
		;({ stop: stopTimeSync.value, startedAt } = useTimeSync(({ now }) =>
			updateElapsed(now),
		))

		updateElapsed()
	}

	const set = (newElapsed: Temporal.Duration) => {
		const now = Temporal.Now.instant()

		baseElapsed = Temporal.Duration.from(newElapsed)
		startedAt = now

		updateElapsed(now)
	}

	return {
		elapsed: computed({ get: () => elapsed.value, set }),
		isRunning: computed(() => Boolean(stopTimeSync.value)),
		start,
		stop,
		// set,
	}
}
