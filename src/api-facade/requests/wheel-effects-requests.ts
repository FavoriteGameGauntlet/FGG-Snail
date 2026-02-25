import type {
	FreePointChangeResultDto,
	PointChange,
	RolledWheelEffectDto,
	WheelEffect,
} from '../models'

export type GetWheelEffectsHistory = {
	request: {
		path: {
			login: string
		}
	}
	response: RolledWheelEffectDto[]
}

export type GetWheelEffectsAvailable = {
	response: WheelEffect[]
}

export type PostRollWheelEffect = {
	response: RolledWheelEffectDto
}

export type GetAvailableWheelEffectCount = {
	response: number
}

export type PostApplyWheelEffectRoll = {
	request: {
		body: {
			login: string
			pointChange: PointChange
		}[]
	}
	response: {
		login: string
		changeResult: FreePointChangeResultDto
	}[]
}
