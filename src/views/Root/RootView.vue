<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
	<div class="layout">
		<AppNavbar class="navbar" />

		<div class="content">
			<router-view />
		</div>
	</div>
</template>

<style scoped>
.layout {
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100%;
}

.navbar {
	height: 64px;
}

.content {
	height: 100%;
	max-height: 100%;
	min-height: 0;
	width: 100%;
	max-width: 100%;
	min-width: 0;
	overflow: auto;
}
</style>
