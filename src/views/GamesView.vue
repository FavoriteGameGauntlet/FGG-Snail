<script setup lang="ts">
import { api } from '../app-facade/api'
import { API_URL } from '../constants/apiUrl'

import axios from 'axios'

console.log({ API_URL, baseUrl: axios.defaults.baseURL })

const onPostButtonClick = () => {
	api.test()
	api.users.post({ name: 'welnyr' }).then((post) => console.log({ post }))
}

// const onGetButtonClick = () => {
// 	api.users.get({ name: 'welnyr' }).then((get) => console.log({ get }))
// }
</script>

<template>
	<div>
		GamesView

		<button class="px-4 py-2 bg-red-200" @click="onPostButtonClick()">
			post
		</button>

		<!-- <button @click="onGetButtonClick()">get</button> -->
	</div>
</template>
