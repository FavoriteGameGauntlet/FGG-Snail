/**
 * @version 0.10.0
 * Last updated: 2026.02.25
 * State: only Points group is incomplete. Requires a rewrite.
 */
import { apiAuth } from './api/api-auth'
import { apiGames } from './api/api-games'
// import { apiPoints } from './api/api-points'
import { apiTimers } from './api/api-timers'
import { apiUsers } from './api/api-users'
import { apiWheelEffects } from './api/api-wheel-effects'

export const api = {
	auth: apiAuth,
	games: apiGames,
	// points: apiPoints,
	timers: apiTimers,
	users: apiUsers,
	wheelEffects: apiWheelEffects,
}
