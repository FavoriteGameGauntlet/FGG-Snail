import { WheelEffect } from '../../../api-facade/models'

/** just mock effects as a stub before normal ones load */
export const funnyEffects: WheelEffect[] = [
	'Смешной эффект 1',
	'Смешной эффект 2',
	'Смешной эффект 3',
	'Смешной эффект 4',
	'Смешной эффект 5',
	'Смешной эффект 6',
	'Смешной эффект 7',
	'Смешной эффект 8',
	'Смешной эффект 9',
	'Смешной эффект 10',
].map((name) => ({ name }))
