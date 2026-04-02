import { convertTimerDto } from '../dto'
import { http } from '../http'
import type { Timer } from '../models/timers-models'
import type {
	GetCurrentTimer,
	PostPauseTimer,
	PostStartTimer,
} from '../requests/timers-requests'

export const apiTimers = {
	getCurrent: (): Promise<Timer> =>
		http
			.get<GetCurrentTimer>('/timers/current')
			.then(({ body }) => convertTimerDto(body)),

	postStart: (): Promise<Timer> =>
		http
			.post<PostStartTimer>('/timers/current/start')
			.then(({ body }) => convertTimerDto(body)),

	postPause: (): Promise<Timer> =>
		http
			.post<PostPauseTimer>('/timers/current/pause')
			.then(({ body }) => convertTimerDto(body)),
}
