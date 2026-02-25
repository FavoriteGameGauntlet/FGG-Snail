import { DtoStringToDate } from '../dto'

export type Points = number

export type PointInfo = {
	availableRolls: number
	experiencePoints: Points
	freePoints: Points
	territoryHours: number
	territoryPoints: Points
}

export type PointChange = {
	changeSource?: string
	desiredChangeValue?: number
}

export type PointChangeResultDto = {
	actualChangeValue: number
	changeDate: string
	finalValue: Points
} & PointChange

export type PointChangeResult = DtoStringToDate<
	PointChangeResultDto,
	'changeDate'
>

export enum TerritoryChangeSource {
	ObtainingTerritory = 'territory-obtaining',
	LosingTerritory = 'territory-loss',
	Other = 'other',
}

export type TerritoryPointChangeResultDto = PointChangeResultDto & {
	changeSource?: TerritoryChangeSource
}

export type TerritoryPointChangeResult = DtoStringToDate<
	TerritoryPointChangeResultDto,
	'changeDate'
>

export enum FreePointChangeSource {
	OwnWheelEffect = 'own-wheel-effect',
	OtherWheelEffect = 'other-wheel-effect',
	Quest = 'quest',
	BaseTeleport = 'base-teleport',
	Sandstorm = 'sandstorm',
	Other = 'other',
}

export type FreePointChangeResultDto = PointChangeResultDto & {
	changeSource: FreePointChangeSource
}

export type FreePointChangeResult = DtoStringToDate<
	FreePointChangeResultDto,
	'changeDate'
>
