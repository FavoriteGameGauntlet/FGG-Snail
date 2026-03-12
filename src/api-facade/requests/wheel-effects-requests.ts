import { WheelResultDto } from '../../types/wheelResult'
import type {
	FreePointChangeResultDto,
	PointChange,
	RolledWheelEffect,
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
	response: WheelResultDto
}

export type GetAvailableWheelEffectCount = {
	response: number
}

export type GetLastRolledWheelEffects = {
	response: WheelResultDto
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
