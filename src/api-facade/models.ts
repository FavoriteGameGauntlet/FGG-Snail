import type { DtoStringToDate, DtoStringToDuration } from './dto-mappers'

export type User = {
	id: string
	name: string
}

export type UnplayedGame = {
	name: string
}

export type UnplayedGames = UnplayedGame[]

export enum GameState {
	Started = 'started',
	Finished = 'finished',
	Canceled = 'canceled',
}

export type GameDto = {
	name: string
	state: GameState
	/** format: Duration */
	timeSpent: string
	finishDate?: string
}

export type Game = DtoStringToDuration<
	DtoStringToDate<GameDto, 'finishDate'>,
	'timeSpent'
>

export enum TimerState {
	Created = 'created',
	Running = 'running',
	Paused = 'paused',
	Finished = 'finished',
}

export type TimerDto = {
	/** format: Duration */
	duration: string
	/** format: Duration */
	remainingTime: string
	state: TimerState
	timerActionDate?: string
}

export type Timer = DtoStringToDate<
	DtoStringToDuration<TimerDto, 'duration' | 'remainingTime'>,
	'timerActionDate'
>

export enum TimerActionType {
	Start = 'start',
	Pause = 'pause',
	Stop = 'stop',
}

export type TimerActionDto = {
	action: TimerActionType
	/** format: Duration */
	remainingTime: string
}

export type TimerAction = DtoStringToDuration<TimerActionDto, 'remainingTime'>

export type Effect = {
	name: string
	description?: string
}

export type RolledEffectDto = Effect & {
	rollDate: string
}

export type RolledEffect = DtoStringToDate<RolledEffectDto, 'rollDate'>

export type ApiError = {
	code: string
	message: string
}
