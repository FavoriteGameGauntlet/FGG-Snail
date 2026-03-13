<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/authStore'

const authStore = useAuthStore()
const { login } = storeToRefs(authStore)

const onLogOutButtonClick = () => {
	authStore.logOut()
}
</script>

<template>
	<div class="user-profile" v-show="login">
		<span>{{ login }}</span>
		<button class="logout-button" @click="onLogOutButtonClick">Выход</button>
	</div>
</template>

<style scoped>
@reference '@/style.css';

.user-profile {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	font-size: 14px;
	line-height: 110%;
}

.logout-button {
	cursor: pointer;
}

.logout-button:hover {
	text-decoration: underline;
}
</style>
