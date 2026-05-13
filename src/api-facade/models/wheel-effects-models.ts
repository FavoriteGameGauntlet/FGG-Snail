import { type DtoStringToDate } from '../dto'

export type WheelEffect = {
	name: string
	description?: string
}

export type RolledWheelEffectDto = WheelEffect & {
	rollDate: string
	isApplied?: boolean
	position?: number
}

export type RolledWheelEffect = DtoStringToDate<
	RolledWheelEffectDto,
	'rollDate'
>
