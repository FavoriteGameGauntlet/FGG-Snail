import type { UserName } from '../models'

export type GetAllUserNames = {
	response: UserName[]
}

export type PostDisplayName = {
	request: { body: string }
}

export type GetDisplayName = {
	response: string
}
