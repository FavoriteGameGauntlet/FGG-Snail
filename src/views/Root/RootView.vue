<script setup lang="ts">
import { useEffectStore } from '../../stores/effectStore'
import { useGameStore } from '../../stores/gameStore'
import { useTimerStore } from '../../stores/timerStore'
import AppNavbar from './components/AppNavbar.vue'

useTimerStore().init()
useGameStore().init()
useEffectStore().init()
</script>

<template>
	<div class="grid h-full grid-rows-[auto_1fr]">
		<AppNavbar class="h-16" />

		<div
			class="h-full max-h-full min-h-0 w-full max-w-full min-w-0 overflow-auto"
		>
			<router-view />
		</div>
	</div>
</template>
