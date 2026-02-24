import {
	type CurrentGameDto,
	type WishlistedGame,
	type RolledWheelEffectDto,
	type WheelEffect,
} from '../models'

export type { PostLogIn, PostSignUp } from './auth-requests'

export type {
	GetCurrentTimer,
	PostPauseTimer,
	PostStartTimer,
} from './timers-requests'

export type PostGamesWishlist = {
	request: {
		path: {
			login: string
		}
		body: WishlistedGame[]
	}
}

export type GetGamesWishlist = {
	request: {
		path: {
			login: string
		}
	}
	response: WishlistedGame[]
}

export type PostGamesRoll = {
	response: CurrentGameDto
}

export type GetCurrentGame = {
	response: CurrentGameDto
}

export type GetGamesHistory = {
	response: CurrentGameDto[]
}

export type GetEffectsHistory = {
	response: RolledWheelEffectDto[]
}

export type PostEffectRoll = {
	response: RolledWheelEffectDto
}

export type GetEffectsAvailable = {
	response: WheelEffect[]
}

export type GetEffectsAvailableCount = {
	response: number
}
