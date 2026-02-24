import { http } from '../http'
import type { PostLogIn, PostSignUp } from '../requests'

export const apiAuth = {
	logIn: (request: PostLogIn['request']) =>
		http.post('/auth/login', { body: request.body }),

	logOut: () => http.post('/auth/logout'),

	signUp: (request: PostSignUp['request']) =>
		http.post('/auth/signup', { body: request.body }),
}
