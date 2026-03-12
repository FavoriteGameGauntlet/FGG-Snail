export type { PostLogIn, PostSignUp } from './auth-requests'

export type {
	GetCurrentTimer,
	PostPauseTimer,
	PostStartTimer,
} from './timers-requests'

export type {
	GetGamesAllCurrent,
	GetGamesCurrent,
	GetGamesHistory,
	GetGamesWishlist,
	PostGamesRoll,
	PostGamesWishlist,
} from './games-requests'

export type {
	GetAllLogins,
	GetDisplayName,
	PostDisplayName,
} from './users-requests'

export type {
	GetAvailableWheelEffectCount,
	GetWheelEffectsAvailable,
	GetWheelEffectsHistory,
	PostApplyWheelEffectRoll,
	PostRollWheelEffect,
	GetLastRolledWheelEffects,
} from './wheel-effects-requests'
