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
	<div class="flex flex-col gap-2 text-sm leading-[110%]" v-show="login">
		<span>{{ login }}</span>
		<button
			class="hover:cursor-pointer hover:underline"
			@click="onLogOutButtonClick"
		>
			Выход
		</button>
	</div>
</template>

<style scoped>
@reference '@/style.css';
</style>
