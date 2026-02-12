import { onScopeDispose } from 'vue'

/** Executes callback precisely after every second */
export const useTimeSync = (
	callback: (time: Temporal.ZonedDateTime) => void,
) => {
	const now = Temporal.Now.instant()

	let timeoutId: NodeJS.Timeout | undefined = undefined

	function stop() {
		clearTimeout(timeoutId)
	}

	function tick() {
		const now = Temporal.Now
		callback(now.zonedDateTimeISO())

		timeoutId = setTimeout(
			tick,
			1000 - (now.instant().epochMilliseconds % 1000),
		)
	}

	timeoutId = setTimeout(tick, 1000 - (now.epochMilliseconds % 1000))

	console.log(`timer ${timeoutId} started`)

	onScopeDispose(() => {
		console.log(`timer ${timeoutId} cleared`)

		return stop()
	})

	return stop
}
