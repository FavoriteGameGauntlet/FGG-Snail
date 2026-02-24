import type {
	CurrentGame,
	CurrentGameDto,
	RolledWheelEffect,
	RolledWheelEffectDto,
	Timer,
	TimerDto,
	PointChangeResult,
	PointChangeResultDto,
	TerritoryPointChangeResultDto,
	TerritoryPointChangeResult,
	FreePointChangeResultDto,
	FreePointChangeResult,
} from './models'

export type DtoStringToDate<
	Dto extends object,
	DateFields extends keyof Dto,
> = {
	[K in keyof Dto]: K extends DateFields ? Temporal.Instant : Dto[K]
}

export type DtoStringToDuration<
	Dto extends object,
	DurationFields extends keyof Dto,
> = {
	[K in keyof Dto]: K extends DurationFields ? Temporal.Duration : Dto[K]
}

export const convertGameDto = (game: CurrentGameDto): CurrentGame => ({
	...game,
	finishDate:
		game.finishDate !== undefined
			? Temporal.Instant.from(game.finishDate)
			: undefined,
	timeSpent: Temporal.Duration.from(game.timeSpent),
})

export const convertTimerDto = (timer: TimerDto): Timer => ({
	...timer,
	duration: Temporal.Duration.from(timer.duration),
	remainingTime: Temporal.Duration.from(timer.remainingTime),
	lastActionDate:
		timer.lastActionDate !== undefined
			? Temporal.Instant.from(timer.lastActionDate)
			: undefined,
})

export const convertRolledWheelEffectDto = (
	effect: RolledWheelEffectDto,
): RolledWheelEffect => ({
	...effect,
	rollDate: Temporal.Instant.from(effect.rollDate),
})

const _convertPointChangeResult = <T extends PointChangeResultDto>(result: T) =>
	({
		...result,
		changeDate: Temporal.Instant.from(result.changeDate),
	}) satisfies PointChangeResult

export const convertPointChangeResult: (
	result: PointChangeResultDto,
) => PointChangeResult = _convertPointChangeResult<PointChangeResultDto>

export const convertTerritoryPointChangeResult: (
	result: TerritoryPointChangeResultDto,
) => TerritoryPointChangeResult =
	_convertPointChangeResult<TerritoryPointChangeResultDto>

export const convertFreePointChangeResult: (
	result: FreePointChangeResultDto,
) => FreePointChangeResult = _convertPointChangeResult<FreePointChangeResultDto>
