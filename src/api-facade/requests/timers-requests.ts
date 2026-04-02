import type { TimerDto } from '../models/timers-models'

export type GetCurrentTimer = {
	response: TimerDto
}

export type PostStartTimer = {
	response: TimerDto
}

export type PostPauseTimer = {
	response: TimerDto
}
