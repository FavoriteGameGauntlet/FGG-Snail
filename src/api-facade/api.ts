import { http } from './http'
import { type GameDto, type Game } from './models'
import {
	type PostLogIn,
	type PostSignUp,
	type GetCurrentTimer,
	type PostPauseTimer,
	type PostStartTimer,
	type PostGamesAddUnplayed,
	type GetGamesUnplayed,
	type PostGamesRoll,
	type GetCurrentGame,
	type GetGamesHistory,
} from './requests'

const convertGameDto = (game: GameDto): Game => ({
	...game,
	finishDate:
		game.finishDate !== undefined ? new Date(game.finishDate) : undefined,
	optDate: new Date(game.optDate),
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
		getCurrent: () => http.get<GetCurrentTimer>('/timers/current'),

		postStart: () => http.post<PostStartTimer>('/timers/current/start'),

		postPause: () => http.post<PostPauseTimer>('/timers/current/pause'),
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
