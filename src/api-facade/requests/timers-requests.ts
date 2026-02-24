import { TimerDto } from '../models'

export type GetCurrentTimer = {
	response: TimerDto
}

export type PostStartTimer = {
	response: TimerDto
}

export type PostPauseTimer = {
	response: TimerDto
}
