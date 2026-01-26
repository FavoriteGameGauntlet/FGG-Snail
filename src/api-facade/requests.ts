import {
	type GameDto,
	type TimerDto,
	type UnplayedGame,
	type TimerActionDto,
} from './models'

export type PostSignUp = {
	request: {
		body: {
			name: string
			email: string
			password: string
		}
	}
}

export type PostLogIn = {
	request: {
		body: {
			name: string
			password: string
		}
	}
}

export type GetCurrentTimer = {
	response: TimerDto
}

export type PostStartTimer = {
	response: TimerActionDto
}

export type PostPauseTimer = {
	response: TimerActionDto
}

export type PostGamesAddUnplayed = {
	request: {
		body: UnplayedGame[]
	}
}

export type GetGamesUnplayed = {
	response: {
		body: UnplayedGame[]
	}
}

export type PostGamesRoll = {
	response: GameDto
}

export type GetCurrentGame = {
	response: GameDto
}

export type GetGamesHistory = {
	response: GameDto[]
}
