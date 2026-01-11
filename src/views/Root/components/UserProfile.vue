<script setup lang="ts">
import { useAuthStore } from '../../../stores/authStore'

type Props = {
	name: string
	// pictureSrc?: string
}

const authStore = useAuthStore()

defineProps<Props>()

const onLogOutButtonClick = () => {
	authStore.logOut()
}
</script>

<template>
	<div class="flex flex-col gap-2 leading-[110%] text-sm">
		<span>{{ name }}</span>
		<button @click="onLogOutButtonClick">Выход</button>
	</div>
</template>

<style scoped>
@reference '@/style.css';
</style>
