import { getCurrentScope, onScopeDispose } from 'vue'

/** Executes callback precisely after every second */
export const useTimeSync = (callback: (time: Temporal.Instant) => void) => {
	const now = Temporal.Now.instant()
	let stopped = false

	let timeoutId: NodeJS.Timeout | undefined = undefined

	const stop = () => {
		stopped = true
		clearTimeout(timeoutId)
	}

	function tick() {
		if (stopped) return

		const now = Temporal.Now.instant()
		callback(now)

		timeoutId = setTimeout(tick, 1000 - (now.epochMilliseconds % 1000))
	}

	timeoutId = setTimeout(tick, 1000 - (now.epochMilliseconds % 1000))

	if (getCurrentScope()) {
		onScopeDispose(() => stop())
	}

	return stop
}
