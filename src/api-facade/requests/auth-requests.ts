export type PostSignUp = {
	request: {
		body: {
			login: string
			email: string
			password: string
		}
	}
}

export type PostLogIn = {
	request: {
		body: {
			login: string
			password: string
		}
	}
}
