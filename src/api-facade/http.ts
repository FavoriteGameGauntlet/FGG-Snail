import { API_URL } from '../constants/apiUrl'
import { type ClientOptions, fetch } from '@tauri-apps/plugin-http'
import { router } from '../router/router'

export interface HttpErrorResponse {
	status: number
	statusText: string
	body: string
	url: string
	method: string
}

const makeRequest = async (url: string, opts?: RequestInit & ClientOptions) => {
	const fullUrl = API_URL + url
	const method = opts?.method || 'GET'

	console.log(`[HTTP] ${method} ${fullUrl}`, {
		body: opts?.body,
		headers: {
			'Content-Type': 'application/json',
			...opts?.headers,
		},
	})

	try {
		const response = await fetch(fullUrl, {
			...opts,
			headers: {
				'Content-Type': 'application/json',
				...opts?.headers,
			},
		})
		const responseBody: object | undefined = await response
			.text()
			.then((body) => (body.length ? JSON.parse(body) : undefined))
			.catch((er) => console.log('whatafuk mazafaka', er))

		console.log(`[HTTP] ${method} ${fullUrl} - ${response.status}`, {
			body: responseBody,
		})

		if (
			(response.status === 401 && response.statusText !== 'WRONG_AUTH_DATA') ||
			(responseBody &&
				'code' in responseBody &&
				responseBody.code === 'COOKIE_NOT_FOUND')
		) {
			await router.push('/login')
		}

		if (!response.ok) {
			throw {
				status: response.status,
				statusText: response.statusText,
				body: responseBody,
				url: fullUrl,
				method,
			}
		}

		return {
			...response,
			body: responseBody,
		}
	} catch (error) {
		console.error(`[HTTP] ${method} ${fullUrl} - ERROR`, error)
		throw error
	}
}

export const http = {
	get: <T extends { request?: unknown; response?: unknown }>(
		url: string,
		opts?: Omit<RequestInit & ClientOptions, 'method' | 'body'> & {
			body: object
		},
	): Promise<T['response']> =>
		makeRequest(url, {
			...opts,
			body: opts?.body ? JSON.stringify(opts.body) : undefined,
			method: 'GET',
		}),
	post: <T extends { request?: unknown; response?: unknown }>(
		url: string,
		opts?: Omit<RequestInit & ClientOptions, 'method' | 'body'> & {
			body: object
		},
	): Promise<T['response']> =>
		makeRequest(url, {
			...opts,
			body: opts?.body ? JSON.stringify(opts.body) : undefined,
			method: 'POST',
		}),
}
