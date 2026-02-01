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

export const convertGameDto = (game: GameDto): Game => {
	const isInvalidFormat = game.timeSpent && !game.timeSpent?.startsWith('PT')
	const prefix = isInvalidFormat ? 'PT' : ''

	if (!isInvalidFormat) {
		console.warn(
			'API started sending valid Duration format. Remove the custom logic',
		)
	}

	return {
		...game,
		finishDate:
			game.finishDate !== undefined
				? Temporal.PlainDateTime.from(game.finishDate)
				: undefined,
		timeSpent: Temporal.Duration.from(prefix + game.timeSpent),
	}
}

export const convertTimerDto = (timer: TimerDto): Timer => {
	const isInvalidFormat =
		timer.remainingTime && !timer.remainingTime?.startsWith('PT')
	const prefix = isInvalidFormat ? 'PT' : ''

	if (!isInvalidFormat) {
		console.warn(
			'API started sending valid Duration format. Remove the custom logic',
		)
	}

	return {
		...timer,
		duration: Temporal.Duration.from(prefix + timer.duration),
		remainingTime: Temporal.Duration.from(prefix + timer.remainingTime),
		timerActionDate:
			timer.timerActionDate !== undefined
				? Temporal.PlainDateTime.from(timer.timerActionDate)
				: undefined,
	}
}

export const convertTimerActionDto = (action: TimerActionDto): TimerAction => {
	const isInvalidFormat =
		action.remainingTime && !action.remainingTime?.startsWith('PT')
	const prefix = isInvalidFormat ? 'PT' : ''

	if (!isInvalidFormat) {
		console.warn(
			'API started sending valid Duration format. Remove the custom logic',
		)
	}

	return {
		...action,
		remainingTime: Temporal.Duration.from(prefix + action.remainingTime),
	}
}

export const convertRolledEffectDto = (
	effect: RolledEffectDto,
): RolledEffect => ({
	...effect,
	rollDate: Temporal.PlainDateTime.from(effect.rollDate),
})
