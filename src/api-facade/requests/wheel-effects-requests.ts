import type {
	FreePointChangeResultDto,
	PointChange,
	Points,
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
	response: RolledWheelEffectDto[]
}

export type GetAvailableWheelEffectCount = {
	response: Points
}

export type GetLastRolledWheelEffects = {
	response: RolledWheelEffectDto
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
