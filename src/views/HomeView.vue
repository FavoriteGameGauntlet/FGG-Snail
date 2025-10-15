<script setup lang="ts">
const refresh = () => {
	document.location.reload()
}
</script>

<template>
	<h1>HomeView</h1>

	<button class="border-2 px-2 py-1">
		<RouterLink to="/login">aboba</RouterLink>
	</button>

	<button @click="refresh">refresh</button>
</template>
