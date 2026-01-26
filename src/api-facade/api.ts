import { http } from './http'
import {
	type Game,
	type GameDto,
	type Timer,
	type TimerAction,
	type TimerActionDto,
	type TimerDto,
} from './models'
import {
	type GetCurrentGame,
	type GetCurrentTimer,
	type GetGamesHistory,
	type GetGamesUnplayed,
	type PostGamesAddUnplayed,
	type PostGamesRoll,
	type PostLogIn,
	type PostPauseTimer,
	type PostSignUp,
	type PostStartTimer,
} from './requests'

const convertGameDto = (game: GameDto): Game => ({
	...game,
	finishDate:
		game.finishDate !== undefined
			? Temporal.PlainDateTime.from(game.finishDate)
			: undefined,
	timeSpent: Temporal.Duration.from(game.timeSpent),
})

const convertTimerDto = (timer: TimerDto): Timer => ({
	...timer,
	duration: Temporal.Duration.from(timer.duration),
	remainingTime: Temporal.Duration.from(timer.remainingTime),
	timerActionDate:
		timer.timerActionDate !== undefined
			? Temporal.PlainDateTime.from(timer.timerActionDate)
			: undefined,
})

const convertTimerActionDto = (action: TimerActionDto): TimerAction => ({
	...action,
	remainingTime: Temporal.Duration.from(action.remainingTime),
})

export const api = {
	auth: {
		logIn: (request: PostLogIn['request']) =>
			http.post('/auth/login', { body: request.body }),

		logOut: () => http.post('/auth/logout'),

		signUp: (request: PostSignUp['request']) =>
			http.post('/auth/signup', { body: request.body }),
	},

	timer: {
		getCurrent: (): Promise<Timer> =>
			http.get<GetCurrentTimer>('/timers/current').then(convertTimerDto),

		postStart: (): Promise<TimerAction> =>
			http
				.post<PostStartTimer>('/timers/current/start')
				.then(convertTimerActionDto),

		postPause: (): Promise<TimerAction> =>
			http
				.post<PostPauseTimer>('/timers/current/pause')
				.then(convertTimerActionDto),
	},

	games: {
		postAddUnplayed: (request: PostGamesAddUnplayed['request']) =>
			http.post<PostGamesAddUnplayed>('/games/unplayed', {
				body: request.body,
			}),

		getGamesUnplayed: () => http.get<GetGamesUnplayed>('/games/unplayed'),

		postRoll: (): Promise<Game> =>
			http.post<PostGamesRoll>('/games/roll').then(convertGameDto),

		getCurrent: (): Promise<Game> =>
			http.get<GetCurrentGame>('/games/current').then(convertGameDto),

		postFinishCurrent: () => http.post('/games/current/finish'),

		postCancelCurrent: () => http.post('/games/current/cancel'),

		getHistory: (): Promise<Game[]> =>
			http
				.get<GetGamesHistory>('/games/history')
				.then((games) => games.map(convertGameDto)),
	},
}
