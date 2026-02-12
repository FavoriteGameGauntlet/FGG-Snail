import { API_URL } from '../constants/apiUrl'
import { type ClientOptions, fetch } from '@tauri-apps/plugin-http'
import { router } from '../router/router'

export type HttpErrorResponse = {
	status: number
	statusText: string
	body?: {
		code: string
		message: string
	}
	url: string
	method: string
}

type HttpResponse<T> = Omit<Response, 'body'> & {
	body: T
}

const makeRequest = async <T extends object | undefined = object | undefined>(
	url: string,
	opts?: RequestInit & ClientOptions,
): Promise<HttpResponse<T>> => {
	const fullUrl = API_URL + url
	const method = opts?.method || 'GET'

	// console.log(`[HTTP] ${method} ${fullUrl}`, {
	// 	body: opts?.body,
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		...opts?.headers,
	// 	},
	// })

	try {
		const response = await fetch(fullUrl, {
			...opts,
			headers: {
				'Content-Type': 'application/json',
				...opts?.headers,
			},
		})
		const responseBody: T = await response
			.text()
			.then((body) => (body.length ? JSON.parse(body) : undefined))

		const t = Temporal.Now.zonedDateTimeISO()

		console.log(
			`[HTTP] ${method} ${fullUrl} - ${response.status} | ${t.hour.toString().padStart(2, '0')}:${t.minute.toString().padStart(2, '0')}:${t.second.toString().padStart(2, '0')}`,
			{
				body: responseBody,
			},
		)

		if (
			(response.status === 401 && response.statusText !== 'WRONG_AUTH_DATA') ||
			(responseBody &&
				'code' in responseBody &&
				responseBody.code === 'COOKIE_NOT_FOUND')
		) {
			await router.push('/login')
		}

		if (!response.ok) {
			const e: HttpErrorResponse = {
				status: response.status,
				statusText: response.statusText,
				body: responseBody as HttpErrorResponse['body'],
				url: fullUrl,
				method,
			}

			throw e
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

type HttpRequestOptions = Omit<
	RequestInit & ClientOptions,
	'method' | 'body'
> & {
	body?: object
}

export const http = {
	get: <
		T extends { request?: unknown; response?: unknown } = {
			request: undefined
			response: undefined
		},
	>(
		url: string,
		opts?: HttpRequestOptions,
	): Promise<HttpResponse<T['response']>> =>
		makeRequest(url, {
			...opts,
			body: opts?.body ? JSON.stringify(opts.body) : undefined,
			method: 'GET',
		}),

	post: <
		T extends { request?: unknown; response?: unknown } = {
			request: undefined
			response: undefined
		},
	>(
		url: string,
		opts?: HttpRequestOptions,
	): Promise<HttpResponse<T['response']>> =>
		makeRequest(url, {
			...opts,
			body: opts?.body ? JSON.stringify(opts.body) : undefined,
			method: 'POST',
		}),
}
