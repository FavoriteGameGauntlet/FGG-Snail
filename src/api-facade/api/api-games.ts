import { convertGameDto } from '../dto'
import { http } from '../http'
import type {
	GetGamesAllCurrent,
	GetGamesCurrent,
	GetGamesHistory,
	GetGamesWishlist,
	PostGamesRoll,
	PostGamesWishlist,
} from '../requests'

export const apiGames = {
	/** Add new entries to wishlist */
	postWishlist: ({ body, path: { login } }: PostGamesWishlist['request']) =>
		http.post<PostGamesWishlist>(`/games/${login}/wishlist`, { body }),

	getWishlist: ({ path: { login } }: GetGamesWishlist['request']) =>
		http.get<GetGamesWishlist>(`/games/${login}/wishlist`),

	getCurrent: ({ path: { login } }: GetGamesCurrent['request']) =>
		http.get(`/games/${login}/current`),

	getAllCurrent: () =>
		http.get<GetGamesAllCurrent>(`/games/all/current`).then(({ body }) =>
			body.map((entry) => ({
				...entry,
				currentGame: convertGameDto(entry.currentGame),
			})),
		),

	postRoll: () =>
		http
			.post<PostGamesRoll>('/games/current/roll')
			.then(({ body }) => convertGameDto(body)),

	postFinishCurrent: () => http.post('/games/current/finish'),
	postCancelCurrent: () => http.post('/games/current/cancel'),

	getHistory: () =>
		http
			.get<GetGamesHistory>('/games/history')
			.then(({ body: games }) => games.map(convertGameDto)),
}
