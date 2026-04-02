<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/authStore'
import DisplayNameForm from './DisplayNameForm.vue'

const authStore = useAuthStore()

const { login } = storeToRefs(authStore)

const onLogOutButtonClick = () => {
	authStore.logOut()
}
</script>

<template>
	<div class="user-profile" v-show="login">
		<DisplayNameForm />

		<button class="logout-button" @click="onLogOutButtonClick">Выход</button>
	</div>
</template>

<style scoped>
.user-profile {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 0.5rem;
	font-size: 14px;
	line-height: 110%;
}

.logout-button {
	cursor: pointer;
	width: fit-content;
}

.logout-button:hover {
	text-decoration: underline;
}
</style>
