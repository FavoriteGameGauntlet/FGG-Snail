import type { CurrentGameDto, WishlistedGame } from '../models'

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

export type GetGamesCurrent = {
	request: {
		path: {
			login: string
		}
	}
	response: CurrentGameDto
}

export type GetGamesAllCurrent = {
	response: {
		login: string
		currentGame: CurrentGameDto
	}[]
}

export type PostGamesRoll = {
	response: CurrentGameDto
}

export type GetGamesHistory = {
	request: {
		path: {
			login: string
		}
	}
	response: CurrentGameDto[]
}
