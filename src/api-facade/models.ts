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

export type Effect = Omit<EffectDto, 'createDate' | 'rollDate'> & {
	createDate: string
	rollDate?: string
}

export type Effects = Effect[]

export enum ExceptionCode {
	UserNotFound = 'USER_NOT_FOUND',
	GameNotFound = 'GAME_NOT_FOUND',
	TimerNotFound = 'TIMER_NOT_FOUND',
	NoAvailableRolls = 'NO_AVAILABLE_ROLLS',
	UserAlreadyExists = 'USER_ALREADY_EXISTS',
	TimerIncorrectState = 'TIMER_INCORRECT_STATE',
	Unexpected = 'UNEXPECTED',
	CheckUser = 'CHECK_USER',
	CheckCurrentGame = 'CHECK_CURRENT_GAME',
	CheckCurrentTimer = 'CHECK_CURRENT_TIMER',
	GetUser = 'GET_USER',
	GetUnplayedGames = 'GET_UNPLAYED_GAMES',
	GetCurrentGame = 'GET_CURRENT_GAME',
	GetCurrentTimer = 'GET_CURRENT_TIMER',
	CreateUser = 'CREATE_USER',
	AddUnplayedGames = 'ADD_UNPLAYED_GAMES',
	StartCurrentTimer = 'START_CURRENT_TIMER',
	PauseCurrentTimer = 'PAUSE_CURRENT_TIMER',
	FinishCurrentGame = 'FINISH_CURRENT_GAME',
	GetGameHistory = 'GET_GAME_HISTORY',
	CurrentGameAlreadyExists = 'CURRENT_GAME_ALREADY_EXISTS',
	MakeGameRoll = 'MAKE_GAME_ROLL',
	CancelCurrentGame = 'CANCEL_CURRENT_GAME',
	GetEffectHistory = 'GET_EFFECT_HISTORY',
	CheckEffectRoll = 'CHECK_EFFECT_ROLL',
}

export type Exception = {
	code: ExceptionCode
	message: string
}
