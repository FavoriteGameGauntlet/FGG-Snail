import type { Login } from '../models'

export type GetAllLogins = {
	response: Login[]
}

export type PostDisplayName = {
	request: { body: string }
}

export type GetDisplayName = {
	response: string
}
