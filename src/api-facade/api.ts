/**
 * @version 0.9.0
 * Last updated: 2026.02.24
 * State:
 * - Models: complete
 * - DTO: complete
 * - Requests: x
 * - API: x
 */
import { apiAuth } from './api/api-auth'
import { apiGames } from './api/api-games'
import { apiPoints } from './api/api-points'
import { apiTimers } from './api/api-timers'
import { apiUsers } from './api/api-users'
import { apiWheelEffects } from './api/api-wheel-effects'

export const api = {
	auth: apiAuth,
	games: apiGames,
	points: apiPoints,
	timers: apiTimers,
	users: apiUsers,
	wheelEffects: apiWheelEffects,

	// games: {
	// 	postAddUnplayed: ({
	// 		body,
	// 		path: { login },
	// 	}: PostGamesWishlist['request']) =>
	// 		http.post<PostGamesWishlist>(`/games/${login}/wishlist`, { body }),

	// 	getUnplayed: ({
	// 		path: { login },
	// 	}: GetGamesWishlist['request']): Promise<WishlistedGame[]> =>
	// 		http
	// 			.get<GetGamesWishlist>(`/games/${login}/wishlist`)
	// 			.then(({ body }) => body),

	// 	postRoll: (): Promise<CurrentGame> =>
	// 		http
	// 			.post<PostGamesRoll>('/games/roll')
	// 			.then(({ body }) => convertGameDto(body)),

	// 	getCurrent: (): Promise<CurrentGame> =>
	// 		http
	// 			.get<GetCurrentGame>('/games/current')
	// 			.then(({ body }) => convertGameDto(body)),

	// 	postFinishCurrent: () => http.post('/games/current/finish'),

	// 	postCancelCurrent: () => http.post('/games/current/cancel'),

	// 	getHistory: (): Promise<CurrentGame[]> =>
	// 		http
	// 			.get<GetGamesHistory>('/games/history')
	// 			.then(({ body: games }) => games.map(convertGameDto)),
	// },

	// timer: {
	// 	getCurrent: (): Promise<Timer> =>
	// 		http
	// 			.get<GetCurrentTimer>('/timers/current')
	// 			.then(({ body }) => convertTimerDto(body)),

	// 	postStart: (): Promise<TimerAction> =>
	// 		http
	// 			.post<PostStartTimer>('/timers/current/start')
	// 			.then(({ body }) => convertTimerActionDto(body)),

	// 	postPause: (): Promise<TimerAction> =>
	// 		http
	// 			.post<PostPauseTimer>('/timers/current/pause')
	// 			.then(({ body }) => convertTimerActionDto(body)),
	// },

	// effects: {
	// 	getHistory: (): Promise<RolledEffect[]> =>
	// 		http
	// 			.get<GetEffectsHistory>('/effects/history')
	// 			.then(({ body: effects }) => effects.map(convertRolledEffectDto)),

	// 	postRoll: (): Promise<RolledEffect> =>
	// 		http
	// 			.post<PostEffectRoll>('/effects/roll')
	// 			.then(({ body: effect }) => convertRolledEffectDto(effect)),

	// 	getAvailable: (): Promise<Effect[]> =>
	// 		http
	// 			.get<GetEffectsAvailable>('/effects/available')
	// 			.then(({ body }) => body),

	// 	getAvailableCount: (): Promise<number> =>
	// 		http
	// 			.get<GetEffectsAvailableCount>('/effects/available/count')
	// 			.then(({ body }) => body),
	// },
}
