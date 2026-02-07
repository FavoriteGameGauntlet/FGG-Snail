import type {
	Game,
	GameDto,
	RolledEffect,
	RolledEffectDto,
	Timer,
	TimerAction,
	TimerActionDto,
	TimerDto,
} from './models'

export type DtoStringToDate<
	Dto extends object,
	DateFields extends keyof Dto,
> = {
	[K in keyof Dto]: K extends DateFields ? Temporal.PlainDateTime : Dto[K]
}

export type DtoStringToDuration<
	Dto extends object,
	DurationFields extends keyof Dto,
> = {
	[K in keyof Dto]: K extends DurationFields ? Temporal.Duration : Dto[K]
}

export const convertGameDto = (game: GameDto): Game => ({
	...game,
	finishDate:
		game.finishDate !== undefined
			? Temporal.PlainDateTime.from(game.finishDate)
			: undefined,
	timeSpent: Temporal.Duration.from(game.timeSpent),
})

export const convertTimerDto = (timer: TimerDto): Timer => ({
	...timer,
	duration: Temporal.Duration.from(timer.duration),
	remainingTime: Temporal.Duration.from(timer.remainingTime),
	timerActionDate:
		timer.timerActionDate !== undefined
			? Temporal.PlainDateTime.from(timer.timerActionDate)
			: undefined,
})

export const convertTimerActionDto = (action: TimerActionDto): TimerAction => ({
	...action,
	remainingTime: Temporal.Duration.from(action.remainingTime),
})

export const convertRolledEffectDto = (
	effect: RolledEffectDto,
): RolledEffect => ({
	...effect,
	rollDate: Temporal.PlainDateTime.from(effect.rollDate),
})
