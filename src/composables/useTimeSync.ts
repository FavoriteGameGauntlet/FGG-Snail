import { onScopeDispose } from 'vue'

/** Executes callback precisely after every second */
export const useTimeSync = (
	callback: (time: Temporal.ZonedDateTime) => void,
) => {
	const now = Temporal.Now.instant()

	let timeoutId: NodeJS.Timeout | null = null

	function tick() {
		const now = Temporal.Now
		callback(now.zonedDateTimeISO())

		timeoutId = setTimeout(tick, 1000 - now.instant().epochMilliseconds)
	}

	timeoutId = setTimeout(tick, 1000 - now.epochMilliseconds)

	onScopeDispose(() => timeoutId && clearTimeout(timeoutId))
}
