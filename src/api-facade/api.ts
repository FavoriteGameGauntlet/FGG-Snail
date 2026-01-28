/**
 * @version 0.5.0
 * Last updated: 2026.0.28
 */
import { http } from './http'
import {
	type Effect,
	type Game,
	type GameDto,
	type RolledEffect,
	type RolledEffectDto,
	type Timer,
	type TimerAction,
	type TimerActionDto,
	type TimerDto,
	type UnplayedGame,
} from './models'
import {
	type GetCurrentGame,
	type GetCurrentTimer,
	type GetEffectsAvailable,
	type GetEffectsAvailableCount,
	type GetEffectsHistory,
	type GetGamesHistory,
	type GetGamesUnplayed,
	type PostEffectRoll,
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

const convertRolledEffectDto = (effect: RolledEffectDto): RolledEffect => ({
	...effect,
	rollDate: Temporal.PlainDateTime.from(effect.rollDate),
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
			http
				.get<GetCurrentTimer>('/timers/current')
				.then(({ body }) => convertTimerDto(body)),

		postStart: (): Promise<TimerAction> =>
			http
				.post<PostStartTimer>('/timers/current/start')
				.then(({ body }) => convertTimerActionDto(body)),

		postPause: (): Promise<TimerAction> =>
			http
				.post<PostPauseTimer>('/timers/current/pause')
				.then(({ body }) => convertTimerActionDto(body)),
	},

	games: {
		postAddUnplayed: (request: PostGamesAddUnplayed['request']) =>
			http.post<PostGamesAddUnplayed>('/games/unplayed', {
				body: request.body,
			}),

		getGamesUnplayed: (): Promise<UnplayedGame[]> =>
			http.get<GetGamesUnplayed>('/games/unplayed').then(({ body }) => body),

		postRoll: (): Promise<Game> =>
			http
				.post<PostGamesRoll>('/games/roll')
				.then(({ body }) => convertGameDto(body)),

		getCurrent: (): Promise<Game> =>
			http
				.get<GetCurrentGame>('/games/current')
				.then(({ body }) => convertGameDto(body)),

		postFinishCurrent: () => http.post('/games/current/finish'),

		postCancelCurrent: () => http.post('/games/current/cancel'),

		getHistory: (): Promise<Game[]> =>
			http
				.get<GetGamesHistory>('/games/history')
				.then(({ body: games }) => games.map(convertGameDto)),
	},

	effects: {
		getHistory: (): Promise<RolledEffect[]> =>
			http
				.get<GetEffectsHistory>('/effects/history')
				.then(({ body: effects }) => effects.map(convertRolledEffectDto)),

		postRoll: (): Promise<RolledEffect> =>
			http
				.post<PostEffectRoll>('/effects/roll')
				.then(({ body: effect }) => convertRolledEffectDto(effect)),

		getAvailable: (): Promise<Effect[]> =>
			http
				.get<GetEffectsAvailable>('/effects/available')
				.then(({ body }) => body),

		getAvailableCount: (): Promise<number> =>
			http
				.get<GetEffectsAvailableCount>('/effects/available/count')
				.then(({ body }) => body),
	},
}
