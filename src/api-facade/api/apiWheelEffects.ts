import {
	convertFreePointChangeResult,
	convertRolledWheelEffectDto,
} from '../dto'
import { http } from '../http'
import type {
	GetAvailableWheelEffectCount,
	GetWheelEffectsAvailable,
	GetWheelEffectsHistory,
	PostApplyWheelEffectRoll,
	PostRollWheelEffect,
} from '../requests'
import { GetLastRolledWheelEffects } from '../requests/wheel-effects-requests'

export const apiWheelEffects = {
	getHistory: ({ path: { login } }: GetWheelEffectsHistory['request']) =>
		http
			.get<GetWheelEffectsHistory>(`/wheel-effects/${login}/history`)
			.then(({ body: effects }) => effects.map(convertRolledWheelEffectDto)),

	getAvailableWheelEffects: () =>
		http
			.get<GetWheelEffectsAvailable>('/wheel-effects/available/roll/count')
			.then(({ body }) => body),

	postRoll: () =>
		http
			.post<PostRollWheelEffect>('/wheel-effects/available/roll')
			.then(({ body: effect }) => effect.map(convertRolledWheelEffectDto)),

	getAvailableCount: () =>
		http
			.get<GetAvailableWheelEffectCount>('/wheel-effects/available/roll/count')
			.then(({ body }) => body),

	getLastRolled: () =>
		http
			.get<GetLastRolledWheelEffects>('/wheel-effects/available/roll/last')
			.then(({ body }) => convertRolledWheelEffectDto(body)),

	postApplyRoll: ({ body }: PostApplyWheelEffectRoll['request']) =>
		http
			.post<PostApplyWheelEffectRoll>('/wheel-effects/available/roll/apply', {
				body,
			})
			.then(({ body: results }) =>
				results.map((result) => ({
					...result,
					changeResult: convertFreePointChangeResult(result.changeResult),
				})),
			),
}
