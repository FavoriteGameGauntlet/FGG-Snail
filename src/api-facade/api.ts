import { http } from './http'
import {
	type PostLogIn,
	type PostSignUp,
	type GetCurrentTimer,
	type PostPauseTimer,
	type PostStartTimer,
} from './requests'

export const api = {
	logIn: (request: PostLogIn['request']) =>
		http.post('/auth/login', { body: request.body }),

	logoUt: () => http.post('/auth/logout'),

	signUp: (request: PostSignUp['request']) =>
		http.post('/auth/signup', { body: request.body }),

	getCurrentTimer: () => http.get<GetCurrentTimer>('/timers/current'),

	postStartTimer: () => http.post<PostStartTimer>('/timers/current/start'),

	postPauseTimer: () => http.post<PostPauseTimer>('/timers/current/pause'),
}
