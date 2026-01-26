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
	/** format: duration */
	timeSpent: string
	finishDate?: string
}

type DtoStringToDate<Dto extends object, DateFields extends keyof Dto> = {
	[K in keyof Dto]: K extends DateFields ? Temporal.PlainDateTime : Dto[K]
}

type DtoStringToDuration<
	Dto extends object,
	DurationFields extends keyof Dto,
> = {
	[K in keyof Dto]: K extends DurationFields ? Temporal.Duration : Dto[K]
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
	remainingTime: string
}

export type TimerAction = DtoStringToDuration<TimerActionDto, 'remainingTime'>

export type EffectDto = {
	createDate: string
	description?: string
	gameName?: string
	name?: string
	rollDate?: string
}

export type EffectsDto = EffectDto[]

export type Effect = DtoStringToDate<EffectDto, 'createDate' | 'rollDate'>

export type Effects = Effect[]

export type ApiError = {
	code: string
	message: string
}
