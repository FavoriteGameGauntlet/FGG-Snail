import {
	type GameDto,
	type TimerActionType,
	type TimerState,
	type UnplayedGame,
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
	response: {
		durationInS: number
		remainingTimeInS: number
		state: TimerState
		timerActionDate: string
	}
}

export type PostStartTimer = {
	response: {
		remainingTimeInS: number
		type: TimerActionType
	}
}

export type PostPauseTimer = {
	response: {
		remainingTimeInS: number
		type: TimerActionType
	}
}

export type PostGamesAddUnplayed = {
	request: {
		body: UnplayedGame[]
	}
}

export type GetGamesUnplayed = {
	response: UnplayedGame[]
}

export type PostGamesRoll = {
	response: GameDto
}

export type GetCurrentGame = {
	response: GameDto
}

// export type PostGamesFinishCurrent = {}
// export type PostGamesCancelCurrent = {}

export type GetGamesHistory = {
	response: GameDto[]
}
