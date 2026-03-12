import { WheelResult } from '../../types/wheelResult'
import {
	convertFreePointChangeResult,
	convertRolledWheelEffectDto,
} from '../dto'
import { http } from '../http'
import type {
	GetAvailableWheelEffectCount,
	GetLastRolledWheelEffects,
	GetWheelEffectsAvailable,
	GetWheelEffectsHistory,
	PostApplyWheelEffectRoll,
	PostRollWheelEffect,
} from '../requests'

export const apiWheelEffects = {
	getHistory: ({ path: { login } }: GetWheelEffectsHistory['request']) =>
		http
			.get<GetWheelEffectsHistory>(`/wheel-effects/${login}/history`)
			.then(({ body: effects }) => effects.map(convertRolledWheelEffectDto)),

	getAvailable: () =>
		http
			.get<GetWheelEffectsAvailable>('/wheel-effects/available')
			.then(({ body }) => body),

	postRoll: (): Promise<WheelResult> =>
		http
			.post<PostRollWheelEffect>('/wheel-effects/available/roll')
			.then(
				({ body: effect }) =>
					effect.map(convertRolledWheelEffectDto) as WheelResult,
			),

	getAvailableCount: () =>
		http
			.get<GetAvailableWheelEffectCount>('/wheel-effects/available/roll/count')
			.then(({ body }) => body),

	getLastRolled: (): Promise<WheelResult> =>
		http
			.get<GetLastRolledWheelEffects>('/wheel-effects/available/roll/last')
			.then(
				({ body: effects }) =>
					effects.map(convertRolledWheelEffectDto) as WheelResult,
			),

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
