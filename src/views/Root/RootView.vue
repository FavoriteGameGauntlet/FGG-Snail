<script setup lang="ts">
import { useGameStore } from '../../stores/gameStore'
import { useTimerStore } from '../../stores/timerStore'
import AppNavbar from './components/AppNavbar.vue'

useTimerStore().init()
useGameStore().init()
</script>

<template>
	<div class="grid h-full grid-rows-[auto_1fr]">
		<AppNavbar class="h-16" />

		<div class="h-full w-full">
			<router-view />
		</div>
	</div>
</template>
