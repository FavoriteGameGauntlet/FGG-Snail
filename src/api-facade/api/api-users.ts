import { http } from '../http'
import type {
	GetAllUserNames,
	GetDisplayName,
	PostDisplayName,
} from '../requests'

export const apiUsers = {
	getAllNames: () =>
		http.get<GetAllUserNames>('/users/all/names').then(({ body }) => body),

	postDisplayName: ({ body }: PostDisplayName['request']) =>
		http.post('/users/display-name', { body }),

	getDisplayName: () => http.get<GetDisplayName>('/users/display-name'),
}
