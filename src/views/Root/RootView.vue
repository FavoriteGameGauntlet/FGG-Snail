<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
	<div class="grid h-full grid-cols-[auto_1fr]">
		<AppSidebar class="w-60 border-r border-r-slate-500 h-full" />

		<router-view />
	</div>
</template>
