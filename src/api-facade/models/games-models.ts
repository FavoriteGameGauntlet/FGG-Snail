import { DtoStringToDate, DtoStringToDuration } from '../dto'

export type WishlistedGame = {
	name: string
}

export enum GameState {
	Started = 'started',
	Finished = 'finished',
	Canceled = 'canceled',
}

export type CurrentGameDto = {
	name: string
	state: GameState
	/** format: Duration */
	timeSpent: string
	finishDate?: string
}

export type CurrentGame = DtoStringToDuration<
	DtoStringToDate<CurrentGameDto, 'finishDate'>,
	'timeSpent'
>
