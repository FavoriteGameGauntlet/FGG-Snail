import { API_URL } from '../constants/apiUrl'
import { type ClientOptions, fetch } from '@tauri-apps/plugin-http'

const makeRequest = (url: string, opts?: RequestInit & ClientOptions) =>
	fetch(API_URL + url, opts)

export const http = {
	get: (
		url: string,
		opts: Omit<RequestInit & ClientOptions, 'method' | 'body'> & {
			body: object
		},
	) =>
		makeRequest(url, {
			...opts,
			body: opts.body ? JSON.stringify(opts.body) : undefined,
			method: 'GET',
		}),
	post: (
		url: string,
		opts: Omit<RequestInit & ClientOptions, 'method' | 'body'> & {
			body: object
		},
	) =>
		makeRequest(url, {
			...opts,
			body: opts.body ? JSON.stringify(opts.body) : undefined,
			method: 'post',
		}),
}
