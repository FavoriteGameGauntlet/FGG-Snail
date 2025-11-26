import { API_URL } from '../constants/apiUrl'
import { fetch } from '@tauri-apps/plugin-http'

export const api = {
	// users: {
	// 	get: ({ name }: { name: string }) => axios.get(`/users/${name}`),
	// },
	test: (name: string) => fetch(API_URL + `/games/unplayed`, { method: 'GET' }),
}
