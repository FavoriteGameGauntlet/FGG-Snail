import { type TimerActionType, type TimerState } from './models'

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
