/**
 * @version 0.11.0
 * Last updated: 2026.03.08
 * State: only Points group is incomplete. Probably requires a rewrite.
 */
import { apiAuth } from './api/apiAuth'
import { apiGames } from './api/apiGames'
// import { apiPoints } from './api/apiPoints'
import { apiTimers } from './api/apiTimers'
import { apiUsers } from './api/apiUsers'
import { apiWheelEffects } from './api/apiWheelEffects'

export const api = {
	auth: apiAuth,
	games: apiGames,
	// points: apiPoints,
	timers: apiTimers,
	users: apiUsers,
	wheelEffects: apiWheelEffects,
}
