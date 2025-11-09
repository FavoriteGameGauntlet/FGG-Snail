import axios from 'axios'
import { API_URL } from '../constants/apiUrl'

export const api = {
	users: {
		get: ({ name }: { name: string }) => axios.get(`/users/${name}`),
		post: ({ name }: { name: string }) => axios.post(`/users/${name}`),
	},
	test: () => console.log(API_URL),
}
