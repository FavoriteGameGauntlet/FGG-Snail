import { Temporal } from '@js-temporal/polyfill'
import { getCurrentScope, onScopeDispose } from 'vue'

/** Executes callback precisely after every second */
export const useTimeSync = (
	callback: (opts: {
		now: Temporal.Instant
		sinceStart: Temporal.Duration
	}) => void,
) => {
	const startedAt = Temporal.Now.instant()
	console.log('time sync started at', startedAt.toString())
	const startedAtMillis = startedAt.epochMilliseconds % 1000
	let stopped = false

	let timeoutId: NodeJS.Timeout | undefined = undefined

	const stop = () => {
		stopped = true
		clearTimeout(timeoutId)
	}

	function tick() {
		if (stopped) return

		const now = Temporal.Now.instant()
		callback({ now, sinceStart: now.since(startedAt) })

		timeoutId = setTimeout(
			tick,
			1000 - ((now.epochMilliseconds - startedAtMillis) % 1000),
		)
	}

	timeoutId = setTimeout(tick, 1000)

	if (getCurrentScope()) {
		onScopeDispose(() => stop())
	}

	return { stop, startedAt }
}
